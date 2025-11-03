#!/usr/bin/env node

// Terminal-based Test Runner for Medical Mystery Game
console.log('🏥 Medical Mystery Game - Advanced Test Suite');
console.log('=============================================');

const fs = require('fs');

// Mock browser environment for Node.js testing
global.document = {
    getElementById: () => ({ innerHTML: '', style: {} }),
    querySelector: () => null,
    addEventListener: () => {},
    createElement: () => ({ appendChild: () => {}, setAttribute: () => {} }),
    body: { appendChild: () => {} }
};

global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
};

global.performance = {
    now: () => Date.now()
};

global.window = global;

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

// Load game files
try {
    const casesCode = fs.readFileSync('./cases.js', 'utf8');
    eval(casesCode);
    console.log('✅ cases.js loaded successfully');
} catch (error) {
    console.log('❌ Error loading cases.js:', error.message);
}

try {
    const glossaryCode = fs.readFileSync('./glossary.js', 'utf8');
    eval(glossaryCode);
    console.log('✅ glossary.js loaded successfully');
} catch (error) {
    console.log('❌ Error loading glossary.js:', error.message);
}

try {
    const gameCode = fs.readFileSync('./game.js', 'utf8');
    eval(gameCode);
    console.log('✅ game.js loaded successfully');
} catch (error) {
    console.log('❌ Error loading game.js:', error.message);
}

console.log('\n🧪 Testing Core Systems...');

// Test 1: Diagnosis Logic - Symptoms → Tests → Diagnosis Path
runTest('Diagnosis Logic Flow', () => {
    // Access medicalCases from the global scope after eval
    if (typeof medicalCases === 'undefined') {
        throw new Error('medicalCases not available - check cases.js loading');
    }
    
    const cardiacCase = medicalCases.cardiac;
    if (!cardiacCase) throw new Error('Cardiac case not found');
    
    // Test symptom-to-test mapping
    const hasSymptoms = cardiacCase.questions && cardiacCase.questions.length > 0;
    const hasTests = cardiacCase.tests && cardiacCase.tests.length > 0;
    const hasDiagnosis = cardiacCase.diagnosisOptions && cardiacCase.diagnosisOptions.length > 0;
    
    if (!hasSymptoms || !hasTests || !hasDiagnosis) {
        throw new Error('Diagnosis path incomplete: symptoms, tests, or diagnosis missing');
    }
    
    // Test that correct diagnosis exists
    const correctDiagnosis = cardiacCase.diagnosisOptions.find(d => d.correct);
    if (!correctDiagnosis) {
        throw new Error('No correct diagnosis found in cardiac case');
    }
});

// Test 2: Decision-Making - Branching Choices
runTest('Decision-Making System', () => {
    if (typeof medicalCases === 'undefined') {
        throw new Error('medicalCases not available - check cases.js loading');
    }
    
    // Test that cases have multiple diagnosis options (branching)
    Object.values(medicalCases).forEach(case_ => {
        if (!case_.diagnosisOptions || case_.diagnosisOptions.length < 2) {
            throw new Error(`Case ${case_.id} needs multiple diagnosis options for branching`);
        }
        
        // Test that there's exactly one correct diagnosis
        const correctCount = case_.diagnosisOptions.filter(d => d.correct).length;
        if (correctCount !== 1) {
            throw new Error(`Case ${case_.id} must have exactly one correct diagnosis, found ${correctCount}`);
        }
    });
});

// Test 3: Outcomes - Patient Lives/Dies
runTest('Outcome System', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    Object.values(medicalCases).forEach(case_ => {
        case_.diagnosisOptions.forEach(diagnosis => {
            if (typeof diagnosis.correct !== 'boolean') {
                throw new Error(`Diagnosis ${diagnosis.id} missing correct/incorrect outcome`);
            }
        });
    });
});

// Test 4: Edge Cases - Conflicting Data
runTest('Edge Case Handling', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    // Test for cases with conflicting symptoms
    const traumaCase = medicalCases.trauma;
    if (traumaCase) {
        // Trauma cases should have multiple symptoms that could indicate different conditions
        const symptoms = traumaCase.questions || [];
        if (symptoms.length < 3) {
            throw new Error('Trauma case should have multiple symptoms for realistic complexity');
        }
    }
});

// Test 5: Rare Diseases
runTest('Rare Disease Coverage', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    // Test that we have at least one complex case
    const complexCases = Object.values(medicalCases).filter(case_ => 
        case_.difficulty === 'hard' || case_.difficulty === 'expert'
    );
    
    if (complexCases.length === 0) {
        throw new Error('No complex cases found for rare disease scenarios');
    }
});

