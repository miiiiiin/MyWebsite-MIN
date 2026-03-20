import { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import './ChatBot.css';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasUnread, setHasUnread] = useState(true);

    useEffect(() => {
        if (isOpen) setHasUnread(false);
    }, [isOpen]);

    return (
        <div className="chatbot-root">
            {isOpen && (
                <ChatWindow onClose={() => setIsOpen(false)} />
            )}
            <button
                className={`chatbot-fab ${isOpen ? 'fab-active' : ''}`}
                onClick={() => setIsOpen(prev => !prev)}
                aria-label="Toggle chatbot"
            >
                <span className="fab-icon">
                    {isOpen ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="13" rx="2" />
                            <polyline points="3,21 7,17 17,17" />
                            <line x1="7" y1="8" x2="17" y2="8" />
                            <line x1="7" y1="12" x2="13" y2="12" />
                        </svg>
                    )}
                </span>
                {hasUnread && !isOpen && <span className="fab-badge" />}
            </button>
        </div>
    );
}