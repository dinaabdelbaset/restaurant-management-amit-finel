import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const initialTab = new URLSearchParams(location.search).get('category') || 'All';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');
    if (category) {
      setActiveTab(category);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('/menu');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const [toastMessage, setToastMessage] = useState('');

  const addToCart = (item) => {
    if (!user) {
      setToastMessage(t('login') + "!");
      setTimeout(() => setToastMessage(''), 3000);
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(c => c.menu_item_id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ menu_item_id: item.id, quantity: 1, price: item.price, name: item.name });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    setToastMessage(`${item.name} ${t('added_to_cart')}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const categories = [
    { key: 'All', label: t('cat_all') },
    { key: 'Breakfast', label: t('cat_breakfast') },
    { key: 'Main Dishes', label: t('cat_main') },
    { key: 'Drinks', label: t('cat_drinks') },
    { key: 'Desserts', label: t('cat_desserts') }
  ];

  // For demonstration if API returns empty, use dummy data that matches the design
  const displayItems = items.length > 0 ? items : [
    { id: 1, name: 'Fried Eggs', price: '9.99', description: 'Made with eggs, lettuce, salt, oil and other ingredients.', category: 'Breakfast', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&h=350&fit=crop' },
    { id: 2, name: 'Hawaiian Pizza', price: '15.99', description: 'Made with pizza dough, cheese, and other ingredients.', category: 'Main Dishes', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=350&fit=crop' },
    { id: 3, name: 'Martinez Cocktail', price: '7.22', description: 'Made with sugar, lime, soda, ice and other ingredients.', category: 'Drinks', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=350&fit=crop' },
    { id: 4, name: 'Butterscotch Cake', price: '20.99', description: 'Made with sugar, flour, butter and other ingredients.', category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=350&fit=crop' },
    { id: 5, name: 'Mint Lemonade', price: '5.89', description: 'Made with mint, lime, salt, ice and other ingredients.', category: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&h=350&fit=crop' },
    { id: 6, name: 'Chocolate Icecream', price: '18.05', description: 'Made with chocolate, milk, cream and other ingredients.', category: 'Desserts', image: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
    { id: 7, name: 'Cheese Burger', price: '12.55', description: 'Made with buns, patty, cheese, and other ingredients.', category: 'Main Dishes', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=350&fit=crop' },
    { id: 8, name: 'Classic Waffles', price: '12.99', description: 'Made with waffles, fruit, syrup and other ingredients.', category: 'Breakfast', image: 'https://images.pexels.com/photos/3780469/pexels-photo-3780469.jpeg?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  ];

  const filteredItems = activeTab === 'All' ? displayItems : displayItems.filter(item => item.category === activeTab);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading menu...</div>;

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toast}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          {toastMessage}
        </div>
      )}

      {/* Header Section */}
      <div className={`container ${styles.headerContainer}`}>
        <h1 className={styles.title}>{t('menu_page_title')}</h1>
        <p className={styles.subtitle}>
          {t('menu_page_subtitle')}
        </p>

        {/* Filter Buttons */}
        <div className={styles.filterContainer}>
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`btn ${activeTab === cat.key ? 'btn-primary' : 'btn-outline'} ${styles.filterBtn} ${activeTab === cat.key ? styles.filterBtnActive : styles.filterBtnInactive}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className={styles.menuGrid}>
          {filteredItems.map(item => (
            <div key={item.id} className={`card ${styles.cardContainer}`}>
              <div className={styles.cardImageWrapper}>
                <img src={item.image?.startsWith('/') ? `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${item.image}` : item.image} alt={item.name} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardPrice}>
                  ${item.price}
                </h3>
                <h4 className={styles.cardName}>{item.name}</h4>
                <p className={styles.cardDesc}>{item.description}</p>
                <button onClick={() => addToCart(item)} className={`btn btn-outline ${styles.addToCartBtn}`}>
                  {t('add_to_cart')}
                </button>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '3rem', color: 'var(--text-gray)' }}>No items found in this category.</div>
          )}
        </div>
      </div>

      {/* App Delivery Section */}
      <section style={{ backgroundColor: '#F9F9F7', padding: '6rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          <div style={{ flex: '1 1 350px' }}>
            <h2 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', lineHeight: 1.1, marginBottom: '1.5rem', color: '#2C2F24' }}>
              You can order<br />through apps
            </h2>
            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', maxWidth: '400px', lineHeight: 1.6 }}>
              Lorem ipsum dolor sit amet consectetur adipiscing elit enim bibendum sed et aliquet aliquet risus tempor semper.
            </p>
          </div>
          <div style={{ flex: '2 1 600px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { id: 'uber', content: <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#000', letterSpacing: '-0.5px' }}>Uber <span style={{ color: '#06C167' }}>Eats</span></div> },
              { id: 'grubhub', content: <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#F36D00', letterSpacing: '-1px' }}>GRUBHUB</div> },
              { id: 'postmates', content: <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#000', letterSpacing: '-0.5px' }}>Postmates</div> },
              { id: 'doordash', content: <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', fontWeight: 900, color: '#FF3008', letterSpacing: '-0.5px' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23.07 10.11A11.77 11.77 0 0 0 12.39 0a11.9 11.9 0 0 0-3.37.52C14.7 1.83 19 6.4 19 12a11.83 11.83 0 0 1-5 9.77A11.86 11.86 0 0 0 24 12a12.06 12.06 0 0 0-.93-1.89zM1 12A11.83 11.83 0 0 0 6 2.23 11.86 11.86 0 0 1 0 12c0 .65.05 1.29.15 1.91A11.75 11.75 0 0 0 11.61 24a11.9 11.9 0 0 1 3.37-.52c-5.69-1.3-10-5.88-10-11.48A11.83 11.83 0 0 1 1 12z" /></svg> DOORDASH</div> },
              { id: 'foodpanda', content: <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: 700, color: '#D70F64', letterSpacing: '-0.5px' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3-9c-.83 0-1.5-.67-1.5-1.5S8.17 8 9 8s1.5.67 1.5 1.5S9.83 11 6 11zm6 0c-.83 0-1.5-.67-1.5-1.5S14.17 8 15 8s1.5.67 1.5 1.5S15.83 11 12 11zm-3 5c1.66 0 3-1.34 3-3H9c0 1.66 1.34 3 3 3z" /></svg> foodpanda</div> },
              { id: 'deliveroo', content: <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: 800, color: '#00CCBC', letterSpacing: '-0.5px' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z" /></svg> deliveroo</div> },
              { id: 'instacart', content: <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.4rem', fontWeight: 700, color: '#43B02A', letterSpacing: '-0.5px' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#FF7D00' }}><path d="M12 2C8 2 4 10 4 10h16s-4-8-8-8zM4 12v10h16V12H4z" /></svg> instacart</div> },
              { id: 'justeat', content: <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#F36D00', letterSpacing: '-1px' }}>JUST EAT</div> },
              { id: 'didifood', content: <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem', fontWeight: 700, color: '#888', letterSpacing: '-0.5px' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF7D00" strokeWidth="4"><circle cx="12" cy="12" r="8" /></svg> <span style={{ color: '#FF7D00' }}>DiDi</span> Food</div> },
            ].map((app) => (
              <div key={app.id} style={{
                backgroundColor: 'white',
                padding: '1.5rem 1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                minHeight: '80px',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {app.content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;

