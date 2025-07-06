// Dashboard Data - Centralized data management

export const attendanceData = {
    present: 85,
    absent: 15,
    totalDays: 100,
    // Semester-wise attendance data
    semesters: {
        'Sem 1': { percentage: 92, present: 88, absent: 8, total: 96 },
        'Sem 2': { percentage: 88, present: 84, absent: 12, total: 96 },
        'Sem 3': { percentage: 95, present: 91, absent: 5, total: 96 },
        'Sem 4': { percentage: 78, present: 75, absent: 21, total: 96 },
        'Sem 5': { percentage: 85, present: 81, absent: 15, total: 96 },
        'Sem 6': { percentage: 90, present: 86, absent: 10, total: 96 }
    },
    // Current semester
    currentSemester: 'Sem 6'
};

export const performanceData = {
    // Subject codes and full names
    subjects: {
        'MPMC': {
            fullName: 'Microprocessors and Microcontrollers',
            semesters: {
                'Sem 1': { marks: [85, 78, 92], average: 85.0, gpa: 8.5 },
                'Sem 2': { marks: [88, 82, 89], average: 86.3, gpa: 8.6 },
                'Sem 3': { marks: [82, 89, 78], average: 83.0, gpa: 8.3 },
                'Sem 4': { marks: [90, 85, 88], average: 87.7, gpa: 8.8 },
                'Sem 5': { marks: [92, 88, 95], average: 91.7, gpa: 9.2 },
                'Sem 6': { marks: [89, 94, 87], average: 90.0, gpa: 9.0 }
            }
        },
        'SS': {
            fullName: 'System Software',
            semesters: {
                'Sem 1': { marks: [78, 85, 82], average: 81.7, gpa: 8.2 },
                'Sem 2': { marks: [85, 89, 84], average: 86.0, gpa: 8.6 },
                'Sem 3': { marks: [88, 92, 85], average: 88.3, gpa: 8.8 },
                'Sem 4': { marks: [82, 87, 90], average: 86.3, gpa: 8.6 },
                'Sem 5': { marks: [90, 88, 92], average: 90.0, gpa: 9.0 },
                'Sem 6': { marks: [92, 89, 94], average: 91.7, gpa: 9.2 }
            }
        },
        'DS': {
            fullName: 'Data Structures',
            semesters: {
                'Sem 1': { marks: [92, 88, 95], average: 91.7, gpa: 9.2 },
                'Sem 2': { marks: [89, 94, 87], average: 90.0, gpa: 9.0 },
                'Sem 3': { marks: [95, 92, 98], average: 95.0, gpa: 9.5 },
                'Sem 4': { marks: [88, 91, 89], average: 89.3, gpa: 8.9 },
                'Sem 5': { marks: [94, 89, 96], average: 93.0, gpa: 9.3 },
                'Sem 6': { marks: [91, 95, 92], average: 92.7, gpa: 9.3 }
            }
        },
        'DBMS': {
            fullName: 'Database Management Systems',
            semesters: {
                'Sem 1': { marks: [88, 92, 85], average: 88.3, gpa: 8.8 },
                'Sem 2': { marks: [90, 88, 89], average: 89.0, gpa: 8.9 },
                'Sem 3': { marks: [85, 91, 87], average: 87.7, gpa: 8.8 },
                'Sem 4': { marks: [92, 89, 94], average: 91.7, gpa: 9.2 },
                'Sem 5': { marks: [88, 95, 91], average: 91.3, gpa: 9.1 },
                'Sem 6': { marks: [94, 88, 92], average: 91.3, gpa: 9.1 }
            }
        },
        'OS': {
            fullName: 'Operating Systems',
            semesters: {
                'Sem 1': { marks: [82, 89, 78], average: 83.0, gpa: 8.3 },
                'Sem 2': { marks: [85, 82, 88], average: 85.0, gpa: 8.5 },
                'Sem 3': { marks: [89, 85, 91], average: 88.3, gpa: 8.8 },
                'Sem 4': { marks: [88, 92, 85], average: 88.3, gpa: 8.8 },
                'Sem 5': { marks: [91, 89, 94], average: 91.3, gpa: 9.1 },
                'Sem 6': { marks: [89, 93, 87], average: 89.7, gpa: 9.0 }
            }
        }
    },
    // Current semester
    currentSemester: 'Sem 6'
};

