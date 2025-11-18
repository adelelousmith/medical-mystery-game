# Medical Mystery - A&E Department Simulator
## Complete Game Documentation

---

## 🎮 Game Overview

**Medical Mystery** is a professional emergency medicine simulation game designed for medical students, healthcare professionals, and anyone interested in diagnostic medicine. Players take on the role of an A&E (Accident & Emergency) doctor, diagnosing and treating patients under realistic time pressure.

### Core Concept
- **Genre:** Medical Simulation / Educational Game
- **Platform:** Web-based (HTML5)
- **Target Audience:** Medical students, healthcare professionals, medical enthusiasts
- **Difficulty Levels:** Moderate to Expert
- **Average Play Time:** 5-12 minutes per case

---

## 🏥 Game Features

### 1. Realistic Medical Cases
The game includes diverse emergency medicine scenarios across multiple specialties:

#### Case Categories:
- **Cardiac Cases** - Heart attacks, chest pain, cardiac emergencies
- **Trauma Cases** - Motor vehicle accidents, internal bleeding, fractures
- **Respiratory Cases** - Breathing difficulties, airway obstruction
- **Neurological Cases** - Strokes, altered consciousness, neurological deficits
- **Paediatric Cases** - Childhood emergencies (croup, respiratory distress)
- **Toxicology Cases** - Overdoses, poisoning
- **Surgical Cases** - Acute abdomen, appendicitis

#### Case Details:
Each case includes:
- Patient demographics and presentation
- Chief complaint and symptoms
- Past medical history
- Current medications
- Family history
- Allergies
- Vital signs

### 2. Investigation System

#### Patient History
- Reveal detailed medical history for bonus points
- Includes past conditions, medications, and risk factors
- Costs points but provides crucial diagnostic information

#### Clinical Questions (Limited to 5)
Players can ask specific questions about:
- Symptoms (pain location, duration, character)
- Medical history details
- Recent events or exposures
- Associated symptoms
- Risk factors

**Critical Questions** marked with indicators provide key diagnostic clues.

#### Diagnostic Tests
Order from a comprehensive menu of tests:
- **Blood Tests:** CBC, cardiac enzymes, troponin, blood gases
- **Imaging:** X-rays, CT scans, ultrasound, MRI
- **Cardiac Tests:** ECG, echocardiogram
- **Specialized Tests:** Toxicology screens, pregnancy tests
- **Physical Exams:** Blood pressure, vitals monitoring

Each test provides realistic results with medical terminology and interpretations.

### 3. Treatment System 💉

#### Treatment Categories by Case Type:

**Cardiac Treatments:**
- Aspirin 300mg (blood thinner)
- High-flow oxygen
- Morphine IV (pain relief)
- GTN spray (vasodilator)
- Antibiotics (incorrect for cardiac cases)

**Trauma Treatments:**
- IV fluids (volume replacement)
- Strong painkillers
- Blood transfusion
- Antibiotics (infection prevention)
- Corticosteroids

**Respiratory Treatments:**
- Oxygen therapy
- Corticosteroids (reduce inflammation)
- Nebulized medication
- Antibiotics
- IV fluids

**Neurological Treatments:**
- tPA (clot-buster for strokes)
- Aspirin (prevent further clots)
- Oxygen
- Anti-seizure medication
- Steroids (brain swelling)

**Paediatric Treatments:**
- Dexamethasone (airway swelling)
- Humidified oxygen
- Nebulized epinephrine
- IV fluids
- Antibiotics

#### Treatment Effects:
- **Helpful treatments:** +10% patient stability, +50 points, green success notification
- **Unhelpful treatments:** -5% patient stability, incorrect action penalty, orange warning notification
- **Already given:** Marked with checkmark, cannot repeat
- **Real-time feedback:** Visual notifications with sound effects

### 4. Specialist Consultations (Limited to 3)

Consult with specialists for expert opinions:
- **Cardiologist** - Heart conditions
- **Pulmonologist** - Lung and respiratory issues
- **Neurologist** - Brain and nervous system
- **Surgeon** - Surgical emergencies
- **Paediatrician** - Childhood conditions
- **Orthopedist** - Bone and joint injuries

