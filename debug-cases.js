// Debug script to check cases loading
console.log('=== MEDICAL MYSTERY GAME DEBUG ===');

// Check if cases are loaded
if (typeof medicalCases !== 'undefined') {
    console.log('✅ medicalCases loaded successfully');
    console.log('Total cases:', Object.keys(medicalCases).length);
    console.log('Case IDs:', Object.keys(medicalCases));
    
    // List all cases with details
    Object.values(medicalCases).forEach(case_ => {
        console.log(`📋 ${case_.title}`);
        console.log(`   ID: ${case_.id}`);
        console.log(`   Difficulty: ${case_.difficulty}`);
        console.log(`   Patient: ${case_.patientHistory.demographics}`);
        console.log('');
    });
} else {
    console.error('❌ medicalCases not loaded');
}

// Check if helper functions work
if (typeof getAllCases !== 'undefined') {
    console.log('✅ getAllCases function available');
    const cases = getAllCases();
    console.log('Cases from getAllCases():', cases.length);
} else {
    console.error('❌ getAllCases function not available');
}

console.log('=== END DEBUG ===');