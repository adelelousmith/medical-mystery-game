// Medical Mystery Game - Emergency Medicine Simulator
// Constants
const SCORING = {
    HISTORY_REVEAL: 50,
    QUESTION_ASK: 25,
    TEST_ORDER: 30,
    CORRECT_DIAGNOSIS: 200,
    INCORRECT_DIAGNOSIS: -100,
    SPECIALIST_CONSULT: 40,
    APPROPRIATE_REFERRAL: 50,
    INAPPROPRIATE_REFERRAL: -30
};

// Game Phases
const GAME_PHASES = {
    WELCOME: 'welcome',
    CASE_SELECTION: 'case-selection',
    PLAYING: 'playing',
    ENDED: 'ended'
};

// Patient States
const PATIENT_STATES = {
    STABLE: 'stable',
    DETERIORATING: 'deteriorating',
    CRITICAL: 'critical',
    IMPROVING: 'improving'
};

// Patient Deterioration Factors
const DETERIORATION_FACTORS = {
    TIME_PRESSURE: 0.1, // Deterioration per second
    INCORRECT_ACTIONS: 0.2, // Deterioration per wrong action
    MISSED_CRITICAL: 0.5, // Deterioration for missing critical tests
    IMPROVEMENT: -0.3 // Improvement for correct actions
};

