// Medical Mystery Game - Emergency Medicine Simulator
// Constants
const SCORING = {
    HISTORY_REVEAL: 50,
    QUESTION_ASK: 25,
    TEST_ORDER: 30,
    CORRECT_DIAGNOSIS: 200,
    INCORRECT_DIAGNOSIS: -100
};

class MedicalMysteryGame {
    constructor() {
        this.gameState = {
            currentCase: null,
            timeRemaining: 0,
            score: 0,
            askedQuestions: [],
            orderedTests: [],
            historyRevealed: false,
            gamePhase: 'welcome',
            finalDiagnosis: null
        };
        
        this.timer = null;
        this.stats = this.loadStats();
        this.achievements = this.loadAchievements();
        
        this.initializeGame();
    }

    initializeGame() {
        this.showLoadingScreen();
        
        // Simulate loading time
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showCaseSelection();
        }, 2000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    loadStats() {
        try {
            const saved = localStorage.getItem('medicalMysteryStats');
            return saved ? JSON.parse(saved) : {
                gamesPlayed: 0,
                gamesWon: 0,
                totalScore: 0,
                averageScore: 0,
                bestScores: {},
                casesCompleted: {}
            };
        } catch (error) {
            console.error('Error loading stats:', error);
            return {
                gamesPlayed: 0,
                gamesWon: 0,
                totalScore: 0,
                averageScore: 0,
                bestScores: {},
                casesCompleted: {}
            };
        }
    }

    saveStats() {
        try {
            localStorage.setItem('medicalMysteryStats', JSON.stringify(this.stats));
        } catch (error) {
            console.error('Error saving stats:', error);
        }
    }

    loadAchievements() {
        try {
            const saved = localStorage.getItem('medicalMysteryAchievements');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading achievements:', error);
            return [];
        }
    }

    showCaseSelection() {
        this.gameState.gamePhase = 'case-selection';
        
        try {
            const cases = getAllCases();
            if (!cases || cases.length === 0) {
                throw new Error('No cases available');
            }
            
            const gameContainer = document.getElementById('game-container');
            if (!gameContainer) {
                throw new Error('Game container not found');
            }
            
            const caseCards = cases.map(case_ => `
                <div class="case-card ${case_.difficulty}" onclick="game.startCase('${case_.id}')">
                    <div class="case-icon">
                        <i class="${case_.icon}"></i>
                    </div>
                    <div class="case-content">
                        <h3>${case_.title}</h3>
                        <p>${case_.description}</p>
                        <div class="case-meta">
                            <span class="difficulty ${case_.difficulty}">${case_.difficulty.toUpperCase()}</span>
                            <span class="specialty">${case_.specialty}</span>
                        </div>
                    </div>
                </div>
            `).join('');
            
            gameContainer.innerHTML = `
                <div class="case-selection">
                    <div class="header">
                        <h1>Medical Mystery</h1>
                        <p>Emergency Medicine Simulator</p>
                    </div>
                    
                    <div class="stats-panel">
                        <div class="stat-item">
                            <span class="stat-value">${this.stats.gamesPlayed}</span>
                            <span class="stat-label">Games Played</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.stats.gamesWon}</span>
                            <span class="stat-label">Games Won</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.stats.averageScore}</span>
                            <span class="stat-label">Average Score</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.achievements.length}</span>
                            <span class="stat-label">Achievements</span>
                        </div>
                    </div>
                    
                    <div class="case-grid">
                        ${caseCards}
                    </div>
                </div>
            `;
            
        } catch (error) {
            console.error('Error showing case selection:', error);
            this.showError('Failed to load cases. Please refresh the page.');
        }
    }

    startCase(caseId) {
        try {
            const case_ = getCase(caseId);
            if (!case_) {
                throw new Error(`Case ${caseId} not found`);
            }
            
            this.gameState.currentCase = case_;
            this.gameState.gamePhase = 'playing';
            this.gameState.timeRemaining = case_.timeLimit * 60;
            this.gameState.score = 0;
            this.gameState.askedQuestions = [];
            this.gameState.orderedTests = [];
            this.gameState.historyRevealed = false;
            this.gameState.finalDiagnosis = null;
            
            this.render();
            this.startTimer();
            
        } catch (error) {
            console.error('Error starting case:', error);
            this.showError('Failed to start case. Please try again.');
        }
    }

