// Game Enhancement System - Additive improvements to existing gameplay
// All enhancements are backwards-compatible and optional

class GameEnhancementSystem {
    constructor(game) {
        this.game = game;
        this.confidenceScore = 0;
        this.discoveredClues = [];
        this.activeEvents = [];
        this.hintsUsed = 0;
    }

    // NEW: Confidence scoring system
    calculateConfidence() {
        if (!this.game.gameState.currentCase.confidenceFactors) {
            return 50; // Default for legacy cases
        }

        let totalWeight = 0;
        let achievedWeight = 0;

        Object.entries(this.game.gameState.currentCase.confidenceFactors).forEach(([actionId, factor]) => {
            totalWeight += factor.weight;
            
            // Check if this action was taken
            const isQuestionAsked = this.game.gameState.askedQuestions.includes(actionId);
            const isTestOrdered = this.game.gameState.orderedTests.includes(actionId);
            
            if (isQuestionAsked || isTestOrdered) {
                achievedWeight += factor.weight;
            }
        });

        this.confidenceScore = Math.round((achievedWeight / totalWeight) * 100);
        return this.confidenceScore;
    }

    // NEW: Clue revelation system
    revealClues(actionId) {
        const currentCase = this.game.gameState.currentCase;
        if (!currentCase.clues || !currentCase.clues.revealed[actionId]) {
            return [];
        }

        const newClues = currentCase.clues.revealed[actionId];
        newClues.forEach(clue => {
            if (!this.discoveredClues.includes(clue)) {
                this.discoveredClues.push(clue);
                this.showClueNotification(clue);
            }
        });

        return newClues;
    }

    // NEW: Dynamic event system
    checkEvents() {
        const currentCase = this.game.gameState.currentCase;
        if (!currentCase.events) return;

        const timeElapsed = (currentCase.timeLimit * 60) - this.game.gameState.timeRemaining;
        
        currentCase.events.forEach(event => {
            if (this.activeEvents.includes(event.trigger)) return;

            let shouldTrigger = false;

            // Time-based triggers
            if (event.trigger.startsWith('time_elapsed_')) {
                const requiredTime = parseInt(event.trigger.split('_')[2].replace('s', ''));
                shouldTrigger = timeElapsed >= requiredTime;
            }

            // Action-based triggers
            if (event.trigger.startsWith('test_') && event.trigger.endsWith('_ordered')) {
                const testId = event.trigger.replace('test_', '').replace('_ordered', '');
                shouldTrigger = this.game.gameState.orderedTests.includes(testId);
            }

            // Confidence-based triggers
            if (event.trigger.startsWith('confidence_')) {
                const threshold = parseInt(event.trigger.split('_')[2]);
                const operator = event.trigger.split('_')[1]; // above/below
                const currentConfidence = this.calculateConfidence();
                
                shouldTrigger = operator === 'above' ? 
                    currentConfidence >= threshold : 
                    currentConfidence <= threshold;
            }

            if (shouldTrigger) {
                this.triggerEvent(event);
                this.activeEvents.push(event.trigger);
            }
        });
    }

