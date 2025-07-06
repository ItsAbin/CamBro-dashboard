import React, { useState, useEffect } from 'react';
import './events.css';

const Events = () => {
    // Computer Science events data
    const events = [
        {
            id: 1,
            title: "AI & Machine Learning Symposium",
            date: "2025-07-15",
            time: "10:00 AM",
            location: "Computer Science Auditorium",
            description: "Explore the latest advancements in AI and ML with industry experts and research presentations.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 2,
            title: "Web Development Bootcamp",
            date: "2025-07-18",
            time: "2:00 PM",
            location: "Lab Room 205",
            description: "Hands-on workshop covering React, Node.js, and modern web development practices.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 3,
            title: "Cybersecurity Capture The Flag",
            date: "2025-07-20",
            time: "6:00 PM",
            location: "Security Lab",
            description: "Test your cybersecurity skills in this competitive hacking challenge with prizes.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            title: "Tech Industry Career Fair",
            date: "2025-07-22",
            time: "11:00 AM",
            location: "Main Campus Center",
            description: "Connect with top tech companies and explore internship and job opportunities.",
            image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 5,
            title: "Open Source Contribution Workshop",
            date: "2025-07-25",
            time: "3:30 PM",
            location: "GitHub Lab",
            description: "Learn how to contribute to open source projects and build your developer portfolio.",
            image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 6,
            title: "Programming Competition",
            date: "2025-07-28",
            time: "1:00 PM",
            location: "Programming Arena",
            description: "Showcase your coding skills in this annual programming contest with cash prizes.",
            image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [itemsPerView, setItemsPerView] = useState(3);
    const [cardWidth, setCardWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    // Calculate max index to ensure last items stay in view
    const maxIndex = Math.max(0, events.length - itemsPerView);

    // Update items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth <= 640) {
                setItemsPerView(1); // Mobile: 1 item
            } else if (window.innerWidth <= 1024) {
                setItemsPerView(2); // Tablet: 2 items
            } else {
                setItemsPerView(3); // Desktop: 3 items
            }
            // Reset current index if it exceeds new max
            setCurrentIndex(0);
            
            // Calculate precise card width and container width for pixel-perfect scrolling
            setTimeout(() => {
                const container = document.querySelector('.carousel-wrapper');
                const card = document.querySelector('.event-card');
                const track = document.querySelector('.carousel-track');
                
                if (card && container && track) {
                    const containerRect = container.getBoundingClientRect();
                    const cardRect = card.getBoundingClientRect();
                    
                    // Get the actual rendered card width including margins/gaps
                    const trackStyle = window.getComputedStyle(track);
                    const gap = parseFloat(trackStyle.gap) || 0;
                    
                    setContainerWidth(containerRect.width);
                    setCardWidth(cardRect.width + gap);
                }
            }, 100);
        };

        updateItemsPerView();
        window.addEventListener('resize', updateItemsPerView);
        return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);

    // Get the next upcoming event
    const getNextEvent = () => {
        const now = new Date();
        const upcomingEvents = events.filter(event => new Date(event.date) > now);
        return upcomingEvents.length > 0 ? upcomingEvents[0] : events[0];
    };

    const nextEvent = getNextEvent();

    // Countdown timer effect
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const eventDate = new Date(nextEvent.date).getTime();
            const difference = eventDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeRemaining({ days, hours, minutes, seconds });
            } else {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [nextEvent.date]);

    const nextSlide = () => {
        setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="events-container">
            <div className="events-header">
                <h1>Events</h1>
                <p>Discover exciting tech events, workshops, and opportunities in Computer Science!</p>
            </div>

            {/* Countdown Section */}
            <div className="countdown-section">
                <div className="countdown-content">
                    <div className="next-event-info">
                        <div className="next-event-thumbnail">
                            <img src={nextEvent.image} alt={nextEvent.title} />
                        </div>
                        <div className="next-event-details">
                            <h3>Next Event</h3>
                            <h2>{nextEvent.title}</h2>
                            <p>{formatDate(nextEvent.date)} at {nextEvent.time}</p>
                        </div>
                    </div>
                    <div className="countdown-timer">
                        <div className="countdown-item">
                            <span className="countdown-number">{timeRemaining.days}</span>
                            <span className="countdown-label">Days</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-number">{timeRemaining.hours}</span>
                            <span className="countdown-label">Hours</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-number">{timeRemaining.minutes}</span>
                            <span className="countdown-label">Minutes</span>
                        </div>
                        <div className="countdown-item">
                            <span className="countdown-number">{timeRemaining.seconds}</span>
                            <span className="countdown-label">Seconds</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carousel-container">
                <button 
                    className="carousel-btn prev-btn" 
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                >
                    <i className="ri-arrow-left-s-line"></i>
                </button>

                <div className="carousel-wrapper">
                    <div 
                        className="carousel-track"
                        style={{
                            transform: cardWidth > 0 
                                ? `translateX(-${currentIndex * cardWidth}px)`
                                : `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                        }}
                    >
                        {events.map((event) => (
                            <div key={event.id} className="event-card">
                                <div className="event-image">
                                    <img src={event.image} alt={event.title} />
                                    <div className="event-date-overlay">
                                        <span className="event-day">
                                            {new Date(event.date).getDate()}
                                        </span>
                                        <span className="event-month">
                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                        </span>
                                    </div>
                                </div>
                                <div className="event-content">
                                    <h3 className="event-title">{event.title}</h3>
                                    <div className="event-details">
                                        <div className="event-time">
                                            <span className="icon">🕐</span>
                                            {event.time}
                                        </div>
                                        <div className="event-location">
                                            <span className="icon">📍</span>
                                            {event.location}
                                        </div>
                                    </div>
                                    <p className="event-description">{event.description}</p>
                                    <button className="register-btn">Join Event</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button 
                    className="carousel-btn next-btn" 
                    onClick={nextSlide}
                    disabled={currentIndex === maxIndex}
                >
                    <i className="ri-arrow-right-s-line"></i>
                </button>
            </div>
        </div>
    );
};

export default Events;
