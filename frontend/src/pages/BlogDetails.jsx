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
];

const BlogDetails = () => {
  const { id } = useParams();
  const { language, tTitle, t } = useLanguage();
  const isAr = language === 'ar';
  const [post, setPost] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const enrichContent = (data) => {
      const pId = parseInt(data.id);
      const title = (data.title || '').toLowerCase();

      // Article 3: Air Fryer Fries
      if (pId === 3 || title.includes('fries') || title.includes('air fryer')) {
        return isAr ? `
          <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
            مقرمشة من الخارج، وطرية ولذيذة من الداخل: إليكم خطوات تتبيل وطهي البطاطس المقلية الذهبية الشهية باستخدام المقلاة الهوائية بأقل كمية زيت ممكنة لتجربة صحية ومثالية.
          </p>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">ما الذي تحتاجه لتحضير بطاطس مقلية مثالية في المقلاة الهوائية؟</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">سر البطاطس المقرمشة في القلاية الهوائية يكمن في خطوات بسيطة تصنع فرقاً مذهلاً في القوام والطعم:</p>
          <ol style="margin-bottom: 2rem; padding-right: 1.5rem; line-height: 1.9;">
            <li style="margin-bottom: 0.75rem"><strong>اختيار البطاطس المناسبة:</strong> استخدم حبات بطاطس غنية بالنشا (مثل صنف الروسيت) للحصول على قشرة خارجية مقرمشة وقوام داخلي هش كالغيمة.</li>
            <li style="margin-bottom: 0.75rem"><strong>النقع في الماء البارد:</strong> بعد تقطيع البطاطس لأصابع متساوية، انقعها في ماء مثلج لمدة ٢٠ إلى ٣٠ دقيقة لإزالة النشا السطحي الزائد.</li>
            <li style="margin-bottom: 0.75rem"><strong>التجفيف التام:</strong> هذه أهم خطوة؛ جفف أصابع البطاطس جيداً بمناشف ورقية نظيفة لأن الرطوبة تمنع القرمشة الذهبية.</li>
            <li style="margin-bottom: 0.75rem"><strong>مسحة زيت خفيفة وتتبيل:</strong> ملعقة طعام واحدة فقط من زيت الزيتون أو زيت الأفوكادو تكفي لتغليف البطاطس بالتساوي مع الملح والبابريكا وبودرة الثوم.</li>
            <li style="margin-bottom: 0.75rem"><strong>الطهي على دفعتين وهز السلة:</strong> لا تملأ سلة المقلاة حتى تتنفس، واضبط الحرارة على ٢٠٠ درجة مئوية مع هز السلة كل ٥ دقائق حتى يصبح لونها ذهبياً متساوياً.</li>
          </ol>

          <div style="background-color: #F4F5F0; border-right: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
            <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
              "السر الحقيقي للبطاطس الهوائية المقرمشة ليس كثرة الزيت، بل التجفيف الجيد بعد النقع والطهي على حرارة ٢٠٠ درجة مئوية مع التقليب المستمر."
            </p>
            <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— الشيف ماركو أوليفير، بيسترو بليس</span>
          </div>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">أفكار لتغميسات وصوصات لا تُقاوم</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">قدم البطاطس الساخنة مباشرة فور خروجها مع صوص الثومية الكريمية، صوص الباربيكيو المدخن، أو مايونيز السيراتشا الحار لتكتمل متعة التذوق.</p>
        ` : `
          <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
            Crispy on the outside, tender on the inside: here is how to season and cook golden french fries using an air fryer with minimal oil for a healthier gourmet treat.
          </p>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">What do you need for the ultimate air fryer fries?</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">Getting restaurant-grade fries at home is surprisingly straightforward with these key techniques:</p>
          <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.9;">
            <li style="margin-bottom: 0.75rem"><strong>Choose High-Starch Potatoes:</strong> Russet potatoes yield the crunchiest exterior and fluffiest interior.</li>
            <li style="margin-bottom: 0.75rem"><strong>Soak in Cold Water:</strong> Cut into even batons and soak in ice-cold water for 30 minutes to wash off excess surface starch.</li>
            <li style="margin-bottom: 0.75rem"><strong>Dry Completely:</strong> Moisture is the enemy of crispiness. Dry thoroughly with kitchen towels.</li>
            <li style="margin-bottom: 0.75rem"><strong>Light Oil Toss:</strong> Just one tablespoon of avocado or olive oil is all you need along with fine sea salt, smoked paprika, and garlic powder.</li>
            <li style="margin-bottom: 0.75rem"><strong>Cook at 400°F (200°C):</strong> Avoid overcrowding the basket, and shake every 5 minutes for uniform browning.</li>
          </ol>

          <div style="background-color: #F4F5F0; border-left: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
            <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
              "The real secret to crispy air fryer fries is thorough drying after cold water soaking, followed by high heat and regular basket tossing."
            </p>
            <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— Chef Marco Oliver, Bistro Bliss</span>
          </div>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">Sauce pairings that elevate the flavor</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">Serve immediately with homemade garlic truffle aioli, spicy sriracha mayo, or tangy smoked barbecue sauce for a complete bistro experience.</p>
        `;
      }

      // Article 1: Burger & Pizza
      if (pId === 1 || title.includes('burger') || title.includes('pizza')) {
        return isAr ? `
          <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
            إعداد البرجر والبيتزا المثالية في المنزل فن يجمع بين المكونات الممتازة والتقنيات الاحترافية والشغف بابتكار تجربة تذوق لا تُنسى.
          </p>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">ماذا تحتاج لتحضير البرجر المنزلي الفاخر؟</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">سر البرجر اللذيذ يبدأ من قطعة اللحم ذات الجودة العالية مع نسبة دهون متوازنة تمنحها الطراوة والنكهة الغنية.</p>
          <ol style="margin-bottom: 2rem; padding-right: 1.5rem; line-height: 1.9;">
            <li style="margin-bottom: 0.75rem"><strong>لحم عالي الجودة:</strong> اختر لحماً طازجاً بنسبة دهن تبلغ حوالي ٢٠٪ للحصول على برجر طري ومليء بالعصارة.</li>
            <li style="margin-bottom: 0.75rem"><strong>التتبيل البسيط:</strong> رشة كريمة من الملح الخشن والفلفل الأسود المطحون طازجاً قبل الشواء مباشرة كفيلة بإبراز النكهة الطبيعية.</li>
            <li style="margin-bottom: 0.75rem"><strong>تجنب الضغط الزائد:</strong> عند تشكيل القرص، تعامل معه بلطف لتجنب جعله مضغوطاً وقاسياً بعد النضج.</li>
            <li style="margin-bottom: 0.75rem"><strong>حرارة طهي مرتفعة:</strong> الحرارة العالية ضرورية لتكوين طبقة خارجية مقرمشة تحبس العصارات بالداخل.</li>
            <li style="margin-bottom: 0.75rem"><strong>إراحة اللحم:</strong> اترك البرجر يرتاح لمدة ٣ دقائق قبل تقديمه ليتوزع السائل الداخلي بالتساوي.</li>
          </ol>

          <div style="background-color: #F4F5F0; border-right: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
            <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
              "سر البيتزا والبرجر الناجح لا يكمن في كثرة الإضافات، بل في احترام المكونات الأساسية وتناغم الطعم بين الخبز واللحم والصلصة الخاصة."
            </p>
            <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— الشيف ماركو، كبير طهاة بيسترو بليس</span>
          </div>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">ما هي المكونات التي تمنحه الطعم الفاخر؟</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">الخبز الطازج (البريوش المدهون بالزبدة والمحمص خفيفاً)، والجبن الذائب بجودة عالية مثل الشيدر المعتق، مع المخلل المقرمش وشرائح البصل المكرمل، هذه التفاصيل تصنع الفرق الكبير.</p>
        ` : `
          <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
            Creating the perfect burger and pizza is an art, combining premium ingredients, meticulous techniques, and culinary passion.
          </p>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">What do you need to prepare a gourmet burger?</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">The heart of a memorable burger begins with superior beef quality and temperature management.</p>
          <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.9;">
            <li style="margin-bottom: 0.75rem"><strong>Quality Beef:</strong> Opt for fresh ground chuck with an 80/20 lean-to-fat ratio for the juiciest results.</li>
            <li style="margin-bottom: 0.75rem"><strong>Simple Seasoning:</strong> Salt and freshly cracked black pepper right before hitting the grill ensure deep caramelization.</li>
            <li style="margin-bottom: 0.75rem"><strong>Gentle Handling:</strong> Shape patties loosely without packing tight to keep the texture soft and airy.</li>
            <li style="margin-bottom: 0.75rem"><strong>Searing Heat:</strong> High heat locks in rich juices and builds that signature golden crust.</li>
            <li style="margin-bottom: 0.75rem"><strong>Resting Phase:</strong> Let burgers rest for 3 minutes before assembling.</li>
          </ol>

          <div style="background-color: #F4F5F0; border-left: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
            <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
              "The secret to a memorable burger lies in respecting the pure craft: high-grade beef, buttery brioche, and harmonized seasoning."
            </p>
            <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— Chef Marco Oliver, Executive Chef</span>
          </div>

          <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">Ingredients that make all the difference</h2>
          <p style="margin-bottom: 1.5rem; line-height: 1.8;">Lightly toasted brioche, aged sharp cheddar, crisp butter lettuce, and house-made bistro remoulade sauce.</p>
        `;
      }

      // Default rich article generator for other articles
      return isAr ? `
        <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
          فن الطهي يجمع بين الشغف واختيار أفضل المكونات والتقنيات المدروسة لابتكار أطباق استثنائية تأسر الحواس وتمنحك تجربة ممتعة في كل وجبة.
        </p>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">أسرار النكهة واختيار المكونات الطازجة</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          يكمن سر نجاح أي وصفة متقنة في انتقاء المكونات بعناية فائقة. النكهات الأصلية تبدأ من المزرعة إلى المطبخ مباشرة، حيث تلعب جودة الخضروات واللحوم والتوابل الدور المحوري في رفع مستوى الطبق إلى تجربة استثنائية.
        </p>

        <ol style="margin-bottom: 2rem; padding-right: 1.5rem; line-height: 1.9;">
          <li style="margin-bottom: 0.75rem"><strong>الانتقاء الموسمي:</strong> احرص دائماً على اختيار المكونات الطازجة في موسمها الطبيعي للحصول على أفضل مذاق وقيمة غذائية.</li>
          <li style="margin-bottom: 0.75rem"><strong>توازن التوابل:</strong> التتبيل الجيد يبرز طعم المكون الأصلي ولا يطغى عليه؛ استخدام الملح البحري والفلفل الطازج هو الأساس.</li>
          <li style="margin-bottom: 0.75rem"><strong>التحكم بالحرارة:</strong> ضبط درجة حرارة الفرن أو المقلاة يضمن نضج المكونات من الداخل مع الاحتفاظ برطوبتها وقوامها الهش.</li>
          <li style="margin-bottom: 0.75rem"><strong>فن التقديم:</strong> العين تأكل قبل الفم؛ تناسق الألوان وطريقة سكب الطعام يضيفان لمسة مطاعم فاخرة على مائدتك.</li>
        </ol>

        <div style="background-color: #F4F5F0; border-right: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
          <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
            "الطهي الحقيقي هو لغة حب وتناغم بين الحواس؛ صوت التحمير، ورائحة التوابل الزكية، ولمسة المكونات الطازجة تصنع ذكريات لا تُنسى."
          </p>
          <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— كبير طهاة بيسترو بليس</span>
        </div>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">خطوات التنفيذ الاحترافية</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          ابدأ دائماً بتحضير وتقطيع كافة المكونات مسبقاً قبل إشعال الموقد؛ فهذا التنظيم يمنحك تركيزاً كاملاً ويمنع احتراق الأطعمة ويضمن نتائج مبهرة تفوق التوقعات.
        </p>
      ` : `
        <p style="font-size: 1.15rem; line-height: 1.8; color: #333; margin-bottom: 2rem; font-weight: 500;">
          Creating the perfect culinary experience is an art, combining premium ingredients, passion, and meticulous techniques.
        </p>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">The Core Secrets & Choosing Fresh Ingredients</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          The difference between an ordinary dish and an unforgettable culinary masterpiece lies in the attention to foundational ingredients.
        </p>

        <ol style="margin-bottom: 2rem; padding-left: 1.5rem; line-height: 1.9;">
          <li style="margin-bottom: 0.75rem"><strong>Premium Sourcing:</strong> Always seek farm-fresh, seasonal ingredients for peak natural sweetness and texture.</li>
          <li style="margin-bottom: 0.75rem"><strong>Balanced Seasoning:</strong> Salt and spices should enhance rather than mask. Season in thoughtful layers.</li>
          <li style="margin-bottom: 0.75rem"><strong>Heat Precision:</strong> Mastering cooking temperatures ensures an appetizing sear while locking in moisture.</li>
          <li style="margin-bottom: 0.75rem"><strong>The Resting Phase:</strong> Allowing your creation to rest before plating lets juices settle for optimal tenderness.</li>
        </ol>

        <div style="background-color: #F4F5F0; border-left: 4px solid var(--primary-color, #AD343E); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-style: italic;">
          <p style="margin: 0; font-size: 1.1rem; color: #2C2F24; line-height: 1.7;">
            "Cooking is an observation of senses; the sound of sizzling, the aroma of spices, and fresh ingredients coming together in harmony."
          </p>
          <span style="display: block; margin-top: 0.5rem; font-weight: 600; color: #AD343E; font-size: 0.95rem;">— Executive Chef, Bistro Bliss</span>
        </div>

        <h2 style="font-family: var(--font-heading); color: #2C2F24; font-size: 1.8rem; margin-top: 2rem; margin-bottom: 1rem;">Professional Techniques & Step-by-Step Execution</h2>
        <p style="margin-bottom: 1.5rem; line-height: 1.8;">
          Always implement a proper "mise en place" before turning on the stove. Having all components chopped and ready eliminates rush and allows confident cooking.
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

  if (loading) return <div style={{ padding: '6rem', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>{isAr ? 'جاري تحميل المقال...' : 'Loading post...'}</div>;
  if (!post) return <div style={{ padding: '6rem', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>{isAr ? 'المقال غير موجود' : 'Post not found'}</div>;

  return (
    <div style={{ backgroundColor: '#F9F9F7', paddingBottom: '0' }}>
      
      <div className="container" style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: '3rem', maxWidth: '850px' }}>
        {/* Title */}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-heading)', color: '#2C2F24', textAlign: 'center', lineHeight: 1.25, marginBottom: '1.5rem' }}>
          {tTitle(post.title)}
        </h1>

        {/* Author & Meta Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2.5rem', color: '#737865', fontSize: '0.95rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop" alt="Chef" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontWeight: 600, color: '#2C2F24' }}>{t('blog_author')}</span>
          </div>
          <span>•</span>
          <span>{post.created_at ? new Date(post.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (post.date || (isAr ? 'يناير 2024' : 'January 2024'))}</span>
          <span>•</span>
          <span>{t('blog_min_read')}</span>
          <span>•</span>
          <span style={{ backgroundColor: '#EEF0E5', color: '#414536', padding: '0.2rem 0.65rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>{t('blog_guide_tag')}</span>
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
              {t('blog_read_more')}
            </h2>
            <p style={{ color: 'var(--text-gray)', maxWidth: '550px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('blog_read_more_sub')}
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
                  <span style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block' }}>{article.created_at ? new Date(article.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : (article.date || 'Recent')}</span>
                  <h3 style={{ fontSize: '1.1rem', color: '#2C2F24', fontWeight: 600, lineHeight: 1.4 }}>{tTitle(article.title)}</h3>
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
