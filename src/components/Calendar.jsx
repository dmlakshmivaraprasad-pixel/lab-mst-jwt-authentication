import { useState } from "react";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(
        new Date(2026, 8, 1)
    );

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Trip",
            date: "2026-09-10",
            time: "10:00 AM",
        },
        {
            id: 2,
            title: "Interview",
            date: "2026-09-14",
            time: "2:00 PM",
        },
    ]);

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ];

    // Get all calendar days
    const getCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();

        const daysInMonth = new Date(
            year,
            month + 1,
            0
        ).getDate();

        const previousMonthDays = new Date(
            year,
            month,
            0
        ).getDate();

        const days = [];

        // Previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: previousMonthDays - i,
                currentMonth: false,
            });
        }

        // Current month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                currentMonth: true,
            });
        }

        // Next month
        let nextDay = 1;

        while (days.length < 42) {
            days.push({
                day: nextDay,
                currentMonth: false,
            });

            nextDay++;
        }

        return days;
    };

    // Convert date to YYYY-MM-DD
    const getDateString = (day) => {
        const year = currentDate.getFullYear();

        const month = String(
            currentDate.getMonth() + 1
        ).padStart(2, "0");

        const date = String(day).padStart(2, "0");

        return `${year}-${month}-${date}`;
    };

    // Previous month
    const previousMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1
            )
        );
    };

    // Next month
    const nextMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1
            )
        );
    };

    // Today
    const goToToday = () => {
        const today = new Date();

        setCurrentDate(
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            )
        );
    };

    // Add post
    const addPost = () => {
        const title = prompt("Enter post title:");

        if (!title) {
            return;
        }

        const selectedDate = prompt(
            "Enter date (YYYY-MM-DD):",
            "2026-09-20"
        );

        if (!selectedDate) {
            return;
        }

        const selectedTime = prompt(
            "Enter time:",
            "10:00 AM"
        );

        const newPost = {
            id: Date.now(),
            title: title,
            date: selectedDate,
            time: selectedTime || "10:00 AM",
        };

        setPosts((previousPosts) => [
            ...previousPosts,
            newPost,
        ]);
    };

    // Start dragging
    const handleDragStart = (event, postId) => {
        event.dataTransfer.setData(
            "postId",
            postId
        );
    };

    // Drop post on another date
    const handleDrop = (event, date) => {
        event.preventDefault();

        const postId = Number(
            event.dataTransfer.getData("postId")
        );

        setPosts((previousPosts) =>
            previousPosts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        date: date,
                    };
                }

                return post;
            })
        );
    };

    // Allow dropping
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const days = getCalendarDays();

    return (
        <div className="calendar-wrapper">

            {/* Header */}
            <div className="calendar-header">

                <div>
                    <h1>🗓 Content Calendar</h1>

                    <p>
                        Schedule and manage your posts
                    </p>
                </div>

                <button
                    className="add-post-btn"
                    onClick={addPost}
                >
                    + Add Post
                </button>

            </div>

            {/* Calendar Controls */}
            <div className="calendar-controls">

                <h2>
                    {monthNames[currentDate.getMonth()]}{" "}
                    {currentDate.getFullYear()}
                </h2>

                <div className="navigation">

                    <button onClick={previousMonth}>
                        ‹
                    </button>

                    <button
                        onClick={goToToday}
                        className="today-btn"
                    >
                        Today
                    </button>

                    <button onClick={nextMonth}>
                        ›
                    </button>

                </div>

            </div>

            {/* Weekdays */}
            <div className="weekdays">

                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="weekday"
                    >
                        {day}
                    </div>
                ))}

            </div>

            {/* Calendar */}
            <div className="calendar-grid">

                {days.map((calendarDay, index) => {

                    const date =
                        calendarDay.currentMonth
                            ? getDateString(calendarDay.day)
                            : "";

                    const dayPosts = posts.filter(
                        (post) => post.date === date
                    );

                    return (
                        <div
                            key={index}
                            className={`calendar-day ${calendarDay.currentMonth
                                ? ""
                                : "other-month"
                                }`}
                            onDrop={(event) => {
                                if (calendarDay.currentMonth) {
                                    handleDrop(event, date);
                                }
                            }}
                            onDragOver={handleDragOver}
                        >

                            <div className="day-number">
                                {calendarDay.day}
                            </div>

                            <div className="day-posts">

                                {dayPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="calendar-post"
                                        draggable
                                        onDragStart={(event) =>
                                            handleDragStart(
                                                event,
                                                post.id
                                            )
                                        }
                                    >

                                        <strong>
                                            {post.title}
                                        </strong>

                                        <span>
                                            {post.time}
                                        </span>

                                    </div>
                                ))}

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* Information */}
            <p className="drag-info">
                💡 Drag a post and drop it onto
                another date to reschedule it.
            </p>

        </div>
    );
}

export default Calendar;