// Specialist Types
const SPECIALISTS = {
    CARDIOLOGIST: {
        id: 'cardiologist',
        name: 'Cardiologist',
        icon: 'fas fa-heart',
        expertise: ['cardiac', 'chest_pain', 'arrhythmia'],
        consultationLimit: 2,
        description: 'Heart and cardiovascular system specialist'
    },
    PULMONOLOGIST: {
        id: 'pulmonologist',
        name: 'Pulmonologist',
        icon: 'fas fa-lungs',
        expertise: ['respiratory', 'shortness_of_breath', 'asthma'],
        consultationLimit: 2,
        description: 'Lung and respiratory system specialist'
    },
    NEUROLOGIST: {
        id: 'neurologist',
        name: 'Neurologist',
        icon: 'fas fa-brain',
        expertise: ['neurological', 'stroke', 'seizure', 'weakness'],
        consultationLimit: 2,
        description: 'Brain and nervous system specialist'
    },
    ORTHOPEDIST: {
        id: 'orthopedist',
        name: 'Orthopedist',
        icon: 'fas fa-bone',
        expertise: ['trauma', 'fracture', 'joint_pain'],
        consultationLimit: 2,
        description: 'Bones, joints, and musculoskeletal specialist'
    },
    PEDIATRICIAN: {
        id: 'pediatrician',
        name: 'Pediatrician',
        icon: 'fas fa-baby',
        expertise: ['pediatric', 'child_emergency'],
        consultationLimit: 2,
        description: 'Child and adolescent medicine specialist'
    },
    SURGEON: {
        id: 'surgeon',
        name: 'General Surgeon',
        icon: 'fas fa-user-md',
        expertise: ['surgical', 'acute_abdomen', 'trauma_surgery'],
        consultationLimit: 1,
        description: 'Surgical intervention specialist'
    }
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
            finalDiagnosis: null,
            patientState: PATIENT_STATES.STABLE,
            patientStability: 100, // 0-100 scale
            criticalActionsMissed: 0,
            incorrectActions: 0,
            specialistConsultations: [],
            consultationSlotsRemaining: 3, // Limited consultation slots
            questionsRemaining: 5 // Limited questions
        };
        
        this.timer = null;
        this.stats = this.loadStats();
        this.achievements = this.loadAchievements();
        this.settings = this.loadSettings();
        
        // Initialize audio system
        this.audioContext = null;
        this.backgroundMusic = null;
        this.initAudio();
        
        // Performance optimizations
        this.renderDebounceTimer = null;
        this.lastRenderTime = 0;
        this.caseStartTime = null;
        
        this.initializeGame();
    }

    initAudio() {
        try {
            // Create audio context for sound generation
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Initialize background music
            this.initBackgroundMusic();
        } catch (error) {
            console.warn('Audio not supported:', error);
        }
    }

    initBackgroundMusic() {
        // Create ambient medical background music using Web Audio API
        if (!this.audioContext) return;
        
        try {
            // Create a simple ambient medical theme
            this.createAmbientBackgroundMusic();
        } catch (error) {
            console.warn('Background music not supported:', error);
        }
    }

    createAmbientBackgroundMusic() {
        if (!this.audioContext) return;
        
        // Create royalty-free medical background music using Web Audio API
        // This creates a gentle, professional medical atmosphere
        
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const oscillator3 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        const compressor = this.audioContext.createDynamicsCompressor();
        
        // Connect the audio chain properly
        oscillator1.connect(filter);
        oscillator2.connect(filter);
        oscillator3.connect(filter);
        filter.connect(compressor);
        compressor.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Set up filter for medical/hospital ambient sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        filter.Q.setValueAtTime(0.2, this.audioContext.currentTime);
        
        // Set up compressor for professional sound
        compressor.threshold.setValueAtTime(-24, this.audioContext.currentTime);
        compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
        compressor.ratio.setValueAtTime(12, this.audioContext.currentTime);
        compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
        compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);
        
        // Medical-themed frequencies (gentle, professional)
        const baseFreq = 220; // A3
        const harmonyFreq = 330; // E4
        const melodyFreq = 440; // A4
        
        // Set up oscillators
        oscillator1.frequency.setValueAtTime(baseFreq, this.audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(harmonyFreq, this.audioContext.currentTime);
        oscillator3.frequency.setValueAtTime(melodyFreq, this.audioContext.currentTime);
        
        oscillator1.type = 'sine';
        oscillator2.type = 'sine';
        oscillator3.type = 'triangle';
        
        // Start oscillators
        oscillator1.start(this.audioContext.currentTime);
        oscillator2.start(this.audioContext.currentTime);
        oscillator3.start(this.audioContext.currentTime);
        
        // Create gentle volume modulation with proper audio chain
        const modulationGain = this.audioContext.createGain();
        gainNode.connect(modulationGain);
        modulationGain.connect(this.audioContext.destination);
        
        // Gentle volume changes every 4 seconds
        this.modulationInterval = setInterval(() => {
            if (this.settings.backgroundMusicEnabled) {
                modulationGain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
                modulationGain.gain.exponentialRampToValueAtTime(0.04, this.audioContext.currentTime + 2);
            }
        }, 4000);
        
        // Store reference for control
        this.backgroundMusic = {
            oscillators: [oscillator1, oscillator2, oscillator3],
            gainNode: gainNode,
            filter: filter,
            compressor: compressor,
            modulationGain: modulationGain
        };
        
        // Start with background music disabled by default
        this.toggleBackgroundMusic(false);
    }

    toggleBackgroundMusic(enabled) {
        if (!this.backgroundMusic) return;
        
        if (enabled) {
            this.backgroundMusic.gainNode.gain.setValueAtTime(0.06, this.audioContext.currentTime);
        } else {
            this.backgroundMusic.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        }
    }

    playSound(type) {
        if (!this.settings.soundEnabled || !this.audioContext) return;
        
        // Throttle rapid sound effects
        const now = Date.now();
        if (this.lastSoundTime && now - this.lastSoundTime < 100) {
            return; // Skip if sound was played too recently
        }
        this.lastSoundTime = now;
        
        try {
            switch (type) {
                case 'click':
                    this.createTone(800, 0.1, 'sine');
                    break;
                case 'success':
                    this.createChord([523, 659, 784], 0.3); // C major chord
                    break;
                case 'error':
                    this.createTone(200, 0.2, 'sawtooth');
                    break;
                case 'warning':
                    this.createTone(400, 0.15, 'square');
                    break;
                case 'heartbeat':
                    this.createHeartbeat();
                    break;
                case 'monitor':
                    this.createMonitorBeep();
                    break;
                case 'ambient':
                    this.createAmbientSound();
                    break;
                case 'critical':
                    this.createCriticalAlert();
                    break;
                default:
                    this.createTone(600, 0.1, 'sine');
            }
        } catch (error) {
            console.warn('Error playing sound:', error);
        }
    }

    createTone(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    createChord(frequencies, duration) {
        if (!this.audioContext) return;
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.createTone(freq, duration * 0.8, 'sine');
            }, index * 50);
        });
    }

    createHeartbeat() {
        if (!this.audioContext) return;
        
        // First beat
        this.createTone(60, 0.1, 'sine');
        
        // Second beat after 0.2 seconds
        setTimeout(() => {
            this.createTone(60, 0.1, 'sine');
        }, 200);
    }

    createMonitorBeep() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    createAmbientSound() {
        if (!this.audioContext) return;
        
        // Create a subtle ambient hospital sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.02, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 2);
    }

    createCriticalAlert() {
        if (!this.audioContext) return;
        
        // Create an urgent, attention-grabbing sound
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createTone(800 + (i * 100), 0.2, 'sawtooth');
            }, i * 200);
        }
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
                casesCompleted: {},
                totalPlayTime: 0,
                averagePlayTime: 0,
                perfectDiagnoses: 0,
                criticalCases: 0,
                achievementsUnlocked: 0,
                averagePatientStability: 0,
                totalPatientStability: 0
            };
        } catch (error) {
            console.error('Error loading stats:', error);
            return {
                gamesPlayed: 0,
                gamesWon: 0,
                totalScore: 0,
                averageScore: 0,
                bestScores: {},
                casesCompleted: {},
                totalPlayTime: 0,
                averagePlayTime: 0,
                perfectDiagnoses: 0,
                criticalCases: 0,
                achievementsUnlocked: 0,
                averagePatientStability: 0,
                totalPatientStability: 0
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

    // Achievement System
    checkAchievements() {
        const newAchievements = [];
        
        // Speed achievements
        if (this.gameState.timeRemaining > 0 && this.gameState.score >= 300) {
            const timeEfficiency = this.gameState.score / (this.gameState.currentCase.timeLimit * 60 - this.gameState.timeRemaining);
            if (timeEfficiency > 2) {
                newAchievements.push({
                    id: 'speed_demon',
                    title: 'Speed Demon',
                    description: 'Completed case with high efficiency',
                    icon: 'fas fa-bolt',
                    unlocked: true,
                    timestamp: Date.now()
                });
            }
        }
        
        // Perfect diagnosis
        if (this.gameState.score >= 400 && this.gameState.patientStability >= 80) {
            newAchievements.push({
                id: 'perfect_diagnosis',
                title: 'Perfect Diagnosis',
                description: 'Achieved perfect score with stable patient',
                icon: 'fas fa-star',
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Critical care
        if (this.gameState.patientStability <= 30 && this.gameState.score >= 200) {
            newAchievements.push({
                id: 'critical_care',
                title: 'Critical Care Specialist',
                description: 'Successfully managed critical patient',
                icon: 'fas fa-heartbeat',
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Add new achievements to existing ones
        newAchievements.forEach(achievement => {
            if (!this.achievements.find(a => a.id === achievement.id)) {
                this.achievements.push(achievement);
                this.showAchievementNotification(achievement);
            }
        });
        
        this.saveAchievements();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <i class="${achievement.icon}"></i>
                <div>
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    saveAchievements() {
        try {
            localStorage.setItem('medicalMysteryAchievements', JSON.stringify(this.achievements));
        } catch (error) {
            console.error('Error saving achievements:', error);
        }
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('gameSettings');
            return saved ? JSON.parse(saved) : {
                soundEnabled: true,
                timerEnabled: true,
                backgroundMusicEnabled: true
            };
        } catch (error) {
            console.error('Error loading settings:', error);
            return {
                soundEnabled: true,
                timerEnabled: true,
                backgroundMusicEnabled: true
            };
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
                        <div class="header-content">
                            <h1>Medical Mystery</h1>
                            <p>Emergency Medicine Simulator</p>
                        </div>
                        <div class="header-actions">
                            <button class="action-btn secondary" onclick="game.showGlossary()" aria-label="Open medical glossary">
                                <i class="fas fa-book-medical"></i> Glossary
                            </button>
                            <button class="action-btn secondary" onclick="game.showSettings()" aria-label="Open game settings">
                                <i class="fas fa-cog"></i> Settings
                            </button>
                        </div>
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
            this.gameState.timeRemaining = case_.timeLimit * 60; // Convert to seconds
            this.gameState.score = 0;
            this.gameState.askedQuestions = [];
            this.gameState.orderedTests = [];
            this.gameState.historyRevealed = false;
            this.gameState.gamePhase = 'playing';
            this.gameState.finalDiagnosis = null;
            
            // Start background music if enabled
            if (this.settings.backgroundMusicEnabled) {
                this.toggleBackgroundMusic(true);
            }
            
            this.playSound('click');
            this.render();
            this.startTimer();
            
            // Scroll to top of page when case starts
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error starting case:', error);
            this.playSound('error');
            this.showError('Failed to start case. Please try again.');
        }
    }

    render() {
        // Debounce rendering to prevent excessive updates
        if (this.renderDebounceTimer) {
            clearTimeout(this.renderDebounceTimer);
        }
        
        this.renderDebounceTimer = setTimeout(() => {
            this.performRender();
        }, 16); // ~60fps
    }

    performRender() {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) return;

        const currentTime = Date.now();
        if (currentTime - this.lastRenderTime < 50) {
            return; // Skip if rendering too frequently
        }
        this.lastRenderTime = currentTime;

        try {
            switch (this.gameState.gamePhase) {
                case GAME_PHASES.WELCOME:
                    this.showWelcomeScreen();
                    break;
                case GAME_PHASES.CASE_SELECTION:
                    this.showCaseSelection();
                    break;
                case GAME_PHASES.PLAYING:
                    this.showGameScreen();
                    break;
                case GAME_PHASES.ENDED:
                    // End game screen is handled separately
                    break;
                default:
                    this.showWelcomeScreen();
            }
        } catch (error) {
            console.error('Error during render:', error);
            this.showError('Rendering error occurred');
        }
    }

    showWelcomeScreen() {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) return;
        
        gameContainer.innerHTML = `
            <div class="welcome-screen">
                <div class="welcome-content">
                    <h1><i class="fas fa-stethoscope"></i> Medical Mystery</h1>
                    <p>Emergency Medicine Simulator</p>
                    <button class="action-btn primary" onclick="game.showCaseSelection()">
                        <i class="fas fa-play"></i> Start Game
                    </button>
                </div>
            </div>
        `;
    }

    showGameScreen() {
        if (!this.gameState.currentCase) return;
        
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) return;
        
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
                    <div class="status-item ${this.gameState.patientState}">
                        <i class="fas fa-heartbeat"></i>
                        <span>${this.gameState.patientState.charAt(0).toUpperCase() + this.gameState.patientState.slice(1)} (${Math.round(this.gameState.patientStability)}%)</span>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-question-circle"></i>
                        <span>Q: ${this.gameState.questionsRemaining}</span>
                    </div>
                    <div class="status-item">
                        <i class="fas fa-user-md"></i>
                        <span>C: ${this.gameState.consultationSlotsRemaining}</span>
                    </div>
                </div>
                <div class="game-controls">
                    <button class="action-btn secondary control-btn" onclick="game.showGlossary()" title="Medical Glossary" aria-label="Open medical glossary">
                        <i class="fas fa-book-medical"></i>
                    </button>
                    <button class="action-btn secondary control-btn" onclick="game.showSettings()" title="Settings" aria-label="Open game settings">
                        <i class="fas fa-cog"></i>
                    </button>
                </div>
            </div>

            <div class="game-content">
                ${this.renderPatientImage()}
                ${this.renderHistorySection()}
                ${this.renderPatientInterview()}
                ${this.renderMedicalTests()}
                ${this.renderDiagnosisOptions()}
                ${this.renderSpecialistConsultations()}
            </div>

            <div class="game-actions">
                <button class="action-btn secondary" onclick="game.showCaseSelection()">
                    <i class="fas fa-arrow-left"></i> Back to Cases
                </button>
                <button class="action-btn secondary" onclick="game.showGlossary()">
                    <i class="fas fa-book-medical"></i> Glossary
                </button>
                <button class="action-btn secondary" onclick="game.showSettings()">
                    <i class="fas fa-cog"></i> Settings
                </button>
            </div>
        `;
        
        this.attachEventHandlers();
    }

    renderPatientImage() {
        if (!this.gameState.currentCase.patientImage) return '';
        
        return `
            <div class="section patient-image-section">
                <h3><i class="fas fa-user-injured"></i> Patient</h3>
                <div class="patient-image-container">
                    <img src="${this.gameState.currentCase.patientImage}" alt="Patient" class="patient-image" />
                    <div class="patient-info">
                        <strong>${this.gameState.currentCase.patientHistory.demographics}</strong>
                        <p>${this.gameState.currentCase.description}</p>
                    </div>
                </div>
            </div>
        `;
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
        
        // Show available questions with remaining count
        if (availableQuestions.length > 0 && this.gameState.questionsRemaining > 0) {
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
            <div class="section interview-section">
                <h3><i class="fas fa-comments"></i> Patient Interview (${this.gameState.questionsRemaining} remaining)</h3>
                ${content}
                <div class="question-info">
                    <p><strong>Questions Asked:</strong> ${this.gameState.askedQuestions.length}</p>
                    <p><strong>Questions Remaining:</strong> ${this.gameState.questionsRemaining}</p>
                </div>
            </div>
        `;
    }

    getQuestionAnswer(questionId) {
        // Comprehensive, realistic patient responses for each question
        const answers = {
            // Cardiac case questions
            'chest_pain': 'Yes, severe crushing chest pain that started 30 minutes ago. Patient describes it as "like an elephant sitting on my chest" and rates it 9/10.',
            'shortness_breath': 'Yes, patient is having significant difficulty breathing. Speaking in short sentences and appears anxious about breathing.',
            'sweating': 'Yes, patient is diaphoretic and clammy. Sweating profusely despite normal room temperature.',
            'nausea': 'Yes, patient reports feeling nauseous and has vomited once. Says stomach feels "upset".',
            'radiation_pain': 'Yes, pain radiates to left arm, jaw, and back. Patient describes it as "shooting down my arm".',
            
            // Trauma case questions
            'consciousness': 'Patient is alert and oriented to person, place, and time. Responds appropriately to questions.',
            'abdominal_pain': 'Yes, severe abdominal pain in right lower quadrant. Patient guards the area and winces with movement.',
            'bleeding': 'Yes, visible bruising on abdomen and chest. Patient reports internal bleeding sensation.',
            'breathing': 'Patient is breathing but with difficulty. Respiratory rate is 24/min and shallow.',
            'extremity_movement': 'Patient can move arms but has difficulty with legs. Reports weakness in lower extremities.',
            
            // Pediatric case questions
            'breathing_difficulty': 'Yes, child is working hard to breathe. Using accessory muscles and has nasal flaring.',
            'fever': 'Yes, temperature is 102°F (39°C). Child appears flushed and lethargic.',
            'cough': 'Yes, barking cough that sounds like a seal. Worse at night and with activity.',
            'stridor': 'Yes, high-pitched sound when breathing in. Child appears anxious about breathing.',
            'activity_level': 'Child is less active than usual. Prefers to sit quietly and seems tired.',
            
            // Obstetric case questions
            'contractions': 'Yes, regular contractions every 3-4 minutes lasting 45-60 seconds. Increasing in intensity.',
            'water_broken': 'Yes, clear fluid leaking for the past 2 hours. No foul odor.',
            'bleeding': 'Yes, light spotting for the past hour. No heavy bleeding.',
            'fetal_movement': 'Yes, baby is moving normally. Mother reports regular kicks and movements.',
            'pain_location': 'Pain is in lower abdomen and radiating to back. Describes as "cramping" sensation.',
            
            // Psychiatric case questions
            'suicidal_thoughts': 'Patient admits to having thoughts of self-harm but denies active plan. Says "life doesn\'t seem worth living".',
            'depression_symptoms': 'Yes, patient reports feeling "empty" and hopeless for the past 3 months. Cries frequently.',
            'sleep_changes': 'Yes, difficulty falling asleep and staying asleep. Wakes up early and can\'t go back to sleep.',
            'appetite_changes': 'Yes, significant weight loss due to poor appetite. "Food doesn\'t taste good anymore".',
            'social_withdrawal': 'Yes, has stopped seeing friends and family. Prefers to stay in bed all day.',
            
            // Toxicology case questions
            'consciousness': 'Patient is drowsy and difficult to arouse. Responds to painful stimuli but not verbal commands.',
            'breathing': 'Respiratory rate is 8/min and shallow. Patient appears to be struggling to breathe.',
            'pupil_size': 'Pupils are pinpoint (2mm) and reactive to light. Both eyes affected equally.',
            'skin_color': 'Patient appears pale and slightly cyanotic around lips and fingertips.',
            'needle_marks': 'Yes, multiple track marks on both arms. Some appear fresh, others are older scars.',
            
            // Additional common symptoms
            'fever': 'Yes, temperature is 102°F (39°C). Patient appears flushed and reports chills.',
            'cough': 'Yes, productive cough with yellow-green sputum for the past 3 days.',
            'fatigue': 'Yes, patient reports extreme fatigue and weakness. "Can barely get out of bed".',
            'headache': 'Yes, severe headache for the past 2 hours. Describes as "worst headache of my life".',
            'dizziness': 'Yes, patient feels lightheaded and dizzy. Reports room spinning when moving.',
            'nausea_vomiting': 'Yes, patient has been vomiting for 6 hours. Can\'t keep anything down.',
            'diarrhea': 'Yes, watery diarrhea for the past 24 hours. 8-10 episodes per day.',
            'back_pain': 'Yes, severe lower back pain that radiates down left leg. Worse with movement.',
            'leg_pain': 'Yes, pain and swelling in right leg. Calf is tender to touch.',
            'confusion': 'Yes, patient appears confused and disoriented. Can\'t remember recent events.',
            'weakness': 'Yes, weakness on left side of body. Difficulty with fine motor tasks.',
            'vision_problems': 'Yes, blurred vision in right eye. Reports "spots" in vision.',
            'speech_problems': 'Yes, slurred speech and difficulty finding words. Speech is slow and unclear.',
            'balance_problems': 'Yes, difficulty maintaining balance. Patient reports feeling "unsteady on feet".'
        };
        
        return answers[questionId] || 'Patient responds appropriately to the question.';
    }

    renderMedicalTests() {
        const availableTests = this.gameState.currentCase.tests.filter(t => 
            !this.gameState.orderedTests.includes(t.id)
        );
        
        const orderedTests = this.gameState.orderedTests.map(testId => {
            const test = this.gameState.currentCase.tests.find(t => t.id === testId);
            return {
                id: testId,
                name: test.name,
                result: this.generateTestResult(test) // Use the same result generation logic
            };
        });

        let content = '';

        if (availableTests.length === 0 && orderedTests.length === 0) {
            content += '<p>All tests have been ordered and results received.</p>';
        } else {
            if (availableTests.length > 0) {
                content += `
                    <div class="available-tests">
                        <h4>Available Tests:</h4>
                        <div class="test-grid">
                            ${availableTests.map(t => `
                                <button class="action-btn secondary test-btn" data-test="${t.id}" onclick="game.orderTest('${t.id}')">
                                    ${t.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `;
            }

            if (orderedTests.length > 0) {
                content += `
                    <div class="ordered-tests">
                        <h4>Ordered Tests:</h4>
                        ${orderedTests.map(test => `
                            <div class="test-result-item">
                                <strong>${test.name}:</strong> ${test.result}
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }
        
        return `
            <div class="section">
                <h3><i class="fas fa-flask"></i> Medical Tests</h3>
                ${content}
            </div>
        `;
    }

    renderDiagnosisOptions() {
        // Shuffle the diagnosis options to ensure correct answer isn't always first
        const shuffledOptions = [...this.gameState.currentCase.diagnosisOptions].sort(() => Math.random() - 0.5);
        
        const diagnosisButtons = shuffledOptions.map(d => `
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

    renderSpecialistConsultations() {
        const availableSpecialists = Object.values(SPECIALISTS).filter(specialist => 
            !this.gameState.specialistConsultations.includes(specialist.id)
        );
        
        if (availableSpecialists.length === 0 || this.gameState.consultationSlotsRemaining <= 0) {
            return `
                <div class="section specialist-section">
                    <h3><i class="fas fa-user-md"></i> Specialist Consultations</h3>
                    <div class="no-consultations">
                        <p>${this.gameState.consultationSlotsRemaining <= 0 ? 'No consultation slots remaining' : 'All specialists consulted'}</p>
                    </div>
                </div>
            `;
        }
        
        const specialistButtons = availableSpecialists.map(specialist => `
            <button class="action-btn secondary specialist-btn" 
                    onclick="game.consultSpecialist('${specialist.id}')"
                    title="${specialist.description}">
                <i class="${specialist.icon}"></i>
                ${specialist.name}
            </button>
        `).join('');
        
        return `
            <div class="section specialist-section">
                <h3><i class="fas fa-user-md"></i> Specialist Consultations (${this.gameState.consultationSlotsRemaining} remaining)</h3>
                <div class="specialist-grid">
                    ${specialistButtons}
                </div>
                <div class="consultation-info">
                    <p><strong>Consultations Used:</strong> ${this.gameState.specialistConsultations.length}</p>
                    <p><strong>Slots Remaining:</strong> ${this.gameState.consultationSlotsRemaining}</p>
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
        
        // Only start timer if enabled in settings
        if (!this.settings.timerEnabled) {
            return;
        }
        
        this.timer = setInterval(() => {
            this.gameState.timeRemaining = Math.max(0, this.gameState.timeRemaining - 1);
            
            // Update patient stability based on time pressure
            this.updatePatientStability();
            
            // Update timer display
            const timerElement = document.querySelector('.status-bar .status-item:first-child span');
            if (timerElement) {
                timerElement.textContent = this.formatTime(this.gameState.timeRemaining / 60);
            }
            
            // Update patient state display
            this.updatePatientStateDisplay();
            
            // Check if time is up
            if (this.gameState.timeRemaining <= 0) {
                clearInterval(this.timer);
                this.endGame('Time is up!', false);
            }
        }, 1000);
    }

    updatePatientStability() {
        // Time pressure causes gradual deterioration
        this.gameState.patientStability -= DETERIORATION_FACTORS.TIME_PRESSURE;
        
        // Update patient state based on stability
        if (this.gameState.patientStability <= 20) {
            this.gameState.patientState = PATIENT_STATES.CRITICAL;
        } else if (this.gameState.patientStability <= 50) {
            this.gameState.patientState = PATIENT_STATES.DETERIORATING;
        } else if (this.gameState.patientStability >= 80) {
            this.gameState.patientState = PATIENT_STATES.IMPROVING;
        } else {
            this.gameState.patientState = PATIENT_STATES.STABLE;
        }
        
        // Clamp stability between 0 and 100
        this.gameState.patientStability = Math.max(0, Math.min(100, this.gameState.patientStability));
    }

    updatePatientStateDisplay() {
        const patientStateElement = document.querySelector('.status-bar .status-item:nth-child(2) span');
        if (patientStateElement) {
            const stateText = this.gameState.patientState.charAt(0).toUpperCase() + 
                            this.gameState.patientState.slice(1);
            patientStateElement.textContent = `${stateText} (${Math.round(this.gameState.patientStability)}%)`;
            
            // Update color based on state
            const statusItem = patientStateElement.closest('.status-item');
            statusItem.className = `status-item ${this.gameState.patientState}`;
        }
    }

    revealHistory() {
        if (this.gameState.gamePhase !== 'playing') return;
        
        this.gameState.historyRevealed = true;
        this.gameState.score += SCORING.HISTORY_REVEAL;
        this.playSound('success');
        this.render();
    }

    askQuestion(questionId) {
        if (this.gameState.questionsRemaining <= 0) {
            this.showError('No questions remaining');
            return;
        }
        
        if (this.gameState.askedQuestions.includes(questionId)) {
            return; // Already asked
        }
        
        this.gameState.askedQuestions.push(questionId);
        this.gameState.questionsRemaining--;
        this.gameState.score += SCORING.QUESTION_ASK;
        
        // Impact on patient stability
        const question = this.gameState.currentCase.questions.find(q => q.id === questionId);
        if (question) {
            if (question.critical) {
                this.gameState.patientStability += DETERIORATION_FACTORS.IMPROVEMENT;
                this.playSound('success');
            } else {
                this.gameState.patientStability -= DETERIORATION_FACTORS.INCORRECT_ACTIONS;
                this.gameState.incorrectActions++;
                this.playSound('warning');
            }
        }
        
        this.updatePatientStability();
        this.render();
        this.playSound('click');
    }

    orderTest(testId) {
        if (this.gameState.orderedTests.includes(testId)) {
            return; // Already ordered
        }
        
        this.gameState.orderedTests.push(testId);
        this.gameState.score += SCORING.TEST_ORDER;
        
        // Impact on patient stability
        const test = this.gameState.currentCase.tests.find(t => t.id === testId);
        if (test) {
            if (test.critical) {
                this.gameState.patientStability += DETERIORATION_FACTORS.IMPROVEMENT;
                this.playSound('success');
            } else {
                this.gameState.patientStability -= DETERIORATION_FACTORS.INCORRECT_ACTIONS;
                this.gameState.incorrectActions++;
                this.playSound('warning');
            }
        }
        
        this.updatePatientStability();
        this.render();
        this.playSound('click');
    }

    showTestResult(test) {
        // Generate realistic test results based on the test type
        const results = this.generateTestResult(test);
        
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'test-result-notification';
        
        const imageHtml = test.resultImage ? `
            <div class="test-result-image">
                <img src="${test.resultImage}" alt="${test.name} Result" />
            </div>
        ` : '';
        
        notification.innerHTML = `
            <div class="test-result-content">
                <h4><i class="fas fa-flask"></i> ${test.name} Results</h4>
                ${imageHtml}
                <p>${results}</p>
                <button class="action-btn secondary" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        // Add to the game container
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 5000);
        }
    }

    generateTestResult(test) {
        // Generate realistic test results based on test type and current case
        const caseId = this.gameState.currentCase.id;
        
        const testResults = {
            // Cardiac case results
            ecg: "Sinus rhythm with ST-segment elevation in leads II, III, aVF. Q waves present in inferior leads. Consistent with acute inferior wall myocardial infarction.",
            troponin: "Elevated troponin I: 15.2 ng/mL (normal <0.04). Confirms myocardial injury.",
            chest_xray: "Cardiomegaly with pulmonary congestion. No pneumothorax or other acute findings.",
            cardiac_enzymes: "Elevated CK-MB: 45 ng/mL, LDH: 280 U/L. Consistent with myocardial damage.",
            
            // Trauma case results
            ct_scan: "Large hemoperitoneum with active extravasation from liver laceration. Multiple rib fractures. No intracranial hemorrhage.",
            ultrasound: "Free fluid in all quadrants. Positive FAST exam for intra-abdominal bleeding.",
            xray: "Multiple rib fractures (3rd-8th ribs on right). No pneumothorax visible.",
            blood_work: "Hemoglobin: 8.2 g/dL (normal 13-17). Platelets: 85,000/μL. Elevated lactate: 4.2 mmol/L.",
            
            // Pediatric case results
            pulse_ox: "Oxygen saturation: 88% on room air. Improves to 94% with supplemental oxygen.",
            chest_xray_ped: "Hyperinflated lungs with flattened diaphragms. No infiltrates. Consistent with asthma exacerbation.",
            blood_gas: "pH: 7.32, PaCO2: 48 mmHg, PaO2: 65 mmHg. Respiratory acidosis with hypoxemia.",
            cbc: "White blood cells: 12,500/μL. Neutrophils: 8,200/μL. No significant anemia.",
            
            // Obstetric case results
            ultrasound_ob: "Single viable fetus, vertex presentation. Estimated gestational age: 38 weeks. Amniotic fluid index: 8.5 cm.",
            fetal_monitor: "Fetal heart rate: 140-150 bpm with good variability. Contractions every 3-4 minutes.",
            blood_pressure: "BP: 140/90 mmHg. Elevated from baseline of 120/80 mmHg.",
            urine_test: "Proteinuria: 2+ on dipstick. Glucose: negative. Ketones: trace.",
            
            // Psychiatric case results
            mental_status: "Patient alert and oriented x3. Mood: depressed. Affect: flat. No psychotic symptoms.",
            drug_screen: "Positive for benzodiazepines. Negative for other substances.",
            thyroid_test: "TSH: 0.8 mIU/L (normal 0.4-4.0). T4: 1.2 ng/dL (normal 0.8-1.8). Normal thyroid function.",
            cbc_psych: "Hemoglobin: 13.2 g/dL. White blood cells: 7,800/μL. No significant abnormalities.",
            
            // Toxicology case results
            drug_screen_tox: "Positive for opioids (morphine), benzodiazepines, and cocaine metabolites.",
            blood_alcohol: "Blood alcohol level: 0.08% (legal limit: 0.08%).",
            liver_function: "AST: 85 U/L, ALT: 92 U/L. Mildly elevated liver enzymes.",
            kidney_function: "Creatinine: 1.8 mg/dL (elevated). BUN: 25 mg/dL. Acute kidney injury.",
            
            // Default results for other tests
            default: "Test completed. Results within normal limits."
        };
        
        return testResults[test.id] || testResults.default;
    }

    updateMedicalTestsSection() {
        // Find the medical tests section by looking for the section with the test-grid class
        const sections = document.querySelectorAll('.section');
        let testsSection = null;
        
        for (const section of sections) {
            if (section.querySelector('.test-grid')) {
                testsSection = section;
                break;
            }
        }
        
        if (testsSection) {
            const newTestsHTML = this.renderMedicalTests();
            testsSection.outerHTML = newTestsHTML;
        } else {
            // If we can't find the section, do a full re-render as fallback
            console.warn('Medical tests section not found, doing full re-render');
            this.render();
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
                this.playSound('success');
                this.endGame('✅ Correct Diagnosis! Patient saved!', true);
            } else {
                this.gameState.score += SCORING.INCORRECT_DIAGNOSIS;
                this.playSound('error');
                this.endGame('❌ Incorrect Diagnosis!', false);
            }
            
        } catch (error) {
            console.error('Error making diagnosis:', error);
            this.playSound('error');
        }
    }

    endGame(message, won) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Clean up audio intervals
        if (this.modulationInterval) {
            clearInterval(this.modulationInterval);
            this.modulationInterval = null;
        }
        
        // Stop background music
        this.toggleBackgroundMusic(false);
        
        // Check achievements
        this.checkAchievements();
        
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
        
        // Show enhanced end game screen
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            const patientOutcome = this.getPatientOutcome();
            gameContainer.innerHTML = `
                <div class="end-game">
                    <h1>${message}</h1>
                    <div class="final-score">
                        <h2>Final Score: ${this.gameState.score}</h2>
                        <div class="patient-outcome ${patientOutcome.class}">
                            <i class="${patientOutcome.icon}"></i>
                            <span>${patientOutcome.text}</span>
                        </div>
                    </div>
                    <div class="performance-stats">
                        <div class="stat-item">
                            <span class="stat-label">Patient Stability</span>
                            <span class="stat-value">${Math.round(this.gameState.patientStability)}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Time Remaining</span>
                            <span class="stat-value">${this.formatTime(this.gameState.timeRemaining / 60)}</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Actions Taken</span>
                            <span class="stat-value">${this.gameState.askedQuestions.length + this.gameState.orderedTests.length}</span>
                        </div>
                    </div>
                    <div class="game-actions">
                        <button class="action-btn primary" onclick="game.showCaseSelection()">
                            <i class="fas fa-play"></i> Play Again
                        </button>
                        <button class="action-btn secondary" onclick="game.showAchievements()">
                            <i class="fas fa-trophy"></i> View Achievements
                        </button>
                    </div>
                </div>
            `;
        }
    }

    getPatientOutcome() {
        if (this.gameState.patientStability >= 80) {
            return {
                text: 'Patient Recovered',
                class: 'success',
                icon: 'fas fa-heart'
            };
        } else if (this.gameState.patientStability >= 50) {
            return {
                text: 'Patient Stable',
                class: 'warning',
                icon: 'fas fa-user-check'
            };
        } else {
            return {
                text: 'Patient Critical',
                class: 'danger',
                icon: 'fas fa-exclamation-triangle'
            };
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
            // Sanitize message to prevent XSS
            const sanitizedMessage = this.sanitizeHtml(message);
            gameContainer.innerHTML = `
                <div class="error-screen">
                    <h1>Error</h1>
                    <p>${sanitizedMessage}</p>
                    <button class="action-btn primary" onclick="location.reload()">
                        <i class="fas fa-refresh"></i> Refresh Page
                    </button>
                </div>
            `;
        }
    }

    sanitizeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showGlossary() {
        this.playSound('click');
        const glossaryContent = `
            <div class="modal-overlay" onclick="game.hideGlossary()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2><i class="fas fa-book-medical"></i> Medical Glossary</h2>
                        <button class="close-btn" onclick="game.hideGlossary()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="glossary-section">
                            <h3>Common Medical Terms</h3>
                            <div class="glossary-item">
                                <strong>ECG/EKG:</strong> Electrocardiogram - records electrical activity of the heart
                            </div>
                            <div class="glossary-item">
                                <strong>CT Scan:</strong> Computed Tomography - detailed cross-sectional images
                            </div>
                            <div class="glossary-item">
                                <strong>MRI:</strong> Magnetic Resonance Imaging - detailed soft tissue images
                            </div>
                            <div class="glossary-item">
                                <strong>X-Ray:</strong> Radiographic imaging using electromagnetic radiation
                            </div>
                            <div class="glossary-item">
                                <strong>Blood Panel:</strong> Comprehensive blood chemistry analysis
                            </div>
                        </div>
                        <div class="glossary-section">
                            <h3>Emergency Medicine</h3>
                            <div class="glossary-item">
                                <strong>STEMI:</strong> ST-Elevation Myocardial Infarction - heart attack
                            </div>
                            <div class="glossary-item">
                                <strong>Sepsis:</strong> Life-threatening response to infection
                            </div>
                            <div class="glossary-item">
                                <strong>Shock:</strong> Inadequate blood flow to vital organs
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', glossaryContent);
    }

    hideGlossary() {
        this.playSound('click');
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    showSettings() {
        this.playSound('click');
        const settingsContent = `
            <div class="modal-overlay" onclick="game.hideSettings()">
                <div class="modal-content" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2><i class="fas fa-cog"></i> Settings</h2>
                        <button class="close-btn" onclick="game.hideSettings()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="settings-section">
                            <h3>Game Settings</h3>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="sound-toggle" ${this.settings.soundEnabled ? 'checked' : ''} onchange="game.toggleSound(this.checked)">
                                    Enable Sound Effects
                                </label>
                            </div>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="background-music-toggle" ${this.settings.backgroundMusicEnabled ? 'checked' : ''} onchange="game.toggleBackgroundMusicSetting(this.checked)">
                                    Enable Background Music
                                </label>
                            </div>
                            <div class="setting-item">
                                <label>
                                    <input type="checkbox" id="timer-toggle" ${this.settings.timerEnabled ? 'checked' : ''} onchange="game.toggleTimer(this.checked)">
                                    Enable Timer
                                </label>
                            </div>
                        </div>
                        <div class="settings-section">
                            <h3>Statistics</h3>
                            <div class="stat-display">
                                <p><strong>Games Played:</strong> ${this.stats.gamesPlayed}</p>
                                <p><strong>Games Won:</strong> ${this.stats.gamesWon}</p>
                                <p><strong>Average Score:</strong> ${this.stats.averageScore}</p>
                                <p><strong>Best Score:</strong> ${Math.max(...Object.values(this.stats.bestScores), 0)}</p>
                            </div>
                        </div>
                        <div class="settings-actions">
                            <button class="action-btn secondary" onclick="game.resetStats()">
                                <i class="fas fa-trash"></i> Reset Statistics
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', settingsContent);
    }

    toggleSound(enabled) {
        this.settings.soundEnabled = enabled;
        this.playSound('click');
        localStorage.setItem('gameSettings', JSON.stringify(this.settings));
    }

    toggleBackgroundMusicSetting(enabled) {
        this.settings.backgroundMusicEnabled = enabled;
        this.toggleBackgroundMusic(enabled);
        this.playSound('click');
        localStorage.setItem('gameSettings', JSON.stringify(this.settings));
    }

    toggleTimer(enabled) {
        this.settings.timerEnabled = enabled;
        this.playSound('click');
        localStorage.setItem('gameSettings', JSON.stringify(this.settings));
    }

    hideSettings() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    resetStats() {
        if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
            this.stats = {
                gamesPlayed: 0,
                gamesWon: 0,
                totalScore: 0,
                averageScore: 0,
                casesCompleted: {},
                bestScores: {},
                totalPlayTime: 0,
                averagePlayTime: 0,
                perfectDiagnoses: 0,
                criticalCases: 0,
                achievementsUnlocked: 0,
                averagePatientStability: 0,
                totalPatientStability: 0
            };
            this.saveStats();
            this.hideSettings();
            this.showSettings(); // Refresh the settings modal
        }
    }

    showAchievements() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content achievement-modal">
                <div class="modal-header">
                    <h2><i class="fas fa-trophy"></i> Achievements</h2>
                    <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="achievement-stats">
                        <div class="stat">
                            <span class="stat-number">${this.achievements.length}</span>
                            <span class="stat-label">Unlocked</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${this.getTotalAchievements()}</span>
                            <span class="stat-label">Total</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${Math.round((this.achievements.length / this.getTotalAchievements()) * 100)}%</span>
                            <span class="stat-label">Progress</span>
                        </div>
                    </div>
                    <div class="achievements-list">
                        ${this.renderAchievementsList()}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.playSound('click');
    }

    renderAchievementsList() {
        const allAchievements = this.getAllAchievements();
        return allAchievements.map(achievement => {
            const isUnlocked = this.achievements.find(a => a.id === achievement.id);
            return `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">
                        <i class="${achievement.icon}"></i>
                    </div>
                    <div class="achievement-info">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                        ${isUnlocked ? `<span class="unlock-date">Unlocked ${this.formatDate(isUnlocked.timestamp)}</span>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    getAllAchievements() {
        return [
            {
                id: 'speed_demon',
                title: 'Speed Demon',
                description: 'Complete a case with high efficiency',
                icon: 'fas fa-bolt'
            },
            {
                id: 'perfect_diagnosis',
                title: 'Perfect Diagnosis',
                description: 'Achieve perfect score with stable patient',
                icon: 'fas fa-star'
            },
            {
                id: 'critical_care',
                title: 'Critical Care Specialist',
                description: 'Successfully manage critical patient',
                icon: 'fas fa-heartbeat'
            },
            {
                id: 'first_case',
                title: 'First Steps',
                description: 'Complete your first case',
                icon: 'fas fa-user-md'
            },
            {
                id: 'veteran',
                title: 'Veteran Physician',
                description: 'Complete 10 cases',
                icon: 'fas fa-award'
            }
        ];
    }

    getTotalAchievements() {
        return this.getAllAchievements().length;
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    }

    consultSpecialist(specialistId) {
        if (this.gameState.consultationSlotsRemaining <= 0) {
            this.showError('No consultation slots remaining');
            return;
        }
        
        if (this.gameState.specialistConsultations.includes(specialistId)) {
            this.showError('Already consulted this specialist');
            return;
        }
        
        const specialist = SPECIALISTS[specialistId.toUpperCase()];
        if (!specialist) {
            this.showError('Specialist not found');
            return;
        }
        
        // Check if consultation is appropriate based on case type and test results
        const isAppropriate = this.isConsultationAppropriate(specialist, this.gameState.currentCase);
        
        this.gameState.specialistConsultations.push(specialistId);
        this.gameState.consultationSlotsRemaining--;
        this.gameState.score += SCORING.SPECIALIST_CONSULT;
        
        if (isAppropriate) {
            this.gameState.score += SCORING.APPROPRIATE_REFERRAL;
            this.gameState.patientStability += DETERIORATION_FACTORS.IMPROVEMENT;
            this.playSound('success');
        } else {
            this.gameState.score += SCORING.INAPPROPRIATE_REFERRAL;
            this.gameState.patientStability -= DETERIORATION_FACTORS.INCORRECT_ACTIONS;
            this.gameState.incorrectActions++;
            this.playSound('warning');
        }
        
        this.updatePatientStability();
        this.render();
        this.playSound('click');
        
        // Show specialist opinion
        this.showSpecialistOpinion(specialist, isAppropriate);
    }

    isConsultationAppropriate(specialist, caseData) {
        // Check if specialist's expertise matches the case type
        const caseType = caseData.category || 'general';
        const hasRelevantTests = this.hasRelevantTestResults(specialist.expertise);
        
        return specialist.expertise.includes(caseType) || hasRelevantTests;
    }

    hasRelevantTestResults(specialistExpertise) {
        // Check if any ordered tests are relevant to this specialist
        const relevantTests = this.gameState.orderedTests.filter(testId => {
            const test = this.gameState.currentCase.tests.find(t => t.id === testId);
            return test && test.category && specialistExpertise.includes(test.category);
        });
        
        return relevantTests.length > 0;
    }

    showSpecialistOpinion(specialist, isAppropriate) {
        const opinion = this.generateSpecialistOpinion(specialist, isAppropriate);
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content specialist-opinion">
                <div class="modal-header">
                    <h2><i class="${specialist.icon}"></i> ${specialist.name} Consultation</h2>
                    <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="specialist-info">
                        <p><strong>Specialist:</strong> ${specialist.name}</p>
                        <p><strong>Expertise:</strong> ${specialist.description}</p>
                        <p><strong>Consultation Appropriate:</strong> 
                            <span class="${isAppropriate ? 'success' : 'danger'}">
                                ${isAppropriate ? 'Yes' : 'No'}
                            </span>
                        </p>
                    </div>
                    <div class="specialist-opinion">
                        <h3>Specialist Opinion:</h3>
                        <p>${opinion}</p>
                    </div>
                    <div class="consultation-remaining">
                        <p><strong>Consultations Remaining:</strong> ${this.gameState.consultationSlotsRemaining}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    generateSpecialistOpinion(specialist, isAppropriate) {
        const caseData = this.gameState.currentCase;
        const testResults = this.getTestResults();
        
        if (!isAppropriate) {
            return `"I don't see any findings that require my expertise. This appears to be outside my area of specialization. Consider consulting a more appropriate specialist."`;
        }
        
        // Generate appropriate opinions based on specialist and case
        switch (specialist.id) {
            case 'cardiologist':
                if (caseData.category === 'cardiac') {
                    return `"Based on the clinical presentation and test results, this appears to be a ${caseData.correctDiagnosis}. I recommend immediate intervention and monitoring."`;
                } else {
                    return `"The cardiac workup shows no acute cardiac pathology. Consider other differential diagnoses."`;
                }
                
            case 'pulmonologist':
                if (caseData.category === 'respiratory') {
                    return `"The respiratory findings are consistent with ${caseData.correctDiagnosis}. Pulmonary function tests support this diagnosis."`;
                } else {
                    return `"No significant pulmonary pathology detected. Consider other organ systems."`;
                }
                
            case 'neurologist':
                if (caseData.category === 'neurological') {
                    return `"The neurological examination and imaging findings are concerning for ${caseData.correctDiagnosis}. Immediate intervention is warranted."`;
                } else {
                    return `"No acute neurological findings. The symptoms may be secondary to other conditions."`;
                }
                
            case 'orthopedist':
                if (caseData.category === 'trauma') {
                    return `"The imaging reveals ${caseData.correctDiagnosis}. Surgical intervention may be required."`;
                } else {
                    return `"No significant orthopedic findings. Consider medical causes for the symptoms."`;
                }
                
            case 'pediatrician':
                if (caseData.category === 'pediatric') {
                    return `"In pediatric patients, this presentation is most consistent with ${caseData.correctDiagnosis}. Age-appropriate management is crucial."`;
                } else {
                    return `"This case involves an adult patient. Consider consulting an adult medicine specialist."`;
                }
                
            case 'surgeon':
                if (caseData.category === 'surgical') {
                    return `"This requires immediate surgical intervention. The findings are consistent with ${caseData.correctDiagnosis}."`;
                } else {
                    return `"No surgical intervention required at this time. Continue with medical management."`;
                }
                
            default:
                return `"Based on my review, I recommend further evaluation and monitoring."`;
        }
    }

    getTestResults() {
        return this.gameState.orderedTests.map(testId => {
            const test = this.gameState.currentCase.tests.find(t => t.id === testId);
            return test ? test.result : null;
        }).filter(result => result);
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