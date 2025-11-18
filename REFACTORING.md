# Medical Mystery Game - Refactoring Documentation

## Overview
This document describes the refactored architecture of the Medical Mystery Game, transforming a monolithic 4000-line file into a modular, maintainable codebase.

## Architecture

### Directory Structure
```
medical-mystery-game/
├── src/
│   ├── constants.js              # Game constants and configuration
│   ├── managers/
│   │   ├── GameManager.js        # Main game controller
│   │   ├── TestManager.js        # Test ordering and results
│   │   ├── DiagnosisManager.js   # Diagnosis logic
│   │   └── TreatmentManager.js   # Treatment system
│   ├── utils/
│   │   ├── audio.js              # Audio management
│   │   ├── notifications.js      # Notification system
│   │   ├── patient.js            # Patient state management
│   │   ├── scoring.js            # Scoring calculations
│   │   └── timer.js              # Timer utilities
│   ├── ui/
│   │   ├── renderer.js           # UI rendering
│   │   ├── modals.js             # Modal dialogs
│   │   └── components.js         # Reusable UI components
│   └── data/
│       └── cases.js              # Case data (moved from root)
├── game.js                       # Legacy monolithic file (to be deprecated)
├── index.html
└── README.md
```

## Modules

### Core Managers

#### GameManager
- Main game loop and state management
- Phase transitions (welcome → case selection → playing → ended)
- Timer management
- Save/load functionality

#### TestManager
- Test ordering logic
- Result generation
- Image mapping for test results
- Available vs ordered test tracking

#### DiagnosisManager
- Diagnosis validation
- Differential diagnosis logic
- Scoring for correct/incorrect diagnoses

#### TreatmentManager
- Treatment application
- Effectiveness calculations
- Patient response to treatments

### Utilities

#### AudioManager
- Sound effect playback
- Background music
- Volume control
- Contextual audio (e.g., different sounds for different tests)

#### NotificationManager
- Success/warning/error notifications
- Score notifications
- Progress messages
- Toast-style UI feedback

#### PatientManager
- Patient stability tracking
- Deterioration calculations
- State transitions (stable → deteriorating → critical)
- Treatment effectiveness

#### ScoringManager
- Score calculations
- Performance ratings
- Score breakdown by category
- Time and stability bonuses

### UI Components

#### Renderer
- Screen rendering (welcome, case selection, game, end)
- Phase-specific content rendering
- Dynamic UI updates

#### Modals
- Image viewer modal
- Glossary modal
- Settings modal
- Confirmation dialogs

## Benefits of Refactoring

### 1. Maintainability
- **Before**: 4000 lines in one file
- **After**: ~200-400 lines per module
- Easier to locate and fix bugs
- Clear separation of concerns

### 2. Testability
- Each module can be unit tested independently
- Mock dependencies easily
- Test coverage can be measured per module

### 3. Reusability
- Managers and utilities can be reused across features
- UI components are modular and composable
- Audio and notification systems are decoupled

### 4. Scalability
- Easy to add new features without touching existing code
- New case types can be added without modifying core logic
- Plugin architecture possible for future extensions

### 5. Collaboration
- Multiple developers can work on different modules
- Reduced merge conflicts
- Clear ownership of code sections

## Migration Strategy

### Phase 1: Extract Utilities (✅ Complete)
- [x] Constants
- [x] Audio management
- [x] Notifications
- [x] Patient state
- [x] Scoring

### Phase 2: Extract Managers (In Progress)
- [x] TestManager
- [ ] DiagnosisManager
- [ ] TreatmentManager
- [ ] GameManager

### Phase 3: Extract UI (Planned)
- [ ] Renderer
- [ ] Modals
- [ ] Components

### Phase 4: Integration (Planned)
- [ ] Update index.html to use modules
- [ ] Add module bundler (optional)
- [ ] Update tests
- [ ] Deprecate game.js

### Phase 5: Testing & Validation (Planned)
- [ ] Unit tests for each module
- [ ] Integration tests
- [ ] Performance testing
- [ ] User acceptance testing

## Usage Examples

### Using the Refactored Modules

```javascript
// Import modules
import { AudioManager } from './src/utils/audio.js';
import { NotificationManager } from './src/utils/notifications.js';
import { ScoringManager } from './src/utils/scoring.js';
import { TestManager } from './src/managers/TestManager.js';

// Initialize
const audioManager = new AudioManager();
audioManager.initializeSounds();

const notificationManager = new NotificationManager(audioManager);
const scoringManager = new ScoringManager(gameState);
const testManager = new TestManager(gameState);

// Use
audioManager.playSound('success');
notificationManager.showSuccess('Test ordered successfully!');
scoringManager.addScore(50, 'Critical test ordered');
testManager.orderTest('ecg');
```

## Best Practices

### 1. Single Responsibility
Each module has one clear purpose and responsibility.

### 2. Dependency Injection
Managers receive dependencies through constructors, making them testable.

### 3. Immutability
Where possible, avoid mutating state directly. Use methods to update state.

### 4. Error Handling
Each module handles its own errors and provides meaningful error messages.

### 5. Documentation
Each module includes JSDoc comments explaining its purpose and API.

## Performance Considerations

### Module Loading
- Use ES6 modules for tree-shaking
- Lazy load non-critical modules
- Consider bundling for production

### Memory Management
- Clean up event listeners
- Remove DOM elements properly
- Clear timers and intervals

### Optimization
- Debounce frequent operations (rendering, scoring)
- Cache computed values
- Use efficient data structures

## Future Enhancements

### 1. TypeScript Migration
Convert modules to TypeScript for type safety and better IDE support.

### 2. State Management
Implement Redux or similar for centralized state management.

### 3. Testing Framework
Add Jest or Vitest for comprehensive testing.

### 4. Build Pipeline
Add Webpack/Vite for bundling, minification, and optimization.

### 5. Plugin System
Allow third-party extensions and custom cases.

## Contributing

When adding new features:
1. Identify the appropriate module or create a new one
2. Follow the existing patterns and conventions
3. Add JSDoc comments
4. Update this documentation
5. Add tests for new functionality

## Questions?

For questions about the refactoring or architecture decisions, please refer to the commit history or open an issue.
