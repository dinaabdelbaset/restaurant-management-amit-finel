import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Page.module.css';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';

const dummyArticles = [
  { id: 1, title: 'The secret tips & tricks to prepare a perfect burger & pizza for our customers', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop' },
  { id: 2, title: 'Exclusive baking lessons from the pastry king', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 3, title: 'How to prepare the perfect fries in an air fryer', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 4, title: 'How to prepare delicious chicken tenders', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 5, title: '5 great cooking gadgets you can buy to save time', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 6, title: 'How to prepare a delicious gluten free sushi', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 7, title: '7 delicious cheesecake recipes you can prepare', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 8, title: '5 great pizza restaurants you should visit this city', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 9, title: '5 great cooking gadgets you can buy to save time', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 10, title: 'How to prepare a delicious gluten free sushi', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 11, title: 'Top 20 simple and quick desserts for kids', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
  { id: 12, title: 'Top 20 simple and quick desserts for kids', date: 'January 3, 2023', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=compress&cs=tinysrgb&w=500&h=350&dpr=1' },
];

const Blog = () => {
  const { t, tTitle, language } = useLanguage();
  const isAr = language === 'ar';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/posts');
        setArticles(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ backgroundColor: '#F9F9F7', paddingBottom: '6rem', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="container" style={{ padding: '6rem 1rem 4rem 1rem', textAlign: 'center' }}>
        <h1 className={styles.headerTitle}>{t('blog_page_title')}</h1>
        <p className={styles.headerSubtitle}>
          {t('blog_page_subtitle')}
        </p>
      </div>

      {/* Blog Grid */}
      <div className="container">
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: '1.1rem', color: '#666' }}>{t('blog_loading')}</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {(articles.length > 0 ? articles : dummyArticles).map((article) => (
              <Link to={`/blog/${article.id}`} key={article.id} style={{ 
              backgroundColor: 'white', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <div style={{ height: '220px', width: '100%' }}>
                <img src={article.image?.startsWith('/') ? `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${article.image}` : article.image} alt={article.title} className={styles.cardImage} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardDate}>{article.created_at ? new Date(article.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (article.date || (isAr ? 'يناير 2024' : 'Recent'))}</span>
                <h3 className={styles.cardTitle}>{tTitle(article.title)}</h3>
              </div>
            </Link>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
