// Medical Mystery Game - TOMY-Inspired Case Database
// Enhanced with realistic patient images and test results

// Time pressure mechanics
const TIME_PRESSURE = {
    CRITICAL: 3, // 3 minutes for critical cases
    URGENT: 5,   // 5 minutes for urgent cases
    MODERATE: 8, // 8 minutes for moderate cases
    ROUTINE: 12  // 12 minutes for routine cases
};

// Case Categories
const CASE_CATEGORIES = {
    CARDIAC: 'cardiac',
    RESPIRATORY: 'respiratory',
    NEUROLOGICAL: 'neurological',
    TRAUMA: 'trauma',
    PEDIATRIC: 'pediatric',
    EMERGENCY: 'emergency'
};

// Difficulty Levels
const DIFFICULTY_LEVELS = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
    EXPERT: 'expert'
};

// Enhanced medical cases inspired by TOMY Medical Mysteries Investigation Game
const medicalCases = {
    // EASY CASES - Good for beginners
    pediatric_fever: {
        id: "pediatric_fever",
        title: "Pediatric Fever - 3-Year-Old",
        specialty: "Pediatrics",
        difficulty: "easy",
        category: "pediatric",
        correctDiagnosis: "Viral Upper Respiratory Infection",
        icon: "fas fa-thermometer-half",
        timeLimit: TIME_PRESSURE.ROUTINE,
        description: "A 3-year-old girl presents with fever of 102°F, runny nose, and mild cough. Parents are concerned about the fever.",
        patientImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMCIgZmlsbD0iIzAwMCIvPgo8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxMzAiIHI9IjEwIiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xNzAgMTgwIFEyMDAgMjAwIDIzMCAxODAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPjMteWVhci1vbGQgZmVtYWxlPC90ZXh0Pgo8L3N2Zz4K",
        patientHistory: {
            demographics: "3-year-old female",
            pastMedicalHistory: [
                "No significant medical history",
                "Up to date on vaccinations",
                "No known allergies"
            ],
            socialHistory: [
                "Attends daycare 3 days per week",
                "Lives with both parents and older sibling",
                "No recent travel"
            ],
            emotionalContext: "First-time parents, very anxious about the fever. Child is otherwise active and eating normally."
        },
        questions: [
            {
                id: "fever_duration",
                text: "How long has the fever been present?",
                category: "symptoms",
                critical: false
            },
            {
                id: "other_symptoms",
                text: "Are there any other symptoms besides fever?",
                category: "symptoms",
                critical: false
            },
            {
                id: "appetite",
                text: "Is the child eating and drinking normally?",
                category: "symptoms",
                critical: false
            },
            {
                id: "activity_level",
                text: "Is the child active and playful?",
                category: "symptoms",
                critical: false
            }
        ],
        tests: [
            {
                id: "temperature",
                name: "Temperature Check",
                description: "Measure body temperature",
                cost: 25,
                timeRequired: 1,
                critical: false,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkZldmVyIFRlbXBlcmF0dXJlPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGMDAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij4xMDLwr0Y8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkVsZXZhdGVkPC90ZXh0Pgo8L3N2Zz4K"
            },
            {
                id: "throat_culture",
                name: "Throat Culture",
                description: "Test for strep throat",
                cost: 75,
                timeRequired: 3,
                critical: false,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPlN0cmVwIFRocm9hdCBUZXN0PC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwRkYwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5ORUdBVElWRTwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIyMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gYmFjdGVyaWEgZGV0ZWN0ZWQ8L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "cbc",
                name: "Complete Blood Count",
                description: "Check white blood cell count",
                cost: 100,
                timeRequired: 4,
                critical: false,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNvbXBsZXRlIEJsb29kIENvdW50PC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwRkYwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5OT1JNQUw8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPldCQzogMTIsNTAwL8K4TC9swqBM4oI8L3RleHQ+Cjwvc3ZnPgo="
            }
        ],
        diagnosisOptions: [
            {
                id: "viral_upper_respiratory",
                name: "Viral Upper Respiratory Infection",
                description: "Common cold virus causing fever and mild symptoms",
                correct: true,
                consequences: "Supportive care: rest, fluids, fever management",
                emotionalImpact: "Parents relieved to know it's a common illness"
            },
            {
                id: "strep_throat",
                name: "Strep Throat",
                description: "Bacterial infection requiring antibiotics",
                correct: false,
                consequences: "Unnecessary antibiotics, potential side effects",
                emotionalImpact: "Parents concerned about medication side effects"
            },
            {
                id: "ear_infection",
                name: "Ear Infection",
                description: "Middle ear infection",
                correct: false,
                consequences: "Missed diagnosis, continued symptoms",
                emotionalImpact: "Child continues to suffer unnecessarily"
            }
        ]
    },

    // MEDIUM CASES - Moderate complexity
    adult_abdominal_pain: {
        id: "adult_abdominal_pain",
        title: "Acute Abdominal Pain - 45-Year-Old",
        specialty: "Emergency Medicine",
        difficulty: "medium",
        icon: "fas fa-user-injured",
        timeLimit: TIME_PRESSURE.MODERATE,
        correctDiagnosis: "appendicitis",
        description: "A 45-year-old woman presents with severe right lower abdominal pain that started 6 hours ago. Pain is constant and worsening.",
        patientImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMCIgZmlsbD0iIzAwMCIvPgo8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxMzAiIHI9IjEwIiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xNzAgMTgwIFEyMDAgMjAwIDIzMCAxODAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0xNzAgMjAwIEwyMzAgMjAwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij40NS15ZWFyLW9sZCBmZW1hbGU8L3RleHQ+Cjwvc3ZnPgo=",
        patientHistory: {
            demographics: "45-year-old female",
            pastMedicalHistory: [
                "No previous surgeries",
                "No chronic medical conditions",
                "No known allergies"
            ],
            socialHistory: [
                "Works as an office manager",
                "Lives with husband and two teenage children",
                "No recent travel or dietary changes"
            ],
            emotionalContext: "Patient is very anxious about the pain and worried about missing work. Family is supportive."
        },
        questions: [
            {
                id: "pain_location",
                text: "Where exactly is the pain located?",
                category: "symptoms",
                critical: true
            },
            {
                id: "pain_character",
                text: "How would you describe the pain?",
                category: "symptoms",
                critical: true
            },
            {
                id: "nausea_vomiting",
                text: "Do you have nausea or vomiting?",
                category: "symptoms",
                critical: false
            },
            {
                id: "fever",
                text: "Do you have a fever?",
                category: "symptoms",
                critical: false
            },
            {
                id: "appetite",
                text: "When did you last eat?",
                category: "symptoms",
                critical: false
            }
        ],
        tests: [
            {
                id: "cbc",
                name: "Complete Blood Count",
                description: "Check for infection markers",
                cost: 100,
                timeRequired: 3,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNvbXBsZXRlIEJsb29kIENvdW50PC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwRkYwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5OT1JNQUw8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPldCQzogMTIsNTAwL8K4TC9swqBM4oI8L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "ct_abdomen",
                name: "CT Scan Abdomen",
                description: "Imaging to visualize appendix and surrounding structures",
                cost: 500,
                timeRequired: 6,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNUIFNjYW4gQWJkb21lbjwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRjAwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+QUJOT1JNQUw8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkluZmxhbWVkIGFwcGVuZGl4PC90ZXh0Pgo8L3N2Zz4K"
            },
            {
                id: "urinalysis",
                name: "Urinalysis",
                description: "Rule out urinary tract infection",
                cost: 50,
                timeRequired: 2,
                critical: false,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPlVyaW5hbHlzaXM8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDBGRjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPk5PUk1BTDwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIyMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gYWNldG9uZSBvciBnbHVjb3NlPC90ZXh0Pgo8L3N2Zz4K"
            }
        ],
        diagnosisOptions: [
            {
                id: "appendicitis",
                name: "Acute Appendicitis",
                description: "Inflamed appendix requiring surgical removal",
                correct: true,
                consequences: "Emergency appendectomy required",
                emotionalImpact: "Patient relieved to have definitive diagnosis and treatment plan"
            },
            {
                id: "ovarian_cyst",
                name: "Ovarian Cyst Rupture",
                description: "Benign cyst causing pain",
                correct: false,
                consequences: "Delayed surgery, risk of complications",
                emotionalImpact: "Patient suffers unnecessary pain and anxiety"
            },
            {
                id: "kidney_stone",
                name: "Kidney Stone",
                description: "Mineral deposit in urinary tract",
                correct: false,
                consequences: "Incorrect treatment, continued symptoms",
                emotionalImpact: "Patient receives inappropriate care"
            }
        ]
    },

    // HARD CASES - Most challenging
    cardiac: {
        id: "cardiac",
        title: "Code Blue - Cardiac Arrest",
        specialty: "Cardiology",
        difficulty: "hard",
        icon: "fas fa-heartbeat",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "myocardial_infarction",
        description: "A 58-year-old male collapses in the waiting room. Bystanders report he was complaining of chest pain and shortness of breath before losing consciousness. The patient is unresponsive with no pulse.",
        patientImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMCIgZmlsbD0iIzAwMCIvPgo8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxMzAiIHI9IjEwIiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xNzAgMTgwIFEyMDAgMjAwIDIzMCAxODAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0xODAgMTIwIEwyMjAgMTIwIEwyMDAgMTgwIEwxODAgMTIwIiBmaWxsPSIjRkYwMDAwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij41OC15ZWFyLW9sZCBtYWxlPC90ZXh0Pgo8L3N2Zz4K",
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
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPjEyLUxlYWQgRUNHPC90ZXh0Pgo8cGF0aCBkPSJNNTAgMjAwIEwxMDAgMTgwIEwxNTAgMjAwIEwyMDAgMTgwIEwyNTAgMjAwIEwzMDAgMTgwIEwzNTAgMjAwIiBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0ZGMDAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5TVEVNSSBFTEVWQVRJT048L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "troponin",
                name: "Troponin Test",
                description: "Blood test to detect heart muscle damage",
                cost: 200,
                timeRequired: 3,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPlRyb3BvbmluIFRlc3Q8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRkYwMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkVMVkFURUQ8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPjE1LjIgbmcvbUw8L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "chest_xray",
                name: "Chest X-Ray",
                description: "Imaging to rule out other causes of chest pain",
                cost: 100,
                timeRequired: 4,
                critical: false,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNoZXN0IFgtUmF5PC90ZXh0Pgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxODAiIHI9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwRkYwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5OT1JNQUw8L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "cardiac_enzymes",
                name: "Cardiac Enzymes Panel",
                description: "Comprehensive blood work for cardiac markers",
                cost: 300,
                timeRequired: 5,
                critical: false,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNhcmRpYWMgRW56eW1lcyBQYW5lbDwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRjAwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+RUxFVkFURUQ8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkNLLU1COiA0NSBuZy9tTDwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIyNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TEROOiAyODAgVS9MPC90ZXh0Pgo8L3N2Zz4K"
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
                id: "aortic_dissection",
                name: "Aortic Dissection",
                description: "Tear in the aorta wall",
                correct: false,
                consequences: "Missed critical diagnosis, potential death",
                emotionalImpact: "Family devastated by preventable loss"
            },
            {
                id: "pulmonary_embolism",
                name: "Pulmonary Embolism",
                description: "Blood clot in the lungs",
                correct: false,
                consequences: "Incorrect treatment, continued risk",
                emotionalImpact: "Patient receives inappropriate care"
            }
        ]
    },

    // EXPERT CASES - Most challenging
    trauma_multiple: {
        id: "trauma_multiple",
        title: "Multi-System Trauma - Motor Vehicle Accident",
        specialty: "Trauma Surgery",
        difficulty: "expert",
        icon: "fas fa-car-crash",
        timeLimit: TIME_PRESSURE.CRITICAL,
        correctDiagnosis: "multiple_trauma",
        description: "A 32-year-old male is brought in by ambulance after a high-speed motor vehicle accident. Patient is unconscious with multiple injuries.",
        patientImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMCIgZmlsbD0iIzAwMCIvPgo8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxMzAiIHI9IjEwIiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xNzAgMTgwIFEyMDAgMjAwIDIzMCAxODAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CjxyZWN0IHg9IjE3MCIgeT0iMTEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkYwMDAiIHN0cm9rZT0iI0ZGMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPjMyLXllYXItb2xkIG1hbGU8L3RleHQ+Cjwvc3ZnPgo=",
        patientHistory: {
            demographics: "32-year-old male",
            pastMedicalHistory: [
                "No known medical conditions",
                "No previous surgeries",
                "No known allergies"
            ],
            socialHistory: [
                "Works as a software engineer",
                "Lives with partner and young child",
                "No history of substance abuse"
            ],
            emotionalContext: "Partner is in the waiting room, extremely distressed. Patient is the primary caregiver for their 2-year-old child."
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
                text: "Is the patient breathing adequately?",
                category: "respiratory",
                critical: true
            },
            {
                id: "circulation",
                text: "What is the patient's blood pressure and pulse?",
                category: "cardiovascular",
                critical: true
            },
            {
                id: "bleeding",
                text: "Is there active bleeding?",
                category: "trauma",
                critical: true
            },
            {
                id: "deformities",
                text: "Are there obvious deformities or fractures?",
                category: "orthopedic",
                critical: false
            }
        ],
        tests: [
            {
                id: "ct_head",
                name: "CT Head",
                description: "Imaging to assess brain injury",
                cost: 400,
                timeRequired: 3,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNUIEhlYWQ8L3RleHQ+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDBGRjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPk5PUk1BTDwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gaW50cmFjcmFuaWFsIGhlbW9ycmhhZ2U8L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "ct_chest",
                name: "CT Chest",
                description: "Imaging to assess chest trauma",
                cost: 400,
                timeRequired: 3,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNUIENoZXN0PC90ZXh0Pgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxODAiIHI9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwRkYwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5OT1JNQUw8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIGZsdWlkIGFjY3VtdWxhdGlvbjwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Tm8gcG5ldW1vdGhvcmF4PC90ZXh0Pgo8L3N2Zz4K"
            },
            {
                id: "ct_abdomen",
                name: "CT Abdomen",
                description: "Imaging to assess abdominal trauma",
                cost: 400,
                timeRequired: 3,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNUIFNjYW4gQWJkb21lbjwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNGRjAwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+QUJOT1JNQUw8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkluZmxhbWVkIGFwcGVuZGl4PC90ZXh0Pgo8L3N2Zz4K"
            },
            {
                id: "xray_cervical",
                name: "Cervical Spine X-Ray",
                description: "Imaging to assess neck injury",
                cost: 150,
                timeRequired: 2,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNlcnZpY2FsIFNwaW5lIFgtUmF5PC90ZXh0Pgo8cGF0aCBkPSJNMTUwIDE4MCBMMjAwIDE2MCBMMjUwIDE4MCBMMzAwIDE2MCBMMzUwIDE4MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KPHRleHQgeD0iMjAwIiB5PSIyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMEZGMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+Tk9STUFMPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5ObyBmcmFjdHVyZSBvciBkaXNsb2NhdGlvbjwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+QWxpZ25tZW50IGlzIG5vcm1hbDwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+Q29tcGxldGUgY2VydmljYWwgc3BpbmU8L3RleHQ+Cjwvc3ZnPgo="
            }
        ],
        diagnosisOptions: [
            {
                id: "multiple_trauma",
                name: "Multiple System Trauma",
                description: "Complex injury involving multiple body systems",
                correct: true,
                consequences: "Immediate stabilization, multiple surgical interventions required",
                emotionalImpact: "Family devastated but grateful for comprehensive care"
            },
            {
                id: "isolated_head_injury",
                name: "Isolated Head Injury",
                description: "Brain injury without other significant trauma",
                correct: false,
                consequences: "Missed injuries, inadequate treatment",
                emotionalImpact: "Patient suffers from incomplete care"
            },
            {
                id: "spinal_cord_injury",
                name: "Spinal Cord Injury",
                description: "Damage to spinal cord",
                correct: false,
                consequences: "Incomplete assessment, missed injuries",
                emotionalImpact: "Patient receives suboptimal care"
            }
        ]
    },

    // Additional cases for variety
    pediatric_asthma: {
        id: "pediatric_asthma",
        title: "Pediatric Asthma Exacerbation - 8-Year-Old",
        specialty: "Pediatrics",
        difficulty: "medium",
        icon: "fas fa-lungs",
        timeLimit: TIME_PRESSURE.URGENT,
        correctDiagnosis: "asthma_exacerbation",
        description: "An 8-year-old boy presents with severe difficulty breathing, wheezing, and chest tightness. Parents report he has a history of asthma.",
        patientImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iODAiIGZpbGw9IiNGRkM0QzQiLz4KPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTMwIiByPSIxMCIgZmlsbD0iIzAwMCIvPgo8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxMzAiIHI9IjEwIiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xNzAgMTgwIFEyMDAgMjAwIDIzMCAxODAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0xNzAgMTYwIEwyMzAgMTYwIiBzdHJva2U9IiMwMDBGRkYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij44LXllYXItb2xkIG1hbGU8L3RleHQ+Cjwvc3ZnPgo=",
        patientHistory: {
            demographics: "8-year-old male",
            pastMedicalHistory: [
                "Asthma diagnosed at age 3",
                "Uses albuterol inhaler as needed",
                "No other medical conditions"
            ],
            socialHistory: [
                "Lives with both parents and younger sibling",
                "Active in sports and outdoor activities",
                "Recently started soccer season"
            ],
            emotionalContext: "Parents are very anxious about the breathing difficulty. Child is scared and crying."
        },
        questions: [
            {
                id: "breathing_difficulty",
                text: "How severe is the breathing difficulty?",
                category: "respiratory",
                critical: true
            },
            {
                id: "wheezing",
                text: "Can you hear wheezing?",
                category: "respiratory",
                critical: true
            },
            {
                id: "triggers",
                text: "What triggered this episode?",
                category: "history",
                critical: false
            },
            {
                id: "medication",
                text: "Has the rescue inhaler been used?",
                category: "treatment",
                critical: false
            }
        ],
        tests: [
            {
                id: "pulse_ox",
                name: "Pulse Oximetry",
                description: "Measure oxygen saturation",
                cost: 25,
                timeRequired: 1,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPlB1bHNlIE94aW1ldHJ5PC90ZXh0Pgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxODAiIHI9IjMwIiBmaWxsPSIjRkYwMDAwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRkYwMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPjkyJTwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TWlsZGx5IGRlY3JlYXNlZDwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+UmF0ZTo5OCBicG08L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "peak_flow",
                name: "Peak Flow Measurement",
                description: "Assess lung function",
                cost: 50,
                timeRequired: 2,
                critical: true,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPlBlYWsgRmxvdyBUZXN0PC90ZXh0Pgo8cGF0aCBkPSJNNTAgMjAwIEwxMDAgMTgwIEwxNTAgMTYwIEwyMDAgMTQwIEwyNTAgMTIwIEwzMDAgMTAwIEwzNTAgODAiIHN0cm9rZT0iI0ZGMDAwMCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjRkYwMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPjMwMCBML21pbjwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIzMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMwMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCI+TW9kZXJhdGUgcmVzdHJpY3Rpb248L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPjUwJSBvZiBwcmVkaWN0ZWQ8L3RleHQ+Cjwvc3ZnPgo="
            },
            {
                id: "chest_xray",
                name: "Chest X-Ray",
                description: "Rule out pneumonia or other causes",
                cost: 100,
                timeRequired: 4,
                critical: false,
                resultImage: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkNoZXN0IFgtUmF5PC90ZXh0Pgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxODAiIHI9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMiIvPgo8dGV4dCB4PSIyMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwRkYwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5OT1JNQUw8L3RleHQ+Cjwvc3ZnPgo="
            }
        ],
        diagnosisOptions: [
            {
                id: "asthma_exacerbation",
                name: "Asthma Exacerbation",
                description: "Acute worsening of asthma symptoms",
                correct: true,
                consequences: "Bronchodilators, steroids, oxygen therapy",
                emotionalImpact: "Parents relieved with effective treatment"
            },
            {
                id: "pneumonia",
                name: "Pneumonia",
                description: "Lung infection",
                correct: false,
                consequences: "Inappropriate treatment, delayed asthma care",
                emotionalImpact: "Child suffers from incorrect treatment"
            },
            {
                id: "foreign_body",
                name: "Foreign Body Aspiration",
                description: "Object lodged in airway",
                correct: false,
                consequences: "Missed diagnosis, continued symptoms",
                emotionalImpact: "Child continues to struggle unnecessarily"
            }
        ]
    }
};

// Utility functions
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
    const cases = getAllCases();
    return cases[Math.floor(Math.random() * cases.length)];
} 