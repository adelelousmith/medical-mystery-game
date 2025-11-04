// Three-Phase Investigation System
// Examine → Diagnose → Treat structure with patient state tracking

const INVESTIGATION_PHASES = {
    EXAMINE: 'examine',
    DIAGNOSE: 'diagnose', 
    TREAT: 'treat'
};

const PHASE_REQUIREMENTS = {
    examine: {
        minActions: 3, // Minimum questions/tests before advancing
        minConfidence: 40, // Minimum confidence to advance
        criticalActions: [], // Will be populated from case data
        description: "Gather clinical information through history, examination, and initial tests"
    },
    diagnose: {
        minConfidence: 60, // Minimum confidence to make diagnosis
        requiresEvidence: true, // Must have supporting evidence
        description: "Formulate differential diagnosis and select most likely condition"
    },
    treat: {
        requiresDiagnosis: true, // Must have made diagnosis
        description: "Implement treatment plan and monitor patient response"
    }
};

class InvestigationPhaseManager {
    constructor(game) {
        this.game = game;
        this.phaseTransitionCallbacks = [];
    }

    // Check if current phase can be advanced
    canAdvancePhase() {
        const currentPhase = this.game.gameState.investigationPhase;
        const phaseData = this.game.gameState.phaseProgress[currentPhase];
        const requirements = PHASE_REQUIREMENTS[currentPhase];

        switch (currentPhase) {
            case INVESTIGATION_PHASES.EXAMINE:
                return this.canAdvanceFromExamine(phaseData, requirements);
            case INVESTIGATION_PHASES.DIAGNOSE:
                return this.canAdvanceFromDiagnose(phaseData, requirements);
            case INVESTIGATION_PHASES.TREAT:
                return false; // Final phase
            default:
                return false;
        }
    }

    canAdvanceFromExamine(phaseData, requirements) {
        const totalActions = this.game.gameState.askedQuestions.length + 
                           this.game.gameState.orderedTests.length;
        
        const hasMinActions = totalActions >= requirements.minActions;
        const hasMinConfidence = phaseData.confidence >= requirements.minConfidence;
        const hasCriticalFindings = this.hasCriticalFindings();

        return hasMinActions && (hasMinConfidence || hasCriticalFindings);
    }

    canAdvanceFromDiagnose(phaseData, requirements) {
        return phaseData.selectedDiagnosis !== null && 
               phaseData.confidence >= requirements.minConfidence;
    }

    hasCriticalFindings() {
        const currentCase = this.game.gameState.currentCase;
        if (!currentCase) return false;

        // Check if any critical questions or tests have been completed
        const criticalQuestions = currentCase.questions?.filter(q => q.critical) || [];
        const criticalTests = currentCase.tests?.filter(t => t.critical) || [];

        const criticalQuestionsAsked = criticalQuestions.some(q => 
            this.game.gameState.askedQuestions.includes(q.id)
        );
        const criticalTestsOrdered = criticalTests.some(t => 
            this.game.gameState.orderedTests.includes(t.id)
        );

        return criticalQuestionsAsked || criticalTestsOrdered;
    }

    // Advance to next phase
    advancePhase() {
        const currentPhase = this.game.gameState.investigationPhase;
        
        if (!this.canAdvancePhase()) {
            this.showPhaseRequirements();
            return false;
        }

        // Mark current phase as completed
        this.game.gameState.phaseProgress[currentPhase].completed = true;

        // Advance to next phase
        switch (currentPhase) {
            case INVESTIGATION_PHASES.EXAMINE:
                this.game.gameState.investigationPhase = INVESTIGATION_PHASES.DIAGNOSE;
                this.onPhaseTransition(INVESTIGATION_PHASES.DIAGNOSE);
                break;
            case INVESTIGATION_PHASES.DIAGNOSE:
                this.game.gameState.investigationPhase = INVESTIGATION_PHASES.TREAT;
                this.onPhaseTransition(INVESTIGATION_PHASES.TREAT);
                break;
        }

        this.game.render();
        return true;
    }

    onPhaseTransition(newPhase) {
        // Show phase transition notification
        this.showPhaseTransition(newPhase);
        
        // Update patient condition based on time elapsed
        this.updatePatientCondition();
        
        // Trigger any registered callbacks
        this.phaseTransitionCallbacks.forEach(callback => callback(newPhase));
    }

