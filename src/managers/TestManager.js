// Test Management System

export class TestManager {
    constructor(gameState) {
        this.gameState = gameState;
    }

    getTestResultImage(testId) {
        if (!testId) {
            console.log('getTestResultImage called with no testId');
            return null;
        }

        const caseId = this.gameState.currentCase?.id;
        const caseCategory = this.gameState.currentCase?.category;

        console.log('getTestResultImage - testId:', testId, 'caseId:', caseId, 'category:', caseCategory);

        const imageMap = {
            'ecg': {
                'cardiac': 'testResults/ecg_58_cardiac.svg',
                'stroke': 'testResults/12_Lead_ECG_stroke_75.png',
                'neurological': 'testResults/12_Lead_ECG_stroke_75.png',
                'ozempic_misuse': 'testResults/ecg_28_ozempic.svg'
            },
            'ct_scan': {
                'trauma': 'testResults/24_CT_crash.png'
            },
            'ct_head': {
                'stroke': 'testResults/CT_75_stroke.png',
                'neurological': 'testResults/CT_75_stroke.png'
            },
            'ct_abdomen': {
                'surgical': 'testResults/CT_scan_45_appendix.png'
            },
            'cardiac_enzymes': {
                'cardiac': 'testResults/58_CardiacEnzyme_heartAttack.png'
            },
            'troponin': {
                'cardiac': 'testResults/58_CardiacEnzyme_heartAttack.png'
            },
            'ultrasound': {
                'trauma': 'testResults/FastUltrasound_24_crash.png'
            },
            'drug_screen': {
                'toxicology': 'testResults/drugTest_25_Overdose.png',
                'ozempic_misuse': 'testResults/tox_screen_28_ozempic.svg'
            },
            'drug_screen_tox': {
                'toxicology': 'testResults/drugTest_25_Overdose.png'
            },
            'blood_gas': {
                'toxicology': 'testResults/arterialBloodGas_25_overdose.png'
            },
            'pregnancy_test': {
                'surgical': 'testResults/pregtest_45_appendix.png'
            },
            'viral_test': {
                'pediatric': 'testResults/viralTestingPanel_3_croup.png'
            },
            'chest_xray': {
                'pediatric': 'testResults/x-ray-3-astma:croup.png',
                'cardiac': 'testResults/xRay_58_heartattack.png'
            },
            'blood_work': {
                'trauma': 'testResults/cbc_24_trauma.svg',
                'pediatric': 'testResults/cbc_3_pediatric.svg',
                'stroke': 'testResults/cbc_coag_72_stroke.svg',
                'abdominal_pain': 'testResults/cbc_45_abdominal.svg',
                'ozempic_misuse': 'testResults/metabolic_panel_28_ozempic.svg'
            },
            'xray_series': {
                'trauma': 'testResults/xray_24_trauma.svg'
            },
            'pulse_oximetry': {
                'pediatric': 'testResults/pulseox_3_pediatric.svg'
            },
            'basic_metabolic': {
                'toxicology': 'testResults/bmp_25_toxicology.svg'
            },
            'liver_function': {
                'toxicology': 'testResults/lft_25_toxicology.svg'
            },
            'glucose': {
                'stroke': 'testResults/glucose_72_stroke.svg'
            },
            'urinalysis': {
                'surgical': 'testResults/urinalysis_45_abdominal.svg'
            },
            'vitamin_levels': {
                'ozempic_misuse': 'testResults/vitamin_panel_28_ozempic.svg'
            }
        };

        if (imageMap[testId] && imageMap[testId][caseId]) {
            console.log('Found image by caseId:', imageMap[testId][caseId]);
            return imageMap[testId][caseId];
        }

        if (imageMap[testId] && imageMap[testId][caseCategory]) {
            console.log('Found image by category:', imageMap[testId][caseCategory]);
            return imageMap[testId][caseCategory];
        }

        console.log('No image found for test:', testId);
        return null;
    }

    generateTestResult(test) {
        if (!test) return 'Test not found';

        const caseId = this.gameState.currentCase.id;
        const caseCategory = this.gameState.currentCase.category;

        // Check for case-specific results
        if (test.results && test.results[caseId]) {
            return test.results[caseId];
        }

        // Check for category-specific results
        if (test.results && test.results[caseCategory]) {
            return test.results[caseCategory];
        }

        // Return default result
        return test.result || 'Results pending...';
    }

    orderTest(testId) {
        const test = this.gameState.currentCase.tests.find(t => t.id === testId);
        if (!test) return false;

        if (this.gameState.orderedTests.includes(testId)) {
            return false; // Already ordered
        }

        this.gameState.orderedTests.push(testId);
        return true;
    }

    getOrderedTests() {
        return this.gameState.orderedTests.map(testId => {
            const test = this.gameState.currentCase.tests.find(t => t.id === testId);
            return {
                id: testId,
                name: test?.name || 'Unknown Test',
                result: this.generateTestResult(test),
                image: this.getTestResultImage(testId)
            };
        });
    }

    getAvailableTests() {
        return this.gameState.currentCase.tests.filter(t => 
            !this.gameState.orderedTests.includes(t.id)
        );
    }
}
