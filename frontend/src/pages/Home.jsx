import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import styles from './Home.module.css';

const Home = () => {
  const { t, tTitle, tDesc, language } = useLanguage();
  const isAr = language === 'ar';
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts').then(res => {
      if (res.data && res.data.length > 0) {
        setPosts(res.data);
      }
    }).catch(err => console.error(err));
  }, []);
  return (
    <div>
      {/* Hero Section */}

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Subtle overlay */}
        <div className={styles.heroOverlay}></div>
        
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            {t('hero_title')}
          </h1>
          <p className={styles.heroSubtitle}>
            {t('hero_subtitle')}
          </p>
          <div className={styles.heroButtons}>
            <Link to="/book-table" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>{t('book_a_table')}</Link>
            <Link to="/menu" className="btn btn-outline" style={{ padding: '1rem 2rem', backgroundColor: 'transparent', borderColor: '#2C2F24', color: '#2C2F24' }}>{t('explore_menu')}</Link>
          </div>
        </div>
      </section>

      {/* Browse Our Menu Section */}
      <section className={`container ${styles.browseSection}`}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>{t('browse_title')}</h2>
        <div className={styles.browseGrid}>
          {[
            { title: t('cat_breakfast'), category: 'Breakfast', icon: '☕', desc: t('cat_breakfast_desc') },
            { title: t('cat_main'), category: 'Main Dishes', icon: '🍲', desc: t('cat_main_desc') },
            { title: t('cat_drinks'), category: 'Drinks', icon: '🥤', desc: t('cat_drinks_desc') },
            { title: t('cat_desserts'), category: 'Desserts', icon: '🍰', desc: t('cat_desserts_desc') },
          ].map((item, i) => (
            <div key={i} className={`card ${styles.browseCard}`}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{item.desc}</p>
              <Link to={`/menu?category=${item.category}`} style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{t('explore_menu')}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Healthy Food Section with Overlapping Card */}
      <section className={styles.healthySection}>
        <div className={`container ${styles.healthyContainer}`}>
          <div className={styles.healthyImageWrapper}>
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthy Food" className={styles.healthyImage} />
            {/* Overlapping Contact Box */}
            <div className={styles.contactBox}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'white' }}>{t('visit_us')}</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}><Phone size={16} /> (414) 857 - 0107</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}><Mail size={16} /> yummy@bistrobliss.com</p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem' }}><MapPin size={16} style={{flexShrink:0, marginTop:'4px'}} /> {t('address_val')}</p>
            </div>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{t('healthy_title')}</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('healthy_desc1')}
            </p>
            <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('healthy_desc2')}
            </p>
            <Link to="/about" className="btn btn-outline" style={{ borderColor: '#2C2F24', color: '#2C2F24', padding: '0.85rem 1.75rem' }}>{t('more_about_us')}</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1rem' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '2.5rem', fontFamily: 'var(--font-heading)', maxWidth: '650px' }}>
          {t('services_title')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: t('srv_caterings'), img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80' },
            { title: t('srv_birthdays'), img: 'https://images.unsplash.com/photo-1533143708019-ea5cfa80213e?w=800&q=80' },
            { title: t('srv_weddings'), img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80' },
            { title: t('srv_events'), img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80' },
          ].map((item, i) => (
            <div key={i} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }} />
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>{t('srv_desc')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fastest Food Delivery Section */}
      <section style={{ backgroundColor: '#F9F9F7', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
             <img src="https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chef" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
             <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Dish 1" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
             <img src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Dish 2" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{t('delivery_title')}</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('delivery_subtitle')}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '1.05rem', fontWeight: 500 }}><CheckCircle color="var(--primary)" size={20} /> {t('del_feature_1')}</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '1.05rem', fontWeight: 500 }}><CheckCircle color="var(--primary)" size={20} /> {t('del_feature_2')}</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '1.05rem', fontWeight: 500 }}><CheckCircle color="var(--primary)" size={20} /> {t('del_feature_3')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '3rem', fontFamily: 'var(--font-heading)' }}>{t('testimonials_title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', textAlign: 'start' }}>
          {[
            { title: t('t1_title'), text: t('t1_text'), name: t('t1_name'), loc: t('t1_loc'), img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { title: t('t2_title'), text: t('t2_text'), name: t('t2_name'), loc: t('t2_loc'), img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { title: t('t3_title'), text: t('t3_text'), name: t('t3_name'), loc: t('t3_loc'), img: 'https://randomuser.me/api/portraits/women/68.jpg' }
          ].map((tItem, i) => (
             <div key={i} className="card" style={{ padding: '2rem 1.5rem', backgroundColor: '#F9F9F7', boxShadow: 'none', border: 'none' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.3rem' }}>"{tItem.title}"</h3>
                <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', fontStyle: 'italic', lineHeight: 1.6, fontSize: '0.95rem' }}>{tItem.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img src={tItem.img} alt={tItem.name} style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{tItem.name}</h4>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.82rem' }}>{tItem.loc}</span>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Our Blog & Articles Section */}
      <section style={{ backgroundColor: '#F9F9F7', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontFamily: 'var(--font-heading)', margin: 0 }}>{t('blog_heading')}</h2>
            <Link to="/blog" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', borderRadius: '50px' }}>{t('read_all')}</Link>
          </div>
          
          {(() => {
            const defaultFeatured = {
              id: 1,
              title: 'The secret tips & tricks to prepare a perfect burger & pizza for our customers',
              content: 'Creating the perfect burger and pizza is an art, combining ingredients, techniques, and passion to craft a culinary masterpiece.',
              date: 'January 3, 2023',
              image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop'
            };

            const defaultSub = [
              { id: 2, title: 'How to prepare the perfect french fries in an air fryer', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&h=350&fit=crop' },
              { id: 3, title: 'How to prepare delicious chicken tenders', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&h=350&fit=crop' },
              { id: 4, title: '7 delicious cheesecake recipes you can prepare', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&h=350&fit=crop' },
              { id: 5, title: '5 great pizza restaurants you should visit this city', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=350&fit=crop' },
            ];

            const featured = posts.length > 0 ? posts[0] : defaultFeatured;
            const subArticles = posts.length > 1 ? posts.slice(1, 5) : defaultSub;
            const getImgSrc = (img) => img?.startsWith('http') ? img : `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${img}`;

            return (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', width: '100%' }}>
                {/* Main Featured Article (Left) */}
                <Link to={`/blog/${featured.id}`} style={{ flex: '1 1 320px', minWidth: 0, backgroundColor: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ height: '260px', width: '100%' }}>
                    <img src={getImgSrc(featured.image)} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.75rem', flex: 1 }}>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.75rem', display: 'block' }}>{featured.created_at ? new Date(featured.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (featured.date || (isAr ? 'يناير 2024' : 'Recent'))}</span>
                    <h3 style={{ fontSize: '1.3rem', color: '#2C2F24', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.4 }}>{tTitle(featured.title)}</h3>
                    <p style={{ color: 'var(--text-gray)', lineHeight: 1.6, fontSize: '0.95rem' }}>{tDesc(featured.content)?.substring(0, 140)}...</p>
                  </div>
                </Link>

                {/* Grid of Smaller Articles (Right) */}
                <div style={{ flex: '1 1 320px', minWidth: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                  {subArticles.map((article) => (
                    <Link to={`/blog/${article.id}`} key={article.id} style={{ backgroundColor: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ height: '150px', width: '100%' }}>
                        <img src={getImgSrc(article.image || article.img)} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--text-gray)', fontSize: '0.8rem', marginBottom: '0.4rem', display: 'block' }}>{article.created_at ? new Date(article.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (article.date || (isAr ? 'يناير 2024' : 'Recent'))}</span>
                        <h3 style={{ fontSize: '1.05rem', color: '#2C2F24', fontWeight: 600, lineHeight: 1.4 }}>{tTitle(article.title)}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

    </div>
  );
};

export default Home;
