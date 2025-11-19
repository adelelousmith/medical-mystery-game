// Crisis Event System - Real-time patient deterioration events
// Adds immersive emergency moments that require immediate action

const CRISIS_TYPES = {
    CARDIAC_ARREST: {
        id: 'cardiac_arrest',
        name: 'Cardiac Arrest',
        description: '⚠️ PATIENT CRASHING! Heart rate dropping rapidly!',
        urgentMessage: 'NO PULSE DETECTED! Monitor shows Ventricular Fibrillation!',
        triggerCondition: (gameState) => gameState.patientStability < 35 && gameState.currentCase.category === 'cardiac',
        timeLimit: 10,
        alarmSound: 'heartbeat',
        visualEffect: 'cardiac-crisis',
        options: [
            {
                id: 'defib',
                text: '⚡ Defibrillate (200J)',
                description: 'Deliver electrical shock to restore normal rhythm',
                correct: true,
                outcome: 'Patient responds! Sinus rhythm restored. Pulse detected.',
                stabilityChange: 25,
                scoreChange: 100
            },
            {
                id: 'cpr',
                text: '👐 Start CPR',
                description: 'Begin chest compressions',
                correct: false,
                outcome: 'CPR started but patient needs defibrillation! Condition worsening.',
                stabilityChange: -10,
                scoreChange: -20
            },
            {
                id: 'epi',
                text: '💉 Give Epinephrine',
                description: 'Administer 1mg IV push',
                correct: false,
                outcome: 'Epinephrine given but patient still in V-Fib! Needs defibrillation!',
                stabilityChange: -5,
                scoreChange: -15
            },
            {
                id: 'wait',
                text: '⏸️ Assess situation',
                description: 'Take a moment to evaluate',
                correct: false,
                outcome: 'Time wasted! Patient deteriorating rapidly!',
                stabilityChange: -20,
                scoreChange: -30
            }
        ],
        voiceLines: [
            "We're losing them!",
            "Get the crash cart NOW!",
            "Charging defibrillator!",
            "Everyone clear!"
        ]
    },

    RESPIRATORY_FAILURE: {
        id: 'respiratory_failure',
        name: 'Respiratory Failure',
        description: '⚠️ RESPIRATORY DISTRESS! Patient cannot breathe!',
        urgentMessage: 'Oxygen saturation dropping! 85%... 78%... 70%!',
        triggerCondition: (gameState) => gameState.patientStability < 35 && gameState.currentCase.category === 'respiratory',
        timeLimit: 12,
        alarmSound: 'bp_monitor',
        visualEffect: 'respiratory-crisis',
        options: [
            {
                id: 'intubate',
                text: '🫁 Emergency Intubation',
                description: 'Secure airway with endotracheal tube',
                correct: true,
                outcome: 'Airway secured! Oxygen saturation improving. Patient stabilizing.',
                stabilityChange: 20,
                scoreChange: 90
            },
            {
                id: 'oxygen',
                text: '💨 High-flow Oxygen',
                description: 'Increase oxygen to 15L/min',
                correct: false,
                outcome: 'Oxygen increased but airway compromised! Not enough!',
                stabilityChange: 5,
                scoreChange: -10
            },
            {
                id: 'bag_mask',
                text: '😷 Bag-Valve-Mask',
                description: 'Manual ventilation',
                correct: false,
                outcome: 'Temporary measure but patient needs definitive airway!',
                stabilityChange: 10,
                scoreChange: 20
            }
        ],
        voiceLines: [
            "Sats dropping fast!",
            "We need to intubate!",
            "Get the airway kit!",
            "Patient's not breathing!"
        ]
    },

    SEVERE_BLEEDING: {
        id: 'severe_bleeding',
        name: 'Severe Hemorrhage',
        description: '⚠️ MASSIVE BLEEDING! Blood pressure crashing!',
        urgentMessage: 'BP: 90/60... 70/40... 50/30! Patient going into shock!',
        triggerCondition: (gameState) => gameState.patientStability < 40 && gameState.currentCase.category === 'trauma',
        timeLimit: 8,
        alarmSound: 'bp_monitor',
        visualEffect: 'bleeding-crisis',
        options: [
            {
                id: 'pressure',
                text: '🩹 Direct Pressure + Fluids',
                description: 'Apply pressure and rapid fluid resuscitation',
                correct: true,
                outcome: 'Bleeding controlled! BP stabilizing with fluid bolus.',
                stabilityChange: 20,
                scoreChange: 85
            },
            {
                id: 'transfusion',
                text: '🩸 Emergency Transfusion',
                description: 'Start O-negative blood',
                correct: true,
                outcome: 'Transfusion started! Patient responding to blood products.',
                stabilityChange: 25,
                scoreChange: 95
            },
            {
                id: 'fluids_only',
                text: '💧 IV Fluids Only',
                description: 'Rapid saline infusion',
                correct: false,
                outcome: 'Fluids help but patient needs blood! Still bleeding!',
                stabilityChange: 5,
                scoreChange: -15
            }
        ],
        voiceLines: [
            "We need blood NOW!",
            "Pressure's dropping!",
            "Type and cross STAT!",
            "Patient's in shock!"
        ]
    },

    ANAPHYLAXIS: {
        id: 'anaphylaxis',
        name: 'Anaphylactic Shock',
        description: '⚠️ SEVERE ALLERGIC REACTION! Airway swelling!',
        urgentMessage: 'Throat closing! Hives spreading! BP dropping rapidly!',
        triggerCondition: (gameState) => gameState.patientStability < 40 && gameState.currentCase.category === 'toxicology',
        timeLimit: 10,
        alarmSound: 'bp_monitor',
        visualEffect: 'anaphylaxis-crisis',
        options: [
            {
                id: 'epi_im',
                text: '💉 Epinephrine IM (0.3mg)',
                description: 'Inject into thigh muscle immediately',
                correct: true,
                outcome: 'Epinephrine working! Airway opening, BP rising. Crisis averted!',
                stabilityChange: 30,
                scoreChange: 100
            },
            {
                id: 'antihistamine',
                text: '💊 Antihistamine IV',
                description: 'Give diphenhydramine',
                correct: false,
                outcome: 'Too slow! Patient needs epinephrine NOW! Condition worsening!',
                stabilityChange: -10,
                scoreChange: -25
            },
            {
                id: 'steroids',
                text: '💉 Steroids IV',
                description: 'Administer methylprednisolone',
                correct: false,
                outcome: 'Steroids are adjunct therapy! Need epinephrine first!',
                stabilityChange: -5,
                scoreChange: -20
            }
        ],
        voiceLines: [
            "Anaphylaxis!",
            "Get the epi-pen!",
            "Airway's closing!",
            "We need epinephrine NOW!"
        ]
    },

    SEIZURE: {
        id: 'seizure',
        name: 'Status Epilepticus',
        description: '⚠️ CONTINUOUS SEIZURE! Patient convulsing!',
        urgentMessage: 'Seizure lasting over 5 minutes! Brain damage imminent!',
        triggerCondition: (gameState) => gameState.patientStability < 35 && gameState.currentCase.category === 'neurological',
        timeLimit: 12,
        alarmSound: 'bp_monitor',
        visualEffect: 'seizure-crisis',
        options: [
            {
                id: 'benzos',
                text: '💉 Benzodiazepines IV',
                description: 'Lorazepam 4mg IV push',
                correct: true,
                outcome: 'Seizure stopping! Patient relaxing. Airway protected.',
                stabilityChange: 25,
                scoreChange: 90
            },
            {
                id: 'protect',
                text: '🛡️ Protect Airway Only',
                description: 'Position patient, prevent injury',
                correct: false,
                outcome: 'Airway protected but seizure continues! Need medication!',
                stabilityChange: 0,
                scoreChange: -10
            },
            {
                id: 'phenytoin',
                text: '💊 Phenytoin IV',
                description: 'Load with phenytoin',
                correct: false,
                outcome: 'Too slow! Need fast-acting benzos first! Seizure continues!',
                stabilityChange: -5,
                scoreChange: -15
            }
        ],
        voiceLines: [
            "Status epilepticus!",
            "Get the benzos!",
            "Protect the airway!",
            "Seizure won't stop!"
        ]
    },

    STROKE_PROGRESSION: {
        id: 'stroke_progression',
        name: 'Acute Stroke Progression',
        description: '⚠️ STROKE SYMPTOMS WORSENING! Time is brain!',
        urgentMessage: 'Left side weakness progressing! Speech slurring! Pupils unequal!',
        triggerCondition: (gameState) => gameState.patientStability < 40 && gameState.currentCase.id === 'stroke',
        timeLimit: 15,
        alarmSound: 'bp_monitor',
        visualEffect: 'stroke-crisis',
        options: [
            {
                id: 'ct_tpa',
                text: '🧠 Emergency CT + tPA',
                description: 'Immediate CT scan and thrombolytic therapy',
                correct: true,
                outcome: 'CT shows ischemic stroke! tPA administered within window. Symptoms improving!',
                stabilityChange: 20,
                scoreChange: 100
            },
            {
                id: 'aspirin',
                text: '💊 Aspirin Only',
                description: 'Give aspirin 325mg',
                correct: false,
                outcome: 'Aspirin given but patient needs urgent imaging and tPA!',
                stabilityChange: 5,
                scoreChange: -20
            },
            {
                id: 'wait_neuro',
                text: '⏰ Wait for Neurology',
                description: 'Call neurology consult',
                correct: false,
                outcome: 'Time is brain! Every minute counts! Symptoms worsening!',
                stabilityChange: -15,
                scoreChange: -30
            }
        ],
        voiceLines: [
            "Stroke alert!",
            "Get CT now!",
            "Time is brain!",
            "We're in the window for tPA!"
        ]
    }
};

