// Enhanced Medical Glossary for A&E Mystery Game
// Auto-links terms in case descriptions and provides context-sensitive help

const medicalGlossary = {
    // Cardiac Terms
    "STEMI": {
        term: "STEMI",
        fullName: "ST-Elevation Myocardial Infarction",
        plainEnglish: "A severe type of heart attack where a major heart artery is completely blocked",
        clinicalSignificance: "Requires immediate treatment to restore blood flow",
        category: "cardiac",
        urgency: "critical",
        relatedTerms: ["myocardial infarction", "ECG", "troponin"],
        nhsGuidance: "Call 999 immediately - time is muscle"
    },
    
    "troponin": {
        term: "Troponin",
        fullName: "Cardiac Troponin",
        plainEnglish: "A protein released when heart muscle is damaged",
        clinicalSignificance: "Blood test that indicates possible heart muscle damage",
        category: "cardiac",
        urgency: "high",
        normalRange: "< 0.04 ng/mL",
        interpretation: {
            "normal": "No recent heart damage",
            "elevated": "Suggests heart attack or heart muscle injury",
            "very_high": "Suggests significant myocardial injury"
        }
    },
    
    "ECG": {
        term: "ECG",
        fullName: "Electrocardiogram",
        plainEnglish: "A test that records the electrical activity of your heart",
        clinicalSignificance: "Shows heart rhythm and can detect heart attacks",
        category: "diagnostic",
        urgency: "high",
        procedure: "Sticky pads placed on chest, arms and legs",
        duration: "Takes about 2 minutes",
        painLevel: "Painless"
    },
    
    // Respiratory Terms
    "stridor": {
        term: "Stridor",
        fullName: "Inspiratory Stridor",
        plainEnglish: "A high-pitched sound when breathing in, like a whistle",
        clinicalSignificance: "Suggests narrowing of the upper airway",
        category: "respiratory",
        urgency: "critical",
        commonCauses: ["croup", "foreign body", "allergic reaction"],
        parentGuidance: "Seek immediate medical attention"
    },
    
    // Neurological Terms
    "dysarthria": {
        term: "Dysarthria",
        fullName: "Speech Articulation Disorder",
        plainEnglish: "Slurred or unclear speech due to muscle weakness",
        clinicalSignificance: "May indicate stroke or neurological problem",
        category: "neurological",
        urgency: "high",
        assessment: "Ask patient to repeat 'British Constitution'",
        strokeSign: true
    },
    
    // Procedural Terms
    "tPA": {
        term: "tPA",
        fullName: "Tissue Plasminogen Activator",
        plainEnglish: "A 'clot-busting' medication given for strokes",
        clinicalSignificance: "Can reverse stroke damage if given quickly",
        category: "treatment",
        urgency: "critical",
        timeWindow: "Must be given within 4.5 hours of stroke onset",
        nhsProtocol: "Requires CT scan to rule out bleeding first"
    },
    
    // Surgical Terms
    "appendectomy": {
        term: "Appendectomy",
        fullName: "Surgical Removal of Appendix",
        plainEnglish: "Operation to remove the appendix",
        clinicalSignificance: "Treatment for appendicitis",
        category: "surgical",
        urgency: "urgent",
        approaches: ["laparoscopic (keyhole)", "open surgery"],
        recovery: "Usually 1-3 weeks depending on approach"
    }
};

// Context-sensitive help system
const contextualHelp = {
    "chest_pain_assessment": {
        title: "Assessing Chest Pain in A&E",
        content: "Use SOCRATES: Site, Onset, Character, Radiation, Associated symptoms, Timing, Exacerbating factors, Severity",
        redFlags: ["Crushing pain", "Radiation to arm/jaw", "Sweating", "Nausea"],
        immediateActions: ["ECG within 10 minutes", "IV access", "Oxygen if needed"]
    },
    
    "paediatric_breathing": {
        title: "Paediatric Breathing Assessment",
        content: "Look for: Recession (skin pulling in), Nasal flaring, Grunting, Colour changes",
        normalRates: {
            "infant": "30-60 breaths/minute",
            "toddler": "24-40 breaths/minute", 
            "child": "18-30 breaths/minute"
        },
        urgentSigns: ["Stridor", "Silent chest", "Cyanosis", "Exhaustion"]
    }
};

// Auto-linking configuration
const glossaryConfig = {
    autoLinkTerms: true,
    showDefinitionOnHover: true,
    highlightCriticalTerms: true,
    contextSensitiveHelp: true,
    pronunciationGuide: true // For complex medical terms
};