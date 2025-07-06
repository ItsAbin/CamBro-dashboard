import React, { useEffect, useState, useRef } from 'react';
import { formatDate } from '../utils/helpers';
import { getExamCountdown, formatTimeUnit } from '../utils/helpers';

const ExamCountdown = ({ examInfo, selectedSemester }) => {
    const [examCountdown, setExamCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, progress: 0 });
    const countdownTimerRef = useRef(null);

    const startExamCountdown = () => {
        if (!examInfo) return;
        
        // Update countdown initially
        updateExamCountdown();
        
        // Clear any existing interval
        if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
        }
        
        // Set up interval to update countdown every second
        countdownTimerRef.current = setInterval(updateExamCountdown, 1000);
    };

    const updateExamCountdown = () => {
        if (!examInfo) return;
        
        const countdown = getExamCountdown(examInfo.startDate);
        setExamCountdown(countdown);
    };

    // Start countdown on component mount
    useEffect(() => {
        startExamCountdown();
        
        // Cleanup countdown timer when component unmounts
        return () => {
            if (countdownTimerRef.current) {
                clearInterval(countdownTimerRef.current);
            }
        };
    }, [examInfo]);

    if (!examInfo) return null;

    return (
        <div className="exam-countdown-section">
            <div className="exam-countdown-header">
                <h3>EXAM COUNTDOWN</h3>
                <span className="exam-semester">{selectedSemester}</span>
            </div>
            
            <div className="exam-countdown-content">
                <div className="exam-info">
                    <h4>{examInfo.examTitle}</h4>
                    <div className="exam-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
                            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2"/>
                            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>Starts {formatDate(examInfo.startDate)} - Ends {formatDate(examInfo.endDate)}</span>
                    </div>
                </div>
                
                <div className="exam-countdown-timer">
                    <div className="exam-countdown-item">
                        <span className="exam-countdown-number">{formatTimeUnit(examCountdown.days)}</span>
                        <span className="exam-countdown-label">Days</span>
                    </div>
                    <div className="exam-countdown-item">
                        <span className="exam-countdown-number">{formatTimeUnit(examCountdown.hours)}</span>
                        <span className="exam-countdown-label">Hours</span>
                    </div>
                    <div className="exam-countdown-item">
                        <span className="exam-countdown-number">{formatTimeUnit(examCountdown.minutes)}</span>
                        <span className="exam-countdown-label">Minutes</span>
                    </div>
                    <div className="exam-countdown-item">
                        <span className="exam-countdown-number">{formatTimeUnit(examCountdown.seconds)}</span>
                        <span className="exam-countdown-label">Seconds</span>
                    </div>
                </div>
                
                <div className="exam-progress">
                    <div 
                        className="exam-progress-bar" 
                        style={{ width: `${examCountdown.progress}%` }}
                    ></div>
                </div>
                <div className="exam-progress-text">
                    <span>Semester Start</span>
                    <span>Exam Day</span>
                </div>
                
                <div className="exam-tips">
                    <h5>STUDY TIPS</h5>
                    <p>{examInfo.studyTips[Math.floor(Math.random() * examInfo.studyTips.length)]}</p>
                </div>
            </div>
        </div>
    );
};

export default ExamCountdown;
