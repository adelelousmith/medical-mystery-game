// Patient State Management

import { PATIENT_STATES, DETERIORATION_FACTORS } from '../constants.js';

export class PatientManager {
    constructor(gameState) {
        this.gameState = gameState;
    }

    updateStability() {
        const stability = this.gameState.patientStability;
        
        if (stability >= 70) {
            this.gameState.patientState = PATIENT_STATES.STABLE;
        } else if (stability >= 40) {
            this.gameState.patientState = PATIENT_STATES.DETERIORATING;
        } else if (stability >= 20) {
            this.gameState.patientState = PATIENT_STATES.CRITICAL;
        } else {
            this.gameState.patientState = PATIENT_STATES.CRITICAL;
        }
    }

    applyTimePressure() {
        this.gameState.patientStability -= DETERIORATION_FACTORS.TIME_PRESSURE;
        this.gameState.patientStability = Math.max(0, this.gameState.patientStability);
        this.updateStability();
    }

    applyIncorrectAction() {
        this.gameState.patientStability -= DETERIORATION_FACTORS.INCORRECT_ACTIONS;
        this.gameState.patientStability = Math.max(0, this.gameState.patientStability);
        this.updateStability();
    }

    applyImprovement() {
        this.gameState.patientStability += Math.abs(DETERIORATION_FACTORS.IMPROVEMENT);
        this.gameState.patientStability = Math.min(100, this.gameState.patientStability);
        this.updateStability();
    }

    getStabilityClass() {
        const stability = this.gameState.patientStability;
        if (stability >= 80) return 'stable';
        if (stability >= 60) return 'concerning';
        if (stability >= 40) return 'unstable';
        return 'critical';
    }

    getPatientStateDescription() {
        const state = this.gameState.patientState;
        const stability = Math.round(this.gameState.patientStability);

        const descriptions = {
            [PATIENT_STATES.STABLE]: `Patient is stable (${stability}%)`,
            [PATIENT_STATES.DETERIORATING]: `Patient condition deteriorating (${stability}%)`,
            [PATIENT_STATES.CRITICAL]: `CRITICAL - Patient requires immediate intervention (${stability}%)`,
            [PATIENT_STATES.IMPROVING]: `Patient showing signs of improvement (${stability}%)`
        };

        return descriptions[state] || `Patient status: ${stability}%`;
    }

    calculateTreatmentEffectiveness(treatment, isHelpful) {
        const timeElapsed = (this.gameState.currentCase.timeLimit * 60) - this.gameState.timeRemaining;
        const currentStability = this.gameState.patientStability;

        if (isHelpful) {
            let baseEffect = 15;
            if (timeElapsed < 120) baseEffect = 20;
            else if (timeElapsed < 300) baseEffect = 15;
            else baseEffect = 10;

            if (currentStability < 30) baseEffect += 10;
            else if (currentStability < 60) baseEffect += 5;

            return baseEffect;
        } else {
            let baseHarm = 8;
            if (currentStability < 30) baseHarm = 15;
            else if (currentStability < 60) baseHarm = 12;

            return baseHarm;
        }
    }
}
