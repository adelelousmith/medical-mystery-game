// Medical Mystery Game - Constants
// All game constants and configuration values

export const SCORING = {
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

export const GAME_PHASES = {
    WELCOME: 'welcome',
    CASE_SELECTION: 'case-selection',
    PLAYING: 'playing',
    ENDED: 'ended'
};

export const PATIENT_STATES = {
    STABLE: 'stable',
    DETERIORATING: 'deteriorating',
    CRITICAL: 'critical',
    IMPROVING: 'improving'
};

export const DETERIORATION_FACTORS = {
    TIME_PRESSURE: 0.1,
    INCORRECT_ACTIONS: 0.2,
    MISSED_CRITICAL: 0.5,
    IMPROVEMENT: -0.3
};

export const STEAM_ACHIEVEMENTS = {
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

export const SPECIALISTS = {
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
        expertise: ['respiratory', 'breathing', 'asthma'],
        consultationLimit: 2,
        description: 'Lung and respiratory system specialist'
    },
    NEUROLOGIST: {
        id: 'neurologist',
        name: 'Neurologist',
        icon: 'fas fa-brain',
        expertise: ['neurological', 'stroke', 'seizure'],
        consultationLimit: 2,
        description: 'Brain and nervous system specialist'
    },
    SURGEON: {
        id: 'surgeon',
        name: 'Surgeon',
        icon: 'fas fa-user-md',
        expertise: ['surgical', 'trauma', 'appendicitis'],
        consultationLimit: 1,
        description: 'Surgical intervention specialist'
    },
    TOXICOLOGIST: {
        id: 'toxicologist',
        name: 'Toxicologist',
        icon: 'fas fa-flask',
        expertise: ['toxicology', 'overdose', 'poisoning'],
        consultationLimit: 2,
        description: 'Poison and drug overdose specialist'
    },
    PEDIATRICIAN: {
        id: 'pediatrician',
        name: 'Pediatrician',
        icon: 'fas fa-child',
        expertise: ['pediatric', 'child', 'infant'],
        consultationLimit: 2,
        description: 'Children and infant care specialist'
    }
};
