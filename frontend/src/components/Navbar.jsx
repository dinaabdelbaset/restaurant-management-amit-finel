import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, LogOut } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('menu'), path: '/menu' },
    { name: t('blog'), path: '/blog' },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <header className={styles.header}>

      {/* Main Navbar */}
      <div className={`container ${styles.navContainer}`}>
        
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <svg width="35" height="35" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 32C10 44.1503 19.8497 54 32 54C44.1503 54 54 44.1503 54 32" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 32H60" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M38 12L26 32" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 14L32 32" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 28C24 22 30 22 32 28" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={styles.logoText}>Bistro Bliss</span>
        </Link>

        {/* Links */}
        <nav className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`${styles.link} ${isActive ? styles.activeLink : styles.inactiveLink}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: User Controls + Language + Book Table */}
        <div className={styles.actionsArea}>
          {user ? (
            <div className={styles.userMenu}>
              <Link to="/order" style={{ position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#2C2F24', padding: '0.3rem' }} title={t('cart')}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                {cartCount > 0 && (
                  <span className={styles.cartBadge}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {user.role === 'admin' && (
                <Link to="/admin" className={styles.adminBadge} title={t('admin')}>
                  {t('admin')}
                </Link>
              )}

              <Link to="/profile" className={styles.userNamePill} title={user.name}>
                <User size={16} />
                <span style={{ maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</span>
              </Link>

              <button onClick={handleLogout} className={styles.iconBtn} title={t('logout')}>
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', marginInlineEnd: '0.25rem' }}>
              <Link to="/login" style={{ fontWeight: 600, textDecoration: 'none', color: '#2C2F24', fontSize: '0.92rem', padding: '0.4rem 0.75rem' }}>{t('login')}</Link>
            </div>
          )}

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Language Switcher */}
          <div 
            onClick={toggleLanguage}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleLanguage(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '50px',
              border: '1.5px solid #2C2F24',
              backgroundColor: '#fff',
              cursor: 'pointer',
              userSelect: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            title={language === 'en' ? 'Switch to Arabic / التبديل للعربية' : 'Switch to English / التبديل للإنجليزية'}
          >
            <span style={{ fontSize: '0.95rem' }}>🌐</span>
            <span style={{ 
              fontWeight: language === 'en' ? '800' : '500', 
              color: language === 'en' ? '#AD343E' : '#777',
              fontSize: '0.85rem'
            }}>EN</span>
            <span style={{ color: '#ccc', fontSize: '0.75rem' }}>|</span>
            <span style={{ 
              fontWeight: language === 'ar' ? '800' : '500', 
              color: language === 'ar' ? '#AD343E' : '#777',
              fontSize: '0.85rem'
            }}>عربي</span>
          </div>

          {/* Book A Table CTA */}
          <Link 
            to="/book-table" 
            className="btn btn-outline" 
            style={{ 
              padding: '0.55rem 1.35rem', 
              borderColor: '#2C2F24', 
              color: '#2C2F24', 
              borderRadius: '50px', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {t('book_a_table')}
          </Link>
        </div>
        
      </div>
    </header>
  );
};

export default Navbar;
