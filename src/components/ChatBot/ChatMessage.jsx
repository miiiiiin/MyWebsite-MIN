import './ChatMessage.css';

export default function ChatMessage({ message }) {
    const isBot = message.role === 'bot';

    const formatTime = (date) =>
        date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

    /* Parse **bold** and `code` inside message text */
    const renderText = (text) => {
        const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\n)/g);
        return parts.map((part, i) => {
            if (part === '\n') return <br key={i} />;
            if (part.startsWith('`') && part.endsWith('`'))
                return <code key={i} className="inline-code">{part.slice(1, -1)}</code>;
            if (part.startsWith('**') && part.endsWith('**'))
                return <strong key={i} className="inline-bold">{part.slice(2, -2)}</strong>;
            return part;
        });
    };

    return (
        <div className={`msg-wrap ${isBot ? 'msg-bot' : 'msg-user'}`}>
            <div className="msg-meta">
                <span className={`msg-prefix ${isBot ? 'prefix-bot' : 'prefix-user'}`}>
                    {isBot ? 'portfolio@bot ~ $' : 'visitor ~ $'}
                </span>
                <span className="msg-time">{formatTime(message.timestamp)}</span>
            </div>
            <div className={`msg-bubble ${isBot ? 'bubble-bot' : 'bubble-user'}`}>
                {renderText(message.text)}
            </div>
        </div>
    );
}