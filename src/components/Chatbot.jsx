import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! OOO의 AI 어시스턴트입니다. 무엇을 도와드릴까요?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Chatbot Logic
    setTimeout(() => {
      let response = '';
      if (input.includes('이력서')) {
        response = '네, 이력서를 준비했습니다! 이력서가 새 탭에서 열립니다.';
        window.open('/resume.pdf', '_blank'); // Assuming resume.pdf exists in public/
      } else if (input.includes('기술') || input.includes('스택')) {
        response = '주요 기술 스택은 Spring Boot, JPA, MySQL, AWS입니다. 3년의 iOS 개발 경험도 보유하고 있어 협업에 강점이 있습니다.';
      } else {
        response = '궁금하신 점이 있다면 언제든 물어보세요. "이력서"라고 말씀하시면 바로 보여드릴게요!';
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 600);
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-bubble glass-panel" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '🤖'}
      </div>
      
      {isOpen && (
        <div className="chatbot-window glass-panel">
          <div className="chatbot-header">
            Dev Assistant
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input 
              type="text" 
              placeholder="메시지를 입력하세요..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
