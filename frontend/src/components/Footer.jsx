import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.brandLink}>
              <div className={styles.brandIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
              </div>
              <span className={styles.brandText}>Bistro Bliss</span>
            </Link>
            <p className={styles.brandDesc}>
              {t('footer_about')}
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className={styles.socialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className={styles.socialBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>
          
          {/* Pages Column */}
          <div>
            <h3 className={styles.colTitle}>{t('footer_pages')}</h3>
            <ul className={styles.list}>
              <li><Link to="/" className={styles.link}>{t('home')}</Link></li>
              <li><Link to="/about" className={styles.link}>{t('about')}</Link></li>
              <li><Link to="/menu" className={styles.link}>{t('menu')}</Link></li>
              <li><Link to="/blog" className={styles.link}>{t('blog')}</Link></li>
              <li><Link to="/contact" className={styles.link}>{t('contact')}</Link></li>
              <li><Link to="/book-table" className={styles.link}>{t('book_a_table')}</Link></li>
            </ul>
          </div>
          
          {/* Hours Column */}
          <div>
            <h3 className={styles.colTitle}>{t('footer_hours')}</h3>
            <ul className={styles.list}>
              <li style={{ color: '#fff' }}>{t('footer_mon_fri')}</li>
              <li style={{ color: '#fff', marginTop: '0.5rem' }}>{t('footer_sat_sun')}</li>
            </ul>
          </div>

          {/* Instagram Column */}
          <div>
            <h3 className={styles.colTitle}>Instagram</h3>
            <div className={styles.instaGrid}>
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Instagram 1" className={styles.instaImg} />
              <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Instagram 2" className={styles.instaImg} />
              <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Instagram 3" className={styles.instaImg} />
              <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Instagram 4" className={styles.instaImg} />
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          {t('footer_rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

