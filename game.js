// Medical Mystery Game - Emergency Medicine Simulator
// Constants for scoring system
const SCORING = {
    HISTORY_REVEAL: 50,
    QUESTION_ASK: 25,
    TEST_ORDER: 30,
    CORRECT_DIAGNOSIS: 200,
    INCORRECT_DIAGNOSIS: -100,
    TIME_BONUS_MULTIPLIER: 0.1,
    ACCURACY_BONUS_MULTIPLIER: 0.2
};

// Constants for game settings
const GAME_SETTINGS = {
    DEFAULT_TIMER_SPEED: 1.0,
    DEFAULT_SHOW_HINTS: true,
    DEFAULT_SOUND_EFFECTS: true,
    DEFAULT_DIFFICULTY: 'medium'
};

// Constants for achievements
const ACHIEVEMENTS = {
    FIRST_WIN: 'first_win',
    SPEED_DEMON: 'speed_demon',
    PERFECTIONIST: 'perfectionist',
    VETERAN: 'veteran',
    SPECIALIST: 'specialist'
};

// Security: Sanitize HTML to prevent XSS
function sanitizeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, (match) => {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escape[match];
    });
}

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
            finalDiagnosis: null,
            difficulty: 'medium',
            timerSpeed: 1.0,
            showHints: true,
            soundEffects: true
        };
        
        this.timer = null;
        this.stats = this.loadStats();
        this.achievements = this.loadAchievements();
        this.audioContext = null;
        
        this.initializeGame();
    }

    initializeGame() {
        this.showLoadingScreen();
        this.loadSettings();
        this.initializeAudio();
        this.setupEventListeners();
        
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

    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    playSound(type) {
        if (!this.gameState.soundEffects || !this.audioContext) return;

        const frequencies = {
            success: [523, 659, 784], // C, E, G
            error: [220, 196, 174],   // A, G, F
            info: [440, 523],         // A, C
            warning: [330, 294]       // E, D
        };

        const freq = frequencies[type] || frequencies.info;
        
        freq.forEach((f, i) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(f, this.audioContext.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, i * 100);
        });
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('medicalMysterySettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                this.gameState.difficulty = settings.difficulty || 'medium';
                this.gameState.timerSpeed = settings.timerSpeed || 1.0;
                this.gameState.showHints = settings.showHints !== undefined ? settings.showHints : true;
                this.gameState.soundEffects = settings.soundEffects !== undefined ? settings.soundEffects : true;
            } catch (e) {
                console.log('Error loading settings:', e);
            }
        }
    }

    saveSettings() {
        const settings = {
            difficulty: this.gameState.difficulty,
            timerSpeed: this.gameState.timerSpeed,
            showHints: this.gameState.showHints,
            soundEffects: this.gameState.soundEffects
        };
        localStorage.setItem('medicalMysterySettings', JSON.stringify(settings));
    }

    loadStats() {
        const savedStats = localStorage.getItem('medicalMysteryStats');
        if (savedStats) {
            try {
                return JSON.parse(savedStats);
            } catch (e) {
                console.log('Error loading stats:', e);
            }
        }
        return {
            gamesPlayed: 0,
            gamesWon: 0,
            totalScore: 0,
            averageScore: 0,
            casesCompleted: {},
            bestScores: {}
        };
    }

    saveStats() {
        localStorage.setItem('medicalMysteryStats', JSON.stringify(this.stats));
    }

    loadAchievements() {
        const savedAchievements = localStorage.getItem('medicalMysteryAchievements');
        if (savedAchievements) {
            try {
                return JSON.parse(savedAchievements);
            } catch (e) {
                console.log('Error loading achievements:', e);
            }
        }
        return {
            first_win: {
                id: 'first_win',
                name: 'First Victory',
                description: 'Win your first game',
                icon: 'fas fa-trophy',
                unlocked: false
            },
            speed_demon: {
                id: 'speed_demon',
                name: 'Speed Demon',
                description: 'Complete a case in under 2 minutes',
                icon: 'fas fa-bolt',
                unlocked: false
            },
            perfectionist: {
                id: 'perfectionist',
                name: 'Perfectionist',
                description: 'Complete all actions in a case',
                icon: 'fas fa-star',
                unlocked: false
            },
            veteran: {
                id: 'veteran',
                name: 'Veteran',
                description: 'Play 10 games',
                icon: 'fas fa-medal',
                unlocked: false
            },
            specialist: {
                id: 'specialist',
                name: 'Specialist',
                description: 'Complete 3 cases in each specialty',
                icon: 'fas fa-user-md',
                unlocked: false
            }
        };
    }

    checkAchievements() {
        const newAchievements = [];
        
        // First win
        if (this.stats.gamesWon === 1 && !this.achievements.first_win.unlocked) {
            this.achievements.first_win.unlocked = true;
            this.achievements.first_win.unlockedAt = Date.now();
            newAchievements.push(this.achievements.first_win);
        }
        
        // Speed demon
        if (this.gameState.timeRemaining > 0 && this.gameState.timeRemaining < 120 && !this.achievements.speed_demon.unlocked) {
            this.achievements.speed_demon.unlocked = true;
            this.achievements.speed_demon.unlockedAt = Date.now();
            newAchievements.push(this.achievements.speed_demon);
        }
        
        // Perfectionist
        if (this.gameState.historyRevealed && 
            this.gameState.askedQuestions.length === this.gameState.currentCase.questions.length &&
            this.gameState.orderedTests.length === this.gameState.currentCase.tests.length &&
            !this.achievements.perfectionist.unlocked) {
            this.achievements.perfectionist.unlocked = true;
            this.achievements.perfectionist.unlockedAt = Date.now();
            newAchievements.push(this.achievements.perfectionist);
        }
        
        // Veteran
        if (this.stats.gamesPlayed >= 10 && !this.achievements.veteran.unlocked) {
            this.achievements.veteran.unlocked = true;
            this.achievements.veteran.unlockedAt = Date.now();
            newAchievements.push(this.achievements.veteran);
        }
        
        // Specialist
        const caseCounts = Object.values(this.stats.casesCompleted);
        if (caseCounts.length >= 3 && caseCounts.every(count => count >= 3) && !this.achievements.specialist.unlocked) {
            this.achievements.specialist.unlocked = true;
            this.achievements.specialist.unlockedAt = Date.now();
            newAchievements.push(this.achievements.specialist);
        }
        
        if (newAchievements.length > 0) {
            localStorage.setItem('medicalMysteryAchievements', JSON.stringify(this.achievements));
        }
        
        return newAchievements;
    }

    showAchievement(achievement) {
        const achievementModal = document.createElement('div');
        achievementModal.className = 'modal achievement-modal';
        achievementModal.style.display = 'flex';
        achievementModal.setAttribute('aria-hidden', 'false');
        achievementModal.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-header">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <h2>Achievement Unlocked!</h2>
                </div>
                <div class="achievement-body">
                    <h3>${achievement.name}</h3>
                    <p>${achievement.description}</p>
                </div>
                <button class="action-btn primary" onclick="game.closeAchievementModal()">
                    <i class="fas fa-check"></i> Continue
                </button>
            </div>
        `;
        document.body.appendChild(achievementModal);
    }

    closeAchievementModal() {
        const achievementModal = document.querySelector('.achievement-modal');
        if (achievementModal) {
            achievementModal.remove();
        }
    }

    showCaseSelection() {
        this.gameState.gamePhase = 'case-selection';
        const gameContainer = document.getElementById('game-container');
        
        const cases = getAllCases();
        const caseCards = cases.map(case_ => `
            <div class="case-card ${case_.difficulty}" data-case="${case_.id}">
                <div class="case-icon">
                    <i class="${case_.icon}"></i>
                </div>
                <div class="case-info">
                    <h3>${case_.title}</h3>
                    <p>${case_.description}</p>
                    <div class="case-meta">
                        <span class="specialty">${case_.specialty}</span>
                        <span class="difficulty-badge ${case_.difficulty}">${case_.difficulty.charAt(0).toUpperCase() + case_.difficulty.slice(1)}</span>
                    </div>
                    <div class="completion-info">
                        <span>Completed: ${this.stats.casesCompleted[case_.id] || 0}</span>
                        <span>Best: ${this.stats.bestScores[case_.id] || 0}</span>
                    </div>
                </div>
            </div>
        `).join('');
        
        gameContainer.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-header">
                    <h1>Medical Mystery</h1>
                    <p class="subtitle">Emergency Medicine Simulator</p>
                </div>
                <div class="stats-summary">
                    <div class="stat-card">
                        <i class="fas fa-gamepad"></i>
                        <span>${this.stats.gamesPlayed}</span>
                        <label>Games Played</label>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-trophy"></i>
                        <span>${this.stats.gamesWon}</span>
                        <label>Games Won</label>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-chart-line"></i>
                        <span>${Math.round(this.stats.averageScore)}</span>
                        <label>Average Score</label>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-medal"></i>
                        <span>${Object.values(this.achievements).filter(a => a.unlocked).length}</span>
                        <label>Achievements</label>
                    </div>
                </div>
                <div class="case-grid">
                    ${caseCards}
                </div>
            </div>
        `;
        
        this.attachEventHandlers();
    }

    startCase(caseId) {
        const case_ = getCase(caseId);
        if (!case_) {
            throw new Error(`Case ${caseId} not found`);
        }
        
        this.gameState.currentCase = case_;
        this.gameState.gamePhase = 'playing';
        this.initialTime = case_.timeLimit * 60;
        this.gameState.timeRemaining = this.initialTime;
        this.gameState.score = 0;
        this.gameState.askedQuestions = [];
        this.gameState.orderedTests = [];
        this.gameState.historyRevealed = false;
        this.gameState.finalDiagnosis = null;
        
        this.render();
        this.startTimer();
        this.playSound('success');
    }

    render() {
        if (this.gameState.gamePhase === 'welcome' || this.gameState.gamePhase === 'case-selection') {
            this.showCaseSelection();
            return;
        }
        
        if (!this.gameState.currentCase) return;

        const gameContainer = document.getElementById('game-container');
        
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
                ${this.renderTestResults()}
                ${this.renderDiagnosisOptions()}
                ${this.renderHints()}
            </div>

            <div class="game-actions">
                <button class="action-btn secondary" onclick="game.showCaseSelection()">
                    <i class="fas fa-arrow-left"></i> Back to Cases
                </button>
            </div>
        `;

        this.attachEventHandlers();
    }

    renderHistorySection() {
        if (!this.gameState.historyRevealed) {
            return `
                <div class="section">
                    <h3><i class="fas fa-file-medical"></i> Medical History</h3>
                    <button class="action-btn primary history-btn">
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
                        <strong>Demographics:</strong> ${history.demographics}
                    </div>
                    <div class="history-item">
                        <strong>Past Medical History:</strong>
                        <ul>${history.pastMedicalHistory.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Social History:</strong>
                        <ul>${history.socialHistory.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Family History:</strong>
                        <ul>${history.familyHistory.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Medications:</strong>
                        <ul>${history.medications.map(item => `<li>${item}</li>`).join('')}</ul>
                    </div>
                    <div class="history-item">
                        <strong>Allergies:</strong> ${history.allergies}
                    </div>
                    <div class="history-item">
                        <strong>Last Physical:</strong> ${history.lastPhysical}
                    </div>
                </div>
            </div>
        `;
    }

    renderPatientInterview() {
        const availableQuestions = this.gameState.currentCase.questions.filter(q => 
            !this.gameState.askedQuestions.includes(q.id)
        );
        
        if (availableQuestions.length === 0) {
            return `
                <div class="section">
                    <h3><i class="fas fa-comments"></i> Patient Interview</h3>
                    <p>All questions have been asked.</p>
                </div>
            `;
        }
        
        const questionButtons = availableQuestions.map(q => `
            <button class="action-btn secondary question-btn" data-question="${q.id}">
                ${q.text}
            </button>
        `).join('');
        
        return `
            <div class="section">
                <h3><i class="fas fa-comments"></i> Patient Interview</h3>
                <div class="question-grid">
                    ${questionButtons}
                </div>
            </div>
        `;
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
            <button class="action-btn secondary test-btn" data-test="${t.id}">
                ${t.label}
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

    renderTestResults() {
        if (this.gameState.orderedTests.length === 0) return '';
        
        const testResults = this.gameState.orderedTests.map(testId => {
            const test = this.gameState.currentCase.tests.find(t => t.id === testId);
            return `
                <div class="test-result">
                    <h4><i class="fas fa-flask"></i> ${test.label}</h4>
                    <div class="test-description">${test.description}</div>
                    <div class="test-finding">${test.result}</div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="section">
                <h3><i class="fas fa-clipboard-list"></i> Test Results</h3>
                <div class="test-results">
                    ${testResults}
                </div>
            </div>
        `;
    }

    renderDiagnosisOptions() {
        const diagnosisButtons = this.gameState.currentCase.diagnosisOptions.map(d => `
            <button class="action-btn primary diagnosis-btn" data-diagnosis="${d.id}">
                ${d.label}
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

    renderHints() {
        if (!this.gameState.showHints) return '';
        
        const hints = [
            'Review the patient history for important clues',
            'Ask relevant questions to understand symptoms',
            'Order appropriate tests to confirm your diagnosis',
            'Consider the patient\'s medical history and risk factors'
        ];
        
        return `
            <div class="hints-panel">
                <h4><i class="fas fa-lightbulb"></i> Hints</h4>
                <ul>
                    ${hints.map(hint => `<li>${hint}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    attachEventHandlers() {
        // History button
        const historyBtn = document.querySelector('.history-btn');
        if (historyBtn) {
            historyBtn.onclick = () => this.revealHistory();
        }
        
        // Question buttons
        document.querySelectorAll('.question-btn').forEach(btn => {
            btn.onclick = () => this.askQuestion(btn.dataset.question);
        });
        
        // Test buttons
        document.querySelectorAll('.test-btn').forEach(btn => {
            btn.onclick = () => this.orderTest(btn.dataset.test);
        });
        
        // Diagnosis buttons
        document.querySelectorAll('.diagnosis-btn').forEach(btn => {
            btn.onclick = () => this.makeDiagnosis(btn.dataset.diagnosis);
        });
        
        // Case cards
        document.querySelectorAll('.case-card').forEach(card => {
            card.onclick = () => this.startCase(card.dataset.case);
        });
    }

    startTimer() {
        this.timerStartTime = Date.now();
        this.timer = setInterval(() => {
            const elapsed = (Date.now() - this.timerStartTime) / 1000;
            this.gameState.timeRemaining = this.initialTime - elapsed;
            this.render();
        }, 1000);
    }

    revealHistory() {
        if (this.gameState.gamePhase !== 'playing') return;
        this.gameState.historyRevealed = true;
        this.gameState.score += SCORING.HISTORY_REVEAL;
        this.playSound('info');
        this.render();
    }

    askQuestion(questionId) {
        if (this.gameState.gamePhase !== 'playing') return;
        
        const question = this.gameState.currentCase.questions.find(q => q.id === questionId);
        if (!question) {
            throw new Error(`Question ${questionId} not found`);
        }
        
        this.gameState.askedQuestions.push(questionId);
        this.gameState.score += SCORING.QUESTION_ASK;
        this.playSound('info');
        this.render();
    }

    orderTest(testId) {
        if (this.gameState.gamePhase !== 'playing') return;
        
        const test = this.gameState.currentCase.tests.find(t => t.id === testId);
        if (!test) {
            throw new Error(`Test ${testId} not found`);
        }
        
        this.gameState.orderedTests.push(testId);
        this.gameState.score += SCORING.TEST_ORDER;
        this.playSound('info');
        this.render();
    }

    makeDiagnosis(diagnosisId) {
        if (this.gameState.gamePhase !== 'playing') return;
        
        const diagnosis = this.gameState.currentCase.diagnosisOptions.find(d => d.id === diagnosisId);
        if (!diagnosis) {
            throw new Error(`Diagnosis ${diagnosisId} not found`);
        }
        
        this.gameState.finalDiagnosis = diagnosisId;
        this.gameState.gamePhase = 'ended';
        
        if (diagnosis.correct) {
            this.gameState.score += SCORING.CORRECT_DIAGNOSIS;
            this.playSound('success');
            this.endGame('✅ Correct Diagnosis! Patient saved!', true);
        } else {
            this.gameState.score += SCORING.INCORRECT_DIAGNOSIS;
            this.playSound('error');
            this.endGame('❌ Incorrect Diagnosis!', false);
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
        this.stats.averageScore = this.stats.totalScore / this.stats.gamesPlayed;
        
        const caseId = this.gameState.currentCase.id;
        this.stats.casesCompleted[caseId] = (this.stats.casesCompleted[caseId] || 0) + 1;
        
        if (!this.stats.bestScores[caseId] || this.gameState.score > this.stats.bestScores[caseId]) {
            this.stats.bestScores[caseId] = this.gameState.score;
        }
        
        // Check for achievements
        const newAchievements = this.checkAchievements();
        if (newAchievements.length > 0) {
            setTimeout(() => {
                newAchievements.forEach(achievement => {
                    this.showAchievement(achievement);
                });
            }, 1000);
        }
        
        this.saveStats();

        const gameContainer = document.getElementById('game-container');
        gameContainer.innerHTML = `
            <div class="end-screen ${won ? 'success' : 'failure'}">
                <div class="end-content">
                    <h2><i class="fas fa-${won ? 'trophy' : 'times-circle'}"></i> Game Over</h2>
                    <p class="end-message">${message}</p>
                    <div class="final-score">
                        <h3>Final Score: ${this.gameState.score}</h3>
                        <div class="score-breakdown">
                            <p>Base Score: 0</p>
                            <p>History Review: +${this.gameState.historyRevealed ? SCORING.HISTORY_REVEAL : 0}</p>
                            <p>Questions Asked: +${this.gameState.askedQuestions.length * SCORING.QUESTION_ASK}</p>
                            <p>Tests Ordered: +${this.gameState.orderedTests.length * SCORING.TEST_ORDER}</p>
                            <p>Diagnosis: ${won ? SCORING.CORRECT_DIAGNOSIS : SCORING.INCORRECT_DIAGNOSIS}</p>
                        </div>
                    </div>
                    <div class="end-actions">
                        <button class="action-btn primary" onclick="game.startCase('${this.gameState.currentCase.id}')">
                            <i class="fas fa-redo"></i> Play Again
                        </button>
                        <button class="action-btn secondary" onclick="game.showCaseSelection()">
                            <i class="fas fa-list"></i> Other Cases
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    formatTime(decimalHours) {
        const hours = Math.floor(decimalHours);
        const minutes = Math.round((decimalHours - hours) * 60);
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    setupEventListeners() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'g' || e.key === 'G') {
                this.toggleGlossary();
            } else if (e.key === 's' || e.key === 'S') {
                this.openSettingsModal();
            } else if (e.key === '?') {
                this.toggleKeyboardHelp();
            } else if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
        
        // Glossary toggle
        const glossaryBtn = document.querySelector('.floating-btn[aria-label="Glossary"]');
        if (glossaryBtn) {
            glossaryBtn.onclick = () => this.toggleGlossary();
        }
        
        // Settings button
        const settingsBtn = document.querySelector('.floating-btn[aria-label="Settings"]');
        if (settingsBtn) {
            settingsBtn.onclick = () => this.openSettingsModal();
        }
        
        // Statistics button
        const statsBtn = document.querySelector('.floating-btn[aria-label="Statistics"]');
        if (statsBtn) {
            statsBtn.onclick = () => this.showStats();
        }
        
        // Keyboard help button
        const helpBtn = document.querySelector('.floating-btn[aria-label="Keyboard Help"]');
        if (helpBtn) {
            helpBtn.onclick = () => this.toggleKeyboardHelp();
        }
    }

    toggleKeyboardHelp() {
        const help = document.getElementById('keyboard-help');
        if (help) {
            help.classList.toggle('visible');
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.remove();
        });
        
        const help = document.getElementById('keyboard-help');
        if (help) {
            help.classList.remove('visible');
        }
    }

    toggleGlossary() {
        const glossary = document.getElementById('glossary-sidebar');
        if (glossary) {
            glossary.classList.toggle('glossary-closed');
            glossary.classList.toggle('glossary-open');
        }
    }

    updateGlossaryDisplay() {
        const glossary = document.getElementById('glossary-sidebar');
        if (!glossary) return;
        
        const searchInput = glossary.querySelector('input');
        const query = searchInput ? searchInput.value : '';
        
        const results = searchTerms(query);
        
        const termsContainer = glossary.querySelector('.glossary-content');
        if (!termsContainer) return;
        
        const categories = ['cardiac', 'respiratory', 'neurological', 'general'];
        let termsHTML = '';
        
        categories.forEach(category => {
            const categoryTerms = results.filter(term => term.category === category);
            if (categoryTerms.length > 0) {
                termsHTML += `
                    <div class="glossary-category">
                        <h4><i class="${categories[category].icon}"></i> ${categories[category].name}</h4>
                        ${categoryTerms.map(term => `
                            <div class="glossary-term">
                                <h5>${term.term}</h5>
                                <p>${term.definition}</p>
                                ${term.importance === 'high' ? '<span class="glossary-importance">High importance</span>' : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        });
        
        termsContainer.innerHTML = `
            <div class="glossary-search">
                <input type="text" placeholder="Search medical terms..." value="${query}">
            </div>
            ${termsHTML}
        `;
        
        // Re-attach search event listener
        const newSearchInput = termsContainer.querySelector('input');
        if (newSearchInput) {
            newSearchInput.addEventListener('input', (e) => {
                this.searchGlossary(e.target.value);
            });
        }
    }

    searchGlossary(query) {
        const results = searchTerms(query);
        const termsContainer = document.querySelector('.glossary-content');
        if (!termsContainer) return;
        
        const categories = ['cardiac', 'respiratory', 'neurological', 'general'];
        let termsHTML = '';
        
        categories.forEach(category => {
            const categoryTerms = results.filter(term => term.category === category);
            if (categoryTerms.length > 0) {
                termsHTML += `
                    <div class="glossary-category">
                        <h4><i class="${categories[category].icon}"></i> ${categories[category].name}</h4>
                        ${categoryTerms.map(term => `
                            <div class="glossary-term">
                                <h5>${term.term}</h5>
                                <p>${term.definition}</p>
                                ${term.importance === 'high' ? '<span class="glossary-importance">High importance</span>' : ''}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        });
        
        if (termsHTML === '') {
            termsHTML = '<div class="no-results">No terms found matching your search.</div>';
        }
        
        termsContainer.innerHTML = `
            <div class="glossary-search">
                <input type="text" placeholder="Search medical terms..." value="${query}">
            </div>
            ${termsHTML}
        `;
    }

    openSettingsModal() {
        const settingsModal = document.createElement('div');
        settingsModal.className = 'modal settings-modal';
        settingsModal.style.display = 'flex';
        settingsModal.setAttribute('aria-hidden', 'false');
        settingsModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-cog"></i> Settings</h2>
                    <button class="close-modal" onclick="game.closeSettingsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="settings-content">
                    <div class="setting-group">
                        <label for="difficulty">Difficulty</label>
                        <select id="difficulty">
                            <option value="easy" ${this.gameState.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                            <option value="medium" ${this.gameState.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="hard" ${this.gameState.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
                        </select>
                        <small>Affects time limits and scoring</small>
                    </div>
                    <div class="setting-group">
                        <label for="timerSpeed">Timer Speed</label>
                        <select id="timerSpeed">
                            <option value="0.5" ${this.gameState.timerSpeed === 0.5 ? 'selected' : ''}>Slow</option>
                            <option value="1.0" ${this.gameState.timerSpeed === 1.0 ? 'selected' : ''}>Normal</option>
                            <option value="1.5" ${this.gameState.timerSpeed === 1.5 ? 'selected' : ''}>Fast</option>
                        </select>
                        <small>How fast the timer counts down</small>
                    </div>
                    <div class="setting-group">
                        <label>
                            <input type="checkbox" id="showHints" ${this.gameState.showHints ? 'checked' : ''}>
                            Show Hints
                        </label>
                        <small>Display helpful hints during gameplay</small>
                    </div>
                    <div class="setting-group">
                        <label>
                            <input type="checkbox" id="soundEffects" ${this.gameState.soundEffects ? 'checked' : ''}>
                            Sound Effects
                        </label>
                        <small>Play audio feedback for actions</small>
                    </div>
                    <button class="action-btn primary" onclick="game.saveSettings(); game.closeSettingsModal(); game.render();">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(settingsModal);
        
        // Attach event listeners
        const difficultySelect = document.getElementById('difficulty');
        const timerSpeedSelect = document.getElementById('timerSpeed');
        const showHintsCheckbox = document.getElementById('showHints');
        const soundEffectsCheckbox = document.getElementById('soundEffects');
        
        difficultySelect.onchange = () => this.gameState.difficulty = difficultySelect.value;
        timerSpeedSelect.onchange = () => this.gameState.timerSpeed = parseFloat(timerSpeedSelect.value);
        showHintsCheckbox.onchange = () => this.gameState.showHints = showHintsCheckbox.checked;
        soundEffectsCheckbox.onchange = () => this.gameState.soundEffects = soundEffectsCheckbox.checked;
    }

    closeSettingsModal() {
        const settingsModal = document.querySelector('.settings-modal');
        if (settingsModal) {
            settingsModal.remove();
        }
    }

    showStats() {
        // Remove any existing stats modal first
        const existingModal = document.querySelector('.stats-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const statsModal = document.createElement('div');
        statsModal.className = 'modal stats-modal';
        statsModal.style.display = 'flex';
        statsModal.setAttribute('aria-hidden', 'false');
        statsModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-chart-bar"></i> Game Statistics</h2>
                    <button class="close-modal" onclick="game.closeStatsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="stats-content">
                    <div class="stats-overview">
                        <div class="stat-item">
                            <h3>${this.stats.gamesPlayed}</h3>
                            <p>Games Played</p>
                        </div>
                        <div class="stat-item">
                            <h3>${this.stats.gamesWon}</h3>
                            <p>Games Won</p>
                        </div>
                        <div class="stat-item">
                            <h3>${Math.round(this.stats.averageScore)}</h3>
                            <p>Average Score</p>
                        </div>
                        <div class="stat-item">
                            <h3>${this.stats.gamesPlayed > 0 ? Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) : 0}%</h3>
                            <p>Win Rate</p>
                        </div>
                    </div>
                    <div class="case-stats">
                        <h3>Case Performance</h3>
                        ${Object.entries(this.stats.casesCompleted).map(([caseId, count]) => {
                            const case_ = getCase(caseId);
                            return `
                                <div class="case-stat">
                                    <span>${case_.title}</span>
                                    <span>${count} completed</span>
                                    <span>Best: ${this.stats.bestScores[caseId] || 0}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="achievements-section">
                        <h3>Achievements (${Object.values(this.achievements).filter(a => a.unlocked).length}/${Object.keys(this.achievements).length})</h3>
                        <div class="achievements-grid">
                            ${Object.values(this.achievements).map(achievement => `
                                <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                                    <i class="${achievement.icon}"></i>
                                    <div>
                                        <h4>${achievement.name}</h4>
                                        <p>${achievement.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(statsModal);
    }

    closeStatsModal() {
        const statsModal = document.querySelector('.stats-modal');
        if (statsModal) {
            statsModal.remove();
        }
    }

    // Test helper methods
    calculateBaseScore() {
        let baseScore = 0;
        
        // History review
        if (this.gameState.historyRevealed) {
            baseScore += SCORING.HISTORY_REVEAL;
        }
        
        // Questions asked
        baseScore += this.gameState.askedQuestions.length * SCORING.QUESTION_ASK;
        
        // Tests ordered
        baseScore += this.gameState.orderedTests.length * SCORING.TEST_ORDER;
        
        return baseScore;
    }

    calculateTimeBonus() {
        if (!this.gameState.currentCase) return 0;
        
        const timeUsed = (this.gameState.currentCase.timeLimit * 60) - this.gameState.timeRemaining;
        const timeBonus = Math.max(0, 100 - Math.floor(timeUsed / 60) * 10);
        
        return timeBonus;
    }

    calculateAccuracyBonus() {
        if (!this.gameState.currentCase) return 0;
        
        let accuracyBonus = 0;
        
        // Bonus for asking all questions
        if (this.gameState.askedQuestions.length === this.gameState.currentCase.questions.length) {
            accuracyBonus += 50;
        }
        
        // Bonus for ordering all tests
        if (this.gameState.orderedTests.length === this.gameState.currentCase.tests.length) {
            accuracyBonus += 50;
        }
        
        // Bonus for revealing history
        if (this.gameState.historyRevealed) {
            accuracyBonus += 25;
        }
        
        return accuracyBonus;
    }
}

// Initialize the game when the page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new MedicalMysteryGame();
});