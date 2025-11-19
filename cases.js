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
        title: "Collapsed Patient - Adult Male",
        specialty: "General Medicine",
        category: "cardiac",
        difficulty: "expert",
        icon: "fas fa-heartbeat",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "myocardial_infarction",
        description: "A 58-year-old male collapses in the waiting room. Bystanders report he was clutching his chest and gasping for air before losing consciousness. The patient is unresponsive but has a weak, irregular pulse. He requires immediate resuscitation.",
        
        // NEW: Narrative enhancements for drama and immersion
        progressMessages: {
            examine: [
                "The monitors are screaming. Every second counts now.",
                "His wife's eyes search yours for answers you don't have yet.",
                "The team moves with practiced urgency — this isn't their first cardiac arrest.",
                "You feel the weight of the decision ahead. Get this wrong and..."
            ],
            diagnose: [
                "The evidence is mounting. The pattern becomes clearer.",
                "Lab results flash on screen. The numbers tell a story.",
                "Everything points to one conclusion. Time to commit.",
                "The registrar nods grimly. 'What's your call, doctor?'"
            ],
            treat: [
                "Treatment initiated. The monitors start to respond.",
                "His pulse strengthens — still weak, but improving. The team exhales.",
                "Every intervention matters now. No room for error.",
                "The wife grips your hand. 'Is he going to be alright?'"
            ]
        },

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
                "High-stress job as a site foreman",
                "Family history of heart disease"
            ],
            familyHistory: [
                "Father died suddenly at age 62",
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
                text: "Did bystanders report the patient complaining of chest pain before collapse?",
                category: "history",
                critical: true
            },
            {
                id: "shortness_breath",
                text: "Was the patient experiencing shortness of breath before losing consciousness?",
                category: "history",
                critical: true
            },
            {
                id: "sweating",
                text: "Do you observe profuse sweating on the patient?",
                category: "examination",
                critical: false
            },
            {
                id: "witnessed_collapse",
                text: "Did anyone witness the collapse? What did they see?",
                category: "history",
                critical: true
            },
            {
                id: "prior_symptoms",
                text: "What symptoms did the patient have in the hours before collapse?",
                category: "history",
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
                critical: true,
                resultNarrative: [
                    "The ECG machine prints a rhythm strip with concerning findings.",
                    "Shows irregular electrical changes in several leads.",
                    "The nurse reviews the trace. 'Abnormal patterns in the bottom leads,' she notes.",
                    "These changes may indicate strain on the heart and need immediate attention."
                ]
            },
            {
                id: "troponin",
                name: "Troponin Test",
                description: "Blood test to detect heart muscle damage",
                cost: 200,
                timeRequired: 3,
                critical: true,
                resultNarrative: [
                    "The lab calls back within minutes with urgent results.",
                    "Levels are much higher than normal.",
                    "The registrar reviews the results. 'These cardiac markers are quite elevated,' she notes.",
                    "High levels like this suggest the heart muscle may be under significant stress or injury."
                ]
            },
            {
                id: "chest_xray",
                name: "Chest X-Ray",
                description: "Imaging to rule out other causes of chest pain",
                cost: 100,
                timeRequired: 4,
                critical: false,
                resultNarrative: [
                    "The X-ray slides onto the lightbox with a satisfying click.",
                    "Heart shadow looks enlarged, but no obvious pneumothorax.",
                    "The radiographer points to subtle pulmonary congestion.",
                    "'Heart's struggling,' she notes. 'Backing up into the lungs.'"
                ]
            },
            {
                id: "cardiac_enzymes",
                name: "Cardiac Enzymes Panel",
                description: "Comprehensive blood work for cardiac markers",
                cost: 300,
                timeRequired: 5,
                critical: false,
                resultNarrative: [
                    "The blood results ping onto your screen with clinical precision.",
                    "CK-MB elevated, LDH climbing — the heart's distress signals written in numbers.",
                    "The consultant nods grimly. 'Confirms what we already suspected.'",
                    "Sometimes being right feels absolutely dreadful."
                ]
            }
        ],
        diagnosisOptions: [
            {
                id: "myocardial_infarction",
                name: "Heart Attack (Acute Myocardial Infarction)",
                description: "Complete blockage of heart blood vessel causing heart muscle damage",
                correct: true,
                consequences: "Immediate treatment required: clot-busting drugs, balloon procedure, or heart surgery",
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
        title: "Injured Patient - Motor Vehicle Incident",
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
                critical: true,
                resultNarrative: [
                    "The CT scanner hums ominously as cross-sections of trauma appear on screen.",
                    "There — a large dark pool in the abdomen where blood shouldn't be.",
                    "The radiologist's face says it all before she speaks: 'Significant haemoperitoneum.'",
                    "Internal bleeding. Theatre's looking increasingly likely."
                ]
            },
            {
                id: "xray_series",
                name: "X-Ray Series",
                description: "Chest, pelvis, and extremity X-rays",
                cost: 400,
                timeRequired: 2,
                critical: true,
                resultNarrative: [
                    "X-rays clatter onto the viewing box like a grim slideshow.",
                    "Multiple rib fractures light up the chest film — at least five broken.",
                    "The orthopaedic registrar winces. 'Blunt force trauma, significant impact.'",
                    "Motorcycles versus cars rarely end well for the rider."
                ]
            },
            {
                id: "blood_work",
                name: "Complete Blood Count",
                description: "Blood tests to assess for internal bleeding",
                cost: 150,
                timeRequired: 1,
                critical: true,
                resultNarrative: [
                    "The blood results flash red on the monitor — literally and figuratively.",
                    "Haemoglobin dropping fast: 8.2 and falling like a stone.",
                    "The nurse catches your eye. 'He's bleeding somewhere, and bleeding fast.'",
                    "Time to find the source before he bleeds out."
                ]
            },
            {
                id: "ultrasound",
                name: "FAST Ultrasound",
                description: "Focused assessment for trauma",
                cost: 200,
                timeRequired: 1,
                critical: true,
                resultNarrative: [
                    "The ultrasound probe glides across his abdomen with practiced efficiency.",
                    "Dark fluid appears in all four quadrants — free blood, lots of it.",
                    "The sonographer nods grimly. 'Positive FAST. He needs surgery now.'",
                    "Sometimes the simplest tests give the clearest answers."
                ]
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
        title: "Breathing Difficulty - Young Child",
        specialty: "Paediatrics",
        category: "respiratory",
        difficulty: "hard",
        icon: "fas fa-baby",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "croup",
        description: "A 3-year-old girl is brought to A&E by her frantic mum. The child is struggling to breathe and making a high-pitched sound when inhaling. She has a fever and has been coughing for the past 2 days.",
        patientHistory: {
            demographics: "3-year-old female",
            pastMedicalHistory: [
                "No significant medical history",
                "Up to date on vaccinations",
                "No known allergies"
            ],
            socialHistory: [
                "Attends nursery",
                "Lives with single mum",
                "Mum works two jobs to support them",
                "No other family nearby"
            ],
            familyHistory: [
                "No significant family history"
            ],
            medications: [
                "Children's paracetamol as needed"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "2 months ago - normal growth and development",
            emotionalContext: "Mum is extremely anxious and blames herself for not bringing the child in sooner. She's worried about missing work and losing her job."
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
                critical: true,
                resultNarrative: [
                    "The tiny probe clips onto her finger like a glowing fairy light.",
                    "88% oxygen saturation — definitely not the 98% you'd want to see.",
                    "The paediatric nurse frowns. 'She's working too hard to breathe.'",
                    "Mum's face crumples. Sometimes numbers tell the whole story."
                ]
            },
            {
                id: "chest_xray",
                name: "Chest X-Ray",
                description: "Imaging to assess airway and lung condition",
                cost: 100,
                timeRequired: 2,
                critical: true,
                resultNarrative: [
                    "Getting a three-year-old to stay still for X-rays requires tactical bribery.",
                    "The film shows hyperinflated lungs — air trapped like balloons that won't deflate.",
                    "Classic croup pattern, the radiographer confirms with a knowing nod.",
                    "At least it's not pneumonia. Small mercies in paediatrics."
                ]
            },
            {
                id: "blood_work",
                name: "Blood Work",
                description: "Complete blood count and inflammatory markers",
                cost: 150,
                timeRequired: 3,
                critical: false,
                resultNarrative: [
                    "The blood draw requires three staff and considerable negotiation with a tearful toddler.",
                    "White cell count slightly elevated — her body's fighting something viral.",
                    "The lab tech smiles. 'Nothing too scary, just a typical childhood bug.'",
                    "Mum's shoulders finally relax for the first time today."
                ]
            },
            {
                id: "viral_test",
                name: "Viral Panel",
                description: "Testing for common respiratory viruses",
                cost: 200,
                timeRequired: 4,
                critical: false,
                resultNarrative: [
                    "The nasal swab provokes indignant protests from your small patient.",
                    "Parainfluenza virus positive — the usual suspect for croup in autumn.",
                    "The consultant nods. 'Textbook case. Steroids and steam should sort her out.'",
                    "Sometimes the simplest diagnoses are the most reassuring."
                ]
            }
        ],
        diagnosisOptions: [
            {
                id: "croup",
                name: "Croup (Laryngotracheobronchitis)",
                description: "Viral infection causing airway inflammation and narrowing",
                correct: true,
                consequences: "Treatment with humidified air, steroids, and monitoring",
                emotionalImpact: "Child recovers quickly, mum relieved and grateful"
            },
            {
                id: "epiglottitis",
                name: "Epiglottitis",
                description: "Bacterial infection of the epiglottis",
                correct: false,
                consequences: "Delayed treatment could lead to complete airway obstruction",
                emotionalImpact: "Child's condition worsens, mum becomes hysterical"
            },
            {
                id: "foreign_body",
                name: "Foreign Body Aspiration",
                description: "Object lodged in airway",
                correct: false,
                consequences: "Child could suffocate without immediate intervention",
                emotionalImpact: "Child dies, mum blames herself for not watching more closely"
            },
            {
                id: "asthma",
                name: "Asthma Exacerbation",
                description: "Acute asthma attack",
                correct: false,
                consequences: "Wrong treatment delays proper care",
                emotionalImpact: "Child suffers unnecessarily, mum loses trust in medical team"
            }
        ]
    },

    toxicology: {
        id: "toxicology",
        title: "Unconscious Patient - Young Adult",
        specialty: "Emergency Medicine",
        category: "toxicology",
        difficulty: "expert",
        icon: "fas fa-pills",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "opioid_overdose",
        description: "A 25-year-old male is brought to A&E unconscious by friends. They report he suddenly collapsed at a party. Patient is barely breathing and unresponsive.",
        patientHistory: {
            demographics: "25-year-old male",
            pastMedicalHistory: [
                "History of substance abuse",
                "Previous hospital admission 6 months ago",
                "Depression and anxiety",
                "No known allergies"
            ],
            socialHistory: [
                "Unemployed",
                "Lives with friends",
                "History of IV drug use",
                "Recently lost girlfriend unexpectedly",
                "No family contact"
            ],
            familyHistory: [
                "Father has alcohol addiction",
                "Mother died young from complications"
            ],
            medications: [
                "No prescribed medications"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "Over 2 years ago",
            emotionalContext: "Patient's friends are terrified and blame themselves. They delayed calling 999 because they were afraid of getting in trouble. Patient has been struggling since his girlfriend's death."
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
        title: "Weakness and Speech Problems - Elderly Male",
        specialty: "General Medicine",
        category: "neurological",
        difficulty: "medium",
        icon: "fas fa-brain",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "ischemic_stroke",
        description: "A 72-year-old man is brought to A&E by his daughter after suddenly developing weakness on his right side and difficulty speaking. The symptoms started about 2 hours ago while he was watching TV.",
        patientHistory: {
            demographics: "72-year-old male",
            pastMedicalHistory: [
                "Hypertension for 15 years",
                "Atrial fibrillation diagnosed 3 years ago",
                "Type 2 diabetes for 10 years",
                "High cholesterol",
                "Previous episode of temporary weakness 1 year ago"
            ],
            socialHistory: [
                "Retired school principal",
                "Lives independently with occasional help from daughter",
                "Non-smoker, quit 20 years ago",
                "Occasional glass of wine with dinner"
            ],
            familyHistory: [
                "Father died at age 78 from neurological complications",
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
                critical: true,
                resultNarrative: [
                    "The CT scanner whirs as it captures slices of brain tissue in stark black and white.",
                    "No bright white blood visible — that's the good news about ruling out a bleed.",
                    "The stroke consultant squints at the screen. 'Clear for thrombolysis if we're quick.'",
                    "The tPA clock is ticking. Every minute costs brain cells."
                ]
            },
            {
                id: "blood_work",
                name: "Complete Blood Count & Coagulation",
                description: "Check blood counts and clotting function",
                cost: 200,
                timeRequired: 2,
                critical: true,
                resultNarrative: [
                    "Blood results stream in faster than usual — the lab knows stroke means urgency.",
                    "INR slightly elevated from his warfarin, but nothing that stops treatment.",
                    "The haematology registrar nods approvingly. 'Safe to proceed with clot-busters.'",
                    "Sometimes being on blood thinners is exactly what you need."
                ]
            },
            {
                id: "ecg",
                name: "12-Lead ECG",
                description: "Check for atrial fibrillation or other heart rhythm problems",
                cost: 150,
                timeRequired: 1,
                critical: false,
                resultNarrative: [
                    "The ECG trace dances across the screen in familiar irregular patterns.",
                    "Atrial fibrillation — his heart's been throwing clots like confetti.",
                    "The cardiology nurse sighs. 'Classic AF stroke. Should've been on better anticoagulation.'",
                    "Hindsight's always 20/20 in medicine, unfortunately."
                ]
            },
            {
                id: "glucose",
                name: "Blood Glucose",
                description: "Rule out hypoglycemia mimicking stroke",
                cost: 25,
                timeRequired: 1,
                critical: true,
                resultNarrative: [
                    "The glucometer beeps with reassuring normality: 6.2 mmol/L.",
                    "Not hypoglycaemia then — this weakness is the real neurological deal.",
                    "The diabetes nurse nods. 'At least his sugars are behaving themselves today.'",
                    "One less thing to worry about in an already complicated case."
                ]
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
        title: "Abdominal Pain - Adult Female",
        specialty: "General Medicine",
        category: "surgical",
        difficulty: "medium",
        icon: "fas fa-procedures",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "appendicitis",
        description: "A 45-year-old woman presents to A&E with severe abdominal pain that started this morning. The pain began around her belly button and has now moved to the right lower abdomen. She feels nauseous and has vomited twice.",
        patientHistory: {
            demographics: "45-year-old female",
            pastMedicalHistory: [
                "No significant medical history",
                "Two previous pregnancies, normal deliveries",
                "Cholecystectomy (gallbladder removal) 5 years ago",
                "Last menstrual period: 2 weeks ago, regular cycles",
                "Sexually active, uses barrier contraception",
                "No known allergies"
            ],
            socialHistory: [
                "Works as a secondary school teacher",
                "Married with two teenage children",
                "Non-smoker, occasional social drinking",
                "Regular exercise, healthy diet"
            ],
            familyHistory: [
                "Mother had breast cancer",
                "Father has diabetes",
                "No significant family history of abdominal conditions"
            ],
            medications: [
                "Multivitamin daily",
                "Ibuprofen occasionally for headaches"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "1 year ago - normal",
            emotionalContext: "Patient is in significant pain and worried about missing work. Husband is concerned and drove her to A&E. She's never had pain like this before."
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
                critical: true,
                resultNarrative: [
                    "The CT images scroll past like a medical detective story unfolding.",
                    "There — a thickened, inflamed appendix glowing angry on the screen.",
                    "The radiologist points with grim satisfaction. 'Textbook appendicitis, needs surgery tonight.'",
                    "At least it hasn't burst yet. Theatre team, you're up."
                ]
            },
            {
                id: "blood_work",
                name: "Complete Blood Count",
                description: "Check white blood cell count for signs of infection",
                cost: 150,
                timeRequired: 2,
                critical: true,
                resultNarrative: [
                    "The blood results ping back with telltale signs of trouble brewing.",
                    "White cell count elevated to 15,000 — her body's fighting an infection.",
                    "The surgical registrar nods knowingly. 'Classic inflammatory response.'",
                    "Numbers don't lie, especially when they're shouting 'appendicitis' this loudly."
                ]
            },
            {
                id: "urinalysis",
                name: "Urinalysis",
                description: "Rule out urinary tract infection or kidney stones",
                cost: 75,
                timeRequired: 1,
                critical: false,
                resultNarrative: [
                    "The urine dipstick emerges clean as a whistle — no infection here.",
                    "Sometimes the most useful tests are the ones that rule things out.",
                    "The nurse smiles. 'Well, at least it's not her kidneys causing grief.'",
                    "Process of elimination in action — one less thing to worry about."
                ]
            },
            {
                id: "pregnancy_test",
                name: "Pregnancy Test",
                description: "Rule out ectopic pregnancy in women of childbearing age",
                cost: 50,
                timeRequired: 1,
                critical: true,
                resultNarrative: [
                    "The pregnancy test develops with the efficiency of modern chemistry.",
                    "Negative — which in this context is exactly what everyone hoped for.",
                    "The gynaecology registrar exhales with relief. 'Not ectopic then.'",
                    "Sometimes negative results are the most positive news you can get."
                ]
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
    },

    ozempic_misuse: {
        id: "ozempic_misuse",
        title: "Severe Weight Loss - Young Woman",
        specialty: "General Medicine",
        category: "toxicology",
        difficulty: "expert",
        icon: "fas fa-weight",
        timeLimit: TIME_PRESSURE.MODERATE,
        correctDiagnosis: "glp1_misuse_malnutrition",
        description: "A 28-year-old woman presents to A&E with severe weakness, dizziness, and fainting episodes. She appears dangerously underweight and malnourished. Her partner brought her in after she collapsed at home. She seems reluctant to discuss her medical history.",
        
        progressMessages: {
            examine: [
                "She avoids eye contact when you ask about her weight.",
                "Her partner whispers: 'She won't eat. I'm really worried.'",
                "The numbers don't lie - BMI 15.2. This is critical.",
                "Something doesn't add up. She's hiding something."
            ],
            diagnose: [
                "The pieces are falling into place. But why won't she admit it?",
                "You've seen this pattern before. Social media's latest trend.",
                "Her partner found empty medication boxes. The truth emerges.",
                "This isn't just an eating disorder. It's pharmaceutical misuse."
            ],
            treat: [
                "She finally breaks down. 'I just wanted to look like them...'",
                "Refeeding syndrome is a real risk. Proceed carefully.",
                "Psychiatry consult is essential. This goes beyond physical health.",
                "Recovery will be long. But at least she's finally getting help."
            ]
        },

        patientHistory: {
            demographics: "28-year-old female",
            pastMedicalHistory: [
                "No significant medical history",
                "Previously healthy weight (BMI 22, 6 months ago)",
                "Denies eating disorders (initially)",
                "No diabetes or metabolic conditions"
            ],
            socialHistory: [
                "Works in social media marketing",
                "Active on Instagram and TikTok",
                "Recently lost 45 pounds in 4 months",
                "Partner reports obsessive weighing behavior",
                "Denies drug use (initially)",
                "Lives with long-term partner"
            ],
            familyHistory: [
                "Mother has anxiety disorder",
                "No family history of eating disorders",
                "No diabetes in family"
            ],
            medications: [
                "Denies taking any medications (initially)",
                "Later admits to 'weight loss medication from online'"
            ],
            allergies: "No known drug allergies",
            emotionalContext: "Patient is defensive and evasive. Partner is extremely concerned and frustrated. She's been lying about eating and hiding medication use."
        },

        questions: [
            {
                id: "weight_loss",
                text: "How much weight have you lost and over what period?",
                answer: "She hesitates... 'Maybe 20 pounds? Over a few months.' (Partner interjects: 'It's been 45 pounds in 4 months!')",
                category: "history",
                critical: true
            },
            {
                id: "eating_habits",
                text: "Can you describe your typical daily food intake?",
                answer: "'I eat normally...' She trails off. Partner: 'She barely eats anything. Maybe one small meal a day, if that.'",
                category: "history",
                critical: true
            },
            {
                id: "medications_initial",
                text: "Are you taking any medications or supplements?",
                answer: "'No, nothing.' She looks away. Her body language suggests she's not being truthful.",
                category: "history",
                critical: false
            },
            {
                id: "medications_probe",
                text: "Have you been taking any weight loss medications, even if not prescribed to you?",
                answer: "Long pause. 'I... I got some medication online. For weight loss. It's called Ozempic or something like that.'",
                category: "history",
                critical: true
            },
            {
                id: "dosage",
                text: "What dose of semaglutide have you been taking, and how often?",
                answer: "'I started with the lowest dose, but it wasn't working fast enough. I've been taking 2mg weekly for the past 2 months. Sometimes more.'",
                category: "history",
                critical: true
            },
            {
                id: "social_media",
                text: "Have you been influenced by social media content about weight loss?",
                answer: "'Everyone on TikTok is using it. They all look amazing. I just wanted to look like them...' She starts crying.",
                category: "history",
                critical: true
            },
            {
                id: "symptoms",
                text: "What symptoms have you been experiencing?",
                answer: "'Constant nausea, dizziness, weakness. I can't keep food down even when I try to eat. My heart races all the time.'",
                category: "symptoms",
                critical: true
            },
            {
                id: "mental_health",
                text: "How would you describe your relationship with food and your body image?",
                answer: "She becomes defensive. 'I just want to be healthy. Is that so wrong?' Tears well up. 'I hate how I look...'",
                category: "psychological",
                critical: true
            },
            {
                id: "fainting",
                text: "How many times have you fainted or felt like you might faint?",
                answer: "'This is the third time this week. I thought I just needed to eat more, but I can't keep anything down.'",
                category: "symptoms",
                critical: false
            },
            {
                id: "partner_concern",
                text: "How long has your partner been concerned about your health?",
                answer: "Partner responds: 'About 2 months. She's been hiding it, lying about eating. I found the medication boxes hidden in her car.'",
                category: "collateral",
                critical: true
            }
        ],

        tests: [
            {
                id: "blood_work",
                name: "Comprehensive Metabolic Panel",
                description: "Full blood chemistry including electrolytes, kidney function, liver function",
                result: "CRITICAL: Severe hypokalemia (K+ 2.8), hyponatremia (Na+ 128), hypoglycemia (glucose 3.2 mmol/L), elevated creatinine, low albumin. Severe malnutrition evident.",
                critical: true
            },
            {
                id: "ecg",
                name: "12-Lead ECG",
                description: "Check for cardiac complications from electrolyte imbalances",
                result: "Sinus tachycardia (HR 110), prolonged QT interval (concerning for sudden cardiac death risk), low voltage. Consistent with severe malnutrition.",
                critical: true
            },
            {
                id: "thyroid",
                name: "Thyroid Function Tests",
                description: "TSH, T3, T4 levels",
                result: "Low T3 syndrome (euthyroid sick syndrome) - TSH normal, T3 low, T4 low-normal. Consistent with severe malnutrition.",
                critical: false
            },
            {
                id: "vitamin_levels",
                name: "Vitamin and Mineral Panel",
                description: "B12, folate, vitamin D, iron studies",
                result: "Severe deficiencies across the board: Vitamin D <10, B12 low, folate low, iron deficiency anemia. Thiamine critically low (refeeding syndrome risk).",
                critical: true
            },
            {
                id: "drug_screen",
                name: "Toxicology Screen",
                description: "Screen for other substances",
                result: "Negative for recreational drugs. GLP-1 agonist levels elevated (consistent with semaglutide use).",
                critical: false
            },
            {
                id: "bone_density",
                name: "DEXA Scan",
                description: "Bone density assessment",
                result: "Severe osteopenia. T-score -2.8. Significant bone loss for her age. High fracture risk.",
                critical: false
            }
        ],

        diagnosisOptions: [
            {
                id: "glp1_misuse_malnutrition",
                name: "GLP-1 Agonist Misuse with Severe Malnutrition",
                description: "Inappropriate use of semaglutide (Ozempic) for weight loss leading to dangerous malnutrition, electrolyte imbalances, and eating disorder behaviors",
                correct: true,
                explanation: "This patient has been misusing prescription GLP-1 agonists obtained online without medical supervision, leading to severe malnutrition, life-threatening electrolyte imbalances, and psychological dependence. Requires immediate medical stabilization, psychiatric intervention, and nutritional rehabilitation."
            },
            {
                id: "anorexia_nervosa",
                name: "Anorexia Nervosa",
                description: "Primary eating disorder with severe restriction",
                correct: false,
                explanation: "While eating disorder behaviors are present, the primary driver is pharmaceutical misuse of GLP-1 agonists. The medication is suppressing appetite and causing severe GI symptoms, making it impossible to eat even when she tries."
            },
            {
                id: "hyperthyroidism",
                name: "Hyperthyroidism",
                description: "Overactive thyroid causing weight loss",
                correct: false,
                explanation: "Thyroid function tests show low T3 syndrome, not hyperthyroidism. The weight loss is due to medication-induced appetite suppression and malnutrition."
            },
            {
                id: "malabsorption",
                name: "Malabsorption Syndrome",
                description: "GI disorder preventing nutrient absorption",
                correct: false,
                explanation: "While malnutrition is severe, this is due to inadequate intake (medication-induced) rather than malabsorption. The GLP-1 agonist is causing severe nausea and gastroparesis."
            }
        ],

        treatments: [
            {
                id: "iv_fluids_electrolytes",
                name: "IV Fluids with Electrolyte Replacement",
                description: "Careful rehydration and correction of electrolyte imbalances",
                helpful: true
            },
            {
                id: "stop_glp1",
                name: "Discontinue GLP-1 Agonist",
                description: "Immediately stop semaglutide",
                helpful: true
            },
            {
                id: "refeeding_protocol",
                name: "Refeeding Protocol",
                description: "Careful nutritional rehabilitation to avoid refeeding syndrome",
                helpful: true
            },
            {
                id: "thiamine",
                name: "IV Thiamine",
                description: "Prevent Wernicke's encephalopathy and refeeding syndrome",
                helpful: true
            },
            {
                id: "psychiatry_consult",
                name: "Emergency Psychiatry Consultation",
                description: "Mental health assessment and eating disorder evaluation",
                helpful: true
            },
            {
                id: "cardiac_monitoring",
                name: "Continuous Cardiac Monitoring",
                description: "Monitor for arrhythmias due to electrolyte imbalances",
                helpful: true
            },
            {
                id: "antiemetics",
                name: "Anti-nausea Medication",
                description: "Help manage GLP-1 induced nausea",
                helpful: true
            },
            {
                id: "rapid_refeeding",
                name: "Aggressive Nutritional Replacement",
                description: "Rapid caloric replacement",
                helpful: false
            }
        ],

        specialists: [
            {
                id: "psychiatrist",
                name: "Psychiatrist",
                specialty: "Mental Health",
                advice: "This is a complex case involving body dysmorphia, social media influence, and pharmaceutical misuse. She needs immediate psychiatric admission for eating disorder treatment. The GLP-1 misuse is a symptom of underlying body image issues and possible social media addiction. Long-term therapy and possibly medication for anxiety/depression will be needed. Family therapy with her partner is also recommended.",
                appropriate: true
            },
            {
                id: "endocrinologist",
                name: "Endocrinologist",
                specialty: "Metabolism",
                advice: "GLP-1 agonists like semaglutide are powerful medications that should only be used under medical supervision. She's been taking doses meant for diabetes management without monitoring. The severe malnutrition has caused metabolic derangements. She'll need careful metabolic monitoring during recovery.",
                appropriate: true
            },
            {
                id: "dietitian",
                name: "Clinical Dietitian",
                specialty: "Nutrition",
                advice: "Refeeding syndrome is a real risk here. We need to start very slowly - maybe 800-1000 calories initially, then gradually increase. High-risk nutrients like phosphate must be monitored closely. She'll need specialized eating disorder nutritional rehabilitation.",
                appropriate: true
            },
            {
                id: "cardiologist",
                name: "Cardiologist",
                specialty: "Cardiology",
                advice: "The prolonged QT interval is concerning. With her electrolyte imbalances, she's at risk for sudden cardiac death. She needs continuous monitoring until electrolytes normalize. The malnutrition has affected her cardiac function.",
                appropriate: false
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