import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import styles from './BookTable.module.css';

const BookTable = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [guests, setGuests] = useState('1 Person');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await axios.post('/bookings', { 
        booking_date: date, 
        booking_time: time, 
        guests: parseInt(guests.split(' ')[0]) || 1 
      });
      setMsg(t('form_book_now') + ' - Success! Waiting for confirmation.');
      setDate(''); setTime(''); setGuests('1 Person');
    } catch (err) {
      setMsg('Error booking table. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}>
      
      {/* Header Section */}
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '12rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '4.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: '#2C2F24' }}>{t('book_heading')}</h1>
        <p style={{ color: 'var(--text-gray)', maxWidth: '500px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
          {t('book_subheading')}
        </p>
      </div>

      {/* Map Background Section */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ width: '100%', height: '500px', backgroundImage: 'url("/map-bg.png")', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', opacity: 0.9 }}>
        </div>
        
        {/* Form Card Overlay */}
        <div style={{ 
          position: 'absolute', 
          top: '-200px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '90%', 
          maxWidth: '750px', 
          backgroundColor: 'white', 
          borderRadius: '24px', 
          padding: '3.5rem 3rem', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          zIndex: 10 
        }}>
          {msg && <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', color: '#2e7d32', marginBottom: '2rem', borderRadius: '4px', textAlign: 'center' }}>{msg}</div>}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#2C2F24', fontSize: '1rem' }}>{t('form_date')}</label>
                <div style={{ position: 'relative' }}>
                  <input type="date" className="form-input" style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '50px', border: '1px solid #EAEAEA', outline: 'none', color: '#666', fontSize: '1rem' }} value={date} onChange={e => setDate(e.target.value)} required />
                </div>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#2C2F24', fontSize: '1rem' }}>{t('form_time')}</label>
                <div style={{ position: 'relative' }}>
                  <select className="form-input" style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '50px', border: '1px solid #EAEAEA', appearance: 'none', backgroundColor: 'white', outline: 'none', color: '#666', fontSize: '1rem' }} value={time} onChange={e => setTime(e.target.value)} required>
                    <option value="">Select Time</option>
                    <option value="18:30">06:30 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="19:30">07:30 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="20:30">08:30 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ flex: '1 1 300px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#2C2F24', fontSize: '1rem' }}>{t('form_name')}</label>
                <input type="text" placeholder={t('form_enter_name')} className="form-input" style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '50px', border: '1px solid #EAEAEA', outline: 'none', color: '#666', fontSize: '1rem' }} value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#2C2F24', fontSize: '1rem' }}>{t('form_phone')}</label>
                <input type="text" placeholder={t('form_enter_phone')} className="form-input" style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '50px', border: '1px solid #EAEAEA', outline: 'none', color: '#666', fontSize: '1rem' }} value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem', color: '#2C2F24', fontSize: '1rem' }}>{t('form_guests')}</label>
              <div style={{ position: 'relative' }}>
                <select className="form-input" style={{ width: '100%', padding: '1.25rem 1.5rem', borderRadius: '50px', border: '1px solid #EAEAEA', appearance: 'none', backgroundColor: 'white', outline: 'none', color: '#666', fontSize: '1rem' }} value={guests} onChange={e => setGuests(e.target.value)} required>
                  <option value="1 Person">1 Person</option>
                  <option value="2 Person">2 Person</option>
                  <option value="3 Person">3 Person</option>
                  <option value="4 Person">4 Person</option>
                  <option value="5+ Person">5+ Person</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1.25rem', borderRadius: '50px', fontSize: '1.1rem', marginTop: '0.5rem', width: '100%', fontWeight: 600 }}>{t('form_book_now')}</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default BookTable;