    showPhaseTransition(newPhase) {
        const phaseNames = {
            examine: 'Clinical Examination',
            diagnose: 'Diagnostic Assessment', 
            treat: 'Treatment Planning'
        };

        const notification = document.createElement('div');
        notification.className = 'phase-transition-notification';
        notification.innerHTML = `
            <div class="phase-content">
                <i class="fas fa-arrow-right"></i>
                <div class="phase-text">
                    <h3>Advancing to ${phaseNames[newPhase]}</h3>
                    <p>${PHASE_REQUIREMENTS[newPhase].description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);

        this.game.playSound('success');
    }

    showPhaseRequirements() {
        const currentPhase = this.game.gameState.investigationPhase;
        const requirements = PHASE_REQUIREMENTS[currentPhase];
        const phaseData = this.game.gameState.phaseProgress[currentPhase];

        let message = '';
        switch (currentPhase) {
            case INVESTIGATION_PHASES.EXAMINE:
                const totalActions = this.game.gameState.askedQuestions.length + 
                                   this.game.gameState.orderedTests.length;
                message = `Complete examination phase:\n• Actions taken: ${totalActions}/${requirements.minActions}\n• Confidence: ${phaseData.confidence}%/${requirements.minConfidence}%\n• Consider asking key questions or ordering diagnostic tests`;
                break;
            case INVESTIGATION_PHASES.DIAGNOSE:
                message = `Ready for diagnosis:\n• Select your working diagnosis\n• Confidence: ${phaseData.confidence}%/${requirements.minConfidence}%`;
                break;
        }

        if (message) {
            alert(message); // Replace with better UI later
        }
    }

    updatePatientCondition() {
        const timeElapsed = this.getTimeElapsed();
        const currentCase = this.game.gameState.currentCase;
        
        // Time-based deterioration
        if (timeElapsed > 180) { // 3 minutes
            this.deterioratePatientCondition('time_pressure');
        }

        // Missed critical actions
        if (this.game.gameState.criticalActionsMissed > 2) {
            this.deterioratePatientCondition('missed_critical');
        }

        // Update patient stability based on condition
        this.updatePatientStability();
    }

    deterioratePatientCondition(reason) {
        const condition = this.game.gameState.patientCondition;
        
        switch (reason) {
            case 'time_pressure':
                if (condition.consciousness === 'alert') {
                    condition.consciousness = 'drowsy';
                } else if (condition.consciousness === 'drowsy') {
                    condition.consciousness = 'unconscious';
                }
                break;
            case 'missed_critical':
                if (condition.breathing === 'normal') {
                    condition.breathing = 'laboured';
                } else if (condition.breathing === 'laboured') {
                    condition.breathing = 'critical';
                }
                break;
        }

        this.showConditionChange(reason);
    }

    showConditionChange(reason) {
        const messages = {
            time_pressure: "Patient's condition is deteriorating due to delayed treatment",
            missed_critical: "Patient showing signs of distress - critical actions needed"
        };

        const notification = document.createElement('div');
        notification.className = 'condition-change-notification warning';
        notification.innerHTML = `
            <div class="condition-content">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${messages[reason]}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        this.game.playSound('warning');
    }

    updatePatientStability() {
        const condition = this.game.gameState.patientCondition;
        let stability = 100;

        // Calculate stability based on condition parameters
        if (condition.consciousness === 'drowsy') stability -= 20;
        if (condition.consciousness === 'unconscious') stability -= 40;
        if (condition.breathing === 'laboured') stability -= 15;
        if (condition.breathing === 'critical') stability -= 35;
        if (condition.circulation === 'compromised') stability -= 20;
        if (condition.circulation === 'critical') stability -= 40;

        this.game.gameState.patientStability = Math.max(0, stability);
    }

    getTimeElapsed() {
        const currentCase = this.game.gameState.currentCase;
        if (!currentCase) return 0;
        return (currentCase.timeLimit * 60) - this.game.gameState.timeRemaining;
    }

    // Calculate phase confidence based on actions taken
    calculatePhaseConfidence(phase) {
        switch (phase) {
            case INVESTIGATION_PHASES.EXAMINE:
                return this.calculateExamineConfidence();
            case INVESTIGATION_PHASES.DIAGNOSE:
                return this.calculateDiagnoseConfidence();
            case INVESTIGATION_PHASES.TREAT:
                return this.calculateTreatConfidence();
            default:
                return 0;
        }
    }

    calculateExamineConfidence() {
        const currentCase = this.game.gameState.currentCase;
        if (!currentCase) return 0;

        let confidence = 0;
        const totalPossibleActions = (currentCase.questions?.length || 0) + 
                                   (currentCase.tests?.length || 0);
        const actionsTaken = this.game.gameState.askedQuestions.length + 
                           this.game.gameState.orderedTests.length;

        // Base confidence from action completion
        confidence += (actionsTaken / totalPossibleActions) * 60;

        // Bonus for critical actions
        const criticalQuestions = currentCase.questions?.filter(q => q.critical) || [];
        const criticalTests = currentCase.tests?.filter(t => t.critical) || [];
        
        const criticalQuestionsAsked = criticalQuestions.filter(q => 
            this.game.gameState.askedQuestions.includes(q.id)
        ).length;
        const criticalTestsOrdered = criticalTests.filter(t => 
            this.game.gameState.orderedTests.includes(t.id)
        ).length;

        const totalCritical = criticalQuestions.length + criticalTests.length;
        const criticalCompleted = criticalQuestionsAsked + criticalTestsOrdered;

        if (totalCritical > 0) {
            confidence += (criticalCompleted / totalCritical) * 40;
        }

        return Math.min(100, Math.round(confidence));
    }

    calculateDiagnoseConfidence() {
        // This will be enhanced with evidence-based reasoning
        return this.game.gameState.phaseProgress.diagnose.confidence || 0;
    }

    calculateTreatConfidence() {
        // This will be based on treatment appropriateness
        return this.game.gameState.phaseProgress.treat.confidence || 0;
    }
}

// Export for use in main game
if (typeof window !== 'undefined') {
    window.InvestigationPhaseManager = InvestigationPhaseManager;
    window.INVESTIGATION_PHASES = INVESTIGATION_PHASES;
}