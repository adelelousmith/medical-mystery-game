// Medical Mystery Game - A&E Simulator for Healthcare Training
// Enhanced with Steam integration, achievements, and professional features

// Constants
const SCORING = {
    HISTORY_REVEAL: 50,
    QUESTION_ASK: 25,
    TEST_ORDER: 30,
    CORRECT_DIAGNOSIS: 200,
    INCORRECT_DIAGNOSIS: -100,
    SPECIALIST_CONSULT: 40,
    APPROPRIATE_REFERRAL: 50,
    INAPPROPRIATE_REFERRAL: -30,
    PERFECT_SCORE_BONUS: 100,
    TIME_BONUS: 50,
    CRITICAL_SAVE: 75
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

// Steam Achievement System
const STEAM_ACHIEVEMENTS = {
    FIRST_CASE: {
        id: 'first_case_completed',
        title: 'First Steps',
        description: 'Complete your first medical case',
        steamId: 'FIRST_CASE_COMPLETED',
        icon: 'fas fa-stethoscope'
    },
    PERFECT_DIAGNOSIS: {
        id: 'perfect_diagnosis',
        title: 'Perfect Diagnosis',
        description: 'Achieve a perfect score with stable patient',
        steamId: 'PERFECT_DIAGNOSIS',
        icon: 'fas fa-star'
    },
    SPEED_RUNNER: {
        id: 'speed_runner',
        title: 'Speed Runner',
        description: 'Complete a case in under 2 minutes',
        steamId: 'SPEED_RUNNER',
        icon: 'fas fa-bolt'
    },
    CRITICAL_CARE: {
        id: 'critical_care_specialist',
        title: 'Critical Care Specialist',
        description: 'Successfully manage 5 critical patients',
        steamId: 'CRITICAL_CARE_SPECIALIST',
        icon: 'fas fa-heartbeat'
    },
    MASTER_DIAGNOSTICIAN: {
        id: 'master_diagnostician',
        title: 'Master Diagnostician',
        description: 'Complete all cases with perfect scores',
        steamId: 'MASTER_DIAGNOSTICIAN',
        icon: 'fas fa-trophy'
    },
    EMERGENCY_EXPERT: {
        id: 'emergency_expert',
        title: 'Emergency Expert',
        description: 'Complete 10 emergency cases',
        steamId: 'EMERGENCY_EXPERT',
        icon: 'fas fa-ambulance'
    }
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
        expertise: ['respiratory', 'shortness_of_breath', 'asthma', 'paediatric'],
        consultationLimit: 2,
        description: 'Lung and respiratory system specialist (including paediatric cases)'
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
        id: 'paediatrician',
        name: 'Paediatrician',
        icon: 'fas fa-baby',
        expertise: ['paediatric', 'child_emergency'],
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
            questionsRemaining: 5, // Limited questions
            
            // NEW: Three-phase investigative structure
            investigationPhase: 'examine', // examine → diagnose → treat
            phaseProgress: {
                examine: { completed: false, confidence: 0, actions: [] },
                diagnose: { completed: false, confidence: 0, selectedDiagnosis: null },
                treat: { completed: false, interventions: [], outcome: null }
            },
            
            // NEW: Enhanced patient tracking
            patientCondition: {
                consciousness: 'alert', // alert, drowsy, unconscious
                breathing: 'normal', // normal, laboured, critical
                circulation: 'stable', // stable, compromised, critical
                temperature: 'normal', // normal, fever, hypothermia
                pain: 'moderate', // none, mild, moderate, severe
                mobility: 'normal' // normal, limited, immobile
            },
            
            // NEW: Time-based deterioration tracking
            deteriorationFactors: {
                timeWithoutTreatment: 0,
                missedCriticalActions: 0,
                inappropriateActions: 0,
                delayedDiagnosis: false
            },
            
            // NEW: Clinical reasoning tracking
            clinicalReasoning: {
                hypotheses: [], // Working diagnoses being considered
                supportingEvidence: [], // Evidence supporting current thinking
                contradictoryEvidence: [], // Evidence against current thinking
                confidenceLevel: 0 // Overall diagnostic confidence
            }
        };
        
        this.timer = null;
        this.stats = this.loadStats();
        this.achievements = this.loadAchievements();
        this.settings = this.loadSettings();
        
        // Initialize phase manager
        this.phaseManager = null;
        
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

    // Enhanced Steam Achievement System
    checkAchievements() {
        const newAchievements = [];
        const caseCompletionTime = this.gameState.currentCase.timeLimit * 60 - this.gameState.timeRemaining;
        
        // First case completion
        if (this.stats.gamesPlayed === 1) {
            newAchievements.push({
                ...STEAM_ACHIEVEMENTS.FIRST_CASE,
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Perfect diagnosis with high score and stable patient
        if (this.gameState.score >= 400 && this.gameState.patientStability >= 80) {
            newAchievements.push({
                ...STEAM_ACHIEVEMENTS.PERFECT_DIAGNOSIS,
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Speed runner - complete case in under 2 minutes
        if (caseCompletionTime < 120 && this.gameState.score >= 200) {
            newAchievements.push({
                ...STEAM_ACHIEVEMENTS.SPEED_RUNNER,
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Critical care specialist - manage critical patient successfully
        if (this.gameState.patientStability <= 30 && this.gameState.score >= 200) {
            newAchievements.push({
                ...STEAM_ACHIEVEMENTS.CRITICAL_CARE,
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Emergency expert - complete multiple emergency cases
        const emergencyCases = this.stats.casesCompleted.emergency || 0;
        if (emergencyCases >= 10) {
            newAchievements.push({
                ...STEAM_ACHIEVEMENTS.EMERGENCY_EXPERT,
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Master diagnostician - perfect scores on all cases
        const totalCases = Object.keys(this.stats.casesCompleted).length;
        const perfectCases = Object.values(this.stats.bestScores).filter(score => score >= 400).length;
        if (totalCases >= 5 && perfectCases === totalCases) {
            newAchievements.push({
                ...STEAM_ACHIEVEMENTS.MASTER_DIAGNOSTICIAN,
                unlocked: true,
                timestamp: Date.now()
            });
        }
        
        // Add new achievements and trigger Steam integration
        newAchievements.forEach(achievement => {
            if (!this.achievements.find(a => a.id === achievement.id)) {
                this.achievements.push(achievement);
                this.showAchievementNotification(achievement);
                this.triggerSteamAchievement(achievement);
            }
        });
        
        this.saveAchievements();
    }
    
    triggerSteamAchievement(achievement) {
        // Steam API integration
        if (typeof Steam !== 'undefined' && Steam.setAchievement) {
            try {
                Steam.setAchievement(achievement.steamId);
                console.log(`Steam achievement unlocked: ${achievement.steamId}`);
            } catch (error) {
                console.warn('Steam achievement error:', error);
            }
        }
        
        // Show Steam-style notification
        this.showSteamAchievementNotification(achievement);
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
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    showSteamAchievementNotification(achievement) {
        const steamNotification = document.getElementById('steam-achievement');
        const descriptionElement = document.getElementById('achievement-description');
        
        if (steamNotification && descriptionElement) {
            descriptionElement.textContent = `${achievement.title}: ${achievement.description}`;
            steamNotification.classList.remove('hidden');
            
            // Auto-hide after 4 seconds
            setTimeout(() => {
                steamNotification.classList.add('hidden');
            }, 4000);
        }
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
        // Reset game state when returning to case selection
        this.gameState.gamePhase = GAME_PHASES.CASE_SELECTION;
        this.gameState.currentCase = null;
        this.gameState.timeRemaining = 0;
        this.gameState.score = 0;
        this.gameState.askedQuestions = [];
        this.gameState.orderedTests = [];
        this.gameState.historyRevealed = false;
        this.gameState.finalDiagnosis = null;
        this.gameState.patientState = PATIENT_STATES.STABLE;
        this.gameState.patientStability = 100;
        this.gameState.criticalActionsMissed = 0;
        this.gameState.incorrectActions = 0;
        this.gameState.specialistConsultations = [];
        this.gameState.consultationSlotsRemaining = 3;
        this.gameState.questionsRemaining = 5;
        
        // Stop any running timers
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Stop background music
        this.toggleBackgroundMusic(false);
        
        try {
            const cases = getAllCases();
            if (!cases || cases.length === 0) {
                throw new Error('No cases available');
            }
            
            const gameContainer = document.getElementById('game-container');
            if (!gameContainer) {
                throw new Error('Game container not found');
            }
            
            const caseCards = cases.map(case_ => {
                // Create a brief summary from the full description
                const briefDescription = case_.description ? 
                    case_.description.split('.')[0] + '.' : 
                    'Emergency medical case requiring immediate attention.';
                
                return `
                <div class="case-card ${case_.difficulty}" onclick="game.startCase('${case_.id}')">
                    <div class="case-icon">
                        <i class="${case_.icon}"></i>
                    </div>
                    <div class="case-content">
                        <h3>${case_.title}</h3>
                        <p class="case-brief">${briefDescription}</p>
                        <div class="case-meta">
                            <span class="difficulty ${case_.difficulty}">${case_.difficulty.toUpperCase()}</span>
                            <span class="specialty">${case_.specialty}</span>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
            
            gameContainer.innerHTML = `
                <div class="case-selection">
                    <div class="header">
                        <div class="header-content">
                            <h1>Medical Mystery</h1>
                            <p>A&E Department Simulator</p>
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
            
            // Reset game state completely for new case
            this.gameState.currentCase = case_;
            this.gameState.timeRemaining = case_.timeLimit * 60; // Convert to seconds
            this.gameState.score = 0;
            this.gameState.askedQuestions = [];
            this.gameState.orderedTests = [];
            this.gameState.historyRevealed = false;
            this.gameState.gamePhase = GAME_PHASES.PLAYING;
            this.gameState.finalDiagnosis = null;
            this.gameState.patientState = PATIENT_STATES.STABLE;
            this.gameState.patientStability = 100;
            this.gameState.criticalActionsMissed = 0;
            this.gameState.incorrectActions = 0;
            this.gameState.specialistConsultations = [];
            this.gameState.consultationSlotsRemaining = 3; // Reset consultation slots
            this.gameState.questionsRemaining = 5; // Reset question limit
            
            // Reset investigation phase
            this.gameState.investigationPhase = 'examine';
            this.gameState.phaseProgress = {
                examine: { completed: false, confidence: 0, actions: [] },
                diagnose: { completed: false, confidence: 0, selectedDiagnosis: null },
                treat: { completed: false, interventions: [], outcome: null }
            };
            
            // Reset patient condition
            this.gameState.patientCondition = {
                consciousness: 'alert',
                breathing: 'normal', 
                circulation: 'stable',
                temperature: 'normal',
                pain: 'moderate',
                mobility: 'normal'
            };
            
            // Initialize phase manager
            if (typeof InvestigationPhaseManager !== 'undefined') {
                this.phaseManager = new InvestigationPhaseManager(this);
            }
            
            // Reset case start time for performance tracking
            this.caseStartTime = Date.now();
            
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
                    <p>A&E Department Simulator</p>
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
                
                ${this.shouldShowPhases() ? this.renderInvestigationPhases() : ''}
                
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
                    <div class="status-item ${this.gameState.questionsRemaining <= 1 ? 'limited' : ''}">
                        <i class="fas fa-question-circle"></i>
                        <span>Q: ${this.gameState.questionsRemaining}</span>
                    </div>
                    <div class="status-item ${this.gameState.consultationSlotsRemaining <= 1 ? 'limited' : ''}">
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
                ${this.renderPatientCondition()}
                ${this.renderPhaseContent()}
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

    renderInvestigationPhases() {
        const currentPhase = this.gameState.investigationPhase;
        const phases = ['examine', 'diagnose', 'treat'];
        
        const phaseIcons = {
            examine: 'fas fa-search',
            diagnose: 'fas fa-stethoscope', 
            treat: 'fas fa-pills'
        };
        
        const phaseNames = {
            examine: 'Examine',
            diagnose: 'Diagnose',
            treat: 'Treat'
        };

        return `
            <div class="investigation-phases">
                ${phases.map((phase, index) => {
                    const isActive = phase === currentPhase;
                    const isCompleted = this.gameState.phaseProgress[phase].completed;
                    const confidence = this.phaseManager ? 
                        this.phaseManager.calculatePhaseConfidence(phase) : 0;
                    
                    let phaseClass = 'phase-item';
                    if (isActive) phaseClass += ' active';
                    if (isCompleted) phaseClass += ' completed';
                    
                    return `
                        <div class="${phaseClass}">
                            <div class="phase-icon">
                                <i class="${phaseIcons[phase]}"></i>
                            </div>
                            <div class="phase-info">
                                <h3>${phaseNames[phase]}</h3>
                                <div class="phase-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${confidence}%"></div>
                                    </div>
                                    <span class="progress-text">${confidence}%</span>
                                </div>
                            </div>
                            ${index < phases.length - 1 ? '<div class="phase-arrow"><i class="fas fa-chevron-right"></i></div>' : ''}
                        </div>
                    `;
                }).join('')}
                
                ${this.renderPhaseAdvanceButton()}
            </div>
        `;
    }

    renderPhaseAdvanceButton() {
        if (!this.phaseManager || !this.phaseManager.canAdvancePhase()) {
            return '';
        }

        const nextPhaseNames = {
            examine: 'Begin Diagnosis',
            diagnose: 'Start Treatment'
        };

        const currentPhase = this.gameState.investigationPhase;
        const buttonText = nextPhaseNames[currentPhase] || 'Continue';

        return `
            <button class="action-btn primary phase-advance-btn" onclick="game.advancePhase()">
                <i class="fas fa-arrow-right"></i> ${buttonText}
            </button>
        `;
    }

    renderPatientCondition() {
        const condition = this.gameState.patientCondition;
        const stability = this.gameState.patientStability;
        
        const conditionIcons = {
            consciousness: 'fas fa-eye',
            breathing: 'fas fa-lungs',
            circulation: 'fas fa-heartbeat',
            temperature: 'fas fa-thermometer-half',
            pain: 'fas fa-exclamation-circle',
            mobility: 'fas fa-walking'
        };

        const conditionLabels = {
            consciousness: 'Consciousness',
            breathing: 'Breathing',
            circulation: 'Circulation', 
            temperature: 'Temperature',
            pain: 'Pain Level',
            mobility: 'Mobility'
        };

        return `
            <div class="section patient-condition">
                <h3><i class="fas fa-user-injured"></i> Patient Condition</h3>
                <div class="condition-grid">
                    ${Object.entries(condition).map(([key, value]) => `
                        <div class="condition-item ${value}">
                            <i class="${conditionIcons[key]}"></i>
                            <div class="condition-info">
                                <span class="condition-label">${conditionLabels[key]}</span>
                                <span class="condition-value">${value.charAt(0).toUpperCase() + value.slice(1)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="stability-meter">
                    <div class="stability-label">Overall Stability: ${Math.round(stability)}%</div>
                    <div class="stability-bar">
                        <div class="stability-fill ${this.getStabilityClass(stability)}" 
                             style="width: ${stability}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPhaseContent() {
        const currentPhase = this.gameState.investigationPhase;
        
        switch (currentPhase) {
            case 'examine':
                return this.renderExaminePhase();
            case 'diagnose':
                return this.renderDiagnosePhase();
            case 'treat':
                return this.renderTreatPhase();
            default:
                return '';
        }
    }

    renderExaminePhase() {
        return `
            ${this.renderHistorySection()}
            ${this.renderPatientInterview()}
            ${this.renderMedicalTests()}
            ${this.renderSpecialistConsultations()}
            ${this.renderDiagnosisReadyButton()}
        `;
    }

    renderDiagnosePhase() {
        return `
            ${this.renderCollapsibleHistory()}
            ${this.renderCollapsibleFindings()}
            ${this.renderDiagnosisOptions()}
        `;
    }

    renderTreatPhase() {
        const selectedDiagnosis = this.gameState.phaseProgress.diagnose.selectedDiagnosis;
        
        return `
            <div class="section treatment-planning">
                <h3><i class="fas fa-pills"></i> Treatment Planning</h3>
                <div class="diagnosis-confirmation">
                    <p><strong>Working Diagnosis:</strong> ${selectedDiagnosis || 'None selected'}</p>
                </div>
                ${this.renderTreatmentOptions()}
                ${this.renderMonitoringPlan()}
            </div>
        `;
    }

    renderClinicalSummary() {
        const askedQuestions = this.gameState.askedQuestions;
        const orderedTests = this.gameState.orderedTests;
        
        return `
            <div class="clinical-summary">
                <h4>Your Clinical Findings</h4>
                <div class="findings-grid">
                    <div class="findings-section">
                        <h5>History & Examination</h5>
                        ${askedQuestions.length > 0 ? `
                            <div class="findings-list">
                                ${askedQuestions.map(qId => {
                                    const question = this.gameState.currentCase.questions.find(q => q.id === qId);
                                    const answer = this.getQuestionAnswer(qId);
                                    return question ? `
                                        <div class="finding-item">
                                            <strong>Q:</strong> ${question.text}<br>
                                            <strong>A:</strong> ${answer}
                                        </div>
                                    ` : '';
                                }).join('')}
                            </div>
                        ` : '<p>No questions asked yet.</p>'}
                    </div>
                    <div class="findings-section">
                        <h5>Test Results</h5>
                        ${orderedTests.length > 0 ? `
                            <div class="findings-list">
                                ${orderedTests.map(tId => {
                                    const test = this.gameState.currentCase.tests.find(t => t.id === tId);
                                    const result = this.generateTestResult(test);
                                    return test ? `
                                        <div class="finding-item">
                                            <strong>${test.name}:</strong><br>
                                            ${result}
                                        </div>
                                    ` : '';
                                }).join('')}
                            </div>
                        ` : '<p>No tests ordered yet.</p>'}
                    </div>
                </div>
            </div>
        `;
    }

    renderDifferentialDiagnosis() {
        // Removed to reduce confusion - let players make their own differential
        return '';
    }

    renderTreatmentOptions() {
        // This would be populated based on the selected diagnosis
        return `
            <div class="treatment-options">
                <h4>Treatment Options</h4>
                <p>Treatment planning will be implemented based on diagnosis selection.</p>
            </div>
        `;
    }

    renderMonitoringPlan() {
        return `
            <div class="monitoring-plan">
                <h4>Monitoring Plan</h4>
                <p>Patient monitoring protocols will be displayed here.</p>
            </div>
        `;
    }

    getStabilityClass(stability) {
        if (stability >= 80) return 'stable';
        if (stability >= 60) return 'concerning';
        if (stability >= 40) return 'unstable';
        return 'critical';
    }

    advancePhase() {
        if (this.phaseManager) {
            this.phaseManager.advancePhase();
        }
    }

    showProgressMessage(phase) {
        const currentCase = this.gameState.currentCase;
        if (!currentCase.progressMessages || !currentCase.progressMessages[phase]) return;
        
        const messages = currentCase.progressMessages[phase];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const notification = document.createElement('div');
        notification.className = 'progress-message-notification';
        notification.innerHTML = `
            <div class="progress-message-content">
                <i class="fas fa-comment-medical"></i>
                <p>${randomMessage}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
        
        this.playSound('ambient');
    }

    shouldShowPhases() {
        // Only show phases in examine phase, hide during diagnosis to reduce clutter
        return this.gameState.investigationPhase === 'examine';
    }

    renderDiagnosisReadyButton() {
        if (this.gameState.investigationPhase !== 'examine') return '';
        
        const totalActions = this.gameState.askedQuestions.length + this.gameState.orderedTests.length;
        const hasMinActions = totalActions >= 3;
        const hasCriticalFindings = this.phaseManager ? this.phaseManager.hasCriticalFindings() : false;
        
        if (hasMinActions || hasCriticalFindings) {
            return `
                <div class="section diagnosis-ready">
                    <div class="ready-content">
                        <h3><i class="fas fa-stethoscope"></i> Ready to Make Diagnosis?</h3>
                        <p>You've gathered clinical information. Review your findings and select your diagnosis.</p>
                        <button class="action-btn primary" onclick="game.proceedToDiagnosis()">
                            <i class="fas fa-arrow-right"></i> Proceed to Diagnosis
                        </button>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="section diagnosis-ready disabled">
                <div class="ready-content">
                    <h3><i class="fas fa-search"></i> Continue Investigation</h3>
                    <p>Ask more questions or order tests before making your diagnosis.</p>
                    <p><small>Actions taken: ${totalActions}/3 minimum</small></p>
                </div>
            </div>
        `;
    }

    proceedToDiagnosis() {
        this.gameState.investigationPhase = 'diagnose';
        this.render();
        
        // Scroll to diagnosis section instead of top of page
        setTimeout(() => {
            const diagnosisSection = document.querySelector('.diagnosis-selection');
            if (diagnosisSection) {
                diagnosisSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 100); // Small delay to ensure render is complete
    }

    renderCollapsibleHistory() {
        if (!this.gameState.historyRevealed) return '';
        
        const history = this.gameState.currentCase.patientHistory;
        return `
            <div class="section collapsible-section">
                <div class="collapsible-header" onclick="game.toggleSection('history')">
                    <h3><i class="fas fa-file-medical"></i> Patient Background</h3>
                    <i class="fas fa-chevron-down toggle-icon" id="history-toggle"></i>
                </div>
                <div class="collapsible-content" id="history-content" style="display: none;">
                    <div class="patient-narrative">
                        ${this.renderPatientStory(history)}
                    </div>
                </div>
            </div>
        `;
    }

    renderPatientStory(history) {
        // Create a narrative story from the medical history
        let story = '';
        
        // Patient introduction
        if (history.demographics) {
            story += `<div class="story-section patient-intro">
                <h4>About the Patient</h4>
                <p>${this.createPatientIntro(history)}</p>
            </div>`;
        }
        
        // Medical background
        if (history.pastMedicalHistory && history.pastMedicalHistory.length > 0) {
            story += `<div class="story-section medical-background">
                <h4>Medical Background</h4>
                <p>${this.createMedicalNarrative(history.pastMedicalHistory)}</p>
            </div>`;
        }
        
        // Lifestyle and social context
        if (history.socialHistory && history.socialHistory.length > 0) {
            story += `<div class="story-section lifestyle">
                <h4>Lifestyle & Background</h4>
                <p>${this.createLifestyleNarrative(history.socialHistory)}</p>
            </div>`;
        }
        
        // Family medical history
        if (history.familyHistory && history.familyHistory.length > 0) {
            story += `<div class="story-section family-history">
                <h4>Family Medical History</h4>
                <p>${this.createFamilyNarrative(history.familyHistory)}</p>
            </div>`;
        }
        
        // Current medications
        if (history.medications && history.medications.length > 0) {
            story += `<div class="story-section medications">
                <h4>Current Treatment</h4>
                <p>${this.createMedicationNarrative(history.medications)}</p>
            </div>`;
        }
        
        // Allergies
        if (history.allergies) {
            story += `<div class="story-section allergies">
                <h4>Important Notes</h4>
                <p>${this.createAllergyNarrative(history.allergies)}</p>
            </div>`;
        }
        
        // Emotional context
        if (history.emotionalContext) {
            story += `<div class="story-section emotional-context">
                <h4>Current Situation</h4>
                <p>${history.emotionalContext}</p>
            </div>`;
        }
        
        return story;
    }

    createPatientIntro(history) {
        const demographics = history.demographics || '';
        const social = history.socialHistory || [];
        
        let intro = demographics;
        
        // Add job if available
        const jobInfo = social.find(item => item.toLowerCase().includes('job') || item.toLowerCase().includes('work'));
        if (jobInfo) {
            intro += `, ${jobInfo.toLowerCase()}`;
        }
        
        intro += '.';
        return intro;
    }

    createMedicalNarrative(medicalHistory) {
        const conditions = medicalHistory.map(condition => {
            // Add plain English explanations for common conditions
            if (condition.toLowerCase().includes('hypertension')) {
                return condition.replace(/hypertension/gi, 'high blood pressure');
            }
            if (condition.toLowerCase().includes('type 2 diabetes')) {
                return condition + ' (a condition affecting blood sugar control)';
            }
            if (condition.toLowerCase().includes('high cholesterol')) {
                return condition + ' (elevated fats in the blood)';
            }
            if (condition.toLowerCase().includes('stent')) {
                return condition + ' (a small tube inserted to keep an artery open)';
            }
            return condition;
        });
        
        if (conditions.length === 1) {
            return `He has a history of ${conditions[0].toLowerCase()}.`;
        } else if (conditions.length === 2) {
            return `He has a history of ${conditions[0].toLowerCase()} and ${conditions[1].toLowerCase()}.`;
        } else {
            const lastCondition = conditions.pop();
            return `He has a history of ${conditions.join(', ').toLowerCase()}, and ${lastCondition.toLowerCase()}.`;
        }
    }

    createLifestyleNarrative(socialHistory) {
        const lifestyle = [];
        
        socialHistory.forEach(item => {
            if (item.toLowerCase().includes('smokes')) {
                lifestyle.push(`he's been a heavy smoker for many years`);
            } else if (item.toLowerCase().includes('sedentary')) {
                lifestyle.push(`he leads a fairly inactive lifestyle`);
            } else if (item.toLowerCase().includes('stress')) {
                lifestyle.push(`his work involves considerable stress`);
            } else if (item.toLowerCase().includes('family history')) {
                lifestyle.push(`heart disease runs in his family`);
            } else if (!item.toLowerCase().includes('job') && !item.toLowerCase().includes('work')) {
                lifestyle.push(item.toLowerCase());
            }
        });
        
        if (lifestyle.length === 0) return 'No significant lifestyle factors noted.';
        
        if (lifestyle.length === 1) {
            return `Unfortunately, ${lifestyle[0]}.`;
        } else if (lifestyle.length === 2) {
            return `Unfortunately, ${lifestyle[0]} and ${lifestyle[1]}.`;
        } else {
            const lastItem = lifestyle.pop();
            return `Unfortunately, ${lifestyle.join(', ')}, and ${lastItem}.`;
        }
    }

    createFamilyNarrative(familyHistory) {
        const family = familyHistory.map(item => {
            // Make family history more readable
            if (item.toLowerCase().includes('died suddenly')) {
                return item.replace(/died suddenly/gi, 'passed away unexpectedly');
            }
            return item;
        });
        
        if (family.length === 1) {
            return `His ${family[0].toLowerCase()}.`;
        } else if (family.length === 2) {
            return `His ${family[0].toLowerCase()}, and his ${family[1].toLowerCase()}.`;
        } else {
            const lastItem = family.pop();
            return `His ${family.join(', his ').toLowerCase()}, and his ${lastItem.toLowerCase()}.`;
        }
    }

    createMedicationNarrative(medications) {
        const meds = medications.map(med => {
            // Add explanations for common medications
            if (med.toLowerCase().includes('metformin')) {
                return med + ' (for diabetes)';
            }
            if (med.toLowerCase().includes('lisinopril')) {
                return med + ' (for blood pressure)';
            }
            if (med.toLowerCase().includes('atorvastatin')) {
                return med + ' (for cholesterol)';
            }
            if (med.toLowerCase().includes('paracetamol')) {
                return med + ' (for pain relief)';
            }
            return med;
        });
        
        if (meds.length === 1) {
            return `He takes ${meds[0].toLowerCase()}.`;
        } else if (meds.length === 2) {
            return `He takes ${meds[0].toLowerCase()} and ${meds[1].toLowerCase()}.`;
        } else {
            const lastMed = meds.pop();
            return `He takes ${meds.join(', ').toLowerCase()}, and ${lastMed.toLowerCase()}.`;
        }
    }

    createAllergyNarrative(allergies) {
        if (allergies.toLowerCase().includes('no known')) {
            return 'He has no known drug allergies, which is helpful for treatment options.';
        }
        return `Important: He is allergic to ${allergies.toLowerCase()}.`;
    }

    renderCollapsibleFindings() {
        const askedQuestions = this.gameState.askedQuestions;
        const orderedTests = this.gameState.orderedTests;
        
        return `
            <div class="section collapsible-section">
                <div class="collapsible-header" onclick="game.toggleSection('findings')">
                    <h3><i class="fas fa-search"></i> Clinical Findings</h3>
                    <i class="fas fa-chevron-down toggle-icon" id="findings-toggle"></i>
                </div>
                <div class="collapsible-content" id="findings-content" style="display: block;">
                    <script>
                        // Set the toggle icon to up since content is visible
                        setTimeout(() => {
                            const toggle = document.getElementById('findings-toggle');
                            if (toggle) {
                                toggle.classList.remove('fa-chevron-down');
                                toggle.classList.add('fa-chevron-up');
                            }
                        }, 100);
                    </script>
                    <div class="findings-grid">
                        <div class="findings-section">
                            <h5>History & Examination (${askedQuestions.length})</h5>
                            ${askedQuestions.length > 0 ? `
                                <div class="findings-list">
                                    ${askedQuestions.map(qId => {
                                        const question = this.gameState.currentCase.questions.find(q => q.id === qId);
                                        const answer = this.getQuestionAnswer(qId);
                                        return question ? `
                                            <div class="finding-item">
                                                <strong>Q:</strong> ${question.text}<br>
                                                <strong>A:</strong> ${answer}
                                            </div>
                                        ` : '';
                                    }).join('')}
                                </div>
                            ` : '<p>No questions asked.</p>'}
                        </div>
                        <div class="findings-section">
                            <h5>Test Results (${orderedTests.length})</h5>
                            ${orderedTests.length > 0 ? `
                                <div class="findings-list">
                                    ${orderedTests.map(tId => {
                                        const test = this.gameState.currentCase.tests.find(t => t.id === tId);
                                        const result = this.generateTestResult(test);
                                        return test ? `
                                            <div class="finding-item">
                                                <strong>${test.name}:</strong><br>
                                                ${result}
                                            </div>
                                        ` : '';
                                    }).join('')}
                                </div>
                            ` : '<p>No tests ordered.</p>'}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    toggleSection(sectionId) {
        const content = document.getElementById(`${sectionId}-content`);
        const toggle = document.getElementById(`${sectionId}-toggle`);
        
        if (content && toggle) {
            if (content.style.display === 'none') {
                content.style.display = 'block';
                toggle.classList.remove('fa-chevron-down');
                toggle.classList.add('fa-chevron-up');
            } else {
                content.style.display = 'none';
                toggle.classList.remove('fa-chevron-up');
                toggle.classList.add('fa-chevron-down');
            }
        }
        
        this.playSound('click');
    }

    getPatientImageForAge(demographics) {
        // Extract age from demographics string (e.g., "58-year-old male" -> 58)
        const ageMatch = demographics.match(/(\d+)-year-old/);
        if (!ageMatch) return null;
        
        const age = parseInt(ageMatch[1]);
        
        // Map age to available patient images with descriptive names
        // Available images: child-3yo, child-8yo, adult-32yo, adult-45yo, adult-58yo, elderly-72yo
        if (age <= 5) return 'assets/images/patients/child-3yo.png';
        if (age <= 12) return 'assets/images/patients/child-8yo.png';
        if (age <= 38) return 'assets/images/patients/adult-32yo.png';
        if (age <= 51) return 'assets/images/patients/adult-45yo.png';
        if (age <= 65) return 'assets/images/patients/adult-58yo.png';
        return 'assets/images/patients/elderly-72yo.png';
    }

    renderPatientImage() {
        const patientImageSrc = this.getPatientImageForAge(this.gameState.currentCase.patientHistory.demographics);
        
        if (!patientImageSrc) return '';
        
        return `
            <div class="section patient-image-section">
                <h3><i class="fas fa-user-injured"></i> Patient</h3>
                <div class="patient-image-container">
                    <img src="${patientImageSrc}" alt="Patient" class="patient-image" />
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
            'fever': 'Yes, temperature is 39°C. Child appears flushed and lethargic.',
            'cough': 'Yes, barking cough that sounds like a seal. Worse at night and with activity.',
            'stridor': 'Yes, high-pitched sound when breathing in. Child appears anxious about breathing.',
            'activity_level': 'Child is less active than usual. Prefers to sit quietly and seems tired.',
            
            // Obstetric case questions
            'contractions': 'Yes, regular contractions every 3-4 minutes lasting 45-60 seconds. Increasing in intensity.',
            'water_broken': 'Yes, clear fluid leaking for the past 2 hours. No foul odor.',
            'bleeding': 'Yes, light spotting for the past hour. No heavy bleeding.',
            'fetal_movement': 'Yes, baby is moving normally. Mum reports regular kicks and movements.',
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
            'fever': 'Yes, temperature is 39°C. Patient appears flushed and reports chills.',
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
            'balance_problems': 'Yes, difficulty maintaining balance. Patient reports feeling "unsteady on feet".',
            
            // Stroke case questions
            'symptom_onset': 'Symptoms began 45 minutes ago. Patient was watching TV when he suddenly noticed left arm weakness and slurred speech.',
            'consciousness_level': 'Patient is alert and oriented to person, place, and time. Responds appropriately to questions but speech is slurred.',
            'speech_problems': 'Yes, patient has dysarthria (slurred speech) and mild word-finding difficulties. Speech is slow but comprehensible.',
            'vision_problems': 'No visual disturbances reported. Patient denies double vision or field cuts.',
            'headache': 'No headache reported. Patient denies any head or neck pain.',
            'recent_trauma': 'No recent head trauma or falls. Patient was sitting in his chair when symptoms began.',
            
            // Pediatric fever case questions
            'fever_duration': 'Fever has been present for 2 days. Started with runny nose and mild cough.',
            'other_symptoms': 'Yes, runny nose, mild cough, and slight decrease in appetite. No vomiting or diarrhea.',
            'appetite': 'Child is eating and drinking normally, though slightly less than usual. No signs of dehydration.',
            'activity_level': 'Child is active and playful when fever is controlled with medication. Sleeps normally.',
            
            // Abdominal pain case questions
            'pain_location': 'Pain is located in the right iliac fossa. Patient has localised tenderness in this area.',
            'pain_migration': 'Yes, pain started around the belly button this morning and moved to the right lower abdomen over 4-6 hours.',
            'nausea_vomiting': 'Yes, patient has been nauseous for 6 hours and vomited twice. Can\'t keep food down.',
            'fever': 'Yes, low-grade fever of 38°C. Patient feels warm to touch.',
            'appetite': 'No appetite for the past 12 hours. Patient reports feeling "sick to my stomach".',
            
            // Trauma case questions
            'consciousness': 'Patient is alert and oriented to person, place, and time. Responds appropriately to questions.',
            'breathing': 'Patient is breathing but with difficulty. Respiratory rate is 24/min and shallow.',
            'circulation': 'Pulse is 110/min and regular. Skin is warm and dry with good capillary refill.',
            'bleeding': 'Yes, visible bruising on abdomen and chest. Patient reports internal bleeding sensation.',
            'deformities': 'No obvious deformities. Patient reports pain with movement but no visible abnormalities.',
            
            // Pediatric asthma case questions
            'breathing_difficulty': 'Yes, child is working hard to breathe. Using accessory muscles and has nasal flaring.',
            'wheezing': 'Yes, audible wheezing heard throughout chest. Worse with activity and at night.',
            'triggers': 'Yes, symptoms started after playing outside in cold weather. Has history of asthma.',
            'medication': 'Yes, child has salbutamol inhaler but it\'s not helping much. Used it 3 times today.',
            
            // Neurological stroke case questions
            'weakness': 'Yes, obvious weakness on the right side of the body. Patient cannot lift right arm and right leg is weak.',
            'speech_difficulty': 'Yes, patient has slurred speech and difficulty finding words. Speech is slow and unclear.',
            'facial_droop': 'Yes, right side of face is drooping. Right corner of mouth sags and patient cannot smile symmetrically.',
            'time_onset': 'Symptoms started approximately 2 hours ago while watching TV. Sudden onset, no gradual progression.',
            'consciousness': 'Patient is alert and oriented to person, place, and time. Responds to questions but speech is impaired.',
            'symptom_onset': 'Symptoms began 2 hours ago. Patient was watching TV when he suddenly noticed right arm weakness and slurred speech.',
            'consciousness_level': 'Patient is alert and oriented to person, place, and time. Responds appropriately to questions but speech is slurred.',
            'speech_problems': 'Yes, patient has dysarthria (slurred speech) and mild word-finding difficulties. Speech is slow but comprehensible.',
            'vision_problems': 'No visual disturbances reported. Patient denies double vision or field cuts.',
            'headache': 'No headache reported. Patient denies any head or neck pain.',
            'recent_trauma': 'No recent head trauma or falls. Patient was sitting in his chair when symptoms began.'
        };
        
        return answers[questionId] || 'Patient provides a clear response. No significant findings for this question.';
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
        
        const diagnosisCards = shuffledOptions.map(d => `
            <div class="diagnosis-card" onclick="game.makeDiagnosis('${d.id}')">
                <h4>${d.name}</h4>
                <p>${d.description}</p>
                <div class="diagnosis-action">
                    <i class="fas fa-arrow-right"></i>
                    Select Diagnosis
                </div>
            </div>
        `).join('');
        
        return `
            <div class="section diagnosis-selection">
                <div class="diagnosis-header">
                    <h2><i class="fas fa-stethoscope"></i> Select Your Diagnosis</h2>
                    <p>Based on your clinical findings, choose the most likely diagnosis:</p>
                </div>
                <div class="diagnosis-options">
                    ${diagnosisCards}
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
        // Enhanced deterioration system with phase manager integration
        if (this.phaseManager) {
            this.phaseManager.updatePatientCondition();
        } else {
            // Fallback to original system
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
                // Show progress message for critical findings
                if (Math.random() < 0.3) { // 30% chance
                    setTimeout(() => this.showProgressMessage('examine'), 1000);
                }
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
        // Check for narrative results first
        if (test.resultNarrative && test.resultNarrative.length > 0) {
            this.showNarrativeTestResult(test);
        } else {
            // Fallback to original system
            this.showStandardTestResult(test);
        }
    }

    showNarrativeTestResult(test) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay narrative-result-modal';
        
        modal.innerHTML = `
            <div class="modal-content narrative-content">
                <div class="narrative-header">
                    <div class="timestamp">2 minutes later...</div>
                    <h3><i class="fas fa-clipboard-list"></i> ${test.name} Results</h3>
                </div>
                <div class="narrative-body">
                    <div class="narrative-text" id="narrative-text">
                        ${test.resultNarrative[0]}
                    </div>
                </div>
                <div class="narrative-controls">
                    <button class="action-btn secondary" id="narrative-continue" onclick="game.continueNarrative()">
                        Continue <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Store narrative state
        this.currentNarrative = {
            lines: test.resultNarrative,
            currentLine: 0,
            modal: modal
        };
        
        this.playSound('success');
    }

    continueNarrative() {
        if (!this.currentNarrative) return;
        
        this.currentNarrative.currentLine++;
        const textElement = document.getElementById('narrative-text');
        const continueBtn = document.getElementById('narrative-continue');
        
        if (this.currentNarrative.currentLine < this.currentNarrative.lines.length) {
            // Show next line with fade effect
            textElement.style.opacity = '0';
            setTimeout(() => {
                textElement.textContent = this.currentNarrative.lines[this.currentNarrative.currentLine];
                textElement.style.opacity = '1';
            }, 200);
        } else {
            // End of narrative
            continueBtn.innerHTML = 'Close <i class="fas fa-times"></i>';
            continueBtn.onclick = () => {
                this.currentNarrative.modal.remove();
                this.currentNarrative = null;
            };
        }
        
        this.playSound('click');
    }

    showStandardTestResult(test) {
        // Original test result system for backwards compatibility
        const results = this.generateTestResult(test);
        
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
        
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(notification);
            
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
            
            // Pregnancy test results
            pregnancy_test: "Pregnancy test: NEGATIVE. No hCG detected in urine. Rules out pregnancy and ectopic pregnancy.",
            
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
            
            // Handle diagnosis based on current investigation phase
            if (this.gameState.investigationPhase === 'diagnose') {
                // Store diagnosis selection and go straight to final result
                this.gameState.phaseProgress.diagnose.selectedDiagnosis = diagnosis.name;
                this.gameState.phaseProgress.diagnose.confidence = 85;
                // Skip treatment phase for now - go straight to results
            }
            
            // Original diagnosis flow for final submission
            this.gameState.finalDiagnosis = diagnosisId;
            this.gameState.selectedDiagnosis = diagnosis;
            this.gameState.gamePhase = 'ended';
            
            if (diagnosis.correct) {
                this.gameState.score += SCORING.CORRECT_DIAGNOSIS;
                // Bonus points for time remaining and patient stability
                const timeBonus = Math.floor(this.gameState.timeRemaining / 60) * SCORING.TIME_BONUS;
                const stabilityBonus = this.gameState.patientStability > 80 ? SCORING.PERFECT_SCORE_BONUS : 0;
                this.gameState.score += timeBonus + stabilityBonus;
                
                this.playSound('success');
                this.endGame('✅ Correct Diagnosis! Patient saved!', true);
            } else {
                this.gameState.score += SCORING.INCORRECT_DIAGNOSIS;
                // Additional penalties for incorrect diagnosis
                this.gameState.patientStability = Math.max(0, this.gameState.patientStability - 30);
                this.gameState.incorrectActions++;
                
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
            const diagnosisResult = this.getDiagnosisResult();
            
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
                    
                    ${diagnosisResult}
                    
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
                        <button class="action-btn primary" onclick="game.resetAndPlayAgain()">
                            <i class="fas fa-play"></i> Play Again
                        </button>
                        <button class="action-btn secondary" onclick="game.showCaseReview()">
                            <i class="fas fa-book-medical"></i> Review Case
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

    getDiagnosisResult() {
        if (!this.gameState.selectedDiagnosis) return '';
        
        const diagnosis = this.gameState.selectedDiagnosis;
        const correctDiagnosis = this.gameState.currentCase.diagnosisOptions.find(d => d.correct);
        
        if (diagnosis.correct) {
            return `
                <div class="diagnosis-result success">
                    <h3><i class="fas fa-check-circle"></i> Excellent Diagnosis!</h3>
                    <div class="diagnosis-details">
                        <p><strong>Your Diagnosis:</strong> ${diagnosis.name}</p>
                        <p><strong>Medical Outcome:</strong> ${diagnosis.consequences}</p>
                        <p><strong>Family Response:</strong> ${diagnosis.emotionalImpact}</p>
                    </div>
                    <div class="learning-points">
                        <h4>Key Learning Points:</h4>
                        <ul>
                            <li>Rapid recognition of ${correctDiagnosis.name} symptoms</li>
                            <li>Appropriate diagnostic workup and test ordering</li>
                            <li>Time-critical decision making under pressure</li>
                            <li>Effective patient communication and care</li>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="diagnosis-result error">
                    <h3><i class="fas fa-times-circle"></i> Incorrect Diagnosis - Learning Opportunity</h3>
                    <div class="diagnosis-comparison">
                        <div class="your-diagnosis">
                            <h4>Your Diagnosis: ${diagnosis.name}</h4>
                            <p><strong>Consequences:</strong> ${diagnosis.consequences}</p>
                            <p><strong>Family Impact:</strong> ${diagnosis.emotionalImpact}</p>
                        </div>
                        <div class="correct-diagnosis">
                            <h4>Correct Diagnosis: ${correctDiagnosis.name}</h4>
                            <p><strong>Why This Was Correct:</strong> ${correctDiagnosis.description}</p>
                            <p><strong>Proper Treatment:</strong> ${correctDiagnosis.consequences}</p>
                        </div>
                    </div>
                    <div class="learning-points">
                        <h4>What You Can Learn:</h4>
                        <ul>
                            <li><strong>Key Symptoms Missed:</strong> Review the critical signs of ${correctDiagnosis.name}</li>
                            <li><strong>Diagnostic Tests:</strong> Consider which tests would have confirmed the diagnosis</li>
                            <li><strong>Time Pressure:</strong> Practice rapid assessment and decision-making</li>
                            <li><strong>Pattern Recognition:</strong> Study classic presentations of emergency conditions</li>
                        </ul>
                    </div>
                    <div class="improvement-tips">
                        <h4>Improvement Tips:</h4>
                        <ul>
                            <li>Focus on critical symptoms and their significance</li>
                            <li>Order appropriate diagnostic tests early</li>
                            <li>Consider differential diagnoses systematically</li>
                            <li>Practice with similar cases to improve pattern recognition</li>
                        </ul>
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

    showCaseReview() {
        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) return;
        
        const correctDiagnosis = this.gameState.currentCase.diagnosisOptions.find(d => d.correct);
        const criticalQuestions = this.gameState.currentCase.questions.filter(q => q.critical);
        const criticalTests = this.gameState.currentCase.tests.filter(t => t.critical);
        
        const missedCriticalQuestions = criticalQuestions.filter(q => 
            !this.gameState.askedQuestions.includes(q.id)
        );
        const missedCriticalTests = criticalTests.filter(t => 
            !this.gameState.orderedTests.includes(t.id)
        );
        
        gameContainer.innerHTML = `
            <div class="case-review">
                <h1><i class="fas fa-book-medical"></i> Case Review</h1>
                
                <div class="case-summary">
                    <h2>${this.gameState.currentCase.title}</h2>
                    <p><strong>Patient:</strong> ${this.gameState.currentCase.patientHistory.demographics}</p>
                    <p><strong>Correct Diagnosis:</strong> ${correctDiagnosis.name}</p>
                    <p><strong>Your Diagnosis:</strong> ${this.gameState.selectedDiagnosis.name}</p>
                </div>
                
                <div class="performance-analysis">
                    <div class="analysis-section">
                        <h3><i class="fas fa-comments"></i> Questions Asked (${this.gameState.askedQuestions.length}/${this.gameState.currentCase.questions.length})</h3>
                        <div class="questions-review">
                            ${this.gameState.currentCase.questions.map(q => `
                                <div class="question-item ${this.gameState.askedQuestions.includes(q.id) ? 'asked' : 'missed'} ${q.critical ? 'critical' : ''}">
                                    <span class="question-text">${q.text}</span>
                                    <span class="question-status">
                                        ${this.gameState.askedQuestions.includes(q.id) ? 
                                            '<i class="fas fa-check"></i> Asked' : 
                                            '<i class="fas fa-times"></i> Missed'
                                        }
                                        ${q.critical ? '<span class="critical-badge">Critical</span>' : ''}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="analysis-section">
                        <h3><i class="fas fa-flask"></i> Tests Ordered (${this.gameState.orderedTests.length}/${this.gameState.currentCase.tests.length})</h3>
                        <div class="tests-review">
                            ${this.gameState.currentCase.tests.map(t => `
                                <div class="test-item ${this.gameState.orderedTests.includes(t.id) ? 'ordered' : 'missed'} ${t.critical ? 'critical' : ''}">
                                    <span class="test-text">${t.name}</span>
                                    <span class="test-status">
                                        ${this.gameState.orderedTests.includes(t.id) ? 
                                            '<i class="fas fa-check"></i> Ordered' : 
                                            '<i class="fas fa-times"></i> Missed'
                                        }
                                        ${t.critical ? '<span class="critical-badge">Critical</span>' : ''}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                ${missedCriticalQuestions.length > 0 || missedCriticalTests.length > 0 ? `
                    <div class="missed-critical">
                        <h3><i class="fas fa-exclamation-triangle"></i> Critical Items Missed</h3>
                        ${missedCriticalQuestions.length > 0 ? `
                            <div class="missed-questions">
                                <h4>Critical Questions:</h4>
                                <ul>
                                    ${missedCriticalQuestions.map(q => `<li>${q.text}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${missedCriticalTests.length > 0 ? `
                            <div class="missed-tests">
                                <h4>Critical Tests:</h4>
                                <ul>
                                    ${missedCriticalTests.map(t => `<li>${t.name} - ${t.description}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                <div class="learning-recommendations">
                    <h3><i class="fas fa-lightbulb"></i> Learning Recommendations</h3>
                    <ul>
                        <li>Review the pathophysiology of ${correctDiagnosis.name}</li>
                        <li>Study the classic presentation and key diagnostic criteria</li>
                        <li>Practice systematic approach to ${this.gameState.currentCase.specialty.toLowerCase()} emergencies</li>
                        <li>Focus on time-critical decision making in emergency scenarios</li>
                        ${missedCriticalQuestions.length > 0 ? '<li>Improve history-taking skills for emergency presentations</li>' : ''}
                        ${missedCriticalTests.length > 0 ? '<li>Learn appropriate diagnostic test selection and interpretation</li>' : ''}
                    </ul>
                </div>
                
                <div class="review-actions">
                    <button class="action-btn primary" onclick="game.resetAndPlayAgain()">
                        <i class="fas fa-redo"></i> Try This Case Again
                    </button>
                    <button class="action-btn secondary" onclick="game.showCaseSelection()">
                        <i class="fas fa-list"></i> Choose Different Case
                    </button>
                    <button class="action-btn secondary" onclick="game.showGlossary()">
                        <i class="fas fa-book"></i> Medical Glossary
                    </button>
                </div>
            </div>
        `;
    }

    resetAndPlayAgain() {
        if (this.gameState.currentCase) {
            const caseId = this.gameState.currentCase.id;
            this.startCase(caseId);
        } else {
            this.showCaseSelection();
        }
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
                            <h3>A&E Medicine</h3>
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
        
        // Special logic for paediatric respiratory cases
        if (caseData.id === 'pediatric' && specialist.id === 'pulmonologist') {
            return true; // Pulmonologist is always appropriate for paediatric respiratory distress
        }
        
        // Special logic for cardiac cases
        if (caseData.id === 'cardiac' && specialist.id === 'cardiologist') {
            return true; // Cardiologist is always appropriate for cardiac emergencies
        }
        
        // Special logic for trauma cases
        if (caseData.id === 'trauma' && specialist.id === 'surgeon') {
            return true; // Surgeon is always appropriate for trauma with internal bleeding
        }
        
        // Special logic for appendicitis case
        if (caseData.id === 'abdominal_pain' && specialist.id === 'surgeon') {
            return true; // Surgeon is always appropriate for acute abdomen/appendicitis
        }
        
        // Special logic for stroke case
        if (caseData.id === 'stroke' && specialist.id === 'neurologist') {
            return true; // Neurologist is always appropriate for stroke
        }
        
        // General logic based on expertise matching
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
                    if (caseData.id === 'pediatric') {
                        return `"The stridor and respiratory distress in this age group is consistent with croup. Humidified air and corticosteroids should help."`;
                    } else {
                        return `"The respiratory findings are consistent with ${caseData.correctDiagnosis}. Pulmonary function tests support this diagnosis."`;
                    }
                } else {
                    return `"No significant pulmonary pathology detected. Consider other organ systems."`;
                }
                
            case 'neurologist':
                if (caseData.category === 'neurological') {
                    if (caseData.id === 'stroke') {
                        return `"This is an acute ischemic stroke. The CT shows no hemorrhage, and we're within the tPA window. We need to start thrombolytic therapy immediately to restore blood flow."`;
                    } else {
                        return `"The neurological examination and imaging findings are concerning for ${caseData.correctDiagnosis}. Immediate intervention is warranted."`;
                    }
                } else {
                    return `"No acute neurological findings. The symptoms may be secondary to other conditions."`;
                }
                
            case 'orthopedist':
                if (caseData.category === 'trauma') {
                    return `"The imaging reveals ${caseData.correctDiagnosis}. Surgical intervention may be required."`;
                } else {
                    return `"No significant orthopedic findings. Consider medical causes for the symptoms."`;
                }
                
            case 'paediatrician':
                if (caseData.category === 'paediatric' || caseData.category === 'respiratory') {
                    if (caseData.id === 'pediatric') {
                        return `"This 3-year-old has classic croup symptoms. The barking cough and stridor are characteristic. Supportive care with steroids is appropriate."`;
                    } else {
                        return `"In paediatric patients, this presentation is most consistent with ${caseData.correctDiagnosis}. Age-appropriate management is crucial."`;
                    }
                } else {
                    return `"This case involves an adult patient. Consider consulting an adult medicine specialist."`;
                }
                
            case 'surgeon':
                if (caseData.category === 'surgical') {
                    if (caseData.id === 'abdominal_pain') {
                        return `"The clinical presentation and imaging are consistent with acute appendicitis. This requires emergency appendectomy to prevent rupture and peritonitis."`;
                    } else {
                        return `"This requires immediate surgical intervention. The findings are consistent with ${caseData.correctDiagnosis}."`;
                    }
                } else if (caseData.category === 'trauma') {
                    return `"The trauma pattern suggests internal bleeding requiring surgical exploration. We need to get to the OR immediately."`;
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

    resetAndPlayAgain() {
        // Reset all game state for a fresh start
        this.gameState = {
            currentCase: null,
            timeRemaining: 0,
            score: 0,
            askedQuestions: [],
            orderedTests: [],
            historyRevealed: false,
            gamePhase: GAME_PHASES.CASE_SELECTION,
            finalDiagnosis: null,
            patientState: PATIENT_STATES.STABLE,
            patientStability: 100,
            criticalActionsMissed: 0,
            incorrectActions: 0,
            specialistConsultations: [],
            consultationSlotsRemaining: 3,
            questionsRemaining: 5
        };
        
        // Stop any running timers
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        // Stop background music
        this.toggleBackgroundMusic(false);
        
        // Show case selection
        this.showCaseSelection();
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
// Helper functions for cases
function getAllCases() {
    if (typeof medicalCases === 'undefined') {
        console.error('medicalCases not defined');
        return [];
    }
    return Object.values(medicalCases);
}

function getCase(caseId) {
    if (typeof medicalCases === 'undefined') {
        console.error('medicalCases not defined');
        return null;
    }
    return medicalCases[caseId];
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MedicalMysteryGame();
});

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MedicalMysteryGame };
}