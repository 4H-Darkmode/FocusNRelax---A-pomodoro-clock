import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import './Pomodoro.css';

const Pomodoro = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isBreakMode, setIsBreakMode] = useState(false);
  const [showBreakOptions, setShowBreakOptions] = useState(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  
  // Timer duration
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Error notification
  const [error, setError] = useState<string | null>(null);

  // Refs for input focus
  const hoursRef = useRef<HTMLInputElement>(null);

  // Auto-hide error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const playNotificationSound = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, 500);
  };

  const sendNotification = (title: string, body: string) => {
    // Play sound
    playNotificationSound();
    
    // Flash the tab title
    let originalTitle = document.title;
    let flashInterval: number;
    let flashCount = 0;
    
    flashInterval = window.setInterval(() => {
      document.title = document.title === 'Timer Complete!' ? originalTitle : 'Timer Complete!';
      flashCount++;
      if (flashCount > 10) {
        clearInterval(flashInterval);
        document.title = originalTitle;
      }
    }, 500);

    // Send browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/vite.svg',
        requireInteraction: true,
      });
    }
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
    setShowBreakOptions(true);
    document.exitFullscreen?.().catch(() => {});
    
    sendNotification(
      'Focus Session Complete! 🎉',
      'Great work! Time for a break?'
    );
  };

  const handleStartBreak = (breakMinutes: number) => {
    setShowBreakOptions(false);
    setIsBreakMode(true);
    
    const target = new Date();
    target.setMinutes(target.getMinutes() + breakMinutes);
    
    setTargetDate(target);
    setIsRunning(true);
  };

  const handleBreakComplete = () => {
    setIsRunning(false);
    setIsBreakMode(false);
    
    sendNotification(
      'Break Over! 💪',
      'Ready for another focus session?'
    );
  };

  const handleSkipBreak = () => {
    setShowBreakOptions(false);
  };

  const handleStartTimer = () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setError('Please set a time first!');
      return;
    }
    
    // Exit edit mode if active
    setIsEditing(false);
    
    const target = new Date();
    target.setHours(target.getHours() + hours);
    target.setMinutes(target.getMinutes() + minutes);
    target.setSeconds(target.getSeconds() + seconds);
    
    setTargetDate(target);
    setIsRunning(true);
    
    // Enter fullscreen
    document.documentElement.requestFullscreen?.();
  };

  const handleEditTimes = () => {
    setIsEditing(!isEditing);
    // Focus on hours input when entering edit mode
    if (!isEditing) {
      setTimeout(() => hoursRef.current?.focus(), 100);
    }
  };

  const handlePomodoroPresets = () => {
    // Set default pomodoro: 25 minutes
    setHours(0);
    setMinutes(25);
    setSeconds(0);
    setIsEditing(false);
  };

  const handleStopTimer = () => {
    setIsRunning(false);
    setTargetDate(null);
    document.exitFullscreen?.().catch(() => {});
  };

  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>,
    max: number
  ) => {
    // Allow empty string for easier typing
    if (value === '') {
      setter(0);
      return;
    }
    const num = parseInt(value) || 0;
    setter(Math.min(Math.max(0, num), max));
  };

  // Handle focus to select all text for easy replacement
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="pomodoro">
      {/* Error notification */}
      <div className={`error-notification ${error ? 'show' : ''}`}>
        <span>{error}</span>
      </div>

      <h1 className="pomodoro-title">
        {isBreakMode ? 'Break Time' : 'Focus Session'}
      </h1>
      
      <div className="pomodoro-clock-container">
        {isRunning && targetDate ? (
          <FlipClockCountdown
            to={targetDate}
            labels={['', 'HOURS', 'MINUTES', 'SECONDS']}
            renderMap={[false, true, true, true]}
            showLabels={true}
            showSeparators={true}
            hideOnComplete={false}
            onComplete={() => {
              if (isBreakMode) {
                handleBreakComplete();
              } else {
                handleTimerComplete();
              }
            }}
            labelStyle={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: 'uppercase',
              color: '#cfd7c7',
              border: 'none',
            }}
            digitBlockStyle={{
              width: 60,
              height: 85,
              fontSize: 48,
              background: '#0b2027',
              border: isBreakMode ? '2px solid #70a9a1' : '2px solid #f4a261',
              borderRadius: 10,
              boxShadow: isBreakMode 
                ? '0 0 12px rgba(112, 169, 161, 0.3), 0 8px 25px rgba(0, 0, 0, 0.4)'
                : '0 0 12px rgba(244, 162, 97, 0.3), 0 8px 25px rgba(0, 0, 0, 0.4)',
            }}
            separatorStyle={{
              size: '6px',
            }}
            dividerStyle={{
              color: 'transparent',
              height: 0,
            }}
          />
        ) : showBreakOptions ? (
          <div className="break-options">
            <h2 className="break-title">Great work! 🎉</h2>
            <p className="break-subtitle">Take a break?</p>
            <div className="break-buttons">
              <button className="break-btn" onClick={() => handleStartBreak(5)}>
                5 min
              </button>
              <button className="break-btn" onClick={() => handleStartBreak(10)}>
                10 min
              </button>
              <button className="break-btn" onClick={() => handleStartBreak(15)}>
                15 min
              </button>
            </div>
            <span className="skip-break" onClick={handleSkipBreak}>
              Skip break
            </span>
          </div>
        ) : (
          <div className={`static-clock ${isEditing ? 'editing' : ''}`}>
            <div className="static-clock-display">
              <div className="digit-group">
                {isEditing ? (
                  <input
                    ref={hoursRef}
                    type="number"
                    className="digit-input"
                    value={hours || ''}
                    onChange={(e) => handleInputChange(e.target.value, setHours, 23)}
                    onFocus={handleInputFocus}
                    placeholder="0"
                    min="0"
                    max="23"
                  />
                ) : (   
                  <>
                    <div className="digit-block">{String(hours).padStart(2, '0')[0]}</div>
                    <div className="digit-block">{String(hours).padStart(2, '0')[1]}</div>
                  </>
                )}
                <span className="digit-label">HOURS</span>
              </div>
              <div className="separator">:</div>
              <div className="digit-group">
                {isEditing ? (
                  <input
                    type="number"
                    className="digit-input"
                    value={minutes || ''}
                    onChange={(e) => handleInputChange(e.target.value, setMinutes, 59)}
                    onFocus={handleInputFocus}
                    placeholder="0"
                    min="0"
                    max="59"
                  />
                ) : (
                  <>
                    <div className="digit-block">{String(minutes).padStart(2, '0')[0]}</div>
                    <div className="digit-block">{String(minutes).padStart(2, '0')[1]}</div>
                  </>
                )}
                <span className="digit-label">MINUTES</span>
              </div>
              <div className="separator">:</div>
              <div className="digit-group">
                {isEditing ? (
                  <input
                    type="number"
                    className="digit-input"
                    value={seconds || ''}
                    onChange={(e) => handleInputChange(e.target.value, setSeconds, 59)}
                    onFocus={handleInputFocus}
                    placeholder="0"
                    min="0"
                    max="59"
                  />
                ) : (
                  <>
                    <div className="digit-block">{String(seconds).padStart(2, '0')[0]}</div>
                    <div className="digit-block">{String(seconds).padStart(2, '0')[1]}</div>
                  </>
                )}
                <span className="digit-label">SECONDS</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isRunning ? (
        <span className="stop-timer-text" onClick={handleStopTimer}>
          Stop Timer
        </span>
      ) : !showBreakOptions ? (
        <div className="pomodoro-buttons">
          <button className="pomodoro-btn start-btn" onClick={handleStartTimer}>
            Start Timer
          </button>
          <button 
            className={`pomodoro-btn edit-btn ${isEditing ? 'active' : ''}`} 
            onClick={handleEditTimes}
          >
            {isEditing ? 'Done Editing' : 'Edit Times'}
          </button>
          <button className="pomodoro-btn preset-btn" onClick={handlePomodoroPresets}>
            Pomodoro Presets
          </button>
        </div>
      ) : null}

      {!isRunning && !showBreakOptions && (
        <span className="back-home-text" onClick={() => navigate('/')}>
          ← Back to Homepage
        </span>
      )}
    </div>
  );
};

export default Pomodoro;
