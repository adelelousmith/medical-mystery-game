// Performance Monitor for Medical Mystery Game
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0,
            memoryUsage: 0,
            fps: 0,
            interactions: 0
        };
        
        this.startTime = performance.now();
        this.frameCount = 0;
        this.lastFrameTime = performance.now();
        
        this.init();
    }
    
    init() {
        // Monitor page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now() - this.startTime;
            console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });
        
        // Monitor memory usage (if available)
        if (performance.memory) {
            setInterval(() => {
                this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
            }, 5000);
        }
        
        // Monitor FPS
        this.measureFPS();
        
        // Monitor user interactions
        this.monitorInteractions();
        
        // Report metrics periodically
        setInterval(() => {
            this.reportMetrics();
        }, 30000); // Every 30 seconds
    }
    
    measureFPS() {
        const now = performance.now();
        this.frameCount++;
        
        if (now - this.lastFrameTime >= 1000) {
            this.metrics.fps = Math.round((this.frameCount * 1000) / (now - this.lastFrameTime));
            this.frameCount = 0;
            this.lastFrameTime = now;
        }
        
        requestAnimationFrame(() => this.measureFPS());
    }
    
    monitorInteractions() {
        ['click', 'keydown', 'touchstart'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                this.metrics.interactions++;
            });
        });
    }
    
    measureRenderTime(renderFunction) {
        const start = performance.now();
        const result = renderFunction();
        this.metrics.renderTime = performance.now() - start;
        return result;
    }
    
    reportMetrics() {
        console.group('🔍 Performance Metrics');
        console.log(`Load Time: ${this.metrics.loadTime.toFixed(2)}ms`);
        console.log(`Last Render Time: ${this.metrics.renderTime.toFixed(2)}ms`);
        console.log(`Memory Usage: ${this.metrics.memoryUsage.toFixed(2)}MB`);
        console.log(`FPS: ${this.metrics.fps}`);
        console.log(`User Interactions: ${this.metrics.interactions}`);
        console.groupEnd();
        
        // Warn about performance issues
        if (this.metrics.renderTime > 16) {
            console.warn('⚠️ Slow rendering detected. Consider optimizing render functions.');
        }
        
        if (this.metrics.memoryUsage > 50) {
            console.warn('⚠️ High memory usage detected. Check for memory leaks.');
        }
        
        if (this.metrics.fps < 30) {
            console.warn('⚠️ Low FPS detected. Consider reducing animations or complexity.');
        }
    }
    
    getMetrics() {
        return { ...this.metrics };
    }
}

// Initialize performance monitor
if (typeof window !== 'undefined') {
    window.performanceMonitor = new PerformanceMonitor();
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}