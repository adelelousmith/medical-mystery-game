// Scoring and Performance Utilities

import { SCORING } from '../constants.js';

export class ScoringManager {
    constructor(gameState) {
        this.gameState = gameState;
    }

    addScore(points, reason) {
        this.gameState.score += points;
        this.trackScoreChange(points, reason);
    }

    trackScoreChange(points, reason) {
        if (!this.gameState.scoreBreakdown) {
            this.gameState.scoreBreakdown = [];
        }
        this.gameState.scoreBreakdown.push({
            points: points,
            reason: reason,
            timestamp: Date.now()
        });
    }

    calculateTimeBonus(timeRemaining, timeLimit) {
        const percentageRemaining = timeRemaining / (timeLimit * 60);
        if (percentageRemaining > 0.5) {
            return SCORING.TIME_BONUS * 2;
        } else if (percentageRemaining > 0.25) {
            return SCORING.TIME_BONUS;
        }
        return 0;
    }

    calculateStabilityBonus(stability) {
        if (stability >= 80) {
            return 100;
        } else if (stability >= 60) {
            return 50;
        } else if (stability >= 40) {
            return 25;
        }
        return 0;
    }

    getPerformanceRating(score) {
        if (score >= 800) {
            return { rating: 'Expert', color: '#4CAF50', icon: 'fas fa-trophy' };
        } else if (score >= 600) {
            return { rating: 'Proficient', color: '#2196F3', icon: 'fas fa-medal' };
        } else if (score >= 400) {
            return { rating: 'Competent', color: '#FF9800', icon: 'fas fa-star' };
        } else {
            return { rating: 'Needs Improvement', color: '#F44336', icon: 'fas fa-exclamation-triangle' };
        }
    }

    categorizeScoreReason(reason) {
        if (reason.includes('history')) return 'Patient History';
        if (reason.includes('Critical question')) return 'Critical Questions';
        if (reason.includes('Critical test')) return 'Critical Tests';
        if (reason.includes('treatment')) return 'Treatments';
        if (reason.includes('diagnosis')) return 'Diagnosis';
        if (reason.includes('time')) return 'Time Bonus';
        if (reason.includes('stability')) return 'Patient Care';
        return 'Other Actions';
    }

    getScoreBreakdown() {
        if (!this.gameState.scoreBreakdown || this.gameState.scoreBreakdown.length === 0) {
            return null;
        }

        const breakdown = {};
        let totalPositive = 0;
        let totalNegative = 0;

        this.gameState.scoreBreakdown.forEach(entry => {
            const category = this.categorizeScoreReason(entry.reason);
            if (!breakdown[category]) {
                breakdown[category] = { total: 0, count: 0, items: [] };
            }
            breakdown[category].total += entry.points;
            breakdown[category].count += 1;
            breakdown[category].items.push(entry);

            if (entry.points > 0) totalPositive += entry.points;
            else totalNegative += entry.points;
        });

        return {
            breakdown,
            totalPositive,
            totalNegative,
            finalScore: this.gameState.score
        };
    }
}