export const deadlines = [
    { 
        id: 1, 
        title: 'MPMC Assignment', 
        due: '2025-07-08', 
        subject: 'Microprocessors and Microcontrollers',
        priority: 'high',
        status: 'pending'
    },
    { 
        id: 2, 
        title: 'DS Project', 
        due: '2025-07-12', 
        subject: 'Data Structures',
        priority: 'medium',
        status: 'in-progress'
    },
    { 
        id: 3, 
        title: 'DBMS Lab Report', 
        due: '2025-07-15', 
        subject: 'Database Management Systems',
        priority: 'low',
        status: 'pending'
    },
    { 
        id: 4, 
        title: 'OS Theory Assignment', 
        due: '2025-07-18', 
        subject: 'Operating Systems',
        priority: 'medium',
        status: 'not-started'
    },
    { 
        id: 5, 
        title: 'SS Presentation', 
        due: '2025-07-20', 
        subject: 'System Software',
        priority: 'high',
        status: 'pending'
    }
];

export const classSchedule = [
    { 
        time: '9:00', 
        subject: 'MPMC', 
        fullName: 'Microprocessors and Microcontrollers',
        room: 'A101',
        period: 'AM',
        duration: '1h 30min',
        instructor: 'Dr. Smith'
    },
    { 
        time: '10:30', 
        subject: 'SS', 
        fullName: 'System Software',
        room: 'B203',
        period: 'AM',
        duration: '1h 30min',
        instructor: 'Prof. Johnson'
    },
    { 
        time: '12:00', 
        subject: 'DS', 
        fullName: 'Data Structures',
        room: 'C304',
        period: 'PM',
        duration: '1h 30min',
        instructor: 'Dr. Williams'
    },
    { 
        time: '2:00', 
        subject: 'DBMS', 
        fullName: 'Database Management Systems',
        room: 'D405',
        period: 'PM',
        duration: '1h 30min',
        instructor: 'Prof. Davis'
    },
    { 
        time: '3:30', 
        subject: 'OS', 
        fullName: 'Operating Systems',
        room: 'E106',
        period: 'PM',
        duration: '1h 30min',
        instructor: 'Ms. Brown'
    }
];

// Helper functions for data calculations
export const getAttendanceForSemester = (semester) => {
    return attendanceData.semesters[semester] || attendanceData.semesters[attendanceData.currentSemester];
};

export const getSubjectsForSemester = (semester) => {
    const subjects = {};
    Object.keys(performanceData.subjects).forEach(subjectCode => {
        const subjectData = performanceData.subjects[subjectCode];
        if (subjectData.semesters[semester]) {
            subjects[subjectCode] = {
                ...subjectData,
                semesterData: subjectData.semesters[semester]
            };
        }
    });
    return subjects;
};

export const getOverallGPAForSemester = (semester) => {
    const subjects = getSubjectsForSemester(semester);
    const gpas = Object.values(subjects).map(subject => subject.semesterData.gpa);
    return gpas.length > 0 ? (gpas.reduce((sum, gpa) => sum + gpa, 0) / gpas.length).toFixed(1) : '0.0';
};

export const getSemesterOptions = () => {
    return Object.keys(attendanceData.semesters);
};

export const getSubjectCodes = () => {
    return Object.keys(performanceData.subjects);
};

export const getSubjectFullName = (subjectCode) => {
    return performanceData.subjects[subjectCode]?.fullName || subjectCode;
};

export const formatTime = (time, period) => {
    // Convert 24-hour format to 12-hour format with AM/PM
    const [hours, minutes] = time.split(':');
    const hour12 = hours === '12' ? 12 : hours % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
};

export const getGradeFromGPA = (gpa) => {
    if (gpa >= 9.5) return 'A+';
    if (gpa >= 9.0) return 'A';
    if (gpa >= 8.5) return 'B+';
    if (gpa >= 8.0) return 'B';
    if (gpa >= 7.5) return 'C+';
    if (gpa >= 7.0) return 'C';
    if (gpa >= 6.5) return 'D+';
    if (gpa >= 6.0) return 'D';
    return 'F';
};
