import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

const BlogDetails = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const [post, setPost] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        const dummy = dummyArticles.find(a => a.id === parseInt(id));
        if (dummy) {
          let richContent = '';
          
          if (dummy.id === 1) {
            richContent = `
              <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">What do you need to prepare a home-made burger?</h2>
              <p style="margin-bottom: 1.5rem;">Creating the perfect burger and pizza is an art, combining ingredients, techniques, and passion to craft a culinary masterpiece.</p>
              <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.8;">
                <li style="margin-bottom: 0.5rem"><strong>Quality Meat:</strong> The heart of a perfect burger is top-notch beef. Opt for fresh, high-quality ground beef with a fat content of about 20% for the juiciest, most flavorful results.</li>
                <li style="margin-bottom: 0.5rem"><strong>Seasoning:</strong> Keep it simple. A generous pinch of salt and black pepper just before cooking will enhance the beef's natural flavors without overpowering them.</li>
                <li style="margin-bottom: 0.5rem"><strong>Don't Overwork the Meat:</strong> When forming your patties, be gentle. Overworking the meat can lead to dense, tough burgers. You want a patty that's firm enough to hold together, but not compressed.</li>
                <li style="margin-bottom: 0.5rem"><strong>Cooking:</strong> High heat is crucial. Whether you're grilling or pan-searing, make sure your cooking surface is hot enough to form a nice crust on the patty, sealing in those delicious juices.</li>
                <li style="margin-bottom: 0.5rem"><strong>Resting:</strong> Allow your cooked burgers to rest for a few minutes before serving. This lets the juices redistribute throughout the patty, ensuring a moist and flavorful bite.</li>
              </ol>

              <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem;">What are the right ingredients to make it delicious?</h2>
              <p style="margin-bottom: 1.5rem;">Creating the perfect burger and pizza is an art, combining ingredients, techniques, and passion to craft a culinary masterpiece.</p>
              <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.8;">
                <li style="margin-bottom: 0.5rem"><strong>Quality Meat:</strong> The heart of a perfect burger is top-notch beef. Opt for fresh, high-quality ground beef with a fat content of about 20% for the juiciest, most flavorful results.</li>
                <li style="margin-bottom: 0.5rem"><strong>Seasoning:</strong> Keep it simple. A generous pinch of salt and black pepper just before cooking will enhance the beef's natural flavors without overpowering them.</li>
                <li style="margin-bottom: 0.5rem"><strong>Don't Overwork the Meat:</strong> When forming your patties, be gentle. Overworking the meat can lead to dense, tough burgers.</li>
                <li style="margin-bottom: 0.5rem"><strong>Cooking:</strong> High heat is crucial. Whether you're grilling or pan-searing, make sure your cooking surface is hot.</li>
                <li style="margin-bottom: 0.5rem"><strong>Resting:</strong> Allow your cooked burgers to rest for a few minutes before serving. This lets the juices redistribute.</li>
              </ol>

              <img src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1" alt="Fries and burger" style="width: 100%; height: auto; border-radius: 12px; margin-top: 2rem; margin-bottom: 2.5rem; object-fit: cover;" />

              <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 1rem; margin-bottom: 1rem;">What are the right ingredients to make it delicious?</h2>
              <p style="margin-bottom: 1.5rem;">Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget velit est. In tempor vehicula ullamcorper. Fusce varius aliquam egestas. Cras non nisl mauris. In ligula velit, vulputate eu consectetur amet, luctus ipsum dolor sit amet, consectetur adipiscing elit. Sed eget velit est. In tempor vehicula ullamcorper. Fusce varius aliquam egestas. Cras non nisl mauris.</p>
            `;
          } else if (dummy.id === 2) {
            richContent = `
              <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">The art of baking French Macarons</h2>
              <p style="margin-bottom: 1.5rem;">Baking is a science and an art, combining precise measurements, techniques, and passion to craft culinary masterpieces.</p>
              <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.8;">
                <li style="margin-bottom: 0.5rem"><strong>Sift the dry ingredients:</strong> Almond flour and powdered sugar must be sifted together multiple times for a smooth shell.</li>
                <li style="margin-bottom: 0.5rem"><strong>The Meringue:</strong> Whip the egg whites until stiff peaks form. Be careful not to over-whip.</li>
                <li style="margin-bottom: 0.5rem"><strong>Macaronage:</strong> This is the crucial folding process. Fold until the batter flows off the spatula like lava.</li>
                <li style="margin-bottom: 0.5rem"><strong>Resting:</strong> Let the piped macarons sit at room temperature until a skin forms. This ensures they develop their signature "feet".</li>
              </ol>
            `;
          } else {
            richContent = `
              <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">${dummy.title}</h2>
              <p style="margin-bottom: 1.5rem;">Cooking is an art that combines passion, right ingredients, and perfect timing. Whether you are baking or cooking a main dish, the secret lies in the details.</p>
              <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.8;">
                <li style="margin-bottom: 0.5rem"><strong>High Quality Ingredients:</strong> Always start with the freshest ingredients you can find. It makes a massive difference in the final taste.</li>
                <li style="margin-bottom: 0.5rem"><strong>Proper Seasoning:</strong> Don't be afraid to use salt and spices to elevate the flavors of your dish.</li>
                <li style="margin-bottom: 0.5rem"><strong>Patience:</strong> Great food takes time. Let it cook properly and rest before serving.</li>
              </ol>

              <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2.5rem; margin-bottom: 1rem;">Step by Step Instructions</h2>
              <p style="margin-bottom: 1.5rem;">Follow these simple steps to ensure your dish comes out perfectly every single time. Make sure you read through the whole recipe before starting.</p>
              <p style="margin-bottom: 1.5rem;">Proin faucibus nec mauris a sodales, sed elementum mi tincidunt. Sed eget velit est. In tempor vehicula ullamcorper. Fusce varius aliquam egestas. Cras non nisl mauris. In ligula velit, vulputate eu consectetur amet, luctus ipsum dolor sit amet, consectetur adipiscing elit.</p>
            `;
          }
          
          setPost({ 
            ...dummy, 
            content: richContent
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await axios.get('/posts');
        if (res.data.length > 0) {
          setRelatedArticles(res.data.slice(0, 4));
        } else {
          setRelatedArticles(dummyArticles.slice(0, 4));
        }
      } catch {
        setRelatedArticles(dummyArticles.slice(0, 4));
      }
    };

    fetchPost();
    fetchRelated();
  }, [id]);

  if (loading) return <div style={{ padding: '6rem', textAlign: 'center' }}>Loading post...</div>;
  if (!post) return <div style={{ padding: '6rem', textAlign: 'center' }}>Post not found</div>;

  return (
    <div style={{ backgroundColor: '#F9F9F7', paddingBottom: '0' }}>
      
      <div className="container" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: '3rem', maxWidth: '850px' }}>
        {/* Title */}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-heading)', color: '#2C2F24', textAlign: 'center', lineHeight: 1.25, marginBottom: '2rem' }}>
          {post.title}
        </h1>

        {/* Main Image */}
        <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '480px', marginBottom: '2.5rem', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
          <img src={post.image?.startsWith('/') ? `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${post.image}` : (post.image || "https://images.unsplash.com/photo-1556910110-a5a63dfd393c?w=1200&h=800&fit=crop")} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Content Section */}
        <div style={{ color: '#414536', lineHeight: 1.8, fontSize: 'clamp(1rem, 2vw, 1.1rem)' }} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Read More Articles Section */}
      <div style={{ backgroundColor: 'white', padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontFamily: 'var(--font-heading)', color: '#2C2F24', marginBottom: '1rem' }}>
              {isAr ? 'مقالات وأخبار طهي أخرى' : 'Read More Articles'}
            </h2>
            <p style={{ color: 'var(--text-gray)', maxWidth: '550px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {isAr ? 'اكتشف المزيد من المقالات المميزة والنصائح الحصرية من كبار الطهاة لدينا.' : 'We consider all the drivers of change gives you the components you need to create a truly delicious journey.'}
            </p>
          </div>

          {/* Blog Grid (4 columns) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {relatedArticles.map((article) => (
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
                <div style={{ height: '200px', width: '100%' }}>
                  <img src={article.image?.startsWith('/') ? `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${article.image}` : article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>{article.created_at ? new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (article.date || 'Recent')}</span>
                  <h3 style={{ fontSize: '1.1rem', color: '#2C2F24', fontWeight: 600, lineHeight: 1.4 }}>{article.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;



