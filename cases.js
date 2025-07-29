// Medical Mystery Game - Case Database
// Enhanced with procedural generation and emotional stakes

// Procedural generation utilities
const PATIENT_GENERATOR = {
    ages: {
        pediatric: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        young: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        adult: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        middle: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
        senior: [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
    },
    
    names: {
        male: ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian', 'George', 'Timothy', 'Ronald', 'Jason', 'Edward', 'Jeffrey', 'Ryan', 'Jacob', 'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott', 'Brandon', 'Benjamin', 'Frank', 'Gregory', 'Raymond', 'Samuel', 'Patrick', 'Alexander', 'Jack', 'Dennis', 'Jerry', 'Tyler', 'Aaron', 'Jose', 'Adam', 'Nathan', 'Henry', 'Douglas', 'Zachary', 'Peter', 'Kyle', 'Walter', 'Ethan', 'Jeremy', 'Harold', 'Carl', 'Keith', 'Roger', 'Gerald', 'Eugene', 'Arthur', 'Terry', 'Sean', 'Christian', 'Lawrence', 'Austin', 'Joe', 'Jesse', 'Billy', 'Bryan', 'Bruce', 'Willie', 'Jordan', 'Dylan', 'Alan', 'Ralph', 'Gabriel', 'Roy', 'Juan', 'Wayne', 'Eugene', 'Logan', 'Randy', 'Louis', 'Russell', 'Vincent', 'Philip', 'Bobby', 'Johnny', 'Johnny'],
        female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly', 'Deborah', 'Dorothy', 'Lisa', 'Nancy', 'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Ruth', 'Sharon', 'Michelle', 'Laura', 'Emily', 'Kimberly', 'Deborah', 'Dorothy']
    },
    
    backgrounds: [
        'Single parent struggling to make ends meet',
        'Veteran with PTSD and limited support',
        'College student away from home for the first time',
        'Elderly person living alone',
        'Pregnant woman in her third trimester',
        'Teenager dealing with depression and bullying',
        'Immigrant family with language barriers',
        'Homeless person with no family contact',
        'Professional athlete with career-threatening injury',
        'Cancer survivor with ongoing complications',
        'Addict trying to get clean',
        'Person with developmental disabilities',
        'Victim of domestic violence',
        'Person with severe anxiety and panic attacks',
        'Someone who recently lost a loved one'
    ],
    
    emotionalStakes: [
        'Patient is the sole caregiver for their elderly parent',
        'Patient has young children at home',
        'Patient is about to graduate medical school',
        'Patient is getting married next week',
        'Patient is the breadwinner for their family',
        'Patient has a job interview tomorrow',
        'Patient is pregnant and this is their first child',
        'Patient is a first responder who helps others',
        'Patient is a teacher with students depending on them',
        'Patient is a musician with a big performance coming up'
    ]
};

function generatePatient(caseType) {
    const ageGroup = caseType === 'pediatric' ? 'pediatric' : 
                    caseType === 'obstetric' ? 'young' : 'adult';
    const age = PATIENT_GENERATOR.ages[ageGroup][Math.floor(Math.random() * PATIENT_GENERATOR.ages[ageGroup].length)];
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const name = PATIENT_GENERATOR.names[gender][Math.floor(Math.random() * PATIENT_GENERATOR.names[gender].length)];
    const background = PATIENT_GENERATOR.backgrounds[Math.floor(Math.random() * PATIENT_GENERATOR.backgrounds.length)];
    const emotionalStake = PATIENT_GENERATOR.emotionalStakes[Math.floor(Math.random() * PATIENT_GENERATOR.emotionalStakes.length)];
    
    return {
        name,
        age,
        gender,
        background,
        emotionalStake,
        demographics: `${age}-year-old ${gender}`
    };
}

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

    obstetric: {
        id: "obstetric",
        title: "Obstetric Emergency - Preterm Labor",
        specialty: "Obstetrics",
        difficulty: "hard",
        icon: "fas fa-baby-carriage",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "preterm_labor",
        description: "A 32-year-old pregnant woman at 28 weeks gestation presents with regular contractions and lower back pain. She's extremely anxious about the health of her baby.",
        patientHistory: {
            demographics: "32-year-old pregnant female",
            pastMedicalHistory: [
                "First pregnancy",
                "Gestational diabetes (diagnosed 2 weeks ago)",
                "Previous miscarriage at 12 weeks",
                "Anxiety and depression"
            ],
            socialHistory: [
                "Married for 5 years",
                "Works as a teacher",
                "Has been trying to conceive for 3 years",
                "Family history of preterm labor"
            ],
            emotionalContext: "Patient is terrified of losing another baby. Her husband is deployed overseas and can't be here. She's alone and extremely vulnerable."
        },
        questions: [
            {
                id: "contractions",
                text: "Are the contractions regular and getting closer together?",
                category: "obstetric",
                critical: true
            },
            {
                id: "water_broken",
                text: "Has her water broken?",
                category: "obstetric",
                critical: true
            },
            {
                id: "bleeding",
                text: "Is there any vaginal bleeding?",
                category: "obstetric",
                critical: true
            },
            {
                id: "fetal_movement",
                text: "Is the baby moving normally?",
                category: "obstetric",
                critical: true
            },
            {
                id: "pain_location",
                text: "Where is the pain located?",
                category: "symptoms",
                critical: false
            }
        ],
        tests: [
            {
                id: "fetal_monitoring",
                name: "Fetal Heart Rate Monitoring",
                description: "Continuous monitoring of baby's heart rate",
                cost: 200,
                timeRequired: 1,
                critical: true
            },
            {
                id: "ultrasound",
                name: "Obstetric Ultrasound",
                description: "Imaging to assess baby's position and amniotic fluid",
                cost: 300,
                timeRequired: 2,
                critical: true
            },
            {
                id: "cervical_exam",
                name: "Cervical Examination",
                description: "Manual examination of cervix dilation",
                cost: 100,
                timeRequired: 1,
                critical: true
            },
            {
                id: "lab_work",
                name: "Laboratory Work",
                description: "Blood tests and urinalysis",
                cost: 150,
                timeRequired: 3,
                critical: false
            }
        ],
        diagnosisOptions: [
            {
                id: "preterm_labor",
                name: "Preterm Labor",
                description: "Labor beginning before 37 weeks gestation",
                correct: true,
                consequences: "Immediate treatment to stop labor and prevent premature birth",
                emotionalImpact: "Labor is successfully stopped, patient relieved but still anxious"
            },
            {
                id: "placental_abruption",
                name: "Placental Abruption",
                description: "Premature separation of placenta from uterus",
                correct: false,
                consequences: "Emergency C-section required to save both lives",
                emotionalImpact: "Baby is born premature but survives, mother traumatized"
            },
            {
                id: "false_labor",
                name: "False Labor (Braxton Hicks)",
                description: "Practice contractions that are not true labor",
                correct: false,
                consequences: "Patient sent home, returns later with actual preterm labor",
                emotionalImpact: "Patient feels dismissed and not taken seriously"
            },
            {
                id: "preeclampsia",
                name: "Preeclampsia",
                description: "Pregnancy complication with high blood pressure",
                correct: false,
                consequences: "Delayed treatment leads to severe complications",
                emotionalImpact: "Both mother and baby suffer, patient loses trust in care"
            }
        ]
    },

    psychiatric: {
        id: "psychiatric",
        title: "Psychiatric Crisis - Suicidal Ideation",
        specialty: "Psychiatry",
        difficulty: "hard",
        icon: "fas fa-brain",
        timeLimit: TIME_PRESSURE.MODERATE,
        correctDiagnosis: "major_depression",
        description: "A 16-year-old high school student is brought to the ER by her parents after they found a suicide note in her room. She appears withdrawn and refuses to speak.",
        patientHistory: {
            demographics: "16-year-old female",
            pastMedicalHistory: [
                "No previous psychiatric hospitalizations",
                "No known medical conditions",
                "No medications"
            ],
            socialHistory: [
                "Honor student with high academic pressure",
                "Recently broken up with boyfriend",
                "Being bullied at school",
                "Parents going through divorce",
                "Lives with mother and stepfather"
            ],
            emotionalContext: "Parents are devastated and blame themselves. They had no idea their daughter was struggling so much. The patient feels like a burden to everyone."
        },
        questions: [
            {
                id: "suicidal_thoughts",
                text: "Does the patient have current suicidal thoughts?",
                category: "psychiatric",
                critical: true
            },
            {
                id: "depression_symptoms",
                text: "Does the patient show signs of depression?",
                category: "psychiatric",
                critical: true
            },
            {
                id: "sleep_changes",
                text: "Has the patient's sleep pattern changed?",
                category: "psychiatric",
                critical: false
            },
            {
                id: "appetite_changes",
                text: "Has the patient's appetite changed?",
                category: "psychiatric",
                critical: false
            },
            {
                id: "social_withdrawal",
                text: "Has the patient withdrawn from friends and activities?",
                category: "psychiatric",
                critical: false
            }
        ],
        tests: [
            {
                id: "psychiatric_eval",
                name: "Psychiatric Evaluation",
                description: "Comprehensive mental health assessment",
                cost: 250,
                timeRequired: 2,
                critical: true
            },
            {
                id: "blood_work",
                name: "Blood Work",
                description: "Rule out medical causes of depression",
                cost: 150,
                timeRequired: 3,
                critical: false
            },
            {
                id: "drug_screen",
                name: "Drug Screen",
                description: "Test for substance use",
                cost: 100,
                timeRequired: 2,
                critical: false
            },
            {
                id: "thyroid_test",
                name: "Thyroid Function Test",
                description: "Check for thyroid disorders",
                cost: 200,
                timeRequired: 4,
                critical: false
            }
        ],
        diagnosisOptions: [
            {
                id: "major_depression",
                name: "Major Depressive Disorder",
                description: "Severe depression with suicidal ideation",
                correct: true,
                consequences: "Immediate psychiatric evaluation and safety planning",
                emotionalImpact: "Patient begins treatment, family gets support and education"
            },
            {
                id: "bipolar_disorder",
                name: "Bipolar Disorder",
                description: "Mood disorder with episodes of depression and mania",
                correct: false,
                consequences: "Wrong medication could worsen symptoms",
                emotionalImpact: "Patient's condition worsens, family confused and frustrated"
            },
            {
                id: "adjustment_disorder",
                name: "Adjustment Disorder",
                description: "Temporary emotional reaction to stress",
                correct: false,
                consequences: "Inadequate treatment for serious depression",
                emotionalImpact: "Patient attempts suicide again, family devastated"
            },
            {
                id: "attention_seeking",
                name: "Attention-Seeking Behavior",
                description: "Cry for help without serious intent",
                correct: false,
                consequences: "Patient dismissed, attempts suicide successfully",
                emotionalImpact: "Patient dies, family and medical team devastated"
            }
        ]
    },

    toxicology: {
        id: "toxicology",
        title: "Toxicology Emergency - Drug Overdose",
        specialty: "Emergency Medicine",
        difficulty: "expert",
        icon: "fas fa-pills",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "opioid_overdose",
        description: "A 28-year-old male is found unconscious in a public restroom. He has pinpoint pupils, slow breathing, and no response to painful stimuli. Empty pill bottles are found nearby.",
        patientHistory: {
            demographics: "28-year-old male",
            pastMedicalHistory: [
                "History of substance abuse",
                "Previous overdose 6 months ago",
                "Depression and anxiety",
                "Chronic back pain from work injury"
            ],
            socialHistory: [
                "Lost his job 3 months ago",
                "Recently divorced",
                "Living in his car",
                "No family support",
                "Former construction worker"
            ],
            emotionalContext: "Patient is a father of two young children who he hasn't seen in months. He's been trying to get clean but relapsed after losing his job."
        },
        questions: [
            {
                id: "consciousness",
                text: "Is the patient conscious and responsive?",
                category: "neurological",
                critical: true
            },
            {
                id: "breathing",
                text: "Is the patient breathing normally?",
                category: "respiratory",
                critical: true
            },
            {
                id: "pupil_size",
                text: "Are the pupils pinpoint (very small)?",
                category: "neurological",
                critical: true
            },
            {
                id: "skin_color",
                text: "Is the patient's skin blue or pale?",
                category: "symptoms",
                critical: true
            },
            {
                id: "needle_marks",
                text: "Are there needle marks on the arms?",
                category: "symptoms",
                critical: false
            }
        ],
        tests: [
            {
                id: "drug_screen",
                name: "Comprehensive Drug Screen",
                description: "Blood and urine tests for multiple substances",
                cost: 300,
                timeRequired: 2,
                critical: true
            },
            {
                id: "blood_work",
                name: "Complete Blood Count",
                description: "Assess organ function and blood chemistry",
                cost: 150,
                timeRequired: 1,
                critical: true
            },
            {
                id: "liver_function",
                name: "Liver Function Tests",
                description: "Check for liver damage from overdose",
                cost: 200,
                timeRequired: 3,
                critical: false
            },
            {
                id: "kidney_function",
                name: "Kidney Function Tests",
                description: "Assess kidney function",
                cost: 200,
                timeRequired: 3,
                critical: false
            }
        ],
        diagnosisOptions: [
            {
                id: "opioid_overdose",
                name: "Opioid Overdose",
                description: "Overdose of prescription or illicit opioids",
                correct: true,
                consequences: "Immediate administration of naloxone and supportive care",
                emotionalImpact: "Patient survives and agrees to addiction treatment"
            },
            {
                id: "benzodiazepine_overdose",
                name: "Benzodiazepine Overdose",
                description: "Overdose of anti-anxiety medications",
                correct: false,
                consequences: "Wrong treatment delays proper care",
                emotionalImpact: "Patient suffers complications, family angry at medical team"
            },
            {
                id: "alcohol_poisoning",
                name: "Alcohol Poisoning",
                description: "Severe alcohol intoxication",
                correct: false,
                consequences: "Patient receives wrong treatment",
                emotionalImpact: "Patient's condition worsens, family loses trust"
            },
            {
                id: "head_injury",
                name: "Traumatic Brain Injury",
                description: "Head injury causing unconsciousness",
                correct: false,
                consequences: "Delayed treatment for actual overdose",
                emotionalImpact: "Patient dies, family devastated and blames medical team"
            }
        ]
    }
};