    render() {
        if (this.gameState.gamePhase === 'welcome' || this.gameState.gamePhase === 'case-selection') {
            this.showCaseSelection();
            return;
        }
        
        if (!this.gameState.currentCase) return;

        try {
            const gameContainer = document.getElementById('game-container');
            if (!gameContainer) {
                throw new Error('Game container not found');
            }
            
            gameContainer.innerHTML = `
                <div class="game-header">
                    <div class="case-info">
                        <h1><i class="${this.gameState.currentCase.icon}"></i> ${this.gameState.currentCase.title}</h1>
                        <p>${this.gameState.currentCase.description}</p>
                    </div>
                    <div class="status-bar">
                        <div class="status-item">
                            <i class="fas fa-clock"></i>
                            <span>${this.formatTime(this.gameState.timeRemaining / 60)}</span>
                        </div>
                        <div class="status-item">
                            <i class="fas fa-star"></i>
                            <span>${this.gameState.score}</span>
                        </div>
                        <div class="status-item">
                            <i class="fas fa-heartbeat"></i>
                            <span>STABLE</span>
                        </div>
                    </div>
                </div>

                <div class="game-content">
                    ${this.renderHistorySection()}
                    ${this.renderPatientInterview()}
                    ${this.renderMedicalTests()}
                    ${this.renderDiagnosisOptions()}
                </div>

                <div class="game-actions">
                    <button class="action-btn secondary" onclick="game.showCaseSelection()">
                        <i class="fas fa-arrow-left"></i> Back to Cases
                    </button>
                </div>
            `;
            
            // Attach event handlers after rendering
            this.attachEventHandlers();
            
        } catch (error) {
            console.error('Error rendering game:', error);
            this.showError('Failed to render game. Please refresh the page.');
        }
    }

