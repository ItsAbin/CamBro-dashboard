// Utility functions for dashboard calculations and formatting

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
};

export const getDaysUntilDeadline = (dateString) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
