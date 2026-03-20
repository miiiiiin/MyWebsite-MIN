import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatWindow.css';

const INITIAL_MESSAGES = [
    {
        id: 'init',
        role: 'bot',
        text: '안녕하세요! 저는 포트폴리오 봇이에요.\n궁금한 것들을 편하게 물어보세요 🙌',
        timestamp: new Date(),
    },
];

const QUICK_PROMPTS = [
    { label: 'skills()', hint: '기술 스택 보기' },
    { label: 'projects()', hint: '프로젝트 목록' },
    { label: 'contact()', hint: '연락 방법' },
];

export default function ChatWindow({ onClose }) {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const sendMessage = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMsg = {
            id: Date.now().toString(),
            role: 'user',
            text,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const history = messages
                .filter(m => m.id !== 'init')
                .map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...history, { role: 'user', content: text }],
                }),
            });

            const data = await res.json();
            const reply = data.content?.[0]?.text ?? '죄송해요, 잠시 후 다시 시도해주세요.';

            setMessages(prev => [
                ...prev,
                { id: Date.now().toString() + '_bot', role: 'bot', text: reply, timestamp: new Date() },
            ]);
        } catch (error) {
            console.error('Chat connection error:', error);
            setMessages(prev => [
                ...prev,
                { id: 'err', role: 'bot', text: '⚠ 연결 오류가 발생했어요. 잠시 후 다시 시도해주세요.', timestamp: new Date() },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-window">
            {/* Terminal Header */}
            <div className="chat-header">
                <div className="terminal-dots">
                    <button className="dot red" onClick={onClose} aria-label="close" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                </div>
                <span className="terminal-title">portfolio.chat — v1.0.0</span>
                <span className="terminal-status">● live</span>
            </div>

            {/* Messages */}
            <div className="chat-body">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                    <div className="loading-line">
                        <span className="line-prefix bot-prefix">portfolio@bot ~ $</span>
                        <span className="loading-dots">
                            <span /><span /><span />
                        </span>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
                <div className="quick-prompts">
                    {QUICK_PROMPTS.map(({ label, hint }) => (
                        <button
                            key={label}
                            className="quick-btn"
                            onClick={() => sendMessage(hint)}
                        >
                            <span className="qb-label">{label}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
    );
}