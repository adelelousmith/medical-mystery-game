// Case Enhancement Data - Additive enhancements that don't modify core cases.js
// This file provides additional data for enhanced gameplay without breaking existing functionality

const caseEnhancements = {
    cardiac: {
        // Clue system for logical reasoning
        clues: {
            initial: [
                "Patient collapsed suddenly in waiting room",
                "Complained of chest pain before collapse", 
                "Currently unresponsive with no pulse"
            ],
            revealed: {
                "chest_pain": ["Described as 'crushing' chest pain", "Pain rated 9/10 severity"],
                "radiation_pain": ["Pain radiates to left arm and jaw", "Classic pattern for cardiac event"],
                "ecg": ["12-Lead ECG: Abnormal electrical patterns in inferior leads", "ST-segment elevation noted, suggesting cardiac changes"],
                "troponin": ["Cardiac Troponin I: Markedly elevated at 15.2 ng/mL (normal <0.04)", "Findings consistent with myocardial injury"],
                "sweating": ["Heavy sweating observed", "Body's stress response to heart problems"]
            }
        },
        
        // Dynamic events add tension
        events: [
            {
                trigger: "time_elapsed_90s",
                description: "Wife arrives at bedside, asks 'Is he going to be okay?'",
                impact: "emotional_pressure",
                narrativeText: "The patient's wife clutches your arm, her eyes filled with terror."
            },
            {
                trigger: "test_ecg_ordered",
                description: "ECG machine shows alarming rhythm",
                impact: "clinical_urgency", 
                narrativeText: "The ECG trace shows unmistakable signs of acute cardiac injury."
            }
        ],
        
        // Confidence factors for scoring
        confidenceFactors: {
            "ecg": { weight: 0.35, category: "diagnostic", reasoning: "Essential for identifying STEMI pattern" },
            "troponin": { weight: 0.25, category: "confirmatory", reasoning: "Confirms myocardial damage" },
            "chest_pain": { weight: 0.15, category: "clinical", reasoning: "Key symptom for cardiac events" },
            "radiation_pain": { weight: 0.15, category: "clinical", reasoning: "Classic presentation pattern" },
            "sweating": { weight: 0.10, category: "supportive", reasoning: "Supports sympathetic response" }
        },
        
        // Glossary terms for auto-linking
        glossaryTerms: ["STEMI", "troponin", "myocardial infarction", "ECG", "ST elevation", "diaphoresis"],
        
        // Hint system
        hints: [
            {
                trigger: "confidence_below_40_after_2_minutes",
                text: "For collapsed patients with chest pain, consider immediate cardiac investigations",
                cost: 45,
                source: "Consultant Cardiologist"
            }
        ],
        
        // Enhanced narrative outcomes
        narrativeBranches: {
            "excellent_performance": {
                description: "Rapid diagnosis enables immediate PCI intervention",
                familyReaction: "Wife sobs with relief as husband's pulse returns",
                clinicalOutcome: "Patient makes full recovery with minimal heart damage",
                followUp: "Returns to work in 8 weeks, starts cardiac rehabilitation"
            },
            "good_performance": {
                description: "Timely diagnosis allows effective treatment", 
                familyReaction: "Wife anxiously waits as treatment begins",
                clinicalOutcome: "Patient survives with moderate heart damage",
                followUp: "Requires lifestyle changes and ongoing cardiac monitoring"
            },
            "delayed_diagnosis": {
                description: "Delayed recognition complicates treatment options",
                familyReaction: "Wife becomes increasingly distressed at delays", 
                clinicalOutcome: "Patient survives but with significant heart damage",
                followUp: "Long recovery period, may not return to previous activity level"
            }
        }
    },
    
    // Add enhancements for other cases as needed
    stroke: {
        clues: {
            initial: [
                "Sudden onset weakness on right side",
                "Speech difficulties noted",
                "Patient was watching TV when symptoms began"
            ],
            revealed: {
                "weakness": ["Right arm cannot be lifted", "Right leg weakness evident"],
                "speech_difficulty": ["Slurred speech, difficulty finding words", "Classic dysarthria pattern"],
                "facial_droop": ["Right side facial droop", "Cannot smile symmetrically"]
            }
        },
        
        confidenceFactors: {
            "weakness": { weight: 0.30, category: "clinical", reasoning: "Key stroke symptom" },
            "speech_difficulty": { weight: 0.25, category: "clinical", reasoning: "Indicates brain involvement" },
            "facial_droop": { weight: 0.20, category: "clinical", reasoning: "Classic stroke sign" },
            "ct_scan": { weight: 0.25, category: "diagnostic", reasoning: "Rules out hemorrhage" }
        },
        
        glossaryTerms: ["stroke", "dysarthria", "hemiplegia", "CT scan", "tPA"]
    },
    
    pediatric: {
        clues: {
            initial: [
                "3-year-old with breathing difficulty",
                "High-pitched sound when breathing in",
                "Mum reports barking cough"
            ],
            revealed: {
                "stridor": ["Inspiratory stridor audible", "Upper airway obstruction evident"],
                "cough": ["Characteristic barking cough", "Worse at night"],
                "fever": ["Low-grade fever present", "Child appears unwell"]
            }
        },
        
        confidenceFactors: {
            "stridor": { weight: 0.40, category: "clinical", reasoning: "Pathognomonic for croup" },
            "cough": { weight: 0.30, category: "clinical", reasoning: "Classic barking cough" },
            "breathing_difficulty": { weight: 0.20, category: "clinical", reasoning: "Respiratory distress" },
            "fever": { weight: 0.10, category: "supportive", reasoning: "Supports viral cause" }
        },
        
        glossaryTerms: ["stridor", "croup", "laryngotracheobronchitis", "nebuliser"]
    }
};

// Enhancement configuration
const enhancementConfig = {
    enabled: true,
    features: {
        clueSystem: true,
        confidenceScoring: true,
        dynamicEvents: true,
        hintSystem: true,
        narrativeBranching: true,
        glossaryLinking: true
    }
};

// Helper function to get enhancements for a case
function getCaseEnhancements(caseId) {
    if (!enhancementConfig.enabled || !caseEnhancements[caseId]) {
        return null;
    }
    return caseEnhancements[caseId];
}

// Helper function to merge case data with enhancements
function getEnhancedCase(originalCase) {
    const enhancements = getCaseEnhancements(originalCase.id);
    if (!enhancements) {
        return originalCase;
    }
    
    // Return merged object without modifying original
    return {
        ...originalCase,
        ...enhancements
    };
}