Specialists provide:
- Clinical observations
- Diagnostic guidance (without revealing exact diagnosis)
- Treatment recommendations
- Urgency assessments

### 5. Diagnosis System

#### Multiple Choice Diagnoses
Each case presents 4 possible diagnoses:
- 1 correct diagnosis
- 3 plausible differential diagnoses

#### Diagnosis Information:
- Medical name and description
- Potential consequences of the diagnosis
- Emotional impact on patient/family
- Realistic medical terminology

#### Scoring:
- **Correct diagnosis:** Major points bonus
- **Time bonus:** Extra points for quick diagnosis
- **Stability bonus:** Bonus for maintaining patient stability >80%
- **Incorrect diagnosis:** Point penalty, game ends

---

## ⏱️ Time Pressure System

### Time Limits by Case Urgency:
- **Critical Cases:** 3 minutes (e.g., cardiac arrest, severe trauma)
- **Urgent Cases:** 5 minutes (e.g., stroke, acute abdomen)
- **Moderate Cases:** 8 minutes (e.g., respiratory distress)
- **Routine Cases:** 12 minutes (e.g., stable presentations)

### Time Management:
- Real-time countdown timer
- Visual warnings when time is running low
- Automatic game end when time expires
- Time bonus for quick, accurate diagnosis

---

## 📊 Patient Stability System

### Stability Mechanics:
- **Starting Stability:** 100%
- **Stability States:**
  - **Stable:** 80-100% (green)
  - **Deteriorating:** 50-79% (yellow)
  - **Critical:** 0-49% (red)

### Factors Affecting Stability:

#### Positive Effects:
- Ordering critical tests: +5%
- Asking critical questions: +5%
- Administering helpful treatments: +10%
- Appropriate specialist consultations: +5%

#### Negative Effects:
- Ordering unnecessary tests: -5%
- Asking irrelevant questions: -5%
- Wrong treatments: -5%
- Time passing: Gradual deterioration
- Missed critical actions: -10%

### Patient State Messages:
Dynamic messages reflect patient condition:
- "Patient is stable and responding well"
- "Patient showing signs of deterioration"
- "Patient in critical condition - immediate action required"

---

## 🎯 Scoring System

### Point Awards:
- **Reveal Patient History:** +20 points
- **Ask Critical Question:** +30 points
- **Order Critical Test:** +50 points
- **Administer Helpful Treatment:** +50 points
- **Appropriate Specialist Consultation:** +40 points
- **Correct Diagnosis:** +500 points
- **Time Bonus:** +10 points per minute remaining
- **Perfect Stability Bonus:** +200 points (>80% stability)

### Point Penalties:
- **Incorrect Action:** -10 points
- **Wrong Treatment:** -20 points
- **Incorrect Diagnosis:** -200 points
- **Time Expired:** -100 points

### Performance Ratings:
- **Expert:** 800+ points
- **Proficient:** 600-799 points
- **Competent:** 400-599 points
- **Needs Improvement:** <400 points

---

## 🎨 User Interface

### Main Screen Elements:

#### Header Section:
- Case title and icon
- Patient description
- Investigation phase indicators (Examine → Diagnose → Treat)

#### Status Bar:
- ⏱️ Time remaining
- ⭐ Current score
- ❤️ Patient stability (with color coding)
- ❓ Questions remaining (5 max)
- 👨‍⚕️ Consultations remaining (3 max)

#### Action Buttons:
- **Back to Cases** - Return to case selection
- **Treatment (X)** - Administer treatments (shows count)
- **Glossary** - Medical terminology reference
- **Settings** - Game configuration

#### Content Sections:
- **Patient Image** - Visual representation
- **Patient Condition** - Current vital signs and state
- **Investigation Sections:**
  - Patient History (collapsible)
  - Clinical Questions
  - Diagnostic Tests
  - Test Results (collapsible)
  - Specialist Consultations
  - Diagnosis Options