    renderHistorySection() {
        if (!this.gameState.historyRevealed) {
            return `
                <div class="section">
                    <h3><i class="fas fa-file-medical"></i> Medical History</h3>
                    <button class="action-btn primary history-btn" onclick="game.revealHistory()">
                        <i class="fas fa-eye"></i> Review Medical History
                    </button>
                </div>
            `;
        }

        const history = this.gameState.currentCase.patientHistory;
        return `
            <div class="section">
                <h3><i class="fas fa-file-medical"></i> Medical History</h3>
                <div class="history-content">
                    <div class="history-item">
                        <strong>Demographics:</strong> ${history.demographics || 'Not specified'}
                    </div>
                    <div class="history-item">
                        <strong>Past Medical History:</strong>
                        <ul>${(history.pastMedicalHistory || []).map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Social History:</strong>
                        <ul>${(history.socialHistory || []).map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Family History:</strong>
                        <ul>${(history.familyHistory || []).map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Medications:</strong>
                        <ul>${(history.medications || []).map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Allergies:</strong> ${history.allergies || 'None reported'}
                    </div>
                    <div class="history-item">
                        <strong>Last Physical:</strong> ${history.lastPhysical || 'Not specified'}
                    </div>
                    ${history.emotionalContext ? `
                    <div class="history-item">
                        <strong>Emotional Context:</strong> ${history.emotionalContext}
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderPatientInterview() {
        const availableQuestions = this.gameState.currentCase.questions.filter(q => 
            !this.gameState.askedQuestions.includes(q.id)
        );
        
        const askedQuestions = this.gameState.currentCase.questions.filter(q => 
            this.gameState.askedQuestions.includes(q.id)
        );
        
        let content = '';
        
        // Show asked questions with answers
        if (askedQuestions.length > 0) {
            content += `
                <div class="asked-questions">
                    <h4>Questions Asked:</h4>
                    ${askedQuestions.map(q => `
                        <div class="question-result">
                            <strong>Q: ${q.text}</strong>
                            <p class="answer">A: ${this.getQuestionAnswer(q.id)}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Show available questions
        if (availableQuestions.length > 0) {
            content += `
                <div class="available-questions">
                    <h4>Available Questions:</h4>
                    <div class="question-grid">
                        ${availableQuestions.map(q => `
                            <button class="action-btn secondary question-btn" data-question="${q.id}" onclick="game.askQuestion('${q.id}')">
                                ${q.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            content += '<p>All questions have been asked.</p>';
        }
        
        return `
            <div class="section">
                <h3><i class="fas fa-comments"></i> Patient Interview</h3>
                ${content}
            </div>
        `;
    }

    getQuestionAnswer(questionId) {
        // Generate appropriate answers based on the case and question
        const answers = {
            'chest_pain': 'Yes, severe crushing chest pain that started 30 minutes ago',
            'shortness_breath': 'Yes, patient is having difficulty breathing',
            'sweating': 'Yes, patient is diaphoretic and clammy',
            'nausea': 'Yes, patient reports feeling nauseous',
            'radiation_pain': 'Yes, pain radiates to left arm and jaw',
            'fever': 'Yes, temperature is 102°F (39°C)',
            'cough': 'Yes, productive cough with yellow sputum',
            'fatigue': 'Yes, patient reports extreme fatigue',
            'headache': 'Yes, severe headache for the past 2 hours',
            'dizziness': 'Yes, patient feels lightheaded and dizzy',
            'abdominal_pain': 'Yes, severe abdominal pain in right lower quadrant',
            'nausea_vomiting': 'Yes, patient has been vomiting for 6 hours',
            'diarrhea': 'Yes, watery diarrhea for the past 24 hours',
            'back_pain': 'Yes, severe lower back pain',
            'leg_pain': 'Yes, pain and swelling in right leg',
            'confusion': 'Yes, patient appears confused and disoriented',
            'weakness': 'Yes, weakness on left side of body',
            'vision_problems': 'Yes, blurred vision in right eye',
            'speech_problems': 'Yes, slurred speech',
            'balance_problems': 'Yes, difficulty maintaining balance'
        };
        
        return answers[questionId] || 'Patient responds appropriately to the question.';
    }

    renderMedicalTests() {
        const availableTests = this.gameState.currentCase.tests.filter(t => 
            !this.gameState.orderedTests.includes(t.id)
        );
        
        if (availableTests.length === 0) {
            return `
                <div class="section">
                    <h3><i class="fas fa-flask"></i> Medical Tests</h3>
                    <p>All tests have been ordered.</p>
                </div>
            `;
        }
        
        const testButtons = availableTests.map(t => `
            <button class="action-btn secondary test-btn" data-test="${t.id}" onclick="game.orderTest('${t.id}')">
                ${t.name}
            </button>
        `).join('');
        
        return `
            <div class="section">
                <h3><i class="fas fa-flask"></i> Medical Tests</h3>
                <div class="test-grid">
                    ${testButtons}
                </div>
            </div>
        `;
    }

    renderDiagnosisOptions() {
        const diagnosisButtons = this.gameState.currentCase.diagnosisOptions.map(d => `
            <button class="action-btn primary diagnosis-btn" data-diagnosis="${d.id}" onclick="game.makeDiagnosis('${d.id}')">
                ${d.name}
            </button>
        `).join('');
        
        return `
            <div class="section">
                <h3><i class="fas fa-stethoscope"></i> Make Diagnosis</h3>
                <div class="diagnosis-grid">
                    ${diagnosisButtons}
                </div>
            </div>
        `;
    }

    attachEventHandlers() {
        // Event handlers are now attached via onclick attributes in the render methods
        // This ensures they work immediately after rendering
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.timer = setInterval(() => {
            this.gameState.timeRemaining = Math.max(0, this.gameState.timeRemaining - 1);
            
            // Update timer display
            const timerElement = document.querySelector('.status-bar .status-item:first-child span');
            if (timerElement) {
                timerElement.textContent = this.formatTime(this.gameState.timeRemaining / 60);
            }
            
            // Check if time is up
            if (this.gameState.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.endGame('Time is up!', false);
            }
        }, 1000);
    }

    revealHistory() {
        if (this.gameState.gamePhase !== 'playing') return;
        
        this.gameState.historyRevealed = true;
        this.gameState.score += SCORING.HISTORY_REVEAL;
        this.render();
    }

    askQuestion(questionId) {
        if (this.gameState.gamePhase !== 'playing') return;
        
        try {
            const question = this.gameState.currentCase.questions.find(q => q.id === questionId);
            if (!question) {
                throw new Error(`Question ${questionId} not found`);
            }
            
            this.gameState.askedQuestions.push(questionId);
            this.gameState.score += SCORING.QUESTION_ASK;
            this.render();
            
        } catch (error) {
            console.error('Error asking question:', error);
        }
    }

    orderTest(testId) {
        if (this.gameState.gamePhase !== 'playing') return;
        
        try {
            const test = this.gameState.currentCase.tests.find(t => t.id === testId);
            if (!test) {
                throw new Error(`Test ${testId} not found`);
            }
            
            this.gameState.orderedTests.push(testId);
            this.gameState.score += SCORING.TEST_ORDER;
            this.render();
            
        } catch (error) {
            console.error('Error ordering test:', error);
        }
    }

    makeDiagnosis(diagnosisId) {
        if (this.gameState.gamePhase !== 'playing') return;
        
        try {
            const diagnosis = this.gameState.currentCase.diagnosisOptions.find(d => d.id === diagnosisId);
            if (!diagnosis) {
                throw new Error(`Diagnosis ${diagnosisId} not found`);
            }
            
            this.gameState.finalDiagnosis = diagnosisId;
            this.gameState.gamePhase = 'ended';
            
            if (diagnosis.correct) {
                this.gameState.score += SCORING.CORRECT_DIAGNOSIS;
                this.endGame('✅ Correct Diagnosis! Patient saved!', true);
            } else {
                this.gameState.score += SCORING.INCORRECT_DIAGNOSIS;
                this.endGame('❌ Incorrect Diagnosis!', false);
            }
            
        } catch (error) {
            console.error('Error making diagnosis:', error);
        }
    }

    endGame(message, won) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Update statistics
        this.stats.gamesPlayed++;
        if (won) this.stats.gamesWon++;
        this.stats.totalScore += this.gameState.score;
        this.stats.averageScore = Math.round(this.stats.totalScore / this.stats.gamesPlayed);
        
        const caseId = this.gameState.currentCase.id;
        this.stats.casesCompleted[caseId] = (this.stats.casesCompleted[caseId] || 0) + 1;
        
        if (!this.stats.bestScores[caseId] || this.gameState.score > this.stats.bestScores[caseId]) {
            this.stats.bestScores[caseId] = this.gameState.score;
        }
        
        this.saveStats();
        
        // Show end game screen
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.innerHTML = `
                <div class="end-game">
                    <h1>${message}</h1>
                    <div class="final-score">
                        <h2>Final Score: ${this.gameState.score}</h2>
                    </div>
                    <div class="game-actions">
                        <button class="action-btn primary" onclick="game.showCaseSelection()">
                            <i class="fas fa-play"></i> Play Again
                        </button>
                    </div>
                </div>
            `;
        }
    }

    formatTime(decimalHours) {
        const hours = Math.floor(decimalHours);
        const minutes = Math.floor((decimalHours - hours) * 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    showError(message) {
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.innerHTML = `
                <div class="error-screen">
                    <h1>Error</h1>
                    <p>${message}</p>
                    <button class="action-btn primary" onclick="location.reload()">
                        <i class="fas fa-refresh"></i> Refresh Page
                    </button>
                </div>
            `;
        }
    }
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    try {
        game = new MedicalMysteryGame();
    } catch (error) {
        console.error('Error initializing game:', error);
        document.getElementById('game-container').innerHTML = `
            <div class="error-screen">
                <h1>Game Initialization Error</h1>
                <p>Failed to start the game. Please refresh the page.</p>
                <button class="action-btn primary" onclick="location.reload()">
                    <i class="fas fa-refresh"></i> Refresh Page
                </button>
            </div>
        `;
    }
});