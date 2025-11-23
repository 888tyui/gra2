import React, { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import './CalendarPage.css';

function CalendarPage() {
  const { tasks } = useTask();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.completed || !task.completedAt) return false;
      const completedDate = new Date(task.completedAt);
      return isSameDay(completedDate, date);
    });
  };

  const getXPForDate = (date) => {
    const dateTasks = getTasksForDate(date);
    return dateTasks.reduce((sum, task) => sum + task.xpReward, 0);
  };

  const selectedDayTasks = getTasksForDate(selectedDate);
  const selectedDayXP = getXPForDate(selectedDate);

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>Calendar</h1>
        <p className="calendar-subtitle">Track your progress over time</p>
      </div>

      <div className="calendar-container">
        <div className="calendar-card">
          <div className="calendar-controls">
            <button onClick={prevMonth} className="month-btn">
              <ChevronLeft size={20} />
            </button>
            <h2 className="current-month">{format(currentMonth, 'MMMM yyyy')}</h2>
            <button onClick={nextMonth} className="month-btn">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}

            {calendarDays.map((day, index) => {
              const dayTasks = getTasksForDate(day);
              const dayXP = getXPForDate(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);

              return (
                <button
                  key={index}
                  className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayTasks.length > 0 ? 'has-tasks' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <span className="day-number">{format(day, 'd')}</span>
                  {dayTasks.length > 0 && (
                    <div className="day-info">
                      <span className="day-tasks">{dayTasks.length}</span>
                      <span className="day-xp mono">+{dayXP}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="day-details">
          <div className="day-details-header">
            <h3>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
          </div>

          {selectedDayTasks.length > 0 ? (
            <>
              <div className="day-summary">
                <div className="summary-item">
                  <span className="summary-label">Tasks Completed</span>
                  <span className="summary-value mono">{selectedDayTasks.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">XP Earned</span>
                  <span className="summary-value mono">+{selectedDayXP} XP</span>
                </div>
              </div>

              <div className="day-tasks">
                <h4>Completed Tasks</h4>
                <div className="day-task-list">
                  {selectedDayTasks.map(task => (
                    <div key={task.id} className="day-task">
                      <div className="task-check-icon">✓</div>
                      <div className="day-task-info">
                        <span className="day-task-title">{task.title}</span>
                        <span className="day-task-xp mono">+{task.xpReward} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="day-empty">
              <p>{isSameDay(selectedDate, new Date()) ? 'No tasks completed yet today' : 'No tasks on this day'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;