### Visual Design:
- Clean, professional medical interface
- Color-coded status indicators
- Responsive layout for all screen sizes
- Accessibility features (ARIA labels, keyboard navigation)
- Font Awesome icons throughout

---

## 🔊 Audio System

### Sound Effects:

#### UI Sounds:
- **Click** - Button interactions (real click.mp3)
- **Success** - Correct actions (synthetic chord)
- **Error** - Incorrect actions (synthetic tone)
- **Warning** - Risky actions (synthetic alert)

#### Medical Sounds:
- **Heartbeat** - ECG tests (real heartbeat.mp3)
- **BP Monitor** - Medical notifications (real monitor sound)
- **Printer** - Test results (real printer.mp3)
- **Page Turn** - Revealing history (real page sound)

#### Case-Specific Sounds:
- **Ambulance** - Trauma cases (ambulance-passing.mp3)
- **Child Cough** - Paediatric respiratory cases
- **Hospital Ambience** - Background atmosphere
- **Defibrillator** - Critical patient alerts
- **Ultrasound** - Imaging tests

#### Background Music:
- **Loading Music** - Menu and case selection (loops)
- **Gameplay** - Silent during cases (focus on decisions)

### Audio Features:
- **Auto-trim:** All sounds limited to 5 seconds (except background music)
- **Volume Control:** Adjustable in settings
- **Sound Toggle:** Enable/disable all sounds
- **No Looping:** Sound effects play once only
- **Contextual:** Sounds match game events

---

## 📚 Medical Glossary

### Integrated Learning Tool:
- Comprehensive medical terminology database
- Definitions for all conditions, tests, and treatments
- Accessible via button or keyboard shortcut
- Searchable and categorized
- Helps players learn while playing

### Categories:
- Symptoms and signs
- Diagnostic tests
- Medical conditions
- Treatments and medications
- Anatomical terms
- Medical abbreviations

---

## 🎓 Educational Value

### Learning Objectives:
1. **Clinical Reasoning** - Develop systematic diagnostic approach
2. **Time Management** - Make decisions under pressure
3. **Resource Allocation** - Choose appropriate tests and consultations
4. **Risk Assessment** - Evaluate patient stability and urgency
5. **Medical Knowledge** - Learn terminology and conditions
6. **Treatment Selection** - Understand appropriate interventions

### Realistic Scenarios:
- Based on actual emergency medicine cases
- Authentic medical terminology
- Realistic test results and interpretations
- Evidence-based treatment options
- Consequences of decisions

### Feedback System:
- Immediate feedback on actions
- Explanation of correct/incorrect choices
- Performance metrics and scoring
- Emotional impact narratives
- Learning from mistakes

---

## 🎮 Gameplay Flow

### 1. Case Selection
- Browse available cases
- View difficulty and category
- Read brief case description
- Select case to begin

### 2. Initial Assessment
- Read patient presentation
- Note vital signs and appearance
- Assess urgency and time limit
- Plan investigation approach

### 3. Investigation Phase
- Reveal patient history (optional)
- Ask clinical questions (max 5)
- Order diagnostic tests
- Review test results
- Consult specialists (max 3)
- Administer treatments

### 4. Diagnosis Phase
- Review all gathered information
- Consider differential diagnoses
- Select final diagnosis
- Submit decision

### 5. Outcome
- View results (correct/incorrect)
- See final score and breakdown
- Read patient outcome narrative
- Review performance metrics
- Option to retry or choose new case

---

## 🏆 Achievement System (Steam-Ready)

### Achievements:
- **First Steps** - Complete first case
- **Perfect Diagnosis** - 100% stability, correct diagnosis
- **Speed Runner** - Complete case in under 2 minutes
- **Critical Care Specialist** - Save 5 critical patients
- **Master Diagnostician** - Complete all cases correctly
- **Efficient Investigator** - Diagnose with minimal tests
- **Consultation Expert** - Use all specialist consultations wisely

---

## ⚙️ Settings & Customization

