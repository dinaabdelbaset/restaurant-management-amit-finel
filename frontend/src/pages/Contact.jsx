import React, { useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', formData);
      setStatus('Thank you for contacting us! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Header Section */}
      {status && <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{status}</div>}
      <div style={{ backgroundColor: '#F9F9F7', padding: 'clamp(3rem, 6vw, 5rem) 1rem clamp(6rem, 10vw, 9rem) 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontFamily: 'var(--font-heading)', marginBottom: '1rem', color: '#2C2F24' }}>{t('contact_heading')}</h1>
        <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.6 }}>
          {t('contact_subheading')}
        </p>
      </div>

      {/* Form Card Overlay */}
      <div className="container" style={{ position: 'relative', marginTop: 'clamp(-5rem, -8vw, -6.5rem)', zIndex: 10, paddingBottom: '4rem' }}>
        <div style={{ 
          maxWidth: '780px', 
          margin: '0 auto', 
          backgroundColor: 'white', 
          borderRadius: 'var(--radius-lg)', 
          padding: 'clamp(1.5rem, 4vw, 3rem)', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
              <div style={{ flex: '1 1 250px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24' }}>{t('form_name')}</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder={t('form_enter_name')} 
                  className="form-input" 
                  style={{ width: '100%', padding: '0.9rem 1.25rem', borderRadius: '50px', border: '1px solid #ddd' }} 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div style={{ flex: '1 1 250px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24' }}>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email" 
                  className="form-input" 
                  style={{ width: '100%', padding: '0.9rem 1.25rem', borderRadius: '50px', border: '1px solid #ddd' }} 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24' }}>{t('contact_subject')}</label>
              <input 
                type="text" 
                name="subject"
                placeholder="Subject..." 
                className="form-input" 
                style={{ width: '100%', padding: '0.9rem 1.25rem', borderRadius: '50px', border: '1px solid #ddd' }} 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24' }}>{t('contact_message')}</label>
              <textarea 
                name="message"
                placeholder="..." 
                className="form-input" 
                style={{ width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #ddd', minHeight: '130px', resize: 'vertical' }} 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', borderRadius: '50px', fontSize: '1.05rem', marginTop: '0.5rem', width: '100%', fontWeight: 600 }}>{t('contact_send')}</button>
          </form>
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#2C2F24', fontWeight: 600 }}>Call Us</h3>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.2rem' }}>+1-234-567-8900</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#2C2F24', fontWeight: 600 }}>Hours</h3>
            <p style={{ color: 'var(--text-gray)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>Mon-Fri: 11am - 8pm</p>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Sat, Sun: 9am - 10pm</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#2C2F24', fontWeight: 600 }}>Our Location</h3>
            <p style={{ color: 'var(--text-gray)', lineHeight: 1.6, fontSize: '0.95rem' }}>123 Bridge Street<br/>Nowhere Land, LA 12345<br/>United States</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
