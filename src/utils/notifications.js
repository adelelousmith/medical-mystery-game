// Notification System

export class NotificationManager {
    constructor(audioManager) {
        this.audioManager = audioManager;
    }

    sanitizeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            error: 'fa-times-circle',
            info: 'fa-info-circle'
        };

        notification.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${this.sanitizeHtml(message)}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, duration);
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
        this.audioManager.playSound('success');
    }

    showWarning(message) {
        this.showNotification(message, 'warning');
        this.audioManager.playSound('warning');
    }

    showError(message) {
        this.showNotification(message, 'error');
        this.audioManager.playSound('error');
    }

    showScoreNotification(points, reason) {
        const notification = document.createElement('div');
        notification.className = `score-notification ${points > 0 ? 'positive' : 'negative'}`;
        notification.innerHTML = `
            <i class="fas ${points > 0 ? 'fa-plus-circle' : 'fa-minus-circle'}"></i>
            <span class="score-change">${points > 0 ? '+' : ''}${points} points</span>
            <span class="score-reason">${this.sanitizeHtml(reason)}</span>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    showProgressMessage(message) {
        const progressDiv = document.getElementById('progress-messages');
        if (!progressDiv) return;

        const messageEl = document.createElement('div');
        messageEl.className = 'progress-message fade-in';
        messageEl.innerHTML = `<i class="fas fa-info-circle"></i> ${this.sanitizeHtml(message)}`;
        
        progressDiv.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.classList.add('fade-out');
            setTimeout(() => messageEl.remove(), 500);
        }, 5000);
    }
}
