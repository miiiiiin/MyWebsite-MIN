import React, { useState } from 'react';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend or use an email service
    // For now, we'll use mailto: and simulate a success state
    const mailtoLink = `mailto:min.songkyung@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="contact-overlay" onClick={onClose}>
      <div className="contact-container glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="contact-close" onClick={onClose}>×</button>

        <div className="contact-content">
          <div className="contact-header">
            <h2 className="accent">Contact</h2>
            <p className="contact-subtitle">Have any questions? Feel free to reach out.</p>
          </div>

          {!isSent ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell me more about your project..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="send-btn">
                Send Message <span className="arrow">→</span>
              </button>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
