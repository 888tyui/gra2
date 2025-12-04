import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Target, Calendar, User, Settings } from 'lucide-react';
import './Sidebar.css';

function Sidebar() {
  const navItems = [
    { path: '/app/today', icon: Target, label: "Today's Goals" },
    { path: '/app/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/app/profile', icon: User, label: 'Profile' },
    { path: '/app/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Leaf size={32} strokeWidth={2.5} />
        </div>
        <h1 className="sidebar-title">Grass</h1>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-tagline">Touch Grass 🌱</p>
      </div>
    </aside>
  );
}

export default Sidebar;


