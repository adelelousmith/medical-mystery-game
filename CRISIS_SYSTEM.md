# Crisis Event System Documentation

## Overview
The Crisis Event System adds real-time patient deterioration events that create immersive, high-pressure emergency moments requiring immediate action.

## Features

### 🚨 Crisis Types

#### 1. Cardiac Arrest
- **Trigger**: Patient stability < 35% in cardiac cases
- **Time Limit**: 10 seconds
- **Correct Action**: Defibrillate (200J)
- **Visual**: Red pulsing screen with cardiac alarm
- **Reward**: +25% stability, +100 points

#### 2. Respiratory Failure
- **Trigger**: Patient stability < 35% in respiratory cases
- **Time Limit**: 12 seconds
- **Correct Action**: Emergency Intubation
- **Visual**: Blue pulsing screen with breathing alarm
- **Reward**: +20% stability, +90 points

#### 3. Severe Bleeding
- **Trigger**: Patient stability < 40% in trauma cases
- **Time Limit**: 8 seconds
- **Correct Actions**: Direct Pressure + Fluids OR Emergency Transfusion
- **Visual**: Red bleeding effect with BP alarm
- **Reward**: +20-25% stability, +85-95 points

#### 4. Anaphylaxis
- **Trigger**: Patient stability < 40% in toxicology cases
- **Time Limit**: 10 seconds
- **Correct Action**: Epinephrine IM (0.3mg)
- **Visual**: Orange swelling effect
- **Reward**: +30% stability, +100 points

#### 5. Status Epilepticus
- **Trigger**: Patient stability < 35% in neurological cases
- **Time Limit**: 12 seconds
- **Correct Action**: Benzodiazepines IV
- **Visual**: Purple seizure shake effect
- **Reward**: +25% stability, +90 points

#### 6. Stroke Progression
- **Trigger**: Patient stability < 40% in stroke cases
- **Time Limit**: 15 seconds
- **Correct Action**: Emergency CT + tPA
- **Visual**: Purple stroke pulse effect
- **Reward**: +20% stability, +100 points

## User Experience

### Crisis Flow
```
1. Patient stability drops below threshold
   ↓
2. Main game timer PAUSES
   ↓
3. Screen flashes with crisis-specific visual effect
   ↓
4. Alarm sound plays
   ↓
5. Crisis modal appears with countdown
   ↓
6. Player chooses action (or times out)
   ↓
7. Outcome shown with stability/score changes
   ↓
8. 3-second outcome display
   ↓
9. Main game resumes
```

### Controls
- **Mouse**: Click option buttons
- **Keyboard**: Press A, B, C, or D keys for quick selection
- **Timeout**: -30% stability, -50 points if no action taken

### Visual Effects

#### Screen Effects
- **Cardiac**: Red pulsing radial gradient
- **Respiratory**: Blue breathing effect
- **Bleeding**: Red bleeding pulse
- **Anaphylaxis**: Orange swelling effect
- **Seizure**: Screen shake animation
- **Stroke**: Purple pulse effect

#### Audio Cues
- Alarm sounds (heartbeat, BP monitor)
- Voice lines: "We're losing them!", "Get the crash cart!", etc.
- Success/failure sounds based on choice

## Technical Implementation

### Architecture
```javascript
// Crisis Manager checks conditions every second
game.timer → crisisManager.checkForCrisis()
              ↓
         Condition met?
              ↓
         triggerCrisis()
              ↓
         Pause main timer
              ↓
         Show crisis UI
              ↓
         Start crisis countdown
              ↓
         Player chooses action
              ↓
         Apply outcome
              ↓
         Resume main timer
```

### Integration Points

#### Game.js
```javascript
// Initialize in constructor
this.crisisManager = new CrisisEventManager(this);

// Check during timer updates
this.crisisManager.checkForCrisis();

// Reset on new case
this.crisisManager.reset();
```

