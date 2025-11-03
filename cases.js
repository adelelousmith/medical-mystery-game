// Medical Mystery Game - Case Database
// Enhanced with procedural generation and emotional stakes

// Time pressure mechanics
const TIME_PRESSURE = {
    CRITICAL: 3, // 3 minutes for critical cases
    URGENT: 5,   // 5 minutes for urgent cases
    MODERATE: 8, // 8 minutes for moderate cases
    ROUTINE: 12  // 12 minutes for routine cases
};

// Enhanced medical cases with procedural generation and emotional stakes
const medicalCases = {
    cardiac: {
        id: "cardiac",
        title: "Code Blue - Cardiac Arrest",
        specialty: "Cardiology",
        category: "cardiac",
        difficulty: "expert",
        icon: "fas fa-heartbeat",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "myocardial_infarction",
        description: "A 58-year-old male collapses in the waiting room. Bystanders report he was complaining of chest pain and shortness of breath before losing consciousness. The patient is unresponsive with no pulse.",
        patientHistory: {
            demographics: "58-year-old male",
            pastMedicalHistory: [
                "Hypertension (diagnosed 5 years ago)",
                "Type 2 diabetes (diagnosed 3 years ago)",
                "High cholesterol",
                "Previous stent placement (2 years ago)"
            ],
            socialHistory: [
                "Smokes 1 pack per day for 30 years",
                "Sedentary lifestyle",
                "High-stress job as a construction supervisor",
                "Family history of heart disease"
            ],
            familyHistory: [
                "Father died of heart attack at age 62",
                "Mother has diabetes",
                "Brother has high blood pressure"
            ],
            medications: [
                "Metformin 500mg twice daily",
                "Lisinopril 10mg daily",
                "Atorvastatin 20mg daily"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "6 months ago - told to lose weight and exercise more",
            emotionalContext: "Patient is the primary breadwinner for his family of four. His wife is in the waiting room, extremely distressed."
        },
        questions: [
            {
                id: "chest_pain",
                text: "Does the patient have chest pain or pressure?",
                category: "symptoms",
                critical: true
            },
            {
                id: "shortness_breath",
                text: "Is the patient experiencing shortness of breath?",
                category: "symptoms",
                critical: true
            },
            {
                id: "sweating",
                text: "Is the patient diaphoretic (sweating profusely)?",
                category: "symptoms",
                critical: false
            },
            {
                id: "nausea",
                text: "Does the patient have nausea or vomiting?",
                category: "symptoms",
                critical: false
            },
            {
                id: "radiation_pain",
                text: "Does the pain radiate to the arm, jaw, or back?",
                category: "symptoms",
                critical: true
            }
        ],
        tests: [
            {
                id: "ecg",
                name: "12-Lead ECG",
                description: "Electrocardiogram to assess heart rhythm and detect ischemia",
                cost: 150,
                timeRequired: 2,
                critical: true
            },
            {
                id: "troponin",
                name: "Troponin Test",
                description: "Blood test to detect heart muscle damage",
                cost: 200,
                timeRequired: 3,
                critical: true
            },
            {
                id: "chest_xray",
                name: "Chest X-Ray",
                description: "Imaging to rule out other causes of chest pain",
                cost: 100,
                timeRequired: 4,
                critical: false
            },
            {
                id: "cardiac_enzymes",
                name: "Cardiac Enzymes Panel",
                description: "Comprehensive blood work for cardiac markers",
                cost: 300,
                timeRequired: 5,
                critical: false
            }
        ],
        diagnosisOptions: [
            {
                id: "myocardial_infarction",
                name: "Acute Myocardial Infarction (Heart Attack)",
                description: "Complete blockage of coronary artery causing heart muscle death",
                correct: true,
                consequences: "Immediate intervention required: thrombolytics, angioplasty, or bypass surgery",
                emotionalImpact: "Patient's family is devastated but grateful for quick action"
            },
            {
                id: "angina",
                name: "Stable Angina",
                description: "Chest pain due to reduced blood flow to heart",
                correct: false,
                consequences: "Delayed treatment could lead to heart attack",
                emotionalImpact: "Patient's condition worsens, family blames medical team"
            },
            {
                id: "aortic_dissection",
                name: "Aortic Dissection",
                description: "Tear in the aorta wall",
                correct: false,
                consequences: "Life-threatening emergency requiring immediate surgery",
                emotionalImpact: "Patient dies, family sues hospital for misdiagnosis"
            },
            {
                id: "pneumonia",
                name: "Pneumonia",
                description: "Lung infection causing chest pain",
                correct: false,
                consequences: "Patient receives wrong treatment, cardiac condition worsens",
                emotionalImpact: "Patient suffers additional complications, family loses trust"
            }
        ]
    },

    trauma: {
        id: "trauma",
        title: "Trauma Alert - Multi-System Injury",
        specialty: "Emergency Medicine",
        category: "trauma",
        difficulty: "expert",
        icon: "fas fa-ambulance",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "internal_bleeding",
        description: "A 24-year-old male arrives via ambulance after a high-speed motorcycle accident. Patient is conscious but confused, with multiple injuries and signs of shock.",
        patientHistory: {
            demographics: "24-year-old male",
            pastMedicalHistory: [
                "No significant medical history",
                "Previous motorcycle accident (minor injuries)",
                "No known allergies"
            ],
            socialHistory: [
                "Motorcycle enthusiast",
                "Works as a software engineer",
                "Recently engaged",
                "No helmet use (patient admits)"
            ],
            familyHistory: [
                "No significant family history"
            ],
            medications: [
                "No regular medications"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "1 year ago - normal",
            emotionalContext: "Patient's fiancée arrives in hysterics. They were planning their wedding for next month."
        },
        questions: [
            {
                id: "consciousness",
                text: "Is the patient alert and oriented?",
                category: "neurological",
                critical: true
            },
            {
                id: "abdominal_pain",
                text: "Does the patient have severe abdominal pain?",
                category: "symptoms",
                critical: true
            },
            {
                id: "bleeding",
                text: "Is there visible bleeding or bruising?",
                category: "symptoms",
                critical: true
            },
            {
                id: "breathing",
                text: "Is the patient breathing normally?",
                category: "respiratory",
                critical: true
            },
            {
                id: "extremity_movement",
                text: "Can the patient move all extremities?",
                category: "neurological",
                critical: true
            }
        ],
        tests: [
            {
                id: "ct_scan",
                name: "CT Scan (Head/Abdomen)",
                description: "Comprehensive imaging to assess internal injuries",
                cost: 800,
                timeRequired: 3,
                critical: true
            },
            {
                id: "xray_series",
                name: "X-Ray Series",
                description: "Chest, pelvis, and extremity X-rays",
                cost: 400,
                timeRequired: 2,
                critical: true
            },
            {
                id: "blood_work",
                name: "Complete Blood Count",
                description: "Blood tests to assess for internal bleeding",
                cost: 150,
                timeRequired: 1,
                critical: true
            },
            {
                id: "ultrasound",
                name: "FAST Ultrasound",
                description: "Focused assessment for trauma",
                cost: 200,
                timeRequired: 1,
                critical: true
            }
        ],
        diagnosisOptions: [
            {
                id: "internal_bleeding",
                name: "Internal Bleeding with Hemorrhagic Shock",
                description: "Severe internal bleeding causing life-threatening shock",
                correct: true,
                consequences: "Immediate surgery required to stop bleeding",
                emotionalImpact: "Patient survives but fiancée is traumatized by the experience"
            },
            {
                id: "head_injury",
                name: "Traumatic Brain Injury",
                description: "Severe head injury with intracranial bleeding",
                correct: false,
                consequences: "Delayed treatment leads to permanent brain damage",
                emotionalImpact: "Patient becomes permanently disabled, family devastated"
            },
            {
                id: "spinal_injury",
                name: "Spinal Cord Injury",
                description: "Damage to spinal cord causing paralysis",
                correct: false,
                consequences: "Patient becomes paralyzed due to delayed treatment",
                emotionalImpact: "Patient's life completely changed, family struggles with care"
            },
            {
                id: "minor_injuries",
                name: "Minor Injuries Only",
                description: "Superficial injuries with no internal damage",
                correct: false,
                consequences: "Patient dies from undetected internal bleeding",
                emotionalImpact: "Patient dies, family sues for medical malpractice"
            }
        ]
    },

    pediatric: {
        id: "pediatric",
        title: "Pediatric Emergency - Respiratory Distress",
        specialty: "Pediatrics",
        category: "respiratory",
        difficulty: "hard",
        icon: "fas fa-baby",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "croup",
        description: "A 3-year-old girl is brought to the ER by her frantic mother. The child is struggling to breathe and making a high-pitched sound when inhaling. She has a fever and has been coughing for the past 2 days.",
        patientHistory: {
            demographics: "3-year-old female",
            pastMedicalHistory: [
                "No significant medical history",
                "Up to date on vaccinations",
                "No known allergies"
            ],
            socialHistory: [
                "Attends daycare",
                "Lives with single mother",
                "Mother works two jobs to support them",
                "No other family nearby"
            ],
            familyHistory: [
                "No significant family history"
            ],
            medications: [
                "Children's Tylenol as needed"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "2 months ago - normal growth and development",
            emotionalContext: "Mother is extremely anxious and blames herself for not bringing the child in sooner. She's worried about missing work and losing her job."
        },
        questions: [
            {
                id: "breathing_difficulty",
                text: "Is the child having difficulty breathing?",
                category: "respiratory",
                critical: true
            },
            {
                id: "fever",
                text: "Does the child have a fever?",
                category: "symptoms",
                critical: false
            },
            {
                id: "cough",
                text: "Is the child coughing?",
                category: "symptoms",
                critical: false
            },
            {
                id: "stridor",
                text: "Is there a high-pitched sound when breathing in?",
                category: "respiratory",
                critical: true
            },
            {
                id: "activity_level",
                text: "Is the child less active than usual?",
                category: "behavioral",
                critical: false
            }
        ],
        tests: [
            {
                id: "pulse_oximetry",
                name: "Pulse Oximetry",
                description: "Non-invasive oxygen saturation monitoring",
                cost: 50,
                timeRequired: 1,
                critical: true
            },
            {
                id: "chest_xray",
                name: "Chest X-Ray",
                description: "Imaging to assess airway and lung condition",
                cost: 100,
                timeRequired: 2,
                critical: true
            },
            {
                id: "blood_work",
                name: "Blood Work",
                description: "Complete blood count and inflammatory markers",
                cost: 150,
                timeRequired: 3,
                critical: false
            },
            {
                id: "viral_test",
                name: "Viral Panel",
                description: "Testing for common respiratory viruses",
                cost: 200,
                timeRequired: 4,
                critical: false
            }
        ],
        diagnosisOptions: [
            {
                id: "croup",
                name: "Croup (Laryngotracheobronchitis)",
                description: "Viral infection causing airway inflammation and narrowing",
                correct: true,
                consequences: "Treatment with humidified air, steroids, and monitoring",
                emotionalImpact: "Child recovers quickly, mother relieved and grateful"
            },
            {
                id: "epiglottitis",
                name: "Epiglottitis",
                description: "Bacterial infection of the epiglottis",
                correct: false,
                consequences: "Delayed treatment could lead to complete airway obstruction",
                emotionalImpact: "Child's condition worsens, mother becomes hysterical"
            },
            {
                id: "foreign_body",
                name: "Foreign Body Aspiration",
                description: "Object lodged in airway",
                correct: false,
                consequences: "Child could suffocate without immediate intervention",
                emotionalImpact: "Child dies, mother blames herself for not watching more closely"
            },
            {
                id: "asthma",
                name: "Asthma Exacerbation",
                description: "Acute asthma attack",
                correct: false,
                consequences: "Wrong treatment delays proper care",
                emotionalImpact: "Child suffers unnecessarily, mother loses trust in medical team"
            }
        ]
    },

    toxicology: {
        id: "toxicology",
        title: "Toxicology Emergency - Drug Overdose",
        specialty: "Emergency Medicine",
        category: "toxicology",
        difficulty: "expert",
        icon: "fas fa-pills",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "opioid_overdose",
        description: "A 25-year-old male is brought to the ER unconscious by friends. They report he was using drugs at a party and suddenly collapsed. Patient is barely breathing and unresponsive.",
        patientHistory: {
            demographics: "25-year-old male",
            pastMedicalHistory: [
                "History of substance abuse",
                "Previous overdose 6 months ago",
                "Depression and anxiety",
                "No known allergies"
            ],
            socialHistory: [
                "Unemployed",
                "Lives with friends",
                "History of IV drug use",
                "Recently lost girlfriend to overdose",
                "No family contact"
            ],
            familyHistory: [
                "Father has alcohol addiction",
                "Mother died of overdose"
            ],
            medications: [
                "No prescribed medications"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "Over 2 years ago",
            emotionalContext: "Patient's friends are terrified and blame themselves. They delayed calling 911 because they were afraid of getting in trouble. Patient has been struggling since his girlfriend's death."
        },
        questions: [
            {
                id: "consciousness",
                text: "What is the patient's level of consciousness?",
                category: "neurological",
                critical: true
            },
            {
                id: "breathing",
                text: "How is the patient's breathing?",
                category: "respiratory",
                critical: true
            },
            {
                id: "pupil_size",
                text: "What do the patient's pupils look like?",
                category: "neurological",
                critical: true
            },
            {
                id: "skin_color",
                text: "What is the patient's skin color?",
                category: "symptoms",
                critical: true
            },
            {
                id: "needle_marks",
                text: "Are there any needle marks or track marks?",
                category: "symptoms",
                critical: true
            }
        ],
        tests: [
            {
                id: "drug_screen",
                name: "Comprehensive Drug Screen",
                description: "Blood and urine tests for common drugs of abuse",
                cost: 300,
                timeRequired: 2,
                critical: true
            },
            {
                id: "blood_gas",
                name: "Arterial Blood Gas",
                description: "Assessment of oxygen, carbon dioxide, and pH levels",
                cost: 150,
                timeRequired: 1,
                critical: true
            },
            {
                id: "basic_metabolic",
                name: "Basic Metabolic Panel",
                description: "Electrolytes, kidney function, and glucose",
                cost: 100,
                timeRequired: 2,
                critical: false
            },
            {
                id: "liver_function",
                name: "Liver Function Tests",
                description: "Assessment of liver damage from drug use",
                cost: 200,
                timeRequired: 3,
                critical: false
            }
        ],
        diagnosisOptions: [
            {
                id: "opioid_overdose",
                name: "Opioid Overdose",
                description: "Life-threatening overdose from heroin or prescription opioids",
                correct: true,
                consequences: "Immediate naloxone administration saves patient's life",
                emotionalImpact: "Patient survives but needs addiction treatment. Friends are relieved but traumatized."
            },
            {
                id: "alcohol_poisoning",
                name: "Alcohol Poisoning",
                description: "Severe alcohol intoxication",
                correct: false,
                consequences: "Wrong treatment delays life-saving naloxone",
                emotionalImpact: "Patient dies from respiratory depression, friends devastated"
            },
            {
                id: "diabetic_coma",
                name: "Diabetic Coma",
                description: "Severe hypoglycemia or ketoacidosis",
                correct: false,
                consequences: "Patient receives glucose instead of naloxone",
                emotionalImpact: "Patient dies, family sues for misdiagnosis"
            },
            {
                id: "head_injury",
                name: "Traumatic Brain Injury",
                description: "Head injury from fall during drug use",
                correct: false,
                consequences: "Focus on head injury misses overdose",
                emotionalImpact: "Patient dies from untreated overdose"
            }
        ]
    },

    stroke: {
        id: "stroke",
        title: "Acute Stroke - Neurological Emergency",
        specialty: "Neurology",
        category: "neurological",
        difficulty: "medium",
        icon: "fas fa-brain",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "ischemic_stroke",
        description: "A 72-year-old man is brought to the ER by his daughter after suddenly developing weakness on his right side and difficulty speaking. The symptoms started about 2 hours ago while he was watching TV.",
        patientHistory: {
            demographics: "72-year-old male",
            pastMedicalHistory: [
                "Hypertension for 15 years",
                "Atrial fibrillation diagnosed 3 years ago",
                "Type 2 diabetes for 10 years",
                "High cholesterol",
                "Previous TIA (mini-stroke) 1 year ago"
            ],
            socialHistory: [
                "Retired school principal",
                "Lives independently with occasional help from daughter",
                "Non-smoker, quit 20 years ago",
                "Occasional glass of wine with dinner"
            ],
            familyHistory: [
                "Father died of stroke at age 78",
                "Mother had dementia",
                "Sister has heart disease"
            ],
            medications: [
                "Warfarin 5mg daily (blood thinner)",
                "Metoprolol 50mg twice daily",
                "Metformin 1000mg twice daily",
                "Atorvastatin 40mg daily"
            ],
            allergies: "Penicillin (rash)",
            lastPhysical: "2 months ago - blood pressure well controlled",
            emotionalContext: "Daughter is terrified and blames herself for not visiting more often. Patient is confused and frustrated by his inability to speak clearly."
        },
        questions: [
            {
                id: "weakness",
                text: "Does the patient have weakness on one side of the body?",
                category: "neurological",
                critical: true
            },
            {
                id: "speech_difficulty",
                text: "Is the patient having difficulty speaking or understanding?",
                category: "neurological",
                critical: true
            },
            {
                id: "facial_droop",
                text: "Does the patient have facial drooping?",
                category: "neurological",
                critical: true
            },
            {
                id: "time_onset",
                text: "When did the symptoms start?",
                category: "history",
                critical: true
            },
            {
                id: "consciousness",
                text: "Is the patient alert and responsive?",
                category: "neurological",
                critical: false
            }
        ],
        tests: [
            {
                id: "ct_head",
                name: "CT Head (Non-contrast)",
                description: "Emergency brain imaging to rule out hemorrhage",
                cost: 600,
                timeRequired: 2,
                critical: true
            },
            {
                id: "blood_work",
                name: "Complete Blood Count & Coagulation",
                description: "Check blood counts and clotting function",
                cost: 200,
                timeRequired: 2,
                critical: true
            },
            {
                id: "ecg",
                name: "12-Lead ECG",
                description: "Check for atrial fibrillation or other heart rhythm problems",
                cost: 150,
                timeRequired: 1,
                critical: false
            },
            {
                id: "glucose",
                name: "Blood Glucose",
                description: "Rule out hypoglycemia mimicking stroke",
                cost: 25,
                timeRequired: 1,
                critical: true
            }
        ],
        diagnosisOptions: [
            {
                id: "ischemic_stroke",
                name: "Acute Ischemic Stroke",
                description: "Blood clot blocking brain artery causing brain tissue death",
                correct: true,
                consequences: "Immediate tPA (clot-buster) treatment restores blood flow. Patient recovers most function.",
                emotionalImpact: "Daughter relieved by quick treatment. Patient grateful for regaining speech and movement."
            },
            {
                id: "hemorrhagic_stroke",
                name: "Hemorrhagic Stroke",
                description: "Bleeding in the brain causing neurological symptoms",
                correct: false,
                consequences: "tPA given inappropriately, causing dangerous bleeding. Patient's condition worsens.",
                emotionalImpact: "Patient suffers severe complications, family devastated by medical error"
            },
            {
                id: "hypoglycemia",
                name: "Severe Hypoglycemia",
                description: "Low blood sugar causing stroke-like symptoms",
                correct: false,
                consequences: "Stroke treatment delayed while treating blood sugar. Window for tPA closes.",
                emotionalImpact: "Patient has permanent disability, daughter blames herself and medical team"
            },
            {
                id: "seizure",
                name: "Post-ictal State (After Seizure)",
                description: "Confusion and weakness following an unwitnessed seizure",
                correct: false,
                consequences: "Anti-seizure medication given, stroke goes untreated. Permanent brain damage.",
                emotionalImpact: "Patient never recovers speech, family struggles with long-term care needs"
            }
        ]
    },

    abdominal_pain: {
        id: "abdominal_pain",
        title: "Acute Abdomen - Surgical Emergency",
        specialty: "General Surgery",
        category: "surgical",
        difficulty: "medium",
        icon: "fas fa-procedures",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "appendicitis",
        description: "A 45-year-old woman presents to the ER with severe abdominal pain that started this morning. The pain began around her belly button and has now moved to the right lower abdomen. She feels nauseous and has vomited twice.",
        patientHistory: {
            demographics: "45-year-old female",
            pastMedicalHistory: [
                "No significant medical history",
                "Two previous pregnancies, normal deliveries",
                "Cholecystectomy (gallbladder removal) 5 years ago",
                "No known allergies"
            ],
            socialHistory: [
                "Works as a high school teacher",
                "Married with two teenage children",
                "Non-smoker, occasional social drinking",
                "Regular exercise, healthy diet"
            ],
            familyHistory: [
                "Mother had breast cancer",
                "Father has diabetes",
                "No family history of appendicitis"
            ],
            medications: [
                "Multivitamin daily",
                "Ibuprofen occasionally for headaches"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "1 year ago - normal",
            emotionalContext: "Patient is in significant pain and worried about missing work. Husband is concerned and drove her to the ER. She's never had pain like this before."
        },
        questions: [
            {
                id: "pain_location",
                text: "Where exactly is the pain located?",
                category: "symptoms",
                critical: true
            },
            {
                id: "pain_migration",
                text: "Has the pain moved from one area to another?",
                category: "symptoms",
                critical: true
            },
            {
                id: "nausea_vomiting",
                text: "Is the patient experiencing nausea or vomiting?",
                category: "symptoms",
                critical: true
            },
            {
                id: "fever",
                text: "Does the patient have a fever?",
                category: "symptoms",
                critical: false
            },
            {
                id: "appetite",
                text: "Has the patient lost their appetite?",
                category: "symptoms",
                critical: false
            }
        ],
        tests: [
            {
                id: "ct_abdomen",
                name: "CT Scan Abdomen/Pelvis",
                description: "Detailed imaging to visualize appendix and rule out other causes",
                cost: 800,
                timeRequired: 2,
                critical: true
            },
            {
                id: "blood_work",
                name: "Complete Blood Count",
                description: "Check white blood cell count for signs of infection",
                cost: 150,
                timeRequired: 2,
                critical: true
            },
            {
                id: "urinalysis",
                name: "Urinalysis",
                description: "Rule out urinary tract infection or kidney stones",
                cost: 75,
                timeRequired: 1,
                critical: false
            },
            {
                id: "pregnancy_test",
                name: "Pregnancy Test",
                description: "Rule out ectopic pregnancy in women of childbearing age",
                cost: 50,
                timeRequired: 1,
                critical: true
            }
        ],
        diagnosisOptions: [
            {
                id: "appendicitis",
                name: "Acute Appendicitis",
                description: "Inflammation of the appendix requiring surgical removal",
                correct: true,
                consequences: "Emergency appendectomy performed successfully. Patient recovers well.",
                emotionalImpact: "Patient relieved to have diagnosis. Family grateful for quick treatment."
            },
            {
                id: "kidney_stones",
                name: "Kidney Stones",
                description: "Stones in urinary tract causing severe pain",
                correct: false,
                consequences: "Appendix ruptures while treating for kidney stones, causing peritonitis",
                emotionalImpact: "Patient becomes critically ill, family devastated by complications"
            },
            {
                id: "gastroenteritis",
                name: "Gastroenteritis",
                description: "Stomach flu causing abdominal pain and vomiting",
                correct: false,
                consequences: "Patient sent home, returns with ruptured appendix and sepsis",
                emotionalImpact: "Patient nearly dies, family sues hospital for misdiagnosis"
            },
            {
                id: "ovarian_cyst",
                name: "Ovarian Cyst Rupture",
                description: "Ruptured ovarian cyst causing abdominal pain",
                correct: false,
                consequences: "Gynecology consulted, appendicitis missed until rupture occurs",
                emotionalImpact: "Patient requires emergency surgery, prolonged recovery"
            }
        ]
    }
};

// Helper functions for cases
function getAllCases() {
    return Object.values(medicalCases);
}

function getCase(caseId) {
    return medicalCases[caseId];
}

// Export cases for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { medicalCases, getAllCases, getCase, TIME_PRESSURE };
}