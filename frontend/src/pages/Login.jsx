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
    setError('');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      const msg = isAr ? 'يرجى إدخال بريد إلكتروني صحيح يتضمن النطاق (مثال: name@gmail.com)' : 'Please enter a valid email address (e.g. name@gmail.com)';
      toast.error(msg);
      setError(msg);
      return;
    }

    if (password.length < 6) {
      const msg = isAr ? 'كلمة المرور يجب أن لا تقل عن 6 خانات' : 'Password must be at least 6 characters long';
      toast.error(msg);
      setError(msg);
      return;
    }

    try {
      await login(email.trim(), password);
      toast.success(isAr ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!');
      navigate('/profile');
    } catch {
      const errMsg = isAr ? 'بيانات الدخول غير صحيحة، يرجى المحاولة مرة أخرى.' : 'Invalid credentials. Please try again.';
      toast.error(errMsg);
      setError(errMsg);
    }
  };

  return (
    <div style={{ backgroundColor: '#F9F9F7', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(2rem, 5vw, 4rem) 1rem' }}>
      <div style={{ backgroundColor: 'white', width: '100%', maxWidth: '460px', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.75rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2.25rem)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#2C2F24' }}>{t('login_title')}</h2>
        
        {error && (
          <div style={{ backgroundColor: '#ffebee', color: 'var(--primary)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('login_email')}</label>
            <input type="email" placeholder={t('login_email_placeholder')} autoComplete="off" style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#2C2F24', fontSize: '0.9rem' }}>{t('login_password')}</label>
            <input type="password" placeholder={t('login_password_placeholder')} autoComplete="new-password" style={{ width: '100%', padding: '1rem', borderRadius: '50px', border: '1px solid #eaeaec', outline: 'none' }} value={password} onChange={e => setPassword(e.target.value)} required />
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