class CrisisEventManager {
    constructor(game) {
        this.game = game;
        this.activeCrisis = null;
        this.crisisTriggered = {};
        this.crisisTimer = null;
        this.timeRemaining = 0;
    }

    checkForCrisis() {
        // Don't trigger if already in crisis
        if (this.activeCrisis) return;

        // Debug logging
        const stability = this.game.gameState.patientStability;
        const category = this.game.gameState.currentCase?.category;
        
        if (stability < 50) {
            console.log(`🏥 Crisis Check - Stability: ${Math.round(stability)}%, Category: ${category}`);
        }

        // Check each crisis type
        for (const crisisType of Object.values(CRISIS_TYPES)) {
            // Skip if already triggered this game
            if (this.crisisTriggered[crisisType.id]) continue;

            // Check if conditions are met
            if (crisisType.triggerCondition(this.game.gameState)) {
                this.triggerCrisis(crisisType);
                break;
            }
        }
    }

    triggerCrisis(crisisType) {
        console.log('🚨 CRISIS TRIGGERED:', crisisType.name);
        
        this.activeCrisis = crisisType;
        this.crisisTriggered[crisisType.id] = true;
        this.timeRemaining = crisisType.timeLimit;

        // Pause main game timer
        if (this.game.timer) {
            clearInterval(this.game.timer);
        }

        // Play alarm sound
        this.game.playSound(crisisType.alarmSound);

        // Play voice line
        if (crisisType.voiceLines && crisisType.voiceLines.length > 0) {
            const randomVoice = crisisType.voiceLines[Math.floor(Math.random() * crisisType.voiceLines.length)];
            console.log('🗣️', randomVoice);
        }

        // Show crisis UI
        this.showCrisisUI();

        // Start crisis countdown
        this.startCrisisTimer();
    }

