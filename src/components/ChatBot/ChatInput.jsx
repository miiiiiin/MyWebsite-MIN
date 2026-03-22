import { useState, useRef, useEffect } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSend, isLoading }) {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    /* Auto-focus when mounted */
    useEffect(() => { inputRef.current?.focus(); }, []);

    const handleSubmit = () => {
        const trimmed = value.trim();
        if (!trimmed || isLoading) return;
        onSend(trimmed);
        setValue('');
    };

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="chat-input-wrap">
            <div className={`input-row ${isLoading ? 'input-disabled' : ''}`}>
                <span className="input-prompt">visitor ~ $&nbsp;</span>
                <input
                    ref={inputRef}
                    className="terminal-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={isLoading ? '응답 대기 중...' : '질문을 입력하세요'}
                    disabled={isLoading}
                    autoComplete="off"
                    spellCheck="false"
                />
                <button
                    className="send-btn"
                    onClick={handleSubmit}
                    disabled={!value.trim() || isLoading}
                    aria-label="전송"
                >
                    <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}