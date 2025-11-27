import { useNavigate } from 'react-router-dom';
import './Privacy.css';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        
        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Information We Collect</h2>
            <p>
              TimeNWork does not collect, store, or transmit any personal information. 
              All timer data and settings are stored locally in your browser and are 
              never sent to any external servers.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Local Storage</h2>
            <p>
              We may use your browser's local storage to save your preferences and 
              timer settings. This data remains on your device and is not accessible 
              to us or any third parties.
            </p>
          </section>

          <section className="privacy-section">
            <h2>3. Notifications</h2>
            <p>
              If you grant permission, TimeNWork will send browser notifications to 
              alert you when your timer ends. We do not use notifications for 
              marketing, advertising, or any purpose other than timer alerts.
            </p>
          </section>

          <section className="privacy-section">
            <h2>4. No Tracking</h2>
            <p>
              We do not use cookies, analytics, or any tracking technologies. Your 
              usage of TimeNWork is completely private and anonymous.
            </p>
          </section>

          <section className="privacy-section">
            <h2>5. Third-Party Services</h2>
            <p>
              TimeNWork does not integrate with any third-party services that would 
              have access to your data or usage patterns.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will 
              be reflected on this page. We encourage you to review this policy 
              periodically.
            </p>
          </section>

          <section className="privacy-section">
            <h2>7. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, feel free to 
              reach out to the developer by email: kakhikp07@gmail.com
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Web Analytics</h2>
            <p>
              We use <a href="https://developers.cloudflare.com/web-analytics/" target="_blank" rel="noopener noreferrer">Cloudflare Web Analytics</a> to collect aggregated and anonymous data about how visitors interact with our site, such as page views, browser types, and general location data. This helps us improve the website experience.
            </p>
            <p>
              Cloudflare Web Analytics is designed with privacy in mind:
            </p>
            <ul>
              <li>It does <strong>not</strong> use cookies or local storage.</li>
              <li>It does <strong>not</strong> track users across different websites.</li>
              <li>It does <strong>not</strong> collect or store any personal data, including full IP addresses or any unique user identifiers.</li>
              <li>Data collected is aggregated, meaning individual visitors cannot be identified.</li>
            </ul>
            <p>
              For more detailed information on how Cloudflare protects your privacy, please see their <a href="https://developers.cloudflare.com/web-analytics/" target="_blank" rel="noopener noreferrer">Cloudflare Web Analytics documentation</a> and their <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
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

export default Privacy;
