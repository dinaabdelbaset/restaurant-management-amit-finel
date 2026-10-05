import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { register } = useAuth();
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password, phone);
      toast.success(isAr ? 'تم إنشاء الحساب بنجاح!' : 'Registered successfully!');
      navigate('/profile');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const msg = `${isAr ? 'فشل إنشاء الحساب: ' : 'Registration failed: '}${err.response.data.message}`;
        toast.error(msg);
        setError(msg);
      } else {
        const msg = isAr ? 'فشل إنشاء الحساب، يرجى التحقق من اتصالك بالإنترنت.' : 'Registration failed. Please check your connection.';
        toast.error(msg);
        setError(msg);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#F9F9F7', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '450px', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#2C2F24' }}>{t('register_title')}</h2>
        
        {error && (
          <div style={{ backgroundColor: '#ffebee', color: 'var(--primary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('register_name')}</label>
            <input type="text" placeholder={t('register_name_placeholder')} style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('login_email')}</label>
            <input type="email" placeholder={t('login_email_placeholder')} style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('register_phone')}</label>
            <input type="text" placeholder={t('register_phone_placeholder')} style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('login_password')}</label>
            <input type="password" placeholder={t('login_password_placeholder')} style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={password} onChange={e => setPassword(e.target.value)} required minLength="8" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', borderRadius: '50px', fontSize: '1.1rem' }}>{t('register_button')}</button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
          {t('register_has_account')} <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>{t('register_login_now')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


