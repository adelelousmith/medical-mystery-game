#!/usr/bin/env node

// Final Test Runner for Medical Mystery Game
console.log('🏥 Medical Mystery Game - Final Test Suite');
console.log('==========================================');

const fs = require('fs');

// Mock browser environment
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

// Load modules
console.log('\n📁 Loading Game Modules...');

let casesModule, medicalTerms, MedicalMysteryGame;

try {
    casesModule = require('../cases.js');
    console.log('✅ cases.js loaded successfully');
    console.log(`✅ Found ${Object.keys(casesModule.medicalCases).length} medical cases`);
} catch (error) {
    console.log('❌ Error loading cases.js:', error.message);
}

try {
    const glossaryModule = require('../glossary.js');
    medicalTerms = glossaryModule.medicalTerms;
    console.log('✅ glossary.js loaded successfully');
    console.log(`✅ Found ${Object.keys(medicalTerms).length} medical terms`);
} catch (error) {
    console.log('❌ Error loading glossary.js:', error.message);
}

try {
    const gameModule = require('../game.js');
    MedicalMysteryGame = gameModule.MedicalMysteryGame;
    console.log('✅ game.js loaded successfully');
} catch (error) {
    console.log('❌ Error loading game.js:', error.message);
    // Fallback to eval method
    try {
        const gameCode = fs.readFileSync('../game.js', 'utf8');
        eval(gameCode);
        console.log('✅ game.js loaded via eval');
    } catch (evalError) {
        console.log('❌ Error with eval fallback:', evalError.message);
    }
}

console.log('\n🧪 Running Tests...');

// Test 1: Cases Structure
runTest('Medical Cases Structure', () => {
    if (!casesModule || !casesModule.medicalCases) {
        throw new Error('medicalCases not available');
    }
    
    const cases = Object.values(casesModule.medicalCases);
    if (cases.length === 0) {
        throw new Error('No medical cases found');
    }
    
    console.log(`   Found cases: ${Object.keys(casesModule.medicalCases).join(', ')}`);
});

// Test 2: Case Data Integrity
runTest('Case Data Integrity', () => {
    if (!casesModule) throw new Error('Cases module not loaded');
    
    Object.values(casesModule.medicalCases).forEach(case_ => {
        // Required fields
        const required = ['id', 'title', 'description', 'timeLimit', 'correctDiagnosis'];
        required.forEach(field => {
            if (!case_[field]) {
                throw new Error(`Case ${case_.id || 'unknown'} missing: ${field}`);
            }
        });
        
        // Patient history
        if (!case_.patientHistory?.demographics) {
            throw new Error(`Case ${case_.id} missing patient demographics`);
        }
        
        // Questions, tests, diagnosis options
        if (!case_.questions?.length) throw new Error(`Case ${case_.id} missing questions`);
        if (!case_.tests?.length) throw new Error(`Case ${case_.id} missing tests`);
        if (!case_.diagnosisOptions?.length) throw new Error(`Case ${case_.id} missing diagnosis options`);
        
        // Exactly one correct diagnosis
        const correct = case_.diagnosisOptions.filter(d => d.correct);
        if (correct.length !== 1) {
            throw new Error(`Case ${case_.id} must have exactly one correct diagnosis`);
        }
    });
});

// Test 3: Patient Demographics
runTest('Patient Demographics', () => {
    if (!casesModule) throw new Error('Cases module not loaded');
    
    Object.values(casesModule.medicalCases).forEach(case_ => {
        const demographics = case_.patientHistory.demographics;
        const ageMatch = demographics.match(/(\d+)-year-old/);
        
        if (!ageMatch) {
            throw new Error(`Case ${case_.id} demographics format invalid: ${demographics}`);
        }
        
        const age = parseInt(ageMatch[1]);
        if (age < 0 || age > 120) {
            throw new Error(`Case ${case_.id} unrealistic age: ${age}`);
        }
    });
});

// Test 4: Medical Glossary
runTest('Medical Glossary', () => {
    if (!medicalTerms) {
        throw new Error('medicalTerms not available');
    }
    
    const terms = Object.values(medicalTerms);
    if (terms.length < 10) {
        throw new Error('Glossary should have at least 10 terms');
    }
    
    terms.forEach(term => {
        if (!term.term || !term.definition || !term.category) {
            throw new Error(`Invalid term: ${JSON.stringify(term)}`);
        }
    });
    
    console.log(`   Found ${terms.length} medical terms`);
});

// Test 5: Game Class
runTest('Game Class Structure', () => {
    if (typeof MedicalMysteryGame === 'undefined') {
        throw new Error('MedicalMysteryGame class not available');
    }
    
    const game = new MedicalMysteryGame();
    if (!game) {
        throw new Error('Cannot create game instance');
    }
    
    const methods = ['startCase', 'askQuestion', 'orderTest', 'makeDiagnosis'];
    methods.forEach(method => {
        if (typeof game[method] !== 'function') {
            throw new Error(`Missing method: ${method}`);
        }
    });
});

// Test 6: Time Pressure
runTest('Time Pressure System', () => {
    if (!casesModule?.TIME_PRESSURE) {
        throw new Error('TIME_PRESSURE not available');
    }
    
    const levels = Object.values(casesModule.TIME_PRESSURE);
    if (levels.some(level => level <= 0 || level > 30)) {
        throw new Error('Time pressure levels should be 1-30 minutes');
    }
});

// Test 7: File Integrity
runTest('File Integrity', () => {
    const files = ['index.html', 'assets/styles/main.css', 'game.js', 'cases.js', 'glossary.js'];
    
    files.forEach(file => {
        if (!fs.existsSync(file)) {
            throw new Error(`Missing file: ${file}`);
        }
        
        const size = fs.statSync(file).size;
        if (size === 0) {
            throw new Error(`Empty file: ${file}`);
        }
    });
});

// Test 8: Performance
runTest('Performance Check', () => {
    const files = ['cases.js', 'game.js', 'glossary.js', 'assets/styles/main.css'];
    let totalSize = 0;
    
    files.forEach(file => {
        totalSize += fs.statSync(file).size;
    });
    
    console.log(`   Total size: ${(totalSize / 1024).toFixed(1)}KB`);
    
    if (totalSize > 1000000) { // 1MB
        throw new Error('Total file size exceeds 1MB');
    }
});

// Summary
console.log('\n📊 Test Results');
console.log('================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests === 0) {
    console.log('\n🎉 All tests passed! Game is ready.');
    console.log('🚀 Run: python3 -m http.server 8000');
    console.log('🌐 Open: http://localhost:8000');
} else {
    console.log(`\n⚠️  ${failedTests} test(s) failed.`);
    process.exit(1);
}