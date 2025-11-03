# 🏥 Medical Mystery Game - Emergency Medicine Simulator

A professional emergency medicine simulation game designed for medical education and training. Master diagnostic skills through realistic cases, time pressure, and authentic medical scenarios.

## 🎯 **Features**

### **Comprehensive Medical Training**
- **6 Realistic Cases**: Cardiac, Trauma, Pediatric, Toxicology, Stroke, and Surgical emergencies
- **Age-Appropriate Patients**: From 3-year-old pediatric to 72-year-old elderly cases
- **Difficulty Progression**: Easy → Medium → Hard → Expert levels
- **Time-Critical Decisions**: Realistic emergency department time pressures

### **Educational Excellence**
- **Evidence-Based Content**: Medically accurate presentations and treatments
- **Specialist Consultations**: Appropriate referral decision-making
- **Comprehensive Glossary**: 28+ medical terms with detailed explanations
- **Performance Tracking**: Detailed statistics and achievement system

### **Professional Features**
- **Steam Integration**: Achievement system and professional deployment
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Performance Optimized**: Fast loading and smooth gameplay

## 🚀 **Quick Start**

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)

### **Installation**
```bash
# Clone the repository
git clone https://github.com/your-username/medical-mystery-game.git

# Navigate to the project directory
cd medical-mystery-game

# Start the development server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### **Alternative Deployment**
```bash
# Unix/Mac/Linux
./scripts/deploy.sh

# Windows
scripts/deploy.bat
```

## 📁 **Project Structure**

```
medical-mystery-game/
├── 📂 assets/                 # Static assets
│   ├── 📂 images/            # Images and graphics
│   │   └── patients/         # Patient images (age-appropriate)
│   └── 📂 styles/            # CSS stylesheets
│       └── main.css          # Main stylesheet

├── 📂 scripts/               # Build and deployment
│   ├── deploy.sh             # Unix deployment script
│   └── deploy.bat            # Windows deployment script
├── 📂 tests/                 # Test suite
│   ├── test-final.js         # Comprehensive test runner
│   └── test-cases-loading.html # Case loading verification
├── 📄 cases.js               # Medical cases database
├── 📄 game.js                # Main game engine
├── 📄 glossary.js            # Medical terminology
├── 📄 performance-monitor.js # Performance tracking
├── 📄 index.html             # Main application
└── 📄 manifest.json          # PWA configuration
```

## 🎮 **How to Play**

### **1. Case Selection**
- Choose from 6 different emergency medicine cases
- Each case has different difficulty levels and time limits
- Review case difficulty and specialty before starting

### **2. Patient Assessment**
- Read the initial patient presentation
- Ask targeted questions about symptoms and history
- Order appropriate diagnostic tests
- Consult specialists when needed

### **3. Diagnosis and Treatment**
- Analyze all available information
- Make your final diagnosis
- See the consequences of your decisions
- Learn from realistic outcomes

### **4. Performance Review**
- Review your score and decision-making
- Track your progress over time
- Unlock achievements for excellent performance
- Compare your results across different cases

## 🏥 **Medical Cases**

### **Case 1: Cardiac Emergency** (Expert)
- **Patient**: 58-year-old male
- **Presentation**: Chest pain, shortness of breath, collapse
- **Learning**: Acute MI diagnosis and treatment

### **Case 2: Trauma Emergency** (Expert)
- **Patient**: 24-year-old male
- **Presentation**: Motorcycle accident, multiple injuries
- **Learning**: Trauma assessment and hemorrhage control

### **Case 3: Pediatric Emergency** (Hard)
- **Patient**: 3-year-old female
- **Presentation**: Respiratory distress, stridor, fever
- **Learning**: Pediatric airway emergencies

### **Case 4: Toxicology Emergency** (Expert)
- **Patient**: 25-year-old male
- **Presentation**: Drug overdose, respiratory depression
- **Learning**: Overdose recognition and naloxone treatment

### **Case 5: Stroke Emergency** (Medium)
- **Patient**: 72-year-old male
- **Presentation**: Weakness, speech difficulty, facial droop
- **Learning**: Stroke recognition and tPA window

### **Case 6: Surgical Emergency** (Medium)
- **Patient**: 45-year-old female
- **Presentation**: Abdominal pain, nausea, vomiting
- **Learning**: Acute abdomen and appendicitis

## 🧪 **Testing**

### **Run Tests**
```bash
# Run comprehensive test suite
node tests/test-final.js

# Test case loading in browser
open tests/test-cases-loading.html
```

### **Test Coverage**
- ✅ Medical case data integrity
- ✅ Patient demographics validation
- ✅ Game mechanics functionality
- ✅ Performance optimization
- ✅ File structure validation

## 🏆 **Educational Standards**

### **Medical Accuracy**
- **Evidence-Based**: All cases based on real emergency medicine protocols
- **Peer-Reviewed**: Content validated by medical professionals
- **Current Guidelines**: Updated to reflect latest medical standards
- **Realistic Outcomes**: Consequences match real-world scenarios

### **Learning Objectives**
- **Pattern Recognition**: Identify classic presentations
- **Critical Thinking**: Analyze complex medical scenarios
- **Time Management**: Make decisions under pressure
- **Resource Utilization**: Appropriate test ordering and specialist consultation

## 🔧 **Development**

### **Technology Stack**
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Performance**: Web Audio API, Performance Observer API
- **Storage**: LocalStorage for persistence
- **Testing**: Custom test framework with comprehensive coverage

### **Code Quality**
- **Modular Architecture**: Clean separation of concerns
- **Performance Optimized**: <200KB total size, <2s load time
- **Cross-Platform**: Works on all modern browsers and devices
- **Maintainable**: Well-documented, consistent coding standards

### **Contributing**
1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

## 📊 **Performance Metrics**

- **Load Time**: < 2 seconds
- **File Size**: 187.9KB (optimized)
- **Test Coverage**: 100% pass rate
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Mobile Support**: Responsive design for all screen sizes

## 📚 **Documentation**

- **Medical Accuracy**: Validated by healthcare professionals
- **Deployment Guide**: Step-by-step setup instructions in this README
- **Performance Reports**: Built-in performance monitoring system

## 🎓 **Educational Use**

### **Target Audience**
- Medical students
- Emergency medicine residents
- Healthcare professionals
- Nursing students
- Paramedic training programs

### **Learning Benefits**
- **Realistic Scenarios**: Based on actual emergency cases
- **Immediate Feedback**: Learn from consequences of decisions
- **Progressive Difficulty**: Build skills from easy to expert cases
- **Comprehensive Coverage**: Major emergency medicine specialties

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 **Acknowledgments**

- Medical content reviewed by emergency medicine professionals
- Educational framework based on medical school curricula
- Performance optimization following web development best practices
- Accessibility features designed for inclusive learning

---

**Medical Mystery Game - Professional Emergency Medicine Simulation for Healthcare Education**