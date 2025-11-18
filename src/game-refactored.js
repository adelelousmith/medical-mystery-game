// Medical Mystery Game - Refactored Entry Point
// This demonstrates how the refactored modules work together

import { GAME_PHASES, SCORING } from './constants.js';
import { AudioManager } from './utils/audio.js';
import { NotificationManager } from './utils/notifications.js';
import { ScoringManager } from './utils/scoring.js';
import { PatientManager } from './utils/patient.js';
import { TestManager } from './managers/TestManager.js';

/**
 * Main Game Class - Orchestrates all game systems
 */
class MedicalMysteryGame {
    constructor() {
        this.gameState = this.initializeGameState();
        
        // Initialize managers
        this.audioManager = new AudioManager();
        this.notificationManager = new NotificationManager(this.audioManager);
        this.scoringManager = new ScoringManager(this.gameState);
        this.patientManager = new PatientManager(this.gameState);
        this.testManager = new TestManager(this.gameState);
        
        // Initialize audio
        this.audioManager.initializeSounds();
        
        // Bind methods
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);
    }

    initializeGameState() {
        return {
            gamePhase: GAME_PHASES.WELCOME,
            currentCase: null,
            score: 0,
            scoreBreakdown: [],
            timeRemaining: 0,
            patientStability: 100,
            patientState: 'stable',
            askedQuestions: [],
            orderedTests: [],
            consultedSpecialists: [],
            administeredTreatments: [],
            incorrectActions: 0,
            questionsRemaining: 10,
            consultationSlotsRemaining: 3,
            historyRevealed: false,
            investigationPhase: 'examine'
        };
    }

    /**
     * Start a new case
     */
    startCase(caseData) {
        this.gameState.currentCase = caseData;
        this.gameState.gamePhase = GAME_PHASES.PLAYING;
        this.gameState.timeRemaining = caseData.timeLimit * 60;
        this.gameState.patientStability = 100;
        
        // Start game timer
        this.startTimer();
        
        // Play ambient sound
        this.audioManager.playSound('hospital_ambience');
        
        this.render();
    }

    /**
     * Order a medical test
     */
    orderTest(testId) {
        const test = this.gameState.currentCase.tests.find(t => t.id === testId);
        if (!test) {
            this.notificationManager.showError('Test not found');
            return;
        }

        if (this.gameState.orderedTests.includes(testId)) {
            this.notificationManager.showWarning('Test already ordered');
            return;
        }

        // Order the test
        const success = this.testManager.orderTest(testId);
        if (!success) return;

        // Handle critical vs non-critical tests
        if (test.critical) {
            this.patientManager.applyImprovement();
            this.scoringManager.addScore(50, `Critical test: ${test.name}`);
            this.notificationManager.showScoreNotification(50, `Critical test: ${test.name}`);
            this.audioManager.playSound('success');
        } else {
            this.patientManager.applyIncorrectAction();
            this.scoringManager.addScore(-15, `Non-critical test: ${test.name}`);
            this.notificationManager.showScoreNotification(-15, `Non-critical test: ${test.name}`);
            this.audioManager.playSound('warning');
        }

        // Play contextual sound
        this.audioManager.playContextualSound(testId);

        this.render();
    }

    /**
     * Ask a patient question
     */
    askQuestion(questionId) {
        const question = this.gameState.currentCase.questions.find(q => q.id === questionId);
        if (!question) return;

        if (this.gameState.askedQuestions.includes(questionId)) {
            this.notificationManager.showWarning('Question already asked');
            return;
        }

        if (this.gameState.questionsRemaining <= 0) {
            this.notificationManager.showWarning('No questions remaining');
            return;
        }

        this.gameState.askedQuestions.push(questionId);
        this.gameState.questionsRemaining--;

        if (question.critical) {
            this.patientManager.applyImprovement();
            this.scoringManager.addScore(30, `Critical question: ${question.text.substring(0, 30)}...`);
            this.notificationManager.showScoreNotification(30, `Critical question`);
            this.audioManager.playSound('success');
        } else {
            this.patientManager.applyIncorrectAction();
            this.scoringManager.addScore(-10, 'Non-critical question');
            this.notificationManager.showScoreNotification(-10, 'Non-critical question');
            this.audioManager.playSound('warning');
        }

        this.audioManager.playSound('click');
        this.render();
    }

    /**
     * Make a diagnosis
     */
    makeDiagnosis(diagnosisId) {
        const isCorrect = diagnosisId === this.gameState.currentCase.correctDiagnosis;

        if (isCorrect) {
            // Calculate bonuses
            const timeBonus = this.scoringManager.calculateTimeBonus(
                this.gameState.timeRemaining,
                this.gameState.currentCase.timeLimit
            );
            const stabilityBonus = this.scoringManager.calculateStabilityBonus(
                this.gameState.patientStability
            );

            this.scoringManager.addScore(SCORING.CORRECT_DIAGNOSIS, 'Correct diagnosis');
            this.scoringManager.addScore(timeBonus, 'Time bonus');
            this.scoringManager.addScore(stabilityBonus, 'Patient stability bonus');

            this.audioManager.playSound('success');
            this.endGame('✅ Correct Diagnosis! Patient saved!', true);
        } else {
            this.scoringManager.addScore(SCORING.INCORRECT_DIAGNOSIS, 'Incorrect diagnosis');
            this.gameState.incorrectActions++;
            
            this.audioManager.playSound('error');
            this.endGame('❌ Incorrect Diagnosis!', false);
        }
    }

    /**
     * Game timer tick
     */
    update() {
        if (this.gameState.gamePhase !== GAME_PHASES.PLAYING) return;

        this.gameState.timeRemaining--;
        
        if (this.gameState.timeRemaining <= 0) {
            this.endGame('⏰ Time\'s up!', false);
            return;
        }

        // Apply time pressure to patient
        this.patientManager.applyTimePressure();

        // Check if patient is critical
        if (this.gameState.patientStability <= 0) {
            this.endGame('💔 Patient has died', false);
            return;
        }

        this.render();
    }

    /**
     * Start game timer
     */
    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => this.update(), 1000);
    }

    /**
     * End the game
     */
    endGame(message, won) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.gameState.gamePhase = GAME_PHASES.ENDED;
        this.gameState.endMessage = message;
        this.gameState.won = won;

        this.audioManager.stopMusic();
        this.render();
    }

    /**
     * Render the game UI
     */
    render() {
        // This would call the UI renderer
        console.log('Rendering game state:', this.gameState.gamePhase);
        
        // In the full implementation, this would update the DOM
        // For now, just log the state
        if (this.gameState.gamePhase === GAME_PHASES.PLAYING) {
            console.log('Score:', this.gameState.score);
            console.log('Time:', this.gameState.timeRemaining);
            console.log('Patient Stability:', this.gameState.patientStability);
            console.log('Ordered Tests:', this.gameState.orderedTests.length);
        }
    }

    /**
     * Get current game statistics
     */
    getStatistics() {
        return {
            score: this.gameState.score,
            timeRemaining: this.gameState.timeRemaining,
            patientStability: this.gameState.patientStability,
            testsOrdered: this.gameState.orderedTests.length,
            questionsAsked: this.gameState.askedQuestions.length,
            incorrectActions: this.gameState.incorrectActions,
            performanceRating: this.scoringManager.getPerformanceRating(this.gameState.score),
            scoreBreakdown: this.scoringManager.getScoreBreakdown()
        };
    }
}

// Export for use in other modules
export default MedicalMysteryGame;

// For browser global access (backward compatibility)
if (typeof window !== 'undefined') {
    window.MedicalMysteryGame = MedicalMysteryGame;
}
