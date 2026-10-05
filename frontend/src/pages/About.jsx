import React from 'react';
import styles from './Page.module.css';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, Play, Utensils, ClipboardList, Clock } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* 1. Healthy Food Section with Overlapping Card */}
      <section style={{ backgroundColor: '#F9F9F7', padding: '6rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          <div style={{ flex: '1 1 500px', position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthy Food" style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block' }} />
            {/* Overlapping Contact Box */}
            <div style={{ 
              position: 'absolute', 
              bottom: '-30px', 
              right: '-30px', 
              backgroundColor: '#414536', 
              color: 'white', 
              padding: '2rem', 
              borderRadius: 'var(--radius-md)',
              width: '300px'
            }}>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'white' }}>{t('visit_us')}</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}><Phone size={16} /> (414) 857 - 0107</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}><Mail size={16} /> yummy@bistrobliss.com</p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem' }}><MapPin size={16} style={{flexShrink:0, marginTop:'4px'}} /> {t('address_val')}</p>
            </div>
          </div>
          <div className={styles.flexText}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{t('about_hero_title')}</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              {t('about_hero_desc1')}
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>
              {t('about_hero_desc2')}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Video Banner Section */}
      <section style={{ 
        position: 'relative', 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '3rem'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', cursor: 'pointer' }}>
            <Play fill="var(--primary)" color="var(--primary)" size={24} style={{ marginLeft: '4px' }} />
          </div>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.2 }}>
            {t('about_video_title')}
          </h2>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 300px' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9F9F7', borderRadius: '50%' }}>
              <Utensils color="var(--primary)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('about_feat_cuisine')}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('about_feat_cuisine_desc')}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 300px' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9F9F7', borderRadius: '50%' }}>
              <ClipboardList color="var(--primary)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('about_feat_order')}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('about_feat_order_desc')}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 300px' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9F9F7', borderRadius: '50%' }}>
              <Clock color="var(--primary)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('about_feat_delivery')}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('about_feat_delivery_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Section */}
      <section style={{ backgroundColor: '#F9F9F7', padding: '6rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          <div className={styles.flexImage}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{t('about_stats_title')}</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '3rem', fontSize: '1.1rem' }}>
              {t('about_stats_desc')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ backgroundColor: 'white', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>3</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500 }}>{t('about_stat_loc')}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>1995</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500 }}>{t('about_stat_founded')}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>65+</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500 }}>{t('about_stat_staff')}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>100%</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500 }}>{t('about_stat_customers')}</p>
              </div>
            </div>
          </div>
          <div className={styles.flexText}>
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chef preparing food" style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '4rem', fontFamily: 'var(--font-heading)' }}>{t('testimonials_title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'start' }}>
          {[
            { title: t('t1_title'), text: t('t1_text'), name: t('t1_name'), loc: t('t1_loc'), img: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { title: t('t2_title'), text: t('t2_text'), name: t('t2_name'), loc: t('t2_loc'), img: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { title: t('t3_title'), text: t('t3_text'), name: t('t3_name'), loc: t('t3_loc'), img: 'https://randomuser.me/api/portraits/women/68.jpg' }
          ].map((tItem, i) => (
             <div key={i} className="card" style={{ padding: '2.5rem', backgroundColor: '#F9F9F7', boxShadow: 'none', border: 'none' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>"{tItem.title}"</h3>
                <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', fontStyle: 'italic', lineHeight: 1.6 }}>{tItem.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={tItem.img} alt={tItem.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', margin: 0 }}>{tItem.name}</h4>
                    <span style={{ color: 'var(--text-gray)', fontSize: '0.875rem' }}>{tItem.loc}</span>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;



