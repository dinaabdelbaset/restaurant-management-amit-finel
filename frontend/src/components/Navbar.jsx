import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, LogOut, Menu, X, ShoppingBag, Phone, Mail, Bell } from 'lucide-react';
import axios from 'axios';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const isAr = language === 'ar';

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
    setShowNotifDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const fetchNotifications = async () => {
      try {
        const [bRes, oRes] = await Promise.all([
          axios.get('/bookings'),
          axios.get('/orders')
        ]);
        const list = [];
        (bRes.data || []).forEach(b => {
          if (b.status === 'Accepted' || b.status === 'Rejected') {
            list.push({
              id: `b-${b.id}`,
              type: 'booking',
              text: isAr 
                ? `حجزك (${b.booking_date} ${b.booking_time}): تم ${b.status === 'Accepted' ? 'قبوله 🎉' : 'رفضه ✖'}` 
                : `Booking (${b.booking_date} ${b.booking_time}): ${b.status} ${b.status === 'Accepted' ? '🎉' : '✖'}`,
              status: b.status
            });
          }
        });
        (oRes.data || []).forEach(o => {
          if (o.status !== 'Pending') {
            list.push({
              id: `o-${o.id}`,
              type: 'order',
              text: isAr 
                ? `طلبك #${o.id}: أصبح ${o.status}` 
                : `Order #${o.id}: Status is now ${o.status}`,
              status: o.status
            });
          }
        });
        setNotifications(list);
      } catch {}
    };
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [user, isAr]);

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
      {/* Top Bar - Contact & Social */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarInfo}>
            <a href="tel:4148570107" className={styles.topBarItem}>
              <Phone size={13} />
              <span>(414) 857 - 0107</span>
            </a>
            <a href="mailto:yummy@bistrobliss.com" className={styles.topBarItem}>
              <Mail size={13} />
              <span>yummy@bistrobliss.com</span>
            </a>
          </div>
          <div className={styles.topBarSocial}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>

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

          {/* Notifications Bell */}
          {user && (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifDropdown(!showNotifDropdown)} 
                className={styles.cartIconBtn} 
                title={isAr ? 'الإشعارات' : 'Notifications'}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <Bell size={21} />
                {notifications.length > 0 && (
                  <span className={styles.cartBadge} style={{ backgroundColor: '#AD343E' }}>
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '130%',
                  right: isAr ? 'auto' : 0,
                  left: isAr ? 0 : 'auto',
                  width: '290px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                  border: '1px solid #E2E8F0',
                  padding: '1rem',
                  zIndex: 1000
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #eee', paddingBottom: '0.4rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.88rem', color: '#1E293B' }}>
                      {isAr ? '🔔 الإشعارات' : '🔔 Notifications'}
                    </span>
                    <Link to="/profile" onClick={() => setShowNotifDropdown(false)} style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                      {isAr ? 'الملف الشخصي' : 'Profile'}
                    </Link>
                  </div>

                  {notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '1rem 0', color: '#888', fontSize: '0.82rem' }}>
                      {isAr ? 'لا توجد إشعارات جديدة' : 'No new notifications'}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
                      {notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => { setShowNotifDropdown(false); navigate('/profile'); }}
                          style={{
                            padding: '0.55rem 0.75rem',
                            borderRadius: '8px',
                            backgroundColor: '#F8FAFC',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            borderLeft: isAr ? 'none' : `3px solid ${n.status === 'Accepted' || n.status === 'Delivered' ? '#10B981' : (n.status === 'Rejected' ? '#EF4444' : '#3B82F6')}`,
                            borderRight: isAr ? `3px solid ${n.status === 'Accepted' || n.status === 'Delivered' ? '#10B981' : (n.status === 'Rejected' ? '#EF4444' : '#3B82F6')}` : 'none'
                          }}
                        >
                          {n.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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

