import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import styles from './BookTable.module.css';

const BookTable = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [guests, setGuests] = useState('1');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      setMsg(isAr ? 'خطأ: يرجى إدخال رقم هاتف مصري صحيح (11 رقماً يبدأ بـ 010 أو 011 أو 012 أو 015).' : 'Error: Please enter a valid 11-digit Egyptian phone number (starts with 010, 011, 012, or 015).');
      return;
    }

    try {
      await axios.post('/bookings', { 
        booking_date: date, 
        booking_time: time, 
        guests: parseInt(guests) || 1 
      });
      setMsg(isAr ? 'تم إرسال طلب حجز الطاولة بنجاح! بانتظار تأكيد الإدارة.' : 'Booking submitted successfully! Waiting for confirmation.');
      setDate(''); setTime(''); setGuests('1');
    } catch {
      setMsg(isAr ? 'حدث خطأ أثناء حجز الطاولة. يرجى المحاولة مرة أخرى.' : 'Error booking table. Please try again.');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header & Form Section */}
      <div className={`container ${styles.headerSection}`}>
        <h1 className={styles.heading}>{t('book_heading')}</h1>
        <p className={styles.subheading}>
          {t('book_subheading')}
        </p>

        {/* Form Card Overlay */}
        <div className={styles.formCardOverlay}>
          {msg && (
            <div style={{ padding: '1rem', backgroundColor: msg.includes('خطأ') || msg.includes('Error') ? '#ffebee' : '#e8f5e9', color: msg.includes('خطأ') || msg.includes('Error') ? '#c62828' : '#2e7d32', marginBottom: '1.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
              {msg}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <label className={styles.formLabel}>{t('form_date')}</label>
                <input 
                  type="date" 
                  className={styles.roundedInput} 
                  value={date} 
                  onChange={e => setDate(e.target.value)} 
                  required 
                />
              </div>
              <div className={styles.formCol}>
                <label className={styles.formLabel}>{t('form_time')}</label>
                <select 
                  className={styles.roundedInput} 
                  value={time} 
                  onChange={e => setTime(e.target.value)} 
                  required
                >
                  <option value="" disabled hidden>{isAr ? 'اختر التوقيت' : 'Select Time'}</option>
                  <option value="18:30">06:30 PM {isAr ? '(مساءً)' : ''}</option>
                  <option value="19:00">07:00 PM {isAr ? '(مساءً)' : ''}</option>
                  <option value="19:30">07:30 PM {isAr ? '(مساءً)' : ''}</option>
                  <option value="20:00">08:00 PM {isAr ? '(مساءً)' : ''}</option>
                  <option value="20:30">08:30 PM {isAr ? '(مساءً)' : ''}</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <label className={styles.formLabel}>{t('form_name')}</label>
                <input 
                  type="text" 
                  placeholder={t('form_enter_name')} 
                  className={styles.roundedInput} 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className={styles.formCol}>
                <label className={styles.formLabel}>{t('form_phone')}</label>
                <input 
                  type="text" 
                  placeholder={t('form_enter_phone')} 
                  className={styles.roundedInput} 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div>
              <label className={styles.formLabel}>{t('form_guests')}</label>
              <select 
                className={styles.roundedInput} 
                value={guests} 
                onChange={e => setGuests(e.target.value)} 
                required
              >
                <option value="1">{isAr ? 'شخص واحد (1 Person)' : '1 Person'}</option>
                <option value="2">{isAr ? 'شخصان (2 Persons)' : '2 Persons'}</option>
                <option value="3">{isAr ? '٣ أشخاص (3 Persons)' : '3 Persons'}</option>
                <option value="4">{isAr ? '٤ أشخاص (4 Persons)' : '4 Persons'}</option>
                <option value="5">{isAr ? '٥ أشخاص أو أكثر (5+ Persons)' : '5+ Persons'}</option>
              </select>
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              {t('form_book_now')}
            </button>
          </form>
        </div>
      </div>

      {/* Map Background Section */}
      <div className={styles.mapSection}>
        <div className={styles.mapBackground}></div>
      </div>
    </div>
  );
};

export default BookTable;
