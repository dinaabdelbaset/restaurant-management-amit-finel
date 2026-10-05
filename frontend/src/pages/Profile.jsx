import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', password: '' });
  const [updateMsg, setUpdateMsg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const [bRes, oRes] = await Promise.all([
          axios.get('/bookings'),
          axios.get('/orders')
        ]);
        setBookings(bRes.data);
        setOrders(oRes.data);
        setEditForm({ name: user.name, phone: user.phone || '', password: '' });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>{isAr ? 'جاري التحميل...' : 'Loading...'}</div>;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Accepted': case 'Delivered': return '#2e7d32';
      case 'Rejected': return '#c62828';
      case 'In Progress': return '#f57c00';
      default: return '#1565c0';
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <div className={`card ${styles.profileHeader}`}>
        <div className={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          {isEditing ? (
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const res = await axios.put('/profile', editForm);
                setUser(res.data.user);
                setIsEditing(false);
                setUpdateMsg(isAr ? 'تم تحديث الملف الشخصي بنجاح!' : 'Profile updated successfully!');
                setTimeout(() => setUpdateMsg(''), 3000);
              } catch {
                setUpdateMsg(isAr ? 'فشل تحديث البيانات.' : 'Failed to update profile.');
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="form-input" placeholder={isAr ? 'الاسم' : 'Name'} required />
              <input type="text" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} className="form-input" placeholder={isAr ? 'رقم الهاتف' : 'Phone'} />
              <input type="password" value={editForm.password} onChange={e => setEditForm({...editForm, password: e.target.value})} className="form-input" placeholder={isAr ? 'كلمة المرور الجديدة (اختياري)' : 'New Password (optional)'} minLength="8" />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>{isAr ? 'حفظ' : 'Save'}</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>{isAr ? 'إلغاء' : 'Cancel'}</button>
              </div>
            </form>
          ) : (
            <>
              <h1 style={{ marginBottom: '0.5rem' }}>{user.name}</h1>
              <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>{user.email} | {user.phone}</p>
              <button onClick={() => { setEditForm({ name: user.name, phone: user.phone || '', password: '' }); setIsEditing(true); }} className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderColor: '#2C2F24', color: '#2C2F24' }}>
                {isAr ? 'تعديل البيانات' : 'Edit Profile'}
              </button>
            </>
          )}
          {updateMsg && <p style={{ color: updateMsg.includes('success') || updateMsg.includes('بنجاح') ? 'green' : 'red', marginTop: '1rem' }}>{updateMsg}</p>}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={`card ${styles.cardSection}`}>
          <h2 className={styles.sectionTitle}>{t('profile_bookings')}</h2>
          {bookings.length === 0 ? <p>{t('profile_no_bookings')}</p> : (
            <ul className={styles.list}>
              {bookings.map(b => (
                <li key={b.id} className={styles.listItem}>
                  <div className={styles.itemHeader}>
                    <strong>{b.booking_date} {isAr ? 'في تمام' : 'at'} {b.booking_time}</strong>
                    <span className={styles.badge} style={{ color: getStatusColor(b.status), backgroundColor: getStatusColor(b.status)+'1a' }}>{b.status}</span>
                  </div>
                  <div className={styles.details}>{t('profile_guests')}: {b.guests}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={`card ${styles.cardSection}`}>
          <h2 className={styles.sectionTitle}>{t('profile_orders')}</h2>
          {orders.length === 0 ? <p>{t('profile_no_orders')}</p> : (
            <ul className={styles.list}>
              {orders.map(o => (
                <li key={o.id} className={styles.listItem}>
                  <div className={styles.itemHeader}>
                    <strong>{isAr ? `طلب #${o.id}` : `Order #${o.id}`}</strong>
                    <span className={styles.badge} style={{ color: getStatusColor(o.status), backgroundColor: getStatusColor(o.status)+'1a' }}>{o.status}</span>
                  </div>
                  <div className={styles.details}>
                    {o.order_items.map(i => `${i.quantity}x ${i.menu_item.name}`).join(', ')}
                  </div>
                  <div className={styles.total}>{t('profile_total')}: ${o.total_amount}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