// Helper functions for case management
function getCase(caseId) {
    return medicalCases[caseId] || null;
}

function getAllCases() {
    return Object.values(medicalCases);
}

function getCasesByDifficulty(difficulty) {
    return Object.values(medicalCases).filter(case_ => case_.difficulty === difficulty);
}

function getCasesBySpecialty(specialty) {
    return Object.values(medicalCases).filter(case_ => case_.specialty === specialty);
}

function generateRandomCase() {
    const caseIds = Object.keys(medicalCases);
    const randomId = caseIds[Math.floor(Math.random() * caseIds.length)];
    return medicalCases[randomId];
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { medicalCases, getCase, getAllCases, getCasesByDifficulty, getCasesBySpecialty, generateRandomCase };
}

// Expose to global scope for testing
if (typeof global !== 'undefined') {
    global.medicalCases = medicalCases;
    global.getCase = getCase;
    global.getAllCases = getAllCases;
    global.getCasesByDifficulty = getCasesByDifficulty;
    global.getCasesBySpecialty = getCasesBySpecialty;
    global.generateRandomCase = generateRandomCase;
}

// Expose to window scope for browser
if (typeof window !== 'undefined') {
    window.medicalCases = medicalCases;
    window.getCase = getCase;
    window.getAllCases = getAllCases;
    window.getCasesByDifficulty = getCasesByDifficulty;
    window.getCasesBySpecialty = getCasesBySpecialty;
    window.generateRandomCase = generateRandomCase;
} 