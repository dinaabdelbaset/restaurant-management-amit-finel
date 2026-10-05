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
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [post, setPost] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enrichContent = (data) => {
      if (data.content && data.content.length > 400 && data.content.includes('<h2')) {
        return data.content;
      }

      const pId = parseInt(data.id);
      const title = data.title || '';
      const baseDesc = data.content || '';

      if (pId === 1 || title.toLowerCase().includes('burger')) {
        return isAr ? `
          <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
            ${baseDesc || 'إعداد البرجر والبيتزا المثالية في المنزل فن يجمع بين المكونات الممتازة والتقنيات الاحترافية والشغف بابتكار تجربة تذوق لا تُنسى.'}
          </p>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">ماذا تحتاج لتحضير البرجر المنزلي المثالي؟</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">سر البرجر اللذيذ يبدأ من قطعة اللحم ذات الجودة العالية مع نسبة دهون متوازنة تمنحها الطراوة والنكهة الغنية.</p>
          <ol style="margin-bottom: 2rem; padding-right: 1.5rem; line-height: 1.9;">
            <li style="margin-bottom: 0.75rem"><strong>لحم عالي الجودة:</strong> اختر لحماً طازجاً بنسبة دهن تبلغ حوالي 20% للحصول على برجر طري ومليء بالعصارة.</li>
            <li style="margin-bottom: 0.75rem"><strong>التتبيل البسيط:</strong> رشة كريمة من الملح الخشن والفلفل الأسود المطحون طازجاً قبل الشواء مباشرة كفيلة بإبراز النكهة الطبيعية.</li>
            <li style="margin-bottom: 0.75rem"><strong>تجنب الضغط الزائد:</strong> عند تشكيل القرص، تعامل معه بلطف لتجنب جعله مضغوطاً وقاسياً بعد النضج.</li>
            <li style="margin-bottom: 0.75rem"><strong>حرارة طهي مرتفعة:</strong> الحرارة العالية ضرورية لتكوين طبقة خارجية مقرمشة تحبس العصارات بالداخل.</li>
            <li style="margin-bottom: 0.75rem"><strong>إراحة اللحم:</strong> اترك البرجر يرتاح لمدة 3 دقائق قبل تقديمه ليتوزع السائل الداخلي بالتساوي.</li>
          </ol>

          <div style="background-color: #F4F5F0; border-right: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
            <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
              "سر البيتزا والبرجر الناجح لا يكمن في كثرة الإضافات، بل في احترام المكونات الأساسية وتناغم الطعم بين الخبز واللحم والصلصة الخاصة."
            </p>
            <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— الشيف ماركو، كبير طهاة بيسترو بليس</span>
          </div>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">ما هي المكونات التي تمنحه الطعم الفاخر؟</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">الخبز الطازج (البريوش المدهون بالزبدة والمحمص خفيفاً)، والجبن الذائب بجودة عالية مثل الشيدر المعتق، مع المخلل المقرمش وشرائح البصل المكرمل، هذه التفاصيل الصغيرة تصنع الفرق الكبير.</p>
        ` : `
          <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
            ${baseDesc || 'Creating the perfect burger and pizza is an art, combining ingredients, techniques, and passion to craft a culinary masterpiece.'}
          </p>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">What do you need to prepare a home-made burger?</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">Creating the perfect burger and pizza is an art, combining ingredients, techniques, and passion to craft a culinary masterpiece.</p>
          <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.9;">
            <li style="margin-bottom: 0.75rem"><strong>Quality Meat:</strong> The heart of a perfect burger is top-notch beef. Opt for fresh, high-quality ground beef with a fat content of about 20% for the juiciest, most flavorful results.</li>
            <li style="margin-bottom: 0.75rem"><strong>Seasoning:</strong> Keep it simple. A generous pinch of salt and black pepper just before cooking will enhance the beef's natural flavors without overpowering them.</li>
            <li style="margin-bottom: 0.75rem"><strong>Don't Overwork the Meat:</strong> When forming your patties, be gentle. Overworking the meat can lead to dense, tough burgers.</li>
            <li style="margin-bottom: 0.75rem"><strong>Cooking:</strong> High heat is crucial. Whether grilling or pan-searing, make sure your cooking surface is hot enough to form a nice crust on the patty, sealing in delicious juices.</li>
            <li style="margin-bottom: 0.75rem"><strong>Resting:</strong> Allow your cooked burgers to rest for a few minutes before serving. This lets juices redistribute throughout the patty.</li>
          </ol>

          <div style="background-color: #F4F5F0; border-left: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
            <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
              "The secret to a memorable burger lies not in complicated toppings, but in respecting the pure craft: high-grade beef, buttery brioche, and harmonized seasoning."
            </p>
            <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— Chef Marco, Executive Chef at Bistro Bliss</span>
          </div>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">What are the right ingredients to make it delicious?</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">Toast the brioche buns with clarified butter, use aged cheddar that melts evenly, and craft a homemade aioli or tangy bistro sauce for that signature restaurant-quality finish.</p>
        `;
      }

      // Default rich article generator for other articles
      return isAr ? `
        <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
          ${baseDesc || 'فن الطهي يجمع بين الشغف واختيار أفضل المكونات والتقنيات المدروسة لابتكار أطباق استثنائية تأسر الحواس.'}
        </p>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">أسرار النكهة واختيار المكونات الطازجة</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          يكمن سر نجاح أي وصفة متقنة في انتقاء المكونات بعناية فائقة. النكهات الأصلية تبدأ من المزرعة إلى المطبخ مباشرة، حيث تلعب جودة الخضروات واللحوم والتوابل الدور المحوري في رفع مستوى الطبق إلى تجربة استثنائية.
        </p>

        <ol style="margin-bottom: 2rem; padding-right: 1.5rem; line-height: 1.9;">
          <li style="margin-bottom: 0.75rem"><strong>جودة المكونات الأساسية:</strong> احرص دائماً على استخدام المكونات الطازجة وغير المصنعة لضمان أفضل قوام وطعم غني.</li>
          <li style="margin-bottom: 0.75rem"><strong>التوازن الدقيق للتوابل:</strong> التوابل ليست للتغطية على طعم المكون بل لإبراز حلاوته الطبيعية وتناغم نكهاته.</li>
          <li style="margin-bottom: 0.75rem"><strong>التحكم في درجات الحرارة:</strong> الطهي بدرجات حرارة مضبوطة يحافظ على العصارة ويضمن نضجاً متساوياً وقرمشة مثالية.</li>
          <li style="margin-bottom: 0.75rem"><strong>إراحة الطعام قبل التقديم:</strong> ترك الأطباق لترتاح بضع دقائق يساعد على توزيع العصارات الداخلية وإبراز الروائح الزكية.</li>
        </ol>

        <div style="background-color: #F4F5F0; border-right: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
          <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
            "الطهي ليس مجرد اتباع وصفة، بل هو تجربة حسية كاملة تبدأ برائحة التوابل وتنتهي بابتسامة الرضا عند أول قضمة."
          </p>
          <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— كبير طهاة بيسترو بليس</span>
        </div>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">خطوات التنفيذ والإتقان في المطبخ</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          ابدأ دائماً بتجهيز مساحة العمل وترتيب المكونات مقدماً (Mise en place). هذا يمنحك تركيزاً كاملاً ويمنع احتراق المكونات أو نسيان أي عنصر أساسي، مما يضمن خروج الطبق بأفضل صورة تليق بمائدتك.
        </p>
      ` : `
        <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
          ${baseDesc || 'Creating the perfect culinary experience is an art, combining premium ingredients, passion, and meticulous techniques.'}
        </p>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">The Core Secrets & Choosing Fresh Ingredients</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          The difference between an ordinary dish and an unforgettable culinary masterpiece lies in the attention to foundational ingredients. Sourcing fresh, seasonal produce transforms everyday cooking into high gastronomy.
        </p>

        <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.9;">
          <li style="margin-bottom: 0.75rem"><strong>Premium Sourcing:</strong> Always seek farm-fresh, seasonal ingredients. Peak freshness delivers unparalleled natural sweetness and texture.</li>
          <li style="margin-bottom: 0.75rem"><strong>Balanced Seasoning:</strong> Salt and spices should enhance rather than mask. Season in thoughtful layers throughout the cooking process.</li>
          <li style="margin-bottom: 0.75rem"><strong>Heat Precision:</strong> Mastering pan heat and oven temperatures ensures an appetizing sear while locking in delicate moisture.</li>
          <li style="margin-bottom: 0.75rem"><strong>The Resting Phase:</strong> Allowing your creation to rest before plating lets internal juices settle and redistribute for optimal tenderness.</li>
        </ol>

        <div style="background-color: #F4F5F0; border-left: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
          <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
            "Cooking is an observation of senses; the sound of sizzling, the aroma of spices, and the touch of fresh ingredients coming together in harmony."
          </p>
          <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— Head Chef, Bistro Bliss</span>
        </div>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">Professional Techniques & Step-by-Step Execution</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          Always implement a proper "mise en place" before turning on the stove. Having all components chopped, measured, and ready eliminates rush, prevents overcooking, and allows you to cook with complete culinary confidence.
        </p>
      `;
    };

    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost({
          ...response.data,
          content: enrichContent(response.data)
        });
      } catch {
        const dummy = dummyArticles.find(a => a.id === parseInt(id)) || dummyArticles[0];
        setPost({ 
          ...dummy, 
          content: enrichContent(dummy)
        });
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
  }, [id, isAr]);

  if (loading) return <div style={{ padding: '6rem', textAlign: 'center' }}>Loading post...</div>;
  if (!post) return <div style={{ padding: '6rem', textAlign: 'center' }}>Post not found</div>;

  return (
    <div style={{ backgroundColor: '#F9F9F7', paddingBottom: '0' }}>
      
      <div className="container" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: '3rem', maxWidth: '850px' }}>
        {/* Title */}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-heading)', color: '#2C2F24', textAlign: 'center', lineHeight: 1.25, marginBottom: '1.5rem' }}>
          {post.title}
        </h1>

        {/* Author & Meta Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2.5rem', color: '#737865', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop" alt="Chef" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontWeight: 600, color: '#2C2F24' }}>{isAr ? 'الشيف ماركو أوليفير' : 'Chef Marco Oliver'}</span>
          </div>
          <span>•</span>
          <span>{post.created_at ? new Date(post.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (post.date || (isAr ? 'يناير 2024' : 'January 2024'))}</span>
          <span>•</span>
          <span>{isAr ? '٥ دقائق قراءة' : '5 min read'}</span>
          <span>•</span>
          <span style={{ backgroundColor: '#EEF0E5', color: '#414536', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>{isAr ? 'دليل الطهي' : 'Culinary Guide'}</span>
        </div>

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



