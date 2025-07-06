// Utility functions for dashboard calculations and formatting

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
};

export const getExamCountdown = (examDate) => {
    const now = new Date();
    const targetDate = new Date(examDate);
    const totalMilliseconds = targetDate - now;
    
    // Return all zero values if the date is in the past
    if (totalMilliseconds <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0, progress: 100 };
    }
    
    // Calculate time units
    const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);
    
    // Calculate progress percentage (assuming 150 days as full semester duration)
    const totalDays = days + (hours/24) + (minutes/(24*60)) + (seconds/(24*60*60));
    const semesterDuration = 150; // roughly 5 months
    const progress = 100 - Math.min(100, Math.max(0, (totalDays/semesterDuration) * 100));
    
    return { days, hours, minutes, seconds, totalDays, progress };
};

export const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
};

export const getDaysUntilDeadline = (dateString) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

export const getDynamicPriority = (daysLeft) => {
    if (daysLeft <= 3) return 'high';
    if (daysLeft <= 7) return 'medium';
    return 'low';
};

export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high': return '#ff4757';
        case 'medium': return '#ff8c00';
        case 'low': return '#2ed573';
        default: return '#a5b4fc';
    }
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'completed': return '#2ed573';
        case 'in-progress': return '#ff8c00';
        case 'pending': return '#ffa500';
        case 'not-started': return '#ff4757';
        default: return '#a5b4fc';
    }
};

export const calculatePercentage = (value, total) => {
    return Math.round((value / total) * 100);
};

export const formatGPA = (gpa, scale = 4.0) => {
    return `${gpa.toFixed(2)}/${scale.toFixed(1)}`;
};

export const getPerformanceInsight = (average) => {
    if (average >= 90) return { text: 'Excellent', color: '#2ed573' };
    if (average >= 80) return { text: 'Good', color: '#ff8c00' };
    if (average >= 70) return { text: 'Average', color: '#ffa500' };
    if (average >= 60) return { text: 'Below Average', color: '#ff6b35' };
    return { text: 'Needs Improvement', color: '#ff4757' };
};