#### Crisis Events.js
```javascript
// Define crisis types
const CRISIS_TYPES = { ... };

// Manager class
class CrisisEventManager {
    checkForCrisis()
    triggerCrisis()
    handleCrisisChoice()
    handleCrisisTimeout()
    resolveCrisis()
}
```

## Customization

### Adding New Crisis Types

```javascript
NEW_CRISIS: {
    id: 'new_crisis',
    name: 'Crisis Name',
    description: 'What player sees',
    urgentMessage: 'Urgent details',
    triggerCondition: (gameState) => {
        // Return true when crisis should trigger
        return gameState.patientStability < 30;
    },
    timeLimit: 10,
    alarmSound: 'heartbeat',
    visualEffect: 'custom-crisis',
    options: [
        {
            id: 'correct_action',
            text: 'Correct Action',
            description: 'What this does',
            correct: true,
            outcome: 'Success message',
            stabilityChange: 20,
            scoreChange: 100
        },
        // ... more options
    ],
    voiceLines: [
        "Voice line 1",
        "Voice line 2"
    ]
}
```

### Custom Visual Effects

Add to `crisis-styles.css`:
```css
.crisis-overlay.custom-crisis {
    animation: customEffect 1s infinite;
    background: radial-gradient(circle, rgba(R, G, B, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%);
}

@keyframes customEffect {
    /* Your animation */
}
```

## Performance Considerations

### Optimization
- Crisis checks only run during active gameplay
- One crisis per game (tracked in `crisisTriggered`)
- Timers properly cleaned up
- DOM elements removed after use

### Memory Management
- Event listeners removed on crisis resolution
- Intervals cleared properly
- No memory leaks from repeated crises

## Accessibility

### Features
- Keyboard shortcuts (A, B, C, D)
- High contrast visual indicators
- Clear text descriptions
- Reduced motion support via CSS media query

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    .crisis-overlay,
    .crisis-modal,
    /* ... */ {
        animation: none !important;
    }
}
```

## Testing

### Test Scenarios

1. **Trigger Crisis**
   - Lower patient stability below threshold
   - Verify crisis appears
   - Verify main timer pauses

2. **Correct Choice**
   - Select correct option
   - Verify stability increases
   - Verify score increases
   - Verify game resumes

3. **Wrong Choice**
   - Select incorrect option
   - Verify stability decreases
   - Verify score decreases
   - Verify game resumes

4. **Timeout**
   - Let timer reach 0
   - Verify severe penalty
   - Verify game resumes

5. **Keyboard Controls**
   - Press A, B, C, D keys
   - Verify options trigger

6. **Multiple Cases**
   - Complete case with crisis
   - Start new case
   - Verify crisis can trigger again

## Future Enhancements

### Planned Features
- [ ] Multiple crises per case (cascading failures)
- [ ] Crisis difficulty scaling
- [ ] Team member AI assistance
- [ ] Voice acting for voice lines
- [ ] More crisis types (septic shock, pulmonary embolism, etc.)
- [ ] Crisis statistics tracking
- [ ] Achievement for perfect crisis handling
- [ ] Tutorial mode for crisis events

### Advanced Features
- [ ] Branching crisis outcomes
- [ ] Equipment availability constraints
- [ ] Team coordination requirements
- [ ] Real-time vital sign animations
- [ ] ECG/monitor visualizations during crisis

## Credits

### Inspiration
- Real emergency medicine protocols
- Medical simulation training
- Healthcare professional feedback

### Assets
- Sound effects: Hospital ambience, alarms, medical equipment
- Visual effects: CSS animations, gradient effects
- Icons: Font Awesome medical icons

## Support

For issues or questions about the crisis system:
1. Check console for error messages
2. Verify all files are loaded (crisis-events.js, crisis-styles.css)
3. Test in different browsers
4. Check browser console for JavaScript errors

## Version History

### v1.0 (Current)
- Initial release
- 6 crisis types
- Keyboard shortcuts
- Visual and audio effects
- Accessibility support
