import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Calendar } from 'lucide-react';
import './SettingsPage.css';

function SettingsPage() {
  const { theme, toggleTheme, dateFormat, setDateFormat } = useTheme();

  const dateFormats = [
    { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY (US)', example: '11/23/2025' },
    { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY (EU)', example: '23/11/2025' },
    { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD (ISO)', example: '2025-11-23' },
    { value: 'MMM d, yyyy', label: 'MMM D, YYYY', example: 'Nov 23, 2025' }
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-subtitle">Customize your Grass experience</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <div className="section-title">
            <Sun size={24} />
            <div>
              <h3>Appearance</h3>
              <p>Choose your theme preference</p>
            </div>
          </div>

          <div className="theme-selector">
            <button
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => theme !== 'light' && toggleTheme()}
            >
              <Sun size={24} />
              <span>Light</span>
            </button>
            <button
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => theme !== 'dark' && toggleTheme()}
            >
              <Moon size={24} />
              <span>Dark</span>
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-title">
            <Calendar size={24} />
            <div>
              <h3>Date Format</h3>
              <p>Choose how dates are displayed</p>
            </div>
          </div>

          <div className="date-format-list">
            {dateFormats.map(format => (
              <button
                key={format.value}
                className={`date-format-option ${dateFormat === format.value ? 'active' : ''}`}
                onClick={() => setDateFormat(format.value)}
              >
                <div className="format-info">
                  <span className="format-label">{format.label}</span>
                  <span className="format-example mono">{format.example}</span>
                </div>
                {dateFormat === format.value && (
                  <div className="format-check">✓</div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <div className="section-title">
            <div className="section-icon">ℹ️</div>
            <div>
              <h3>About</h3>
              <p>Application information</p>
            </div>
          </div>

          <div className="about-info">
            <div className="info-row">
              <span className="info-label">Version</span>
              <span className="info-value mono">1.0.0</span>
            </div>
            <div className="info-row">
              <span className="info-label">Build</span>
              <span className="info-value mono">2025.11.23</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;