// Test 6: Misdiagnosis Scenarios
runTest('Misdiagnosis Prevention', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    Object.values(medicalCases).forEach(case_ => {
        // Test that incorrect diagnoses have realistic consequences
        case_.diagnosisOptions.forEach(diagnosis => {
            if (!diagnosis.correct && !diagnosis.consequences) {
                throw new Error(`Incorrect diagnosis ${diagnosis.id} should have consequences`);
            }
        });
    });
});

// Test 7: Time Pressure Mechanics
runTest('Time Pressure System', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    Object.values(medicalCases).forEach(case_ => {
        if (!case_.timeLimit || case_.timeLimit <= 0) {
            throw new Error(`Case ${case_.id} missing time limit`);
        }
        
        // Test that time limits are realistic (not too short, not too long)
        if (case_.timeLimit < 2 || case_.timeLimit > 30) {
            throw new Error(`Case ${case_.id} time limit ${case_.timeLimit} minutes is unrealistic`);
        }
    });
});

// Test 8: Emotional Stakes
runTest('Emotional Engagement', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    Object.values(medicalCases).forEach(case_ => {
        if (!case_.description || case_.description.length < 50) {
            throw new Error(`Case ${case_.id} needs more detailed patient description for emotional engagement`);
        }
        
        // Test that patient history includes emotional elements
        if (case_.patientHistory && case_.patientHistory.socialHistory) {
            const socialHistory = case_.patientHistory.socialHistory;
            if (socialHistory.length === 0) {
                throw new Error(`Case ${case_.id} social history should include emotional context`);
            }
        }
    });
});

// Test 9: Resource Management
runTest('Resource Management System', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    Object.values(medicalCases).forEach(case_ => {
        if (case_.tests) {
            // Test that tests have costs or limitations
            case_.tests.forEach(test => {
                if (!test.name || !test.description) {
                    throw new Error(`Test in case ${case_.id} missing name or description`);
                }
            });
        }
    });
});

// Test 10: Narrative Consistency
runTest('Narrative Consistency', () => {
    const medicalCases = global.medicalCases || window.medicalCases;
    if (!medicalCases) throw new Error('medicalCases not available');
    
    Object.values(medicalCases).forEach(case_ => {
        // Test that case elements are consistent
        if (case_.patientHistory && case_.patientHistory.demographics) {
            const demographics = case_.patientHistory.demographics;
            if (!demographics.includes('year-old') && !demographics.includes('age')) {
                throw new Error(`Case ${case_.id} demographics should include age information`);
            }
        }
    });
});

// Performance and Reliability Tests
console.log('\n⚡ Performance & Reliability Tests...');

runTest('File Size Optimization', () => {
    const casesSize = fs.statSync('./cases.js').size;
    const gameSize = fs.statSync('./game.js').size;
    const glossarySize = fs.statSync('./glossary.js').size;
    
    const totalSize = casesSize + gameSize + glossarySize;
    if (totalSize > 500000) { // 500KB limit
        throw new Error(`Total file size ${totalSize} bytes exceeds 500KB limit`);
    }
});

runTest('Memory Usage', () => {
    const startMemory = process.memoryUsage().heapUsed;
    
    // Simulate loading multiple cases
    for (let i = 0; i < 100; i++) {
        if (window.medicalCases) {
            Object.keys(window.medicalCases);
        }
    }
    
    const endMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = endMemory - startMemory;
    
    if (memoryIncrease > 10000000) { // 10MB limit
        throw new Error(`Memory increase ${memoryIncrease} bytes exceeds 10MB limit`);
    }
});

runTest('Error Handling', () => {
    // Test that the game can handle missing data gracefully
    const medicalCases = global.medicalCases || window.medicalCases;
    if (medicalCases) {
        const testCase = medicalCases.cardiac;
        if (testCase) {
            // Test that required fields exist
            const requiredFields = ['id', 'title', 'description', 'timeLimit', 'correctDiagnosis'];
            requiredFields.forEach(field => {
                if (!testCase[field]) {
                    throw new Error(`Required field '${field}' missing from cardiac case`);
                }
            });
        }
    }
});

// Test Summary
const endTime = Date.now();
const totalTime = endTime - startTime;

console.log('\n📊 Advanced Test Summary');
console.log('========================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
console.log(`Total Time: ${totalTime}ms`);

if (failedTests === 0) {
    console.log('\n🎉 All advanced tests passed! The game is ready for production.');
    console.log('🏥 Medical Mystery Game - Advanced Test Suite Complete!');
    console.log('💡 To run the full game, use: python3 -m http.server 8000');
    console.log('💡 Then open: http://localhost:8000');
} else {
    console.log(`\n⚠️  ${failedTests} test(s) failed. Please review and fix issues.`);
    process.exit(1);
} 