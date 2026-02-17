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
                answer: "Wife reports: 'He was clutching his chest saying it felt like an elephant sitting on it. He rated the pain 9 out of 10 before he collapsed.'",
                category: "history",
                critical: true
            },
            {
                id: "shortness_breath",
                text: "Was the patient experiencing shortness of breath before losing consciousness?",
                answer: "Bystanders report: 'He was gasping for air and could only speak a few words at a time before he went unconscious.'",
                category: "history",
                critical: true
            },
            {
                id: "sweating",
                text: "Do you observe profuse sweating on the patient?",
                answer: "Clinical observation: Patient is sweating heavily and skin feels clammy. Profuse sweating despite normal room temperature.",
                category: "examination",
                critical: false
            },
            {
                id: "witnessed_collapse",
                text: "Did anyone witness the collapse? What did they see?",
                answer: "Wife states: 'He suddenly grabbed his chest, said he couldn't breathe, then just collapsed. I've never seen anything like it.'",
                category: "history",
                critical: true
            },
            {
                id: "prior_symptoms",
                text: "What symptoms did the patient have in the hours before collapse?",
                answer: "Wife reports: 'He complained of chest tightness this morning but said it was just heartburn. He took antacids but it got worse.'",
                category: "history",
                critical: true
            },
            {
                id: "medical_history",
                text: "Does the patient have any known heart conditions?",
                answer: "Wife confirms: 'He had a stent put in two years ago. His doctor told him to take it easy but he never listens. He's on blood pressure tablets and cholesterol pills.'",
                category: "history",
                critical: true
            },
            {
                id: "arm_pain",
                text: "Did the patient mention any pain radiating to his arm or jaw?",
                answer: "Wife recalls: 'Yes! He was rubbing his left arm about an hour before. Said it felt tingly and numb. I told him to sit down.'",
                category: "history",
                critical: false
            },
            {
                id: "skin_colour",
                text: "What is the patient's skin colour and temperature?",
                answer: "Clinical observation: Patient appears grey and ashen. Skin is cool and clammy to touch. Peripheral cyanosis noted in fingertips.",
                category: "examination",
                critical: false
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
        
        progressMessages: {
            examine: [
                "His fiancée bursts through the doors. 'Is he going to be okay? We're getting married next month!'",
                "His blood pressure is dropping. You need to find the source of bleeding — fast.",
                "The paramedics exchange worried looks. He was stable en route but he's deteriorating.",
                "Something inside him is bleeding. The question is where, and how badly."
            ],
            diagnose: [
                "The imaging tells a story his body has been trying to tell you.",
                "Every minute you delay is a minute he's losing blood.",
                "The surgical team is on standby. They need your call.",
                "Trust the evidence. The diagnosis is becoming clear."
            ],
            treat: [
                "Theatre is prepped and waiting. The clock is ticking.",
                "His fiancée grips the nurse's hand. 'Please save him.'",
                "The anaesthetist nods. 'He's under. Let's find that bleeder.'",
                "Good decisions now will determine whether he walks down that aisle."
            ]
        },

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
                answer: "Patient is alert but confused. He knows his name but is unsure of the date. He keeps asking about his fiancée and whether she's okay.",
                category: "neurological",
                critical: true
            },
            {
                id: "abdominal_pain",
                text: "Does the patient have severe abdominal pain?",
                answer: "Yes, severe abdominal pain in the right upper quadrant. Patient guards the area and winces with any movement. 'It feels like something's torn inside,' he says through gritted teeth.",
                category: "symptoms",
                critical: true
            },
            {
                id: "bleeding",
                text: "Is there visible bleeding or bruising?",
                answer: "Extensive bruising across the left chest wall and abdomen. No external haemorrhage but the bruising pattern suggests significant blunt force trauma to the torso.",
                category: "symptoms",
                critical: true
            },
            {
                id: "breathing",
                text: "Is the patient breathing normally?",
                answer: "Breathing is rapid and shallow at 28 breaths per minute. Patient splints when breathing deeply — likely due to rib fractures. Oxygen saturations are 94% on air.",
                category: "respiratory",
                critical: true
            },
            {
                id: "extremity_movement",
                text: "Can the patient move all extremities?",
                answer: "Patient can move all four limbs but has reduced power in the right leg. He reports tingling in his feet. Sensation appears intact throughout.",
                category: "neurological",
                critical: true
            },
            {
                id: "mechanism",
                text: "What happened in the accident? How fast was he going?",
                answer: "Paramedics report: 'High-speed collision with a car at approximately 40 mph. He was thrown from the motorcycle. No helmet. He was conscious when we arrived but deteriorating.'",
                category: "history",
                critical: true
            },
            {
                id: "pulse_check",
                text: "What are the patient's vital signs?",
                answer: "Heart rate 120 bpm and thready. Blood pressure 90/60 — dangerously low. He's tachycardic and hypotensive. Classic signs of significant blood loss.",
                category: "examination",
                critical: false
            },
            {
                id: "last_meal",
                text: "When did the patient last eat or drink?",
                answer: "Friend who was riding with him says: 'We had lunch about 3 hours ago. Burgers and a couple of beers.' Important for anaesthetic planning if surgery is needed.",
                category: "history",
                critical: false
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
                critical: false,
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
                critical: false,
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
        
        progressMessages: {
            examine: [
                "The little girl clings to her mum, each breath a raspy battle.",
                "Mum's eyes are red. 'I should have come in yesterday. I'm a terrible mother.'",
                "That barking cough echoes through the cubicle. Every nurse on the ward turns.",
                "She's working hard to breathe. You need to work out why — and fast."
            ],
            diagnose: [
                "The clinical picture is coming together. Think about what fits.",
                "Age, symptoms, season — the clues are all there.",
                "The paediatric registrar raises an eyebrow. 'What's your impression?'",
                "Common things are common. But you need to be sure."
            ],
            treat: [
                "The nebuliser hisses gently. The little girl looks up at you with big eyes.",
                "Mum strokes her daughter's hair. 'Is she going to be alright, doctor?'",
                "The right treatment should bring relief quickly. Fingers crossed.",
                "Sometimes the smallest patients teach you the biggest lessons."
            ]
        },

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
                answer: "Yes, obvious increased work of breathing. The child is using her tummy muscles and the muscles between her ribs to breathe. Nasal flaring is visible. She looks frightened.",
                category: "respiratory",
                critical: true
            },
            {
                id: "fever",
                text: "Does the child have a fever?",
                answer: "Temperature is 38.5°C. Mum says: 'She's been hot on and off for two days. Calpol brings it down but it keeps coming back.'",
                category: "symptoms",
                critical: false
            },
            {
                id: "cough",
                text: "Is the child coughing? What does it sound like?",
                answer: "Yes, a distinctive harsh barking cough — like a seal. It comes in fits and is much worse when she cries or gets upset. Mum says it started yesterday evening.",
                category: "symptoms",
                critical: true
            },
            {
                id: "stridor",
                text: "Is there a high-pitched sound when breathing in?",
                answer: "Yes, audible inspiratory stridor — a harsh, high-pitched sound with every breath in. It gets louder when the child is agitated. No expiratory wheeze.",
                category: "respiratory",
                critical: true
            },
            {
                id: "activity_level",
                text: "Is the child less active than usual?",
                answer: "Mum says: 'She's been really clingy and just wants cuddles. She won't play with her toys. She's drinking a bit but won't eat anything.'",
                category: "behavioral",
                critical: false
            },
            {
                id: "onset_timeline",
                text: "When did the symptoms start and how have they progressed?",
                answer: "Mum explains: 'She had a runny nose two days ago, then the cough started last night. It got really bad around 2am — that barking sound scared me. It's been getting worse all day.'",
                category: "history",
                critical: true
            },
            {
                id: "drooling",
                text: "Is the child drooling or having difficulty swallowing?",
                answer: "No drooling. She's swallowing her own saliva without difficulty and managed a few sips of water. She can open her mouth normally and there's no 'hot potato' voice.",
                category: "examination",
                critical: false
            },
            {
                id: "vaccination_history",
                text: "Is the child up to date with vaccinations?",
                answer: "Mum confirms: 'Yes, she's had all her jabs on time. The health visitor checked last month.' Red book confirms full vaccination history including Hib.",
                category: "history",
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
        
        progressMessages: {
            examine: [
                "His friends huddle in the corner, whispering. They know more than they're saying.",
                "His breathing is barely there. Each slow breath could be his last.",
                "The clinical signs are telling you something. What fits this picture?",
                "Time is running out. His oxygen levels are dropping."
            ],
            diagnose: [
                "The pieces are falling into place. The signs all point one way.",
                "His friends finally start talking. The truth trickles out.",
                "There's a treatment that could reverse this — if you're right about the cause.",
                "Trust what his body is telling you. Make the call."
            ],
            treat: [
                "You watch for the response. Seconds feel like hours.",
                "His friend breaks down. 'He said he was clean. He promised.'",
                "The right intervention now could mean the difference between life and death.",
                "Recovery is possible. But the harder battle starts when he wakes up."
            ]
        },

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
                answer: "Patient is barely rousable. He opens his eyes briefly to painful stimuli but doesn't follow commands. GCS is 6 — eyes 2, verbal 1, motor 3.",
                category: "neurological",
                critical: true
            },
            {
                id: "breathing",
                text: "How is the patient's breathing?",
                answer: "Respiratory rate is dangerously slow at 6 breaths per minute and very shallow. Oxygen saturations are 82% on air. His lips have a bluish tinge.",
                category: "respiratory",
                critical: true
            },
            {
                id: "pupil_size",
                text: "What do the patient's pupils look like?",
                answer: "Both pupils are pinpoint — approximately 1mm — and sluggishly reactive to light. This is a very specific and telling clinical sign.",
                category: "neurological",
                critical: true
            },
            {
                id: "skin_color",
                text: "What is the patient's skin colour and condition?",
                answer: "Patient appears pale with cyanosis around the lips and fingertips. Skin is cool and slightly sweaty. There's a greyish pallor to his face.",
                category: "symptoms",
                critical: true
            },
            {
                id: "needle_marks",
                text: "Are there any needle marks or track marks?",
                answer: "Yes, multiple injection sites on both arms in the antecubital fossae. Some appear fresh with bruising, others are older scars. There's a recent puncture wound on the left hand.",
                category: "symptoms",
                critical: true
            },
            {
                id: "friend_account",
                text: "What can the patient's friends tell you about what happened?",
                answer: "Friends are evasive at first, then one admits: 'He went to the bathroom at the party and didn't come back. We found him on the floor. He'd been clean for three months, I swear. Something must have happened.'",
                category: "history",
                critical: true
            },
            {
                id: "substances_used",
                text: "Do the friends know what substances the patient may have taken?",
                answer: "After some persuasion: 'He might have... look, he was really upset about his ex. Someone at the party might have had stuff. I don't know exactly what he took. Please just help him.'",
                category: "history",
                critical: false
            },
            {
                id: "medical_background",
                text: "Does the patient have any known medical conditions?",
                answer: "Friends say: 'He's been struggling with depression since his girlfriend died. He was in rehab last year and was doing well. He doesn't take any regular meds that I know of.'",
                category: "history",
                critical: false
            }
        ],
        tests: [
            {
                id: "drug_screen",
                name: "Comprehensive Drug Screen",
                description: "Blood and urine tests for common drugs of abuse",
                cost: 300,
                timeRequired: 2,
                critical: true,
                resultNarrative: [
                    "The toxicology panel results flash urgently on screen.",
                    "Positive for opioids — high concentrations detected in both blood and urine.",
                    "The toxicology consultant nods grimly. 'Classic opioid picture. High levels.'",
                    "His friends shift uncomfortably. They knew, but couldn't bring themselves to call sooner."
                ]
            },
            {
                id: "blood_gas",
                name: "Arterial Blood Gas",
                description: "Assessment of oxygen, carbon dioxide, and pH levels",
                cost: 150,
                timeRequired: 1,
                critical: true,
                resultNarrative: [
                    "The blood gas results arrive with alarming numbers.",
                    "pH 7.28, pCO2 elevated, pO2 dangerously low — respiratory acidosis.",
                    "The registrar frowns. 'He's barely ventilating. CO2 is building up fast.'",
                    "Every minute without intervention, his brain gets less oxygen."
                ]
            },
            {
                id: "basic_metabolic",
                name: "Basic Metabolic Panel",
                description: "Electrolytes, kidney function, and glucose",
                cost: 100,
                timeRequired: 2,
                critical: false,
                resultNarrative: [
                    "The metabolic panel paints a worrying but expected picture.",
                    "Glucose low, creatinine slightly elevated — his kidneys are under stress.",
                    "The nurse checks his IV line. 'He needs fluids and monitoring.'",
                    "At least the electrolytes are holding. Small mercies."
                ]
            },
            {
                id: "liver_function",
                name: "Liver Function Tests",
                description: "Assessment of liver damage from drug use",
                cost: 200,
                timeRequired: 3,
                critical: false,
                resultNarrative: [
                    "Liver function tests reveal the toll of substance abuse.",
                    "ALT and AST mildly elevated — chronic damage, not acute failure.",
                    "The hepatology nurse sighs. 'His liver's been taking hits for a while.'",
                    "Another organ quietly suffering while he chases the next high."
                ]
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
        
        progressMessages: {
            examine: [
                "His daughter grips his good hand. 'Dad, I'm here. The doctors will help.'",
                "He tries to speak but the words come out jumbled. The frustration in his eyes is heartbreaking.",
                "Time is brain. Every minute that passes, more neurons die.",
                "The clock on the wall seems to tick louder. The treatment window won't stay open forever."
            ],
            diagnose: [
                "The clinical picture is becoming clearer. But which type is it?",
                "The treatment depends entirely on getting the diagnosis right.",
                "His daughter asks: 'Why can't you just fix him?' If only it were that simple.",
                "One diagnosis means clot-busters. The other means they'd be fatal. Choose wisely."
            ],
            treat: [
                "The stroke team assembles with practiced urgency.",
                "His daughter watches the monitors, understanding none of the numbers but all of the fear.",
                "The right treatment now could give him back his words, his movement, his life.",
                "Minutes matter. The brain doesn't forgive delays."
            ]
        },

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
                answer: "Yes, obvious right-sided weakness. Patient cannot lift his right arm against gravity and his right leg drifts when raised. Left side has normal power.",
                category: "neurological",
                critical: true
            },
            {
                id: "speech_difficulty",
                text: "Is the patient having difficulty speaking or understanding?",
                answer: "Yes, speech is slurred and effortful. He understands simple commands but struggles to find words. He's getting frustrated trying to express himself. Daughter says: 'He was perfectly fine this morning.'",
                category: "neurological",
                critical: true
            },
            {
                id: "facial_droop",
                text: "Does the patient have facial drooping?",
                answer: "Yes, the right side of his face is noticeably drooping. When asked to smile, only the left side of his mouth moves. He can't puff out his right cheek.",
                category: "neurological",
                critical: true
            },
            {
                id: "time_onset",
                text: "When did the symptoms start?",
                answer: "Daughter reports: 'I rang him at about 2pm and he sounded fine. When I popped round at 4pm he was slumped in his chair talking gibberish. So sometime in the last 2 hours.'",
                category: "history",
                critical: true
            },
            {
                id: "consciousness",
                text: "Is the patient alert and responsive?",
                answer: "Patient is awake and aware of his surroundings but appears frightened and confused. He follows simple commands with a delay. GCS is 13 — eyes 4, verbal 4, motor 5.",
                category: "neurological",
                critical: false
            },
            {
                id: "blood_thinners",
                text: "Is the patient taking blood-thinning medication?",
                answer: "Daughter confirms: 'Yes, he's on warfarin for his irregular heartbeat. He's supposed to get his blood checked regularly but I'm not sure he's been going lately.'",
                category: "history",
                critical: true
            },
            {
                id: "previous_episodes",
                text: "Has anything like this happened before?",
                answer: "Daughter says: 'About a year ago he had a funny turn — his hand went numb and he couldn't speak for about 10 minutes. His GP called it a mini-stroke and put him on more tablets.'",
                category: "history",
                critical: false
            },
            {
                id: "headache",
                text: "Does the patient have a headache?",
                answer: "Patient shakes his head when asked about headache. No neck stiffness. He doesn't appear to be in pain, just frightened and frustrated by his inability to communicate.",
                category: "symptoms",
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
        
        progressMessages: {
            examine: [
                "She winces every time she moves. Her husband holds her hand, looking helpless.",
                "The pain is getting worse. She's guarding her abdomen protectively.",
                "'I've never had pain like this,' she says through gritted teeth. 'Something's really wrong.'",
                "Her temperature is climbing. The clinical picture is evolving."
            ],
            diagnose: [
                "The history is textbook — but textbook for what, exactly?",
                "The test results are pointing in a clear direction.",
                "The surgical registrar pokes their head in. 'Need me for this one?'",
                "Make the call. The sooner she gets the right treatment, the better."
            ],
            treat: [
                "The surgical team reviews your findings and nods in agreement.",
                "Her husband squeezes her hand. 'You're going to be fine, love.'",
                "The anaesthetist introduces herself. The patient looks terrified but relieved.",
                "A straightforward operation — if you caught it in time."
            ]
        },

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
                answer: "Patient points to the right lower abdomen. 'It's right here and it's really sharp. It hurts more when I press on it and when I let go.' She winces when you palpate McBurney's point.",
                category: "symptoms",
                critical: true
            },
            {
                id: "pain_migration",
                text: "Has the pain moved from one area to another?",
                answer: "'It started around my belly button this morning — a dull ache. Then over a few hours it moved down to the right side and got much sharper. Now it's constant and unbearable.'",
                category: "symptoms",
                critical: true
            },
            {
                id: "nausea_vomiting",
                text: "Is the patient experiencing nausea or vomiting?",
                answer: "'I've been feeling sick all day and I've thrown up twice. Nothing helps — even sips of water make me feel queasy. I haven't been able to eat anything.'",
                category: "symptoms",
                critical: true
            },
            {
                id: "fever",
                text: "Does the patient have a fever?",
                answer: "Temperature is 38.2°C. Patient reports feeling hot and cold alternately. 'I started shivering about an hour ago even though I feel warm.'",
                category: "symptoms",
                critical: false
            },
            {
                id: "appetite",
                text: "Has the patient lost their appetite?",
                answer: "'I haven't wanted to eat all day. The thought of food makes me feel worse. I had toast for breakfast and that's the last thing I ate.'",
                category: "symptoms",
                critical: false
            },
            {
                id: "bowel_changes",
                text: "Have you noticed any changes in your bowel habits?",
                answer: "'I haven't been to the loo today at all. I feel like I need to go but when I try, nothing happens and it just hurts more. No blood or anything like that though.'",
                category: "symptoms",
                critical: true
            },
            {
                id: "menstrual_history",
                text: "When was your last menstrual period?",
                answer: "'About two weeks ago, it was normal. Regular as clockwork, always has been. I'm definitely not pregnant — we use condoms.' She looks at her husband who nods in agreement.",
                category: "history",
                critical: false
            },
            {
                id: "similar_episodes",
                text: "Have you ever had pain like this before?",
                answer: "'Never anything like this. I had my gallbladder out five years ago but that was a completely different pain — up high on the right. This is lower down and much worse.'",
                category: "history",
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
        title: "Recurrent Collapse - Young Woman",
        specialty: "General Medicine",
        category: "toxicology",
        difficulty: "expert",
        icon: "fas fa-weight",
        timeLimit: TIME_PRESSURE.MODERATE,
        correctDiagnosis: "glp1_misuse_malnutrition",
        description: "A 28-year-old woman is brought to A&E by her partner after collapsing at home. This is reportedly the third episode this week. She appears thin and unwell but is alert and reluctant to answer questions. Her partner is visibly distressed and keeps trying to speak but the patient talks over them.",
        
        progressMessages: {
            examine: [
                "She avoids eye contact when you ask about her recent health.",
                "Her partner keeps trying to say something, but she shuts them down.",
                "Her vitals are concerning. Something more is going on here.",
                "Something doesn't add up. She's definitely hiding something."
            ],
            diagnose: [
                "The pieces are falling into place. But why won't she admit it?",
                "The lab results tell a story her words won't.",
                "Her partner finally speaks up when she leaves for the bathroom.",
                "There's more to this than meets the eye."
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
                "GP records show healthy weight at last check-up (6 months ago)",
                "No diabetes or metabolic conditions",
                "No prior hospital admissions"
            ],
            socialHistory: [
                "Works in social media marketing",
                "Active on social media platforms",
                "Lives with long-term partner",
                "Non-smoker, occasional alcohol use"
            ],
            familyHistory: [
                "Mother has anxiety disorder",
                "No significant family history",
                "No diabetes in family"
            ],
            medications: [
                "Denies taking any medications"
            ],
            allergies: "No known drug allergies",
            lastPhysical: "6 months ago - GP noted healthy weight, no concerns",
            emotionalContext: "Patient is defensive and evasive when asked about recent health changes. Partner appears very worried but patient keeps cutting them off."
        },

        questions: [
            {
                id: "presenting_complaint",
                text: "Can you tell me what happened today?",
                answer: "'I just felt really dizzy and then... I don't remember. I woke up on the kitchen floor.' She rubs the back of her head. 'I'm fine now, honestly. I don't know why he brought me here.'",
                category: "history",
                critical: true
            },
            {
                id: "appetite_changes",
                text: "How has your appetite been recently? Are you eating and drinking normally?",
                answer: "'I eat fine.' She crosses her arms. Partner shakes their head behind her: 'She barely touches her food. One yoghurt a day, if that. She says she's just not hungry.'",
                category: "history",
                critical: true
            },
            {
                id: "weight_changes",
                text: "Have you noticed any recent changes in your weight?",
                answer: "'I've lost a bit, nothing dramatic.' (Partner, frustrated: 'A bit?! She's lost over three stone in four months. None of her clothes fit anymore. Look at her!')",
                category: "history",
                critical: true
            },
            {
                id: "medications",
                text: "Are you currently taking any medications, supplements, or vitamins?",
                answer: "'No, nothing.' She avoids eye contact. You notice she clutches her handbag a little tighter when you ask.",
                category: "history",
                critical: false
            },
            {
                id: "nausea_gi",
                text: "Have you been experiencing any nausea, vomiting, or stomach problems?",
                answer: "'I've been feeling sick a lot, yeah. And I throw up sometimes. I thought it might be a bug that won't go away.' She looks genuinely uncomfortable.",
                category: "symptoms",
                critical: true
            },
            {
                id: "online_purchases",
                text: "Have you bought anything online recently for your health or wellness?",
                answer: "Long pause. She bites her lip. '...I ordered some stuff online. Supplements and... some medication. For weight management. Everyone uses it.' She won't say what it is.",
                category: "history",
                critical: true
            },
            {
                id: "partner_perspective",
                text: "[To partner] Is there anything else you think I should know?",
                answer: "Partner, voice breaking: 'I found boxes hidden in her car last week. Injection pens. I looked it up — it's that weight loss drug, Ozempic. She's been injecting herself. She won't listen to me.'",
                category: "collateral",
                critical: true
            },
            {
                id: "emotional_state",
                text: "How have you been feeling in yourself? Any anxiety or low mood?",
                answer: "She's quiet for a long time. 'I just... I hate how I look. I see these girls online and they're all so perfect. I thought if I could just lose the weight...' Tears start falling. 'I can't stop even though I know something's wrong.'",
                category: "psychological",
                critical: true
            }
        ],

        tests: [
            {
                id: "blood_work",
                name: "Comprehensive Metabolic Panel",
                description: "Full blood chemistry including electrolytes, kidney function, liver function",
                cost: 250,
                timeRequired: 2,
                critical: true,
                resultNarrative: [
                    "The metabolic panel results flash red across the screen — multiple critical values.",
                    "Severe hypokalemia (K+ 2.8), hyponatremia (Na+ 128), hypoglycemia (glucose 3.2 mmol/L). Creatinine elevated, albumin critically low. Thyroid markers show low T3 syndrome — her body is in starvation mode.",
                    "The registrar frowns. 'She hasn't been eating properly for a long time. But these electrolytes are immediately dangerous — she could arrest at any moment.'",
                    "The numbers confirm severe malnutrition, but they don't explain WHY she's not eating. Something else is going on."
                ]
            },
            {
                id: "ecg",
                name: "12-Lead ECG",
                description: "Assess cardiac rhythm and function",
                cost: 150,
                timeRequired: 1,
                critical: true,
                resultNarrative: [
                    "The ECG trace stutters across the screen. Even the machine seems concerned.",
                    "Sinus tachycardia at 110 bpm with a dangerously prolonged QT interval. Low voltage across all leads.",
                    "The cardiology registrar looks grave. 'This QT prolongation with her potassium this low — she's a cardiac arrest waiting to happen. We need to fix those electrolytes urgently.'",
                    "Her heart is under enormous strain. The ECG confirms how critical this is but doesn't point to the underlying cause."
                ]
            },
            {
                id: "vitamin_levels",
                name: "Vitamin and Mineral Panel",
                description: "B12, folate, vitamin D, iron studies, thiamine",
                cost: 300,
                timeRequired: 3,
                critical: true,
                resultNarrative: [
                    "The vitamin panel paints a grim picture of prolonged nutritional deprivation.",
                    "Vitamin D critically low, B12 depleted, folate bottomed out, iron deficiency anaemia. Thiamine is dangerously low.",
                    "The registrar notes: 'The thiamine level means refeeding syndrome is a real risk — we can't just start feeding her aggressively. And these deficiencies suggest weeks to months of near-starvation.'",
                    "She's been barely absorbing any nutrition for a long time. But she says she 'eats normally'. Someone isn't telling the truth."
                ]
            },
            {
                id: "drug_screen",
                name: "Toxicology Screen",
                description: "Comprehensive screen for drugs and medications",
                cost: 300,
                timeRequired: 2,
                critical: true,
                resultNarrative: [
                    "The standard toxicology screen comes back negative for recreational drugs, alcohol, and common medications.",
                    "However, the lab flags an unexpected finding: elevated levels of a GLP-1 receptor agonist — a class of injectable medication normally prescribed for type 2 diabetes.",
                    "The pharmacist raises an eyebrow. 'She's not diabetic, so why is this in her system? These drugs are powerful appetite suppressants. That would explain why she can't eat.'",
                    "A prescribed medication found in a patient it was never prescribed for. Where did she get it, and how much has she been taking?"
                ]
            },
        ],

        diagnosisOptions: [
            {
                id: "glp1_misuse_malnutrition",
                name: "GLP-1 Agonist Misuse with Severe Malnutrition",
                description: "Inappropriate use of semaglutide (Ozempic) for weight loss leading to dangerous malnutrition, electrolyte imbalances, and eating disorder behaviors",
                correct: true,
                consequences: "Immediate medical stabilisation with careful electrolyte replacement, psychiatric intervention, and nutritional rehabilitation. GLP-1 agonist discontinued.",
                emotionalImpact: "Patient finally breaks down and accepts help. Partner relieved but shaken. Long road to recovery begins."
            },
            {
                id: "anorexia_nervosa",
                name: "Anorexia Nervosa",
                description: "Primary eating disorder with severe restriction",
                correct: false,
                consequences: "Eating disorder treatment initiated but underlying medication misuse goes unaddressed. GLP-1 continues suppressing appetite.",
                emotionalImpact: "Patient continues hiding medication use. Partner increasingly frustrated as condition doesn't improve."
            },
            {
                id: "hyperthyroidism",
                name: "Hyperthyroidism",
                description: "Overactive thyroid causing weight loss",
                correct: false,
                consequences: "Anti-thyroid medication prescribed unnecessarily. Real cause of weight loss goes untreated, patient continues deteriorating.",
                emotionalImpact: "Patient relieved to have a 'medical' explanation but condition worsens. Partner loses trust in medical team."
            },
            {
                id: "malabsorption",
                name: "Malabsorption Syndrome",
                description: "GI disorder preventing nutrient absorption",
                correct: false,
                consequences: "Extensive GI investigations ordered while patient's malnutrition worsens. Medication misuse goes undetected.",
                emotionalImpact: "Patient undergoes unnecessary invasive tests. Partner increasingly desperate as no improvement occurs."
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
                advice: "There's clearly a significant body image component here. She shows disordered eating behaviour but it doesn't quite fit typical anorexia — she seems upset about not being able to eat rather than deliberately restricting. Her secrecy and defensiveness suggest she's hiding something she knows is harmful. I'd explore whether there's an external factor or substance driving the weight loss. The social media angle is worth investigating further.",
                appropriate: true
            },
            {
                id: "endocrinologist",
                name: "Endocrinologist",
                specialty: "Metabolism",
                advice: "The metabolic picture is unusual for simple caloric restriction. The appetite suppression pattern seems almost pharmacological. Her thyroid is in starvation mode but the rapidity of decline doesn't match typical eating disorders. I'd recommend a targeted drug screen — there are medications circulating online that cause exactly this kind of profound appetite loss.",
                appropriate: true
            },
            {
                id: "dietitian",
                name: "Clinical Dietitian",
                specialty: "Nutrition",
                advice: "Whatever the cause, refeeding syndrome is a serious risk at this stage. We need to start very slowly — 800-1000 calories initially. Thiamine and phosphate must be monitored closely. But I'd want to know why she stopped eating before we plan long-term rehabilitation.",
                appropriate: true
            },
            {
                id: "cardiologist",
                name: "Cardiologist",
                specialty: "Cardiology",
                advice: "The prolonged QT interval is concerning but it's secondary to the electrolyte derangements, not a primary cardiac problem. Fix the electrolytes and the heart should recover. She needs monitoring but this isn't fundamentally a cardiology case.",
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