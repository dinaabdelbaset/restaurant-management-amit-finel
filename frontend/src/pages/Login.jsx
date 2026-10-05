import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success(isAr ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!');
      navigate('/profile');
    } catch (err) {
      const errMsg = isAr ? 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.' : 'Invalid credentials. Please try again.';
      toast.error(errMsg);
      setError(errMsg);
    }
  };

  return (
    <div style={{ backgroundColor: '#F9F9F7', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '450px', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#2C2F24' }}>{t('login_title')}</h2>
        
        <div style={{ backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center', fontSize: '0.9rem', border: '1px dashed #cbd5e1' }}>
          <strong>{t('admin_credentials_box')}</strong><br />
          Email: <span style={{ color: 'var(--primary)' }}>admin@example.com</span><br />
          Password: <span style={{ color: 'var(--primary)' }}>password</span>
        </div>
        
        {error && (
          <div style={{ backgroundColor: '#ffebee', color: 'var(--primary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('login_email')}</label>
            <input type="email" placeholder={t('login_email_placeholder')} style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('login_password')}</label>
            <input type="password" placeholder={t('login_password_placeholder')} style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', borderRadius: '50px', fontSize: '1.1rem' }}>{t('login_button')}</button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
          {t('login_no_account')} <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>{t('login_register_now')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


