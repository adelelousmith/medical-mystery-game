#!/usr/bin/env node

// Improved Terminal-based Test Runner for Medical Mystery Game
console.log('🏥 Medical Mystery Game - Improved Test Suite');
console.log('==============================================');

const fs = require('fs');

// Mock browser environment for Node.js testing
global.document = {
    getElementById: () => ({ innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} } }),
    querySelector: () => null,
    addEventListener: () => {},
    createElement: () => ({ 
        appendChild: () => {}, 
        setAttribute: () => {},
        classList: { add: () => {}, remove: () => {} }
    }),
    body: { appendChild: () => {} }
};

global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
};

global.performance = {
    now: () => Date.now(),
    memory: { usedJSHeapSize: 1000000 }
};

global.window = global;
global.requestAnimationFrame = (callback) => setTimeout(callback, 16);

let startTime = Date.now();
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(testName, testFunction) {
    totalTests++;
    try {
        testFunction();
        console.log(`✅ PASS: ${testName}`);
        passedTests++;
    } catch (error) {
        console.log(`❌ FAIL: ${testName} - ${error.message}`);
        failedTests++;
    }
}

// Load game files with better error handling
console.log('\n📁 Loading Game Files...');

try {
    // Load cases.js as a module
    const casesModule = require('./cases.js');
    global.medicalCases = casesModule.medicalCases;
    global.getAllCases = casesModule.getAllCases;
    global.getCase = casesModule.getCase;
    global.TIME_PRESSURE = casesModule.TIME_PRESSURE;
    
    console.log('✅ cases.js loaded successfully');
    console.log(`✅ Found ${Object.keys(global.medicalCases).length} medical cases`);
} catch (error) {
    console.log('❌ Error loading cases.js:', error.message);
}

try {
    const glossaryCode = fs.readFileSync('./glossary.js', 'utf8');
    eval(glossaryCode);
    global.medicalTerms = medicalTerms;
    global.categories = categories;
    
    console.log('✅ glossary.js loaded successfully');
    console.log(`✅ Found ${Object.keys(global.medicalTerms).length} medical terms`);
} catch (error) {
    console.log('❌ Error loading glossary.js:', error.message);
}

try {
    const gameCode = fs.readFileSync('./game.js', 'utf8');
    eval(gameCode);
    global.MedicalMysteryGame = MedicalMysteryGame;
    
    console.log('✅ game.js loaded successfully');
} catch (error) {
    console.log('❌ Error loading game.js:', error.message);
}

console.log('\n🧪 Testing Core Systems...');

// Test 1: Medical Cases Structure
runTest('Medical Cases Structure', () => {
    if (!global.medicalCases) {
        throw new Error('medicalCases not available');
    }
    
    const cases = Object.values(global.medicalCases);
    if (cases.length === 0) {
        throw new Error('No medical cases found');
    }
    
    console.log(`   Found ${cases.length} cases: ${Object.keys(global.medicalCases).join(', ')}`);
});

// Test 2: Case Completeness
runTest('Case Data Completeness', () => {
    if (typeof medicalCases === 'undefined') {
        throw new Error('medicalCases not available');
    }
    
    Object.values(medicalCases).forEach(case_ => {
        const requiredFields = ['id', 'title', 'description', 'timeLimit', 'correctDiagnosis'];
        requiredFields.forEach(field => {
            if (!case_[field]) {
                throw new Error(`Case ${case_.id || 'unknown'} missing required field: ${field}`);
            }
        });
        
        if (!case_.patientHistory || !case_.patientHistory.demographics) {
            throw new Error(`Case ${case_.id} missing patient demographics`);
        }
        
        if (!case_.questions || case_.questions.length === 0) {
            throw new Error(`Case ${case_.id} missing questions`);
        }
        
        if (!case_.tests || case_.tests.length === 0) {
            throw new Error(`Case ${case_.id} missing tests`);
        }
        
        if (!case_.diagnosisOptions || case_.diagnosisOptions.length === 0) {
            throw new Error(`Case ${case_.id} missing diagnosis options`);
        }
    });
});

// Test 3: Diagnosis Logic
runTest('Diagnosis Logic', () => {
    if (typeof medicalCases === 'undefined') {
        throw new Error('medicalCases not available');
    }
    
    Object.values(medicalCases).forEach(case_ => {
        const correctDiagnoses = case_.diagnosisOptions.filter(d => d.correct);
        if (correctDiagnoses.length !== 1) {
            throw new Error(`Case ${case_.id} must have exactly one correct diagnosis, found ${correctDiagnoses.length}`);
        }
        
        const correctId = correctDiagnoses[0].id;
        if (case_.correctDiagnosis !== correctId) {
            throw new Error(`Case ${case_.id} correctDiagnosis field doesn't match correct diagnosis option`);
        }
    });
});

