import { useNavigate } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1 className="terms-title">Terms of Use</h1>
        
        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using TimeNWork, you accept and agree to be bound by these 
              Terms of Use. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              TimeNWork is a free Pomodoro timer application designed to help you improve 
              focus and productivity. The service includes timer functionality, break 
              management, and browser notifications.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. User Responsibilities</h2>
            <p>
              You are responsible for your use of the application. TimeNWork is provided 
              as a productivity tool, and we encourage healthy work habits. Remember to 
              take regular breaks and maintain a balanced schedule.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Notifications</h2>
            <p>
              The app may request permission to send browser notifications. These 
              notifications are solely used to alert you when your timer or break 
              session ends. You can disable notifications at any time through your 
              browser settings.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. No Warranty</h2>
            <p>
              TimeNWork is provided "as is" without any warranties. We do not guarantee 
              that the service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of 
              the application after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>

        <span className="back-link" onClick={() => navigate('/')}>
          ← Back to Home
        </span>
      </div>
    </div>
  );
};

export default Terms;
