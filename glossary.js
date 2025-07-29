// Medical Glossary - Terms and Definitions
const medicalTerms = {
    "Myocardial Infarction": {
        term: "Myocardial Infarction",
        definition: "Heart attack caused by blocked blood flow to the heart muscle, leading to tissue death and potential heart failure.",
        category: "cardiac",
        importance: "high"
    },
    "Chest Pain": {
        term: "Chest Pain",
        definition: "Pain or discomfort in the chest area, often indicating cardiac, respiratory, or gastrointestinal issues.",
        category: "cardiac",
        importance: "high"
    },
    "Shortness of Breath": {
        term: "Shortness of Breath",
        definition: "Difficulty breathing or feeling unable to get enough air, common in cardiac and respiratory conditions.",
        category: "respiratory",
        importance: "high"
    },
    "Asthma": {
        term: "Asthma",
        definition: "Chronic inflammatory airway disease causing reversible bronchospasm and breathing difficulties.",
        category: "respiratory",
        importance: "medium"
    },
    "Stroke": {
        term: "Stroke",
        definition: "Brain damage from interrupted blood flow or bleeding, causing neurological deficits.",
        category: "neurological",
        importance: "high"
    },
    "Weakness": {
        term: "Weakness",
        definition: "Reduced muscle strength, often indicating neurological or systemic disease.",
        category: "neurological",
        importance: "medium"
    },
    "EKG": {
        term: "EKG",
        definition: "Electrocardiogram - measures heart's electrical activity to detect rhythm problems and heart attacks.",
        category: "cardiac",
        importance: "high"
    },
    "Troponin": {
        term: "Troponin",
        definition: "Protein released during heart muscle damage, key indicator of heart attack when levels are elevated.",
        category: "cardiac",
        importance: "high"
    },
    "STEMI": {
        term: "STEMI",
        definition: "ST-Elevation Myocardial Infarction - severe heart attack showing characteristic EKG changes.",
        category: "cardiac",
        importance: "high"
    },
    "Angina": {
        term: "Angina",
        definition: "Chest pain from reduced blood flow to heart, often triggered by exertion or stress.",
        category: "cardiac",
        importance: "medium"
    },
    "Hypertension": {
        term: "Hypertension",
        definition: "High blood pressure, major risk factor for heart disease and stroke.",
        category: "cardiac",
        importance: "medium"
    },
    "Atrial Fibrillation": {
        term: "Atrial Fibrillation",
        definition: "Irregular heart rhythm in upper chambers, increases risk of stroke and heart failure.",
        category: "cardiac",
        importance: "medium"
    },
    "COPD": {
        term: "COPD",
        definition: "Chronic Obstructive Pulmonary Disease - progressive lung disease causing airflow obstruction.",
        category: "respiratory",
        importance: "medium"
    },
    "Pneumonia": {
        term: "Pneumonia",
        definition: "Infection of lung tissue causing inflammation and respiratory distress.",
        category: "respiratory",
        importance: "medium"
    },
    "Pneumothorax": {
        term: "Pneumothorax",
        definition: "Air between lung and chest wall causing lung collapse, medical emergency.",
        category: "respiratory",
        importance: "high"
    },
    "Pulse Oximetry": {
        term: "Pulse Oximetry",
        definition: "Non-invasive measurement of blood oxygen saturation, quick respiratory assessment.",
        category: "respiratory",
        importance: "medium"
    },
    "Peak Flow": {
        term: "Peak Flow",
        definition: "Maximum speed of air expelled from lungs, measures asthma severity and treatment effectiveness.",
        category: "respiratory",
        importance: "medium"
    },
    "Chest X-Ray": {
        term: "Chest X-Ray",
        definition: "Basic chest imaging to detect pneumonia, heart enlargement, and lung problems.",
        category: "respiratory",
        importance: "medium"
    },
    "CT Scan": {
        term: "CT Scan",
        definition: "Computed Tomography - detailed cross-sectional imaging for stroke, trauma, and complex diagnoses.",
        category: "general",
        importance: "high"
    },
    "MRI": {
        term: "MRI",
        definition: "Magnetic Resonance Imaging - detailed brain imaging, most sensitive for stroke detection.",
        category: "neurological",
        importance: "high"
    },
    "Pulmonary Congestion": {
        term: "Pulmonary Congestion",
        definition: "Fluid buildup in lungs, sign of heart failure or fluid overload.",
        category: "general",
        importance: "medium"
    },
    "Ejection Fraction": {
        term: "Ejection Fraction",
        definition: "Heart's pumping efficiency percentage, normal is 50-70%, lower numbers mean weaker pumping.",
        category: "general",
        importance: "medium"
    },
    "INR": {
        term: "INR",
        definition: "International Normalized Ratio - measures blood clotting, monitors warfarin therapy effectiveness.",
        category: "general",
        importance: "medium"
    },
    "CBC": {
        term: "CBC",
        definition: "Complete Blood Count - basic blood cell analysis, screens for infection, anemia, and blood disorders.",
        category: "general",
        importance: "medium"
    },
    "Hypoxemia": {
        term: "Hypoxemia",
        definition: "Low oxygen levels in blood, sign of respiratory or cardiac problems.",
        category: "general",
        importance: "medium"
    },
    "Leukocytosis": {
        term: "Leukocytosis",
        definition: "Elevated white blood cell count, often indicates infection or inflammation.",
        category: "general",
        importance: "medium"
    },
    "Cardiomegaly": {
        term: "Cardiomegaly",
        definition: "Enlarged heart, sign of heart disease or heart failure.",
        category: "general",
        importance: "medium"
    },
    "Cardiac Arrest": {
        term: "Cardiac Arrest",
        definition: "Sudden loss of heart function, breathing, and consciousness, requires immediate CPR and defibrillation.",
        category: "cardiac",
        importance: "high"
    }
};

// Categories with metadata
const categories = {
    cardiac: {
        name: "Cardiology",
        icon: "fas fa-heartbeat",
        color: "#ff6b6b"
    },
    respiratory: {
        name: "Pulmonology", 
        icon: "fas fa-lungs",
        color: "#4ecdc4"
    },
    neurological: {
        name: "Neurology",
        icon: "fas fa-brain", 
        color: "#45b7d1"
    },
    general: {
        name: "General",
        icon: "fas fa-stethoscope",
        color: "#96ceb4"
    }
};

// Helper functions
function getTermsByCategory(category) {
    return Object.values(medicalTerms).filter(term => term.category === category);
}

function searchTerms(query) {
    if (!query || query.trim() === '') {
        return [];
    }
    
    const searchQuery = query.toLowerCase().trim();
    return Object.values(medicalTerms).filter(term => 
        term.term.toLowerCase().includes(searchQuery) || 
        term.definition.toLowerCase().includes(searchQuery)
    );
}

function getAllTerms() {
    return Object.values(medicalTerms);
}