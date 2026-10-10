import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Calendar, ShoppingBag, CheckCircle2, Clock, XCircle, Truck, MapPin, Phone, CreditCard } from 'lucide-react';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { t, tTitle, language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', password: '' });
  const [updateMsg, setUpdateMsg] = useState('');
  const [bookingTab, setBookingTab] = useState('all'); // 'all', 'current', 'previous'
  const [orderTab, setOrderTab] = useState('all'); // 'all', 'active', 'past'

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

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem', fontSize: '1.2rem', color: '#666' }}>{isAr ? 'جاري التحميل...' : 'Loading...'}</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': case 'Delivered': return '#2e7d32';
      case 'Rejected': return '#c62828';
      case 'In Progress': return '#f57c00';
      default: return '#1565c0';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': case 'Delivered': return <CheckCircle2 size={16} color="#2e7d32" />;
      case 'Rejected': return <XCircle size={16} color="#c62828" />;
      case 'In Progress': return <Truck size={16} color="#f57c00" />;
      default: return <Clock size={16} color="#1565c0" />;
    }
  };

  // Filter bookings: Current = Pending or future; Previous = Accepted/Rejected
  const currentBookings = bookings.filter(b => b.status === 'Pending');
  const previousBookings = bookings.filter(b => b.status === 'Accepted' || b.status === 'Rejected');
  const displayedBookings = bookingTab === 'current' ? currentBookings : (bookingTab === 'previous' ? previousBookings : bookings);

  // Filter orders: Active = Pending/Accepted/In Progress; Past = Delivered/Rejected
  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Accepted' || o.status === 'In Progress');
  const pastOrders = orders.filter(o => o.status === 'Delivered' || o.status === 'Rejected');
  const displayedOrders = orderTab === 'active' ? activeOrders : (orderTab === 'past' ? pastOrders : orders);

  // Notifications: any bookings or orders that have been updated by admin
  const bookingNotifications = bookings.filter(b => b.status === 'Accepted' || b.status === 'Rejected');
  const orderNotifications = orders.filter(o => o.status === 'Accepted' || o.status === 'In Progress' || o.status === 'Delivered' || o.status === 'Rejected');

  return (
    <div className={`container ${styles.container}`}>
      {/* Profile Header */}
      <div className={`card ${styles.profileHeader}`}>
        <div className={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
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
            }} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxWidth: '420px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>{isAr ? 'الاسم' : 'Name'}</label>
                <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="form-input" placeholder={isAr ? 'الاسم' : 'Name'} required />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>{isAr ? 'رقم الهاتف' : 'Phone'}</label>
                <input type="text" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="form-input" placeholder={isAr ? 'رقم الهاتف' : 'Phone'} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#555' }}>{isAr ? 'كلمة المرور الجديدة (اختياري)' : 'New Password (optional)'}</label>
                <input type="password" value={editForm.password} onChange={e => setEditForm({ ...editForm, password: e.target.value })} className="form-input" placeholder={isAr ? 'كلمة المرور الجديدة' : 'New Password'} minLength="8" />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>{isAr ? 'حفظ' : 'Save'}</button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline" style={{ padding: '0.5rem 1.25rem' }}>{isAr ? 'إلغاء' : 'Cancel'}</button>
              </div>
            </form>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h1 style={{ marginBottom: '0.25rem', fontSize: '1.8rem' }}>{user.name}</h1>
                <span style={{ backgroundColor: user.role === 'admin' ? '#AD343E' : '#E2E8F0', color: user.role === 'admin' ? 'white' : '#475569', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '50px', fontWeight: 'bold' }}>
                  {user.role}
                </span>
              </div>
              <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                📧 {user.email} {user.phone && ` | 📞 ${user.phone}`}
              </p>
              <button onClick={() => { setEditForm({ name: user.name, phone: user.phone || '', password: '' }); setIsEditing(true); }} className="btn btn-outline" style={{ padding: '0.45rem 1.1rem', borderColor: '#2C2F24', color: '#2C2F24', fontSize: '0.9rem' }}>
                ✏️ {isAr ? 'تعديل البيانات الشخصية' : 'Edit Profile'}
              </button>
            </>
          )}
          {updateMsg && <p style={{ color: updateMsg.includes('success') || updateMsg.includes('بنجاح') ? 'green' : 'red', marginTop: '0.75rem', fontWeight: 600 }}>{updateMsg}</p>}
        </div>
      </div>

      {/* Notifications Section (Status alerts for Bookings and Orders) */}
      {(bookingNotifications.length > 0 || orderNotifications.length > 0) && (
        <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Bell size={20} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1E293B' }}>
              {isAr ? '🔔 إشعارات وتحديثات الحالة الأخيرة' : '🔔 Recent Notifications & Status Updates'}
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {bookingNotifications.slice(0, 2).map(b => (
              <div key={`notif-b-${b.id}`} style={{ padding: '0.6rem 0.9rem', backgroundColor: b.status === 'Accepted' ? '#ECFDF5' : '#FEF2F2', borderLeft: isAr ? 'none' : `4px solid ${b.status === 'Accepted' ? '#10B981' : '#EF4444'}`, borderRight: isAr ? `4px solid ${b.status === 'Accepted' ? '#10B981' : '#EF4444'}` : 'none', borderRadius: '6px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {b.status === 'Accepted' ? '🎉' : '⚠️'}
                <span>
                  {isAr
                    ? `حجز الطاولة بتاريخ ${b.booking_date} الساعة ${b.booking_time} تم: `
                    : `Table booking for ${b.booking_date} at ${b.booking_time} has been: `}
                  <strong style={{ color: b.status === 'Accepted' ? '#047857' : '#B91C1C' }}>
                    {b.status === 'Accepted' ? (isAr ? 'قبوله بنجاح!' : 'Accepted!') : (isAr ? 'رفضه.' : 'Rejected.')}
                  </strong>
                </span>
              </div>
            ))}
            {orderNotifications.slice(0, 2).map(o => (
              <div key={`notif-o-${o.id}`} style={{ padding: '0.6rem 0.9rem', backgroundColor: o.status === 'Delivered' ? '#ECFDF5' : '#EFF6FF', borderLeft: isAr ? 'none' : `4px solid ${o.status === 'Delivered' ? '#10B981' : '#3B82F6'}`, borderRight: isAr ? `4px solid ${o.status === 'Delivered' ? '#10B981' : '#3B82F6'}` : 'none', borderRadius: '6px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {o.status === 'Delivered' ? '✅' : '📦'}
                <span>
                  {isAr ? `الطلب #${o.id}: تم تحديث حالته إلى ` : `Order #${o.id}: Status updated to `}
                  <strong style={{ color: getStatusColor(o.status) }}>{o.status}</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid: Bookings & Orders */}
      <div className={styles.grid}>
        {/* Bookings Section */}
        <div className={`card ${styles.cardSection}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={22} color="var(--primary)" />
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>{t('profile_bookings')}</h2>
            </div>
            {/* Filter pills: All, Current, Previous */}
            <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: '#F1F5F9', padding: '0.2rem', borderRadius: '8px' }}>
              <button
                onClick={() => setBookingTab('all')}
                style={{ border: 'none', background: bookingTab === 'all' ? '#2C2F24' : 'transparent', color: bookingTab === 'all' ? 'white' : '#64748B', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: bookingTab === 'all' ? 'bold' : 'normal' }}>
                {isAr ? 'الكل' : 'All'} ({bookings.length})
              </button>
              <button
                onClick={() => setBookingTab('current')}
                style={{ border: 'none', background: bookingTab === 'current' ? '#2C2F24' : 'transparent', color: bookingTab === 'current' ? 'white' : '#64748B', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: bookingTab === 'current' ? 'bold' : 'normal' }}>
                {isAr ? 'الحالية' : 'Current'} ({currentBookings.length})
              </button>
              <button
                onClick={() => setBookingTab('previous')}
                style={{ border: 'none', background: bookingTab === 'previous' ? '#2C2F24' : 'transparent', color: bookingTab === 'previous' ? 'white' : '#64748B', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: bookingTab === 'previous' ? 'bold' : 'normal' }}>
                {isAr ? 'السابقة' : 'Previous'} ({previousBookings.length})
              </button>
            </div>
          </div>

          {displayedBookings.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '2rem 1rem' }}>
              {bookingTab === 'current' ? (isAr ? 'لا توجد حجوزات حالية قيد الانتظار.' : 'No current pending bookings.') :
                bookingTab === 'previous' ? (isAr ? 'لا توجد حجوزات سابقة مؤكدة أو مرفوضة.' : 'No previous bookings.') :
                  t('profile_no_bookings')}
            </p>
          ) : (
            <ul className={styles.list}>
              {displayedBookings.map(b => (
                <li key={b.id} className={styles.listItem}>
                  <div className={styles.itemHeader}>
                    <strong>📅 {b.booking_date} {isAr ? 'في تمام' : 'at'} {b.booking_time}</strong>
                    <span className={styles.badge} style={{ color: getStatusColor(b.status), backgroundColor: getStatusColor(b.status) + '1a', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      {getStatusIcon(b.status)}
                      {b.status === 'Accepted' ? (isAr ? 'مقبول' : 'Accepted') :
                        b.status === 'Rejected' ? (isAr ? 'مرفوض' : 'Rejected') :
                          (isAr ? 'قيد الانتظار' : 'Pending')}
                    </span>
                  </div>
                  <div className={styles.details}>
                    👥 {t('profile_guests')}: <strong>{b.guests}</strong>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Orders Section */}
        <div className={`card ${styles.cardSection}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingBag size={22} color="var(--primary)" />
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>{t('profile_orders')}</h2>
            </div>
            {/* Filter pills: All, Active, Past */}
            <div style={{ display: 'flex', gap: '0.35rem', backgroundColor: '#F1F5F9', padding: '0.2rem', borderRadius: '8px' }}>
              <button
                onClick={() => setOrderTab('all')}
                style={{ border: 'none', background: orderTab === 'all' ? '#2C2F24' : 'transparent', color: orderTab === 'all' ? 'white' : '#64748B', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: orderTab === 'all' ? 'bold' : 'normal' }}>
                {isAr ? 'الكل' : 'All'} ({orders.length})
              </button>
              <button
                onClick={() => setOrderTab('active')}
                style={{ border: 'none', background: orderTab === 'active' ? '#2C2F24' : 'transparent', color: orderTab === 'active' ? 'white' : '#64748B', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: orderTab === 'active' ? 'bold' : 'normal' }}>
                {isAr ? 'النشطة' : 'Active'} ({activeOrders.length})
              </button>
              <button
                onClick={() => setOrderTab('past')}
                style={{ border: 'none', background: orderTab === 'past' ? '#2C2F24' : 'transparent', color: orderTab === 'past' ? 'white' : '#64748B', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', cursor: 'pointer', fontWeight: orderTab === 'past' ? 'bold' : 'normal' }}>
                {isAr ? 'السابقة' : 'Past'} ({pastOrders.length})
              </button>
            </div>
          </div>

          {displayedOrders.length === 0 ? (
            <p style={{ color: '#888', textAlign: 'center', padding: '2rem 1rem' }}>
              {orderTab === 'active' ? (isAr ? 'لا توجد طلبات نشطة حالياً.' : 'No active orders.') :
                orderTab === 'past' ? (isAr ? 'لا توجد طلبات سابقة.' : 'No past orders.') :
                  t('profile_no_orders')}
            </p>
          ) : (
            <ul className={styles.list}>
              {displayedOrders.map(o => (
                <li key={o.id} className={styles.listItem}>
                  <div className={styles.itemHeader}>
                    <strong>🛍️ {isAr ? `طلب #${o.id}` : `Order #${o.id}`}</strong>
                    <span className={styles.badge} style={{ color: getStatusColor(o.status), backgroundColor: getStatusColor(o.status) + '1a', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      {getStatusIcon(o.status)}
                      {o.status === 'Accepted' ? (isAr ? 'مقبول' : 'Accepted') :
                        o.status === 'In Progress' ? (isAr ? 'جاري التحضير' : 'In Progress') :
                          o.status === 'Delivered' ? (isAr ? 'تم التوصيل' : 'Delivered') :
                            o.status === 'Rejected' ? (isAr ? 'مرفوض' : 'Rejected') :
                              (isAr ? 'قيد الانتظار' : 'Pending')}
                    </span>
                  </div>
                  <div className={styles.details} style={{ margin: '0.4rem 0' }}>
                    {(o.order_items || o.orderItems || []).map((i, idx) => (
                      <span key={idx} style={{ display: 'inline-block', backgroundColor: '#F1F5F9', padding: '0.15rem 0.45rem', borderRadius: '4px', marginInlineEnd: '0.35rem', marginBottom: '0.25rem', fontSize: '0.82rem' }}>
                        {i.quantity}x {tTitle(i.menu_item?.name || i.menuItem?.name || (isAr ? 'وجبة طعام' : 'Meal'))}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.35rem 0' }}>
                    <span>📍 {o.address}</span>
                    <span>💳 {o.payment_method}</span>
                  </div>
                  <div className={styles.total} style={{ color: 'var(--primary)', marginTop: '0.35rem' }}>
                    {t('profile_total')}: ${o.total_amount}
                  </div>
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
