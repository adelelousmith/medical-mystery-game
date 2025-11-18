// Audio Management System

export class AudioManager {
    constructor() {
        this.sounds = {};
        this.musicEnabled = true;
        this.soundEnabled = true;
        this.currentMusic = null;
        this.autoStopTimers = {};
    }

    loadSound(id, path) {
        this.sounds[id] = new Audio(path);
        this.sounds[id].preload = 'auto';
    }

    initializeSounds() {
        this.loadSound('click', 'sounds/click.mp3');
        this.loadSound('success', 'sounds/click.mp3');
        this.loadSound('warning', 'sounds/click.mp3');
        this.loadSound('error', 'sounds/click.mp3');
        this.loadSound('page_turn', 'sounds/book-turn-page-2-92381.mp3');
        this.loadSound('test_result', 'sounds/printer-sound-effect-no-copyright-394246.mp3');
        this.loadSound('heartbeat', 'sounds/heartbeat.mp3');
        this.loadSound('ambulance', 'sounds/ambulance-passing.mp3');
        this.loadSound('hospital_ambience', 'sounds/hospital-ambience.mp3');
        this.loadSound('loading_music', 'sounds/loading-music.mp3');
        this.loadSound('bp_monitor', 'sounds/bp-monitor-realistic-medical-sound-effects-319068.mp3');
        this.loadSound('ultrasound', 'sounds/ultrasound.mp3');
        this.loadSound('defibrillator', 'sounds/defibrillatorResusitation.mp3');
        this.loadSound('child_cough', 'sounds/child-cough.mp3');
        this.loadSound('elderly_distress', 'sounds/elderly-distress.mp3');
        this.loadSound('male_pain', 'sounds/male-pain.mp3');
        this.loadSound('vomiting', 'sounds/vomiting.mp3');
    }

    playSound(soundId) {
        if (!this.soundEnabled) return;

        const sound = this.sounds[soundId];
        if (sound) {
            sound.currentTime = 0;
            sound.volume = 0.5;
            sound.play().catch(err => console.log('Audio play prevented:', err));

            // Auto-stop printer sound after 5 seconds
            if (soundId === 'test_result') {
                if (this.autoStopTimers[soundId]) {
                    clearTimeout(this.autoStopTimers[soundId]);
                }
                this.autoStopTimers[soundId] = setTimeout(() => {
                    sound.pause();
                    sound.currentTime = 0;
                    console.log('🔇 Auto-stopped printer after 5 seconds');
                }, 5000);
            }
        }
    }

    playContextualSound(testId) {
        const soundMap = {
            'ecg': 'bp_monitor',
            'ultrasound': 'ultrasound',
            'fast_ultrasound': 'ultrasound',
            'ct_scan': 'bp_monitor',
            'ct_head': 'bp_monitor',
            'ct_abdomen': 'bp_monitor',
            'xray': 'bp_monitor',
            'chest_xray': 'bp_monitor'
        };

        const contextualSound = soundMap[testId];
        if (contextualSound) {
            console.log('Playing contextual test sound for:', testId);
            this.playSound(contextualSound);
        } else {
            this.playSound('test_result');
        }
    }

    playMusic(musicId) {
        if (!this.musicEnabled) return;

        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }

        const music = this.sounds[musicId];
        if (music) {
            music.loop = true;
            music.volume = 0.3;
            music.play().catch(err => console.log('Music play prevented:', err));
            this.currentMusic = music;
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
            console.log('🔇 Loading music stopped');
        }
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        if (!this.musicEnabled && this.currentMusic) {
            this.stopMusic();
        }
        return this.musicEnabled;
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }

    setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
        });
    }
}
