import React from 'react';
import styles from './Page.module.css';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, Play, Utensils, ClipboardList, Clock } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  return (
    <div>
      {/* 1. Healthy Food Section with Overlapping Card */}
      <section style={{ backgroundColor: '#F9F9F7', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0, position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Healthy Food" style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block' }} />
            {/* Overlapping Contact Box */}
            <div style={{ 
              backgroundColor: '#414536', 
              color: 'white', 
              padding: '1.75rem', 
              borderRadius: 'var(--radius-md)',
              maxWidth: '320px',
              marginTop: '1.25rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'white' }}>{t('visit_us')}</h4>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}><Phone size={16} /> (414) 857 - 0107</p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem' }}><Mail size={16} /> yummy@bistrobliss.com</p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9rem' }}><MapPin size={16} style={{flexShrink:0, marginTop:'4px'}} /> {t('address_val')}</p>
            </div>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{t('about_hero_title')}</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('about_hero_desc1')}
            </p>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('about_hero_desc2')}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Video Banner Section */}
      <section style={{ 
        position: 'relative', 
        minHeight: '350px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '3rem 1rem'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white', maxWidth: '700px' }}>
          <div style={{ width: '55px', height: '55px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', cursor: 'pointer' }}>
            <Play fill="var(--primary)" color="var(--primary)" size={22} style={{ marginLeft: '4px' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontFamily: 'var(--font-heading)', lineHeight: 1.25 }}>
            {t('about_video_title')}
          </h2>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="container" style={{ padding: 'clamp(3rem, 5vw, 4rem) 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9F9F7', borderRadius: '50%', flexShrink: 0 }}>
              <Utensils color="var(--primary)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('about_feat_cuisine')}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('about_feat_cuisine_desc')}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9F9F7', borderRadius: '50%', flexShrink: 0 }}>
              <ClipboardList color="var(--primary)" size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{t('about_feat_order')}</h3>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('about_feat_order_desc')}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#F9F9F7', borderRadius: '50%', flexShrink: 0 }}>
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
      <section style={{ backgroundColor: '#F9F9F7', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', marginBottom: '1.25rem', fontFamily: 'var(--font-heading)', lineHeight: 1.2 }}>{t('about_stats_title')}</h2>
            <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('about_stats_desc')}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: 'white', padding: '1.5rem 1rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>3</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500, fontSize: '0.9rem' }}>{t('about_stat_loc')}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem 1rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>1995</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500, fontSize: '0.9rem' }}>{t('about_stat_founded')}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem 1rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>65+</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500, fontSize: '0.9rem' }}>{t('about_stat_staff')}</p>
              </div>
              <div style={{ backgroundColor: 'white', padding: '1.5rem 1rem', textAlign: 'center', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', color: '#2C2F24' }}>100%</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 500, fontSize: '0.9rem' }}>{t('about_stat_customers')}</p>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 300px', minWidth: 0 }}>
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Chef preparing food" style={{ width: '100%', maxHeight: '450px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
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
    </div>
  );
};

export default About;
