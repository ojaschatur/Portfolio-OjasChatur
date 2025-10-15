import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './contact.css';

const YOUR_EMAIL = "ojaschatur18@gmail.com";

const Contact = ({ onHoverEnter, onHoverLeave }) => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(YOUR_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <motion.div 
      className="contact-section no-bg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="contact-glass-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        <div className="contact-left">
          <motion.h2 
            className="lets-talk-title"
          >
            LET'S TALK
          </motion.h2>
          <div className="contact-email">
            <input
              ref={inputRef}
              type="text"
              value={YOUR_EMAIL}
              readOnly
              className="email-input"
            />
            <motion.button 
              className="copy-btn" 
              onClick={handleCopy}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? <span className="copied-msg">Copied!</span> : "Copy"}
            </motion.button>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              rows={5}
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <motion.button 
              type="submit" 
              className="send-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send
            </motion.button>
            {submitted && <span className="success-msg">The email functionality is not working, please send a message by copying the mail. Thank you!</span>}
          </form>
        </div>
      </motion.div>
        <motion.h1 className="thank-you-big" onMouseEnter={onHoverEnter} onMouseLeave={onHoverLeave}>THANK YOU</motion.h1>
    </motion.div>
  );
};

export default Contact;