### Game Settings:
- **Sound Effects:** Enable/disable
- **Background Music:** Enable/disable
- **Timer:** Show/hide countdown
- **Difficulty:** Adjust time limits
- **Accessibility:** Screen reader support, keyboard navigation

### Save System:
- **Local Storage:** Progress saved automatically
- **Statistics Tracking:**
  - Cases completed
  - Success rate
  - Average score
  - Best times
  - Perfect diagnoses
  - Total play time

---

## 🔧 Technical Specifications

### Technologies:
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Audio:** Web Audio API + HTML5 Audio
- **Storage:** LocalStorage API
- **Icons:** Font Awesome 6.0
- **Fonts:** Inter (Google Fonts)

### Performance:
- **Load Time:** <2 seconds
- **Responsive:** Mobile, tablet, desktop
- **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)
- **Offline Capable:** PWA-ready with manifest

### File Structure:
```
medical-mystery-game/
├── index.html                 # Main HTML file
├── game.js                    # Core game logic
├── cases.js                   # Case database
├── glossary.js                # Medical terminology
├── enhancement-styles.css     # Additional styling
├── assets/
│   ├── styles/
│   │   └── main.css          # Main stylesheet
│   └── images/
│       └── patients/         # Patient images
├── sounds/                    # Audio files
│   ├── click.mp3
│   ├── heartbeat.mp3
│   ├── ambulance-passing.mp3
│   └── ...
└── manifest.json             # PWA manifest
```

---

## 🎯 Game Design Philosophy

### Core Principles:
1. **Realism** - Authentic medical scenarios and terminology
2. **Education** - Learn while playing
3. **Challenge** - Time pressure and complex decisions
4. **Feedback** - Clear consequences of actions
5. **Accessibility** - Playable by medical and non-medical audiences
6. **Engagement** - Emotional narratives and patient outcomes

### Balance:
- **Not too easy:** Requires thought and investigation
- **Not too hard:** Provides guidance and learning tools
- **Time pressure:** Creates urgency without panic
- **Multiple paths:** Different approaches can succeed
- **Consequences:** Actions matter but mistakes are learning opportunities

---

## 📈 Future Enhancements

### Planned Features:
- Additional case categories (obstetrics, psychiatry, infectious disease)
- Multiplayer mode (team-based diagnosis)
- Career progression system
- Custom case creator
- Advanced difficulty modes
- Mobile app version
- Integration with medical curricula

---

## 🎓 Target Audience Use Cases

### Medical Students:
- Practice clinical reasoning
- Learn diagnostic approaches
- Familiarize with emergency presentations
- Prepare for OSCE exams

### Healthcare Professionals:
- Refresh emergency medicine knowledge
- Practice time-pressured decision making
- Explore cases outside specialty
- Continuing education

### Medical Enthusiasts:
- Learn medical terminology
- Understand diagnostic process
- Experience emergency medicine
- Educational entertainment

### Educators:
- Teaching tool for medical education
- Case-based learning resource
- Assessment of clinical reasoning
- Engaging educational content

---

## 📝 Credits & Attribution

### Development:
- Game Design & Programming
- Medical Content Curation
- Audio Engineering
- UI/UX Design

### Medical Accuracy:
- Based on evidence-based medicine
- Reviewed by healthcare professionals
- Authentic case presentations
- Realistic treatment protocols

---

## 📞 Support & Feedback

### Getting Help:
- In-game glossary for medical terms
- Tutorial cases for new players
- Settings for customization
- Performance feedback after each case

### Reporting Issues:
- Bug reports welcome
- Suggestions for improvements
- Medical accuracy concerns
- Accessibility issues

---

## 🎮 Quick Start Guide

1. **Launch Game** - Open in web browser
2. **Select Case** - Choose from available scenarios
3. **Investigate** - Ask questions, order tests, give treatments
4. **Diagnose** - Select the correct diagnosis
5. **Learn** - Review outcome and improve

**Remember:** Every decision matters. Think like a doctor, act with urgency, and save lives!

---

*Medical Mystery - Where every second counts and every decision matters.* 🏥⏱️
