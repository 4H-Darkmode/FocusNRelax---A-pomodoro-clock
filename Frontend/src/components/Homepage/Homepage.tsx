import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [targetDate, setTargetDate] = useState(() => {
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  });

  useEffect(() => {
    const checkMidnight = setInterval(() => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        const newEndOfDay = new Date();
        newEndOfDay.setHours(23, 59, 59, 999);
        setTargetDate(newEndOfDay);
      }
    }, 1000);

    return () => clearInterval(checkMidnight);
  }, []);

  return (
    <div className="homepage">
      <h1 className="clock-title">Time Remaining Today</h1>
      <div className="clock-container">
        <FlipClockCountdown
          to={targetDate}
          labels={['', 'HOURS', 'MINUTES', 'SECONDS']}
          renderMap={[false, true, true, true]}
          showLabels={true}
          showSeparators={true}
          hideOnComplete={false}
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
            border: '2px solid #f4a261',
            borderRadius: 10,
            boxShadow: '0 0 12px rgba(244, 162, 97, 0.3), 0 8px 25px rgba(0, 0, 0, 0.4)',
          }}
          separatorStyle={{
            size: '6px',
          }}
          dividerStyle={{
            color: 'transparent',
            height: 0,
          }}
        />
      </div>
      <h3 className="clock-slogan" onClick={() => navigate('/pomodoro')}>
        Build your discipline →
      </h3>

      <footer className="homepage-footer">
        <div className="footer-links">
          <span onClick={() => navigate('/terms')}>Terms of Use</span>
          <span className="footer-divider">|</span>
          <span onClick={() => navigate('/privacy')}>Privacy</span>
        </div>
        <p className="footer-credit">made with &lt;3 from kk</p>
        <p className="footer-notification">Please accept notifications so you know when the timer is finished</p>
      </footer>
    </div>
  );
};

export default Homepage;
