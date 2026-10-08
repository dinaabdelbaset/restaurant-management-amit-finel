import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import styles from './OrderOnline.module.css';

const OrderOnline = () => {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    }
  }, [user, navigate]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const removeItem = (id) => {
    const newCart = cart.filter(c => c.menu_item_id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if(cart.length === 0) return;
    
    setIsProcessing(true);
    setMsg('');

    // Simulate payment processing delay if Card is selected
    if (paymentMethod === 'Card') {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    try {
      await axios.post('/orders', {
        address, phone, notes, payment_method: paymentMethod, items: cart
      });
      setMsg(paymentMethod === 'Card' ? (isAr ? 'تم الدفع بنجاح! تم استلام طلبك.' : 'Payment successful! Order placed.') : (isAr ? 'تم استلام طلبك بنجاح!' : 'Order placed successfully!'));
      setCart([]);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      setTimeout(() => navigate('/profile'), 2000);
    } catch {
      setMsg(isAr ? 'تعذر إتمام الطلب، يرجى مراجعة البيانات.' : 'Failed to place order. Please check your details.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`container ${styles.container}`}>
      <h1 style={{ marginBottom: '2rem' }}>{t('order_complete_title')}</h1>
      {msg && <div style={{ padding: '1rem', backgroundColor: '#e8f5e9', color: '#2e7d32', marginBottom: '2rem', borderRadius: '4px' }}>{msg}</div>}
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 600px' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('order_delivery_details')}</h2>
            <form onSubmit={handleCheckout} id="checkout-form">
              <div className="form-group">
                <label className="form-label">{t('order_delivery_address')}</label>
                <input type="text" className="form-input" value={address} onChange={e => setAddress(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">{t('order_phone_number')}</label>
                <input type="text" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">{t('order_notes')}</label>
                <textarea className="form-input" value={notes} onChange={e => setNotes(e.target.value)} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">{t('order_payment_method')}</label>
                <select className="form-input" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                  <option value="Cash on Delivery">{t('order_cash')}</option>
                  <option value="Card">{t('order_card')}</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        
        <div style={{ flex: '1 1 350px' }}>
          <div className="card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('order_summary')}</h2>
            {cart.length === 0 ? (
              <p>{t('order_empty_cart')} <Link to="/menu" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{t('order_back_to_menu')}</Link></p>
            ) : (
              <div>
                <ul style={{ listStyle: 'none', marginBottom: '2rem', padding: 0 }}>
                  {cart.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                      <div>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>{item.quantity} x ${item.price}</div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.menu_item_id)}
                          className={styles.removeBtn}
                          title={isAr ? 'حذف من السلة' : 'Remove item'}
                        >
                          <Trash2 size={14} />
                          <span>{isAr ? 'حذف من السلة' : 'Remove'}</span>
                        </button>
                      </div>
                      <div style={{ fontWeight: 600 }}>${(item.quantity * item.price).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  <span>{t('order_total')}:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button form="checkout-form" type="submit" className="btn btn-primary" style={{ width: '100%', opacity: isProcessing ? 0.7 : 1 }} disabled={isProcessing}>
                  {isProcessing ? t('order_processing') : t('order_place_order')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOnline;


