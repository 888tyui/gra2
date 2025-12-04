import React from 'react';
import { AlertTriangle } from 'lucide-react';
import './ConfirmModal.css';

function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">
          <AlertTriangle size={48} />
        </div>
        
        <h3>{title}</h3>
        <p>{message}</p>
        
        <div className="confirm-actions">
          <button className="confirm-btn cancel" onClick={onCancel}>
            No, Keep it
          </button>
          <button className="confirm-btn confirm" onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;


