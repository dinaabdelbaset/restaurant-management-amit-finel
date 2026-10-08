import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, LogOut, Menu, X, ShoppingBag } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updateCartCount = () => {
    if (!user && !localStorage.getItem('token')) {
      setCartCount(0);
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [user]);

  // Close mobile menu whenever path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
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
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 32C10 44.1503 19.8497 54 32 54C44.1503 54 54 44.1503 54 32" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 32H60" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M38 12L26 32" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 14L32 32" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 28C24 22 30 22 32 28" stroke="#AD343E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={styles.logoText}>Bistro Bliss</span>
        </Link>

        {/* Desktop Links */}
        <nav className={styles.desktopNav}>
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

        {/* Right Actions Area */}
        <div className={styles.actionsArea}>
          {/* Cart Icon */}
          <Link to="/order" className={styles.cartIconBtn} title={t('cart')}>
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop User Controls */}
          <div className={styles.desktopUserArea}>
            {user ? (
              <div className={styles.userMenu}>
                {user.role === 'admin' && (
                  <Link to="/admin" className={styles.adminBadge} title={t('admin')}>
                    {t('admin')}
                  </Link>
                )}

                <Link to="/profile" className={styles.userNamePill} title={user.name}>
                  <User size={16} />
                  <span className={styles.userNameText}>{user.name}</span>
                </Link>

                <button onClick={handleLogout} className={styles.iconBtn} title={t('logout')}>
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <Link to="/login" className={styles.loginBtn}>{t('login')}</Link>
            )}
          </div>

          {/* Language Switcher */}
          <div 
            onClick={toggleLanguage}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleLanguage(); }}
            className={styles.langBtn}
            title={language === 'en' ? 'Switch to Arabic / التبديل للعربية' : 'Switch to English / التبديل للإنجليزية'}
          >
            <span style={{ fontSize: '0.88rem' }}>🌐</span>
            <span className={styles.langDesktopText}>
              <span style={{ 
                fontWeight: language === 'en' ? '800' : '500', 
                color: language === 'en' ? '#AD343E' : '#777',
                fontSize: '0.8rem'
              }}>EN</span>
              <span style={{ color: '#ccc', fontSize: '0.7rem' }}>|</span>
              <span style={{ 
                fontWeight: language === 'ar' ? '800' : '500', 
                color: language === 'ar' ? '#AD343E' : '#777',
                fontSize: '0.8rem'
              }}>عربي</span>
            </span>
            <span className={styles.langMobileText}>
              {language === 'en' ? 'عربي' : 'EN'}
            </span>
          </div>

          {/* Desktop Book Table CTA */}
          <Link 
            to="/book-table" 
            className={`btn btn-outline ${styles.desktopBookBtn}`}
          >
            {t('book_a_table')}
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            type="button" 
            className={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNavLinks}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '');
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`${styles.mobileLink} ${isActive ? styles.mobileActiveLink : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className={styles.mobileFooterActions}>
            {user ? (
              <div className={styles.mobileUserBox}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.75rem' }}>
                  <Link to="/profile" className={styles.userNamePill} style={{ backgroundColor: '#f0f0ee', padding: '0.5rem 1rem' }}>
                    <User size={18} />
                    <span>{user.name}</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className={styles.adminBadge}>
                      {t('admin')}
                    </Link>
                  )}
                </div>
                <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', color: '#c62828', borderColor: '#c62828' }}>
                  <LogOut size={16} />
                  <span>{t('logout')}</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem' }}>
                {t('login')}
              </Link>
            )}

            <Link 
              to="/book-table" 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {t('book_a_table')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