// Test 4: Patient Demographics and Images
runTest('Patient Demographics and Images', () => {
    if (typeof medicalCases === 'undefined') {
        throw new Error('medicalCases not available');
    }
    
    Object.values(medicalCases).forEach(case_ => {
        const demographics = case_.patientHistory.demographics;
        const ageMatch = demographics.match(/(\d+)-year-old/);
        
        if (!ageMatch) {
            throw new Error(`Case ${case_.id} demographics should include age in format "X-year-old"`);
        }
        
        const age = parseInt(ageMatch[1]);
        if (age < 0 || age > 120) {
            throw new Error(`Case ${case_.id} has unrealistic age: ${age}`);
        }
    });
});

// Test 5: Medical Glossary
runTest('Medical Glossary', () => {
    if (typeof medicalTerms === 'undefined') {
        throw new Error('medicalTerms not available');
    }
    
    const terms = Object.values(medicalTerms);
    if (terms.length < 10) {
        throw new Error('Medical glossary should have at least 10 terms');
    }
    
    terms.forEach(term => {
        if (!term.term || !term.definition || !term.category) {
            throw new Error(`Medical term missing required fields: ${JSON.stringify(term)}`);
        }
    });
});

// Test 6: Game Functions
runTest('Game Functions', () => {
    if (typeof MedicalMysteryGame === 'undefined') {
        throw new Error('MedicalMysteryGame class not available');
    }
    
    // Test that we can create a game instance
    const game = new MedicalMysteryGame();
    if (!game) {
        throw new Error('Cannot create MedicalMysteryGame instance');
    }
    
    // Test essential methods exist
    const requiredMethods = ['startCase', 'askQuestion', 'orderTest', 'makeDiagnosis'];
    requiredMethods.forEach(method => {
        if (typeof game[method] !== 'function') {
            throw new Error(`Game missing required method: ${method}`);
        }
    });
});

// Test 7: Time Pressure System
runTest('Time Pressure System', () => {
    if (typeof TIME_PRESSURE === 'undefined') {
        throw new Error('TIME_PRESSURE constants not available');
    }
    
    const pressureLevels = Object.values(TIME_PRESSURE);
    if (pressureLevels.some(level => level <= 0 || level > 30)) {
        throw new Error('Time pressure levels should be between 1-30 minutes');
    }
});

// Test 8: File Integrity
runTest('File Integrity', () => {
    const requiredFiles = ['index.html', 'style.css', 'game.js', 'cases.js', 'glossary.js'];
    
    requiredFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            throw new Error(`Required file missing: ${file}`);
        }
        
        const stats = fs.statSync(file);
        if (stats.size === 0) {
            throw new Error(`File is empty: ${file}`);
        }
    });
});

// Performance Tests
console.log('\n⚡ Performance Tests...');

runTest('File Size Optimization', () => {
    const files = ['cases.js', 'game.js', 'glossary.js', 'style.css'];
    let totalSize = 0;
    
    files.forEach(file => {
        const size = fs.statSync(file).size;
        totalSize += size;
        console.log(`   ${file}: ${(size / 1024).toFixed(1)}KB`);
    });
    
    console.log(`   Total: ${(totalSize / 1024).toFixed(1)}KB`);
    
    if (totalSize > 1000000) { // 1MB limit
        throw new Error(`Total file size ${(totalSize / 1024).toFixed(1)}KB exceeds 1MB limit`);
    }
});

runTest('Memory Usage Simulation', () => {
    if (typeof medicalCases === 'undefined') {
        throw new Error('medicalCases not available');
    }
    
    // Simulate loading cases multiple times
    let memoryTest = [];
    for (let i = 0; i < 100; i++) {
        memoryTest.push(JSON.stringify(medicalCases));
    }
    
    // Clean up
    memoryTest = null;
    
    // If we get here without crashing, memory usage is acceptable
});

// Test Summary
const endTime = Date.now();
const totalTime = endTime - startTime;

console.log('\n📊 Test Summary');
console.log('================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log(`Total Time: ${totalTime}ms`);

if (failedTests === 0) {
    console.log('\n🎉 All tests passed! The game is ready for production.');
    console.log('🏥 Medical Mystery Game - Test Suite Complete!');
    console.log('💡 To run the game: python3 -m http.server 8000');
    console.log('💡 Then open: http://localhost:8000');
} else {
    console.log(`\n⚠️  ${failedTests} test(s) failed. Please review and fix issues.`);
    process.exit(1);
}