    startCrisisTimer() {
        this.crisisTimer = setInterval(() => {
            this.timeRemaining--;
            this.updateCrisisUI();

            if (this.timeRemaining <= 0) {
                this.handleCrisisTimeout();
            }
        }, 1000);
    }

    handleCrisisChoice(optionId) {
        if (!this.activeCrisis) return;

        const option = this.activeCrisis.options.find(opt => opt.id === optionId);
        if (!option) return;

        // Stop crisis timer
        if (this.crisisTimer) {
            clearInterval(this.crisisTimer);
            this.crisisTimer = null;
        }

        // Apply outcome
        this.game.gameState.patientStability += option.stabilityChange;
        this.game.gameState.patientStability = Math.max(0, Math.min(100, this.game.gameState.patientStability));
        
        this.game.gameState.score += option.scoreChange;
        this.game.gameState.score = Math.max(0, this.game.gameState.score);

        // Show outcome
        this.showCrisisOutcome(option);

        // Play appropriate sound
        if (option.correct) {
            this.game.playSound('success');
        } else {
            this.game.playSound('warning');
        }

        // Resume game after 3 seconds
        setTimeout(() => {
            this.resolveCrisis();
        }, 3000);
    }

    handleCrisisTimeout() {
        if (this.crisisTimer) {
            clearInterval(this.crisisTimer);
            this.crisisTimer = null;
        }

        // Severe penalty for no action
        this.game.gameState.patientStability -= 30;
        this.game.gameState.score -= 50;

        this.game.playSound('error');

        this.showCrisisOutcome({
            outcome: '❌ NO ACTION TAKEN! Patient condition critical!',
            stabilityChange: -30,
            scoreChange: -50,
            correct: false
        });

        setTimeout(() => {
            this.resolveCrisis();
        }, 3000);
    }

    resolveCrisis() {
        this.activeCrisis = null;
        this.hideCrisisUI();

        // Check if patient died
        if (this.game.gameState.patientStability <= 0) {
            this.game.endGame('💔 Patient has died', false);
            return;
        }

        // Resume main game timer
        this.game.startTimer();
        this.game.updatePatientStability();
        this.game.render();
    }

    showCrisisUI() {
        const crisis = this.activeCrisis;
        
        const crisisOverlay = document.createElement('div');
        crisisOverlay.id = 'crisis-overlay';
        crisisOverlay.className = `crisis-overlay ${crisis.visualEffect}`;
        
        crisisOverlay.innerHTML = `
            <div class="crisis-modal">
                <div class="crisis-header">
                    <h2 class="crisis-title">${crisis.name}</h2>
                    <div class="crisis-timer" id="crisis-timer">${this.timeRemaining}s</div>
                </div>
                
                <div class="crisis-description">
                    <p class="crisis-main">${crisis.description}</p>
                    <p class="crisis-urgent">${crisis.urgentMessage}</p>
                </div>
                
                <div class="crisis-options">
                    <h3>CHOOSE ACTION NOW:</h3>
                    ${crisis.options.map((option, index) => `
                        <button class="crisis-option-btn" onclick="game.crisisManager.handleCrisisChoice('${option.id}')">
                            <span class="option-key">[${String.fromCharCode(65 + index)}]</span>
                            <span class="option-text">${option.text}</span>
                            <span class="option-desc">${option.description}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div class="crisis-outcome" id="crisis-outcome" style="display: none;"></div>
            </div>
        `;
        
        document.body.appendChild(crisisOverlay);

        // Add keyboard shortcuts
        this.addKeyboardShortcuts();
    }

    addKeyboardShortcuts() {
        const crisis = this.activeCrisis;
        
        this.keyHandler = (e) => {
            const keyCode = e.key.toUpperCase();
            const index = keyCode.charCodeAt(0) - 65; // A=0, B=1, etc.
            
            if (index >= 0 && index < crisis.options.length) {
                const option = crisis.options[index];
                this.handleCrisisChoice(option.id);
            }
        };
        
        document.addEventListener('keydown', this.keyHandler);
    }

    updateCrisisUI() {
        const timerEl = document.getElementById('crisis-timer');
        if (timerEl) {
            timerEl.textContent = `${this.timeRemaining}s`;
            
            // Add urgency visual
            if (this.timeRemaining <= 3) {
                timerEl.classList.add('critical');
            }
        }
    }

    showCrisisOutcome(option) {
        const outcomeEl = document.getElementById('crisis-outcome');
        if (!outcomeEl) return;

        outcomeEl.style.display = 'block';
        outcomeEl.className = `crisis-outcome ${option.correct ? 'success' : 'failure'}`;
        outcomeEl.innerHTML = `
            <div class="outcome-icon">${option.correct ? '✅' : '⚠️'}</div>
            <div class="outcome-text">${option.outcome}</div>
            <div class="outcome-stats">
                <span class="stat ${option.stabilityChange > 0 ? 'positive' : 'negative'}">
                    Stability: ${option.stabilityChange > 0 ? '+' : ''}${option.stabilityChange}%
                </span>
                <span class="stat ${option.scoreChange > 0 ? 'positive' : 'negative'}">
                    Score: ${option.scoreChange > 0 ? '+' : ''}${option.scoreChange}
                </span>
            </div>
        `;
    }

    hideCrisisUI() {
        const overlay = document.getElementById('crisis-overlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => overlay.remove(), 500);
        }

        // Remove keyboard handler
        if (this.keyHandler) {
            document.removeEventListener('keydown', this.keyHandler);
            this.keyHandler = null;
        }
    }

    reset() {
        this.activeCrisis = null;
        this.crisisTriggered = {};
        if (this.crisisTimer) {
            clearInterval(this.crisisTimer);
            this.crisisTimer = null;
        }
        this.hideCrisisUI();
    }
}
