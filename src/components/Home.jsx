import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { 
    attendanceData, 
    performanceData, 
    deadlines, 
    classSchedule,
    getAttendanceForSemester,
    getSubjectsForSemester,
    getOverallGPAForSemester,
    getSemesterOptions,
    getSubjectCodes,
    getSubjectFullName,
    formatTime
} from '../data/dashboardData';
import { 
    formatDate, 
    getDaysUntilDeadline, 
    getPriorityColor,
    getDynamicPriority,
    formatGPA,
    getPerformanceInsight
} from '../utils/helpers';
import './home.css';

// Lazy load components
const AIBot = lazy(() => import('./AIBot/AIBot'));
const Events = lazy(() => import('./Events'));
const ComplaintForm = lazy(() => import('./ComplaintForm'));
const Library = lazy(() => import('./Library/Library'));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
    <div className="section-loader">
        <div className="loader-content">
            <div className="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    </div>
);

const Home = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
    const [selectedSemester, setSelectedSemester] = useState(attendanceData.currentSemester);
    const [activeSection, setActiveSection] = useState(null); // 'events' or 'complaints'
    const [loadingSection, setLoadingSection] = useState(null); // Track which section is loading
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const [animationStarted, setAnimationStarted] = useState(false);
    const chartRef = useRef(null);
    const ringRef = useRef(null);

    // Calculate metrics for selected semester
    const semesterAttendance = getAttendanceForSemester(selectedSemester);
    const semesterSubjects = getSubjectsForSemester(selectedSemester);
    const semesterGPA = getOverallGPAForSemester(selectedSemester);
    const subjectCodes = getSubjectCodes();

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleNavigateToEvents = () => {
        if (activeSection === 'events') {
            setActiveSection(null);
            setLoadingSection(null);
        } else {
            setLoadingSection('events');
            setActiveSection('events');
            
            // Clear loading state after component loads
            setTimeout(() => {
                setLoadingSection(null);
                const inlineSection = document.querySelector('.inline-section');
                if (inlineSection) {
                    inlineSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 300); // Adjust timing based on lazy loading
        }
    };

    const handleNavigateToComplaintForm = () => {
        if (activeSection === 'complaints') {
            setActiveSection(null);
            setLoadingSection(null);
        } else {
            setLoadingSection('complaints');
            setActiveSection('complaints');
            
            // Clear loading state after component loads
            setTimeout(() => {
                setLoadingSection(null);
                const inlineSection = document.querySelector('.inline-section');
                if (inlineSection) {
                    inlineSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 300); // Adjust timing based on lazy loading
        }
    };

    const handleNavigateToLibrary = () => {
        if (activeSection === 'library') {
            setActiveSection(null);
            setLoadingSection(null);
        } else {
            setLoadingSection('library');
            setActiveSection('library');
            
            // Clear loading state after component loads
            setTimeout(() => {
                setLoadingSection(null);
                const inlineSection = document.querySelector('.inline-section');
                if (inlineSection) {
                    inlineSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 300); // Adjust timing based on lazy loading
        }
    };

    const handleProfileClick = () => {
        console.log('Profile clicked');
        setShowProfileMenu(false);
    };

    const handleSettingsClick = () => {
        console.log('Settings clicked');
        setShowProfileMenu(false);
    };

    // Tooltip handlers
    const showTooltip = (event, content) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            content: content,
            x: event.clientX,
            y: event.clientY - 10
        });
    };

    const hideTooltip = () => {
        setTooltip({ visible: false, content: '', x: 0, y: 0 });
    };

    const handleBarHover = (event, subjectCode) => {
        const fullName = getSubjectFullName(subjectCode);
        const subjectData = semesterSubjects[subjectCode];
        const content = `
            <h4>${subjectCode} - ${fullName}</h4>
            <p>Average: ${subjectData.semesterData.average}%</p>
            <p>GPA: ${subjectData.semesterData.gpa}/10.0</p>
            <p>Tests: ${subjectData.semesterData.marks.join(', ')}</p>
        `;
        showTooltip(event, content);
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    // Navigation section layout handling
    useEffect(() => {
        const navContainer = document.querySelector('.navigation-icons');
        if (navContainer) {
            // Add data attribute for styling
            navContainer.setAttribute('data-nav-grid', 'true');
        }
    }, []);

    // Schedule scroll functions
    const scrollSchedule = (direction) => {
        const container = document.querySelector('.schedule-list');
        if (container) {
            const scrollAmount = 160; // Approximately one item width
            const newScrollLeft = direction === 'left' 
                ? container.scrollLeft - scrollAmount 
                : container.scrollLeft + scrollAmount;
            
            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    const checkScheduleScrollability = (event) => {
        const container = event.target;
        const canScrollLeftVal = container.scrollLeft > 0;
        const canScrollRightVal = container.scrollLeft < container.scrollWidth - container.clientWidth;
        const isScrollable = container.scrollWidth > container.clientWidth;
        
        setCanScrollLeft(canScrollLeftVal);
        setCanScrollRight(canScrollRightVal);
        
        // Add data attribute to indicate if the container is scrollable
        container.setAttribute('data-scrollable', isScrollable.toString());
    };

    // Check initial scroll state
    useEffect(() => {
        const container = document.querySelector('.schedule-list');
        if (container) {
            checkScheduleScrollability({ target: container });
            container.addEventListener('scroll', checkScheduleScrollability);
            
            // Also check on resize
            const handleResize = () => checkScheduleScrollability({ target: container });
            window.addEventListener('resize', handleResize);
            
            return () => {
                container.removeEventListener('scroll', checkScheduleScrollability);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    // Check initial navigation scroll state
    useEffect(() => {
        const navContainer = document.querySelector('.navigation-icons');
        if (navContainer) {
            const checkNavScrollability = () => {
                const isScrollable = navContainer.scrollWidth > navContainer.clientWidth;
                navContainer.setAttribute('data-nav-scrollable', isScrollable.toString());
            };
            
            checkNavScrollability();
            
            // Also check on resize
            const handleResize = () => checkNavScrollability();
            window.addEventListener('resize', handleResize);
            
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    // Calculate attendance percentage for the donut chart
    const attendancePercentage = semesterAttendance.percentage;
    const circumference = 2 * Math.PI * 45;
    
    // Ensure we initialize with the correct percentage if no animation has started
    useEffect(() => {
        if (attendancePercentage > 0 && animatedPercentage === 0) {
            setAnimatedPercentage(Math.round(attendancePercentage));
        }
    }, []);
    
    const strokeDasharray = `${(attendancePercentage / 100) * circumference} ${circumference}`;

    // Effect for handling chart animation on component load
    useEffect(() => {
        // Ensure we have a valid percentage before starting the animation
        if (attendancePercentage > 0) {
            let animationFrame;
            let startTimestamp;
            const duration = 1500; // Animation duration in ms
            
            // Only start the animation once when the component mounts
            if (!animationStarted) {
                setAnimationStarted(true);
                
                const animateChart = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const elapsed = timestamp - startTimestamp;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Animate from 0 to attendancePercentage
                    setAnimatedPercentage(Math.round(attendancePercentage * progress));

                    if (progress < 1) {
                        animationFrame = requestAnimationFrame(animateChart);
                    }
                };
                
                // Start the animation from 0
                setAnimatedPercentage(0);
                
                // Add a small delay to ensure the component is fully mounted
                setTimeout(() => {
                    startTimestamp = null;
                    animationFrame = requestAnimationFrame(animateChart);
                }, 100);
            }

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }
    }, [attendancePercentage, animationStarted]);
    
    // Update the animated percentage when the attendance percentage changes
    useEffect(() => {
        // When semester changes, trigger a smooth transition to the new percentage
        if (animationStarted && attendancePercentage > 0) {
            let animationFrame;
            let startTimestamp;
            const duration = 1000; // Animation duration in ms
            const startValue = animatedPercentage || 0; // Ensure we have a valid start value
            
            const animateTransition = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const elapsed = timestamp - startTimestamp;
                const progress = Math.min(elapsed / duration, 1);
                
                // Animate from current value to new attendancePercentage
                const newValue = startValue + (Math.round(attendancePercentage) - startValue) * progress;
                setAnimatedPercentage(Math.round(newValue));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animateTransition);
                }
            };
            
            // Small delay to ensure values are updated
            setTimeout(() => {
                startTimestamp = null;
                animationFrame = requestAnimationFrame(animateTransition);
            }, 50);
            
            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        } else if (!animationStarted && attendancePercentage > 0) {
            // If animation hasn't started yet, set to full value
            setAnimatedPercentage(Math.round(attendancePercentage));
        }
    }, [attendancePercentage, animationStarted]);

    return (
        <div className="home-page">
            {/* Navbar - keeping unchanged */}
            <nav className="navbar">
                <div className="navbar-left">                
                    <div className="logo">
                        <img src="/CamBro.svg" alt="CampBro Logo" height="40" />
                    </div>
                </div>
                
                <div className="navbar-right">
                    <div className="profile-container">
                        <button 
                            className="profile-btn" 
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        >
                            <span>Demo</span>
                            <div className="profile-icon">
                                <i className="ri-user-line"></i>
                            </div>
                        </button>
                        {showProfileDropdown && (
                            <>
                                <div className="dropdown-overlay" onClick={() => setShowProfileDropdown(false)} />
                                <div className="profile-dropdown">
                                    <button className="dropdown-item">
                                        <i className="ri-user-settings-line"></i>
                                        Profile Settings
                                    </button>
                                    <button className="dropdown-item">
                                        <i className="ri-settings-4-line"></i>
                                        Preferences
                                    </button>
                                    <button className="dropdown-item">
                                        <i className="ri-logout-box-line"></i>
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <main className="dashboard-content">
                {/* Top Grid - Left (Charts) and Right (Deadlines) */}
                <div className="dashboard-top-grid">
                    {/* Left Column - Charts (Attendance and Performance stacked) */}
                    <div className="dashboard-charts-column">
                        {/* Attendance Chart */}
                        <div className="dashboard-card attendance-card">
                            <div className="attendance-header">
                                <h3>ATTENDANCE</h3>
                                <select 
                                    className="semester-dropdown"
                                    value={selectedSemester}
                                    onChange={handleSemesterChange}
                                >
                                    {getSemesterOptions().map(semester => (
                                        <option key={semester} value={semester}>{semester}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Color Coding Information - Top Left */}
                            <div className="attendance-legend-top">
                                <div className="legend-item">
                                    <span className="legend-dot attendance-present"></span>
                                    <span className="legend-text">Present</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot attendance-absent"></span>
                                    <span className="legend-text">Absent</span>
                                </div>
                            </div>
                            
                            <div className="chart-container" ref={chartRef}>
                                <svg className="donut-chart" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="10"
                                    />
                                    <circle
                                        ref={ringRef}
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#ff8c00"
                                        strokeWidth="10"
                                        strokeDasharray={`${(animatedPercentage / 100) * circumference} ${circumference}`}
                                        strokeDashoffset="0"
                                        transform="rotate(-90 50 50)"
                                        className="progress-ring"
                                    />
                                    <text x="50" y="50" textAnchor="middle" dy="0.3em" className="chart-percentage">
                                        {animationStarted ? animatedPercentage : Math.round(attendancePercentage)}%
                                    </text>
                                </svg>
                            </div>
                            <div className="attendance-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Present</span>
                                    <span className="stat-value">{semesterAttendance.present}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Absent</span>
                                    <span className="stat-value">{semesterAttendance.absent}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Total</span>
                                    <span className="stat-value">{semesterAttendance.total}</span>
                                </div>
                            </div>
                            
                            {/* Remove the old bottom legend */}
                        </div>

                        {/* Performance Chart */}
                        <div className="dashboard-card performance-card">
                            <h3>PERFORMANCE - {selectedSemester}</h3>
                            <div className="performance-summary">
                                <div className="gpa-display">
                                    <span className="gpa-label">Semester GPA </span>
                                    <span className="gpa-value">{semesterGPA}/10.0</span>
                                </div>
                            </div>
                            <div className="bar-chart">
                                {subjectCodes.map((subjectCode, index) => {
                                    const subjectData = semesterSubjects[subjectCode];
                                    if (!subjectData) return null;
                                    
                                    const maxValue = 100; // Maximum marks
                                    const height = (subjectData.semesterData.average / maxValue) * 100;
                                    
                                    return (
                                        <div 
                                            key={index} 
                                            className="bar-group"
                                            onMouseEnter={(e) => handleBarHover(e, subjectCode)}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <div className="bars">
                                                <div 
                                                    className="bar performance-bar" 
                                                    style={{ 
                                                        height: `${height}%`,
                                                        background: 'linear-gradient(to top, #ff8c00, #ffa500)',
                                                        width: '20px',
                                                        minHeight: '10px'
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="bar-label">{subjectCode}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="performance-info">
                                <p className="semester-info">
                                    Overall Average: {
                                        Object.keys(semesterSubjects).length > 0 ? 
                                        (Object.values(semesterSubjects)
                                            .reduce((sum, subject) => sum + subject.semesterData.average, 0) / 
                                        Object.keys(semesterSubjects).length).toFixed(1) + '%'
                                        : 'N/A'
                                    }
                                </p>
                                <p className="semester-info">
                                    Subjects: {Object.keys(semesterSubjects).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Deadlines */}
                    <div className="dashboard-deadlines-column">
                        <div className="dashboard-card deadlines-card">
                            <h3>DEADLINES</h3>
                            <div className="deadlines-list">
                                {deadlines.map(deadline => (
                                    <div key={deadline.id} className="deadline-item">
                                        <div className="deadline-info">
                                            <h4>{deadline.title}</h4>
                                            <p>{deadline.subject}</p>
                                            <div className="deadline-meta">
                                                {(() => {
                                                    const daysLeft = getDaysUntilDeadline(deadline.due);
                                                    const dynamicPriority = getDynamicPriority(daysLeft);
                                                    return (
                                                        <span 
                                                            className="deadline-priority" 
                                                            style={{ backgroundColor: getPriorityColor(dynamicPriority) }}
                                                        >
                                                            {dynamicPriority}
                                                        </span>
                                                    );
                                                })()}
                                                <span className="deadline-days">
                                                    {getDaysUntilDeadline(deadline.due)} days left
                                                </span>
                                            </div>
                                        </div>
                                        <div className="deadline-date">
                                            {formatDate(deadline.due)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Class Schedule and Navigation */}
                <div className="dashboard-bottom-section">
                    {/* Class Schedule */}
                    <div className="dashboard-card schedule-card">
                        <h3>CLASS SCHEDULE</h3>
                        <div className="schedule-container">
                            {canScrollLeft && (
                                <button 
                                    className="schedule-arrow schedule-arrow-left"
                                    onClick={() => scrollSchedule('left')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            )}
                            
                            <div className="schedule-list" onScroll={checkScheduleScrollability}>
                                {classSchedule.map((classItem, index) => (
                                    <div key={index} className="schedule-item">
                                        <div className="schedule-time">
                                            {formatTime(classItem.time, classItem.period)}
                                        </div>
                                        <div className="schedule-details">
                                            <div className="schedule-subject">{classItem.subject}</div>
                                            <div className="schedule-room">{classItem.room}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {canScrollRight && (
                                <button 
                                    className="schedule-arrow schedule-arrow-right"
                                    onClick={() => scrollSchedule('right')}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Navigation Icons */}
                    <div className="navigation-section">
                        <div className="navigation-icons">
                            <button 
                                className={`nav-icon-btn ${activeSection === 'events' ? 'active' : ''} ${loadingSection === 'events' ? 'loading' : ''}`} 
                                onClick={handleNavigateToEvents}
                                disabled={loadingSection === 'events'}
                            >
                                <div className="nav-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </div>
                                <span>EVENT SCHEDULE</span>
                            </button>

                            <button 
                                className={`nav-icon-btn ${activeSection === 'library' ? 'active' : ''} ${loadingSection === 'library' ? 'loading' : ''}`} 
                                onClick={handleNavigateToLibrary}
                                disabled={loadingSection === 'library'}
                            >
                                <div className="nav-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span>LIBRARY</span>
                            </button>

                            <button 
                                className={`nav-icon-btn ${activeSection === 'complaints' ? 'active' : ''} ${loadingSection === 'complaints' ? 'loading' : ''}`} 
                                onClick={handleNavigateToComplaintForm}
                                disabled={loadingSection === 'complaints'}
                            >
                                <div className="nav-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span>COMPLAINT BOX</span>
                            </button>
                        </div>

                    </div>
                </div>
            </main>

            {/* Conditional inline sections with lazy loading and smooth transitions */}
            {activeSection === 'events' && (
                <div className="inline-section">
                    <Suspense fallback={<SectionLoader />}>
                        <Events />
                    </Suspense>
                </div>
            )}
            
            {activeSection === 'complaints' && (
                <div className="inline-section">
                    <Suspense fallback={<SectionLoader />}>
                        <ComplaintForm />
                    </Suspense>
                </div>
            )}
            
            {activeSection === 'library' && (
                <div className="inline-section">
                    <Suspense fallback={<SectionLoader />}>
                        <Library />
                    </Suspense>
                </div>
            )}

            {/* Footer */}
            <footer className="footer">
                <p className="footer-text">
                    Made with <span className="heart">❤️</span> by Geeks
                </p>
            </footer>

            {/* Click outside to close dropdown */}
            {showProfileMenu && (
                <div className="dropdown-overlay" onClick={() => setShowProfileMenu(false)}></div>
            )}

            {/* Tooltip */}
            {tooltip.visible && (
                <div 
                    className="chart-tooltip visible"
                    style={{ 
                        left: `${tooltip.x}px`, 
                        top: `${tooltip.y}px` 
                    }}
                    dangerouslySetInnerHTML={{ __html: tooltip.content }}
                />
            )}
            
            {/* AI Bot floating button - Lazy loaded */}
            <Suspense fallback={
                <div className="ai-bot-floating">
                    <div className="ai-bot-button ai-bot-loading">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            }>
                <AIBot />
            </Suspense>
        </div>
    );
};

export default Home;