    // NEW: Event notification system
    triggerEvent(event) {
        const notification = document.createElement('div');
        notification.className = 'event-notification';
        notification.innerHTML = `
            <div class="event-content">
                <i class="fas fa-exclamation-circle"></i>
                <div class="event-text">
                    <h4>Clinical Update</h4>
                    <p>${event.narrativeText || event.description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);

        // Play appropriate sound
        if (event.impact === 'emotional_pressure') {
            this.game.playSound('warning');
        } else if (event.impact === 'clinical_urgency') {
            this.game.playSound('critical');
        }
    }

    // NEW: Hint system
    checkHints() {
        const currentCase = this.game.gameState.currentCase;
        if (!currentCase.hints) return;

        const timeElapsed = (currentCase.timeLimit * 60) - this.game.gameState.timeRemaining;
        const confidence = this.calculateConfidence();

        currentCase.hints.forEach(hint => {
            if (this.hintsUsed >= 2) return; // Limit hints per case

            let shouldOffer = false;

            // Parse hint triggers
            if (hint.trigger.includes('confidence_below_') && hint.trigger.includes('after_')) {
                const confidenceThreshold = parseInt(hint.trigger.split('confidence_below_')[1].split('_')[0]);
                const timeThreshold = parseInt(hint.trigger.split('after_')[1].split('_')[0]) * 60;
                
                shouldOffer = confidence < confidenceThreshold && timeElapsed > timeThreshold;
            }

            if (shouldOffer) {
                this.offerHint(hint);
            }
        });
    }

    // NEW: Hint offering system
    offerHint(hint) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay hint-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-lightbulb"></i> Guidance Available</h3>
                </div>
                <div class="modal-body">
                    <p><strong>${hint.source}:</strong></p>
                    <p>"${hint.text}"</p>
                    <p class="hint-cost">This guidance will cost ${hint.cost} seconds.</p>
                </div>
                <div class="modal-actions">
                    <button class="action-btn primary" onclick="gameEnhancements.acceptHint('${hint.text}', ${hint.cost}); this.closest('.modal-overlay').remove();">
                        Accept Guidance
                    </button>
                    <button class="action-btn secondary" onclick="this.closest('.modal-overlay').remove();">
                        Continue Alone
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    acceptHint(hintText, cost) {
        this.game.gameState.timeRemaining = Math.max(0, this.game.gameState.timeRemaining - cost);
        this.hintsUsed++;
        
        // Show hint as a persistent note
        const hintDisplay = document.createElement('div');
        hintDisplay.className = 'active-hint';
        hintDisplay.innerHTML = `
            <div class="hint-content">
                <i class="fas fa-lightbulb"></i>
                <span>${hintText}</span>
            </div>
        `;
        
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(hintDisplay);
        }
    }

    // NEW: Enhanced scoring with narrative feedback
    calculateFinalScore() {
        const baseScore = this.game.gameState.score;
        const confidence = this.calculateConfidence();
        const timeBonus = Math.floor(this.game.gameState.timeRemaining / 10);
        const hintPenalty = this.hintsUsed * 25;
        
        const finalScore = baseScore + (confidence * 2) + timeBonus - hintPenalty;
        
        // Determine narrative branch
        let performanceLevel = 'delayed_diagnosis';
        if (confidence >= 80 && this.game.gameState.timeRemaining > 60) {
            performanceLevel = 'excellent_performance';
        } else if (confidence >= 60 && this.game.gameState.timeRemaining > 30) {
            performanceLevel = 'good_performance';
        }
        
        return {
            finalScore,
            confidence,
            performanceLevel,
            cluesDiscovered: this.discoveredClues.length,
            hintsUsed: this.hintsUsed
        };
    }

    // NEW: Clue notification system
    showClueNotification(clue) {
        const notification = document.createElement('div');
        notification.className = 'clue-notification';
        notification.innerHTML = `
            <div class="clue-content">
                <i class="fas fa-search"></i>
                <div class="clue-text">
                    <h4>Clinical Finding</h4>
                    <p>${clue}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);

        this.game.playSound('success');
    }
}

// Initialize enhancement system
let gameEnhancements;
document.addEventListener('DOMContentLoaded', () => {
    // Wait for main game to initialize
    setTimeout(() => {
        if (window.game) {
            gameEnhancements = new GameEnhancementSystem(window.game);
            
            // Hook into existing game methods
            const originalAskQuestion = window.game.askQuestion;
            window.game.askQuestion = function(questionId) {
                originalAskQuestion.call(this, questionId);
                gameEnhancements.revealClues(questionId);
                gameEnhancements.checkEvents();
                gameEnhancements.checkHints();
            };
            
            const originalOrderTest = window.game.orderTest;
            window.game.orderTest = function(testId) {
                originalOrderTest.call(this, testId);
                gameEnhancements.revealClues(testId);
                gameEnhancements.checkEvents();
                gameEnhancements.checkHints();
            };
        }
    }, 1000);
});