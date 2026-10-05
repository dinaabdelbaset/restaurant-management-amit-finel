import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    menu: 'Menu',
    blog: 'Blog',
    contact: 'Contact',
    book_a_table: 'Book A Table',
    login: 'Login',
    register: 'Register',
    profile: 'Profile',
    admin: 'Admin',
    logout: 'Logout',
    cart: 'Cart',

    // Top Bar
    phone_label: '(414) 857 - 0107',
    email_label: 'yummy@bistrobliss.com',

    // Home - Hero
    hero_title: 'Best food for your taste',
    hero_subtitle: 'Discover delectable cuisine and unforgettable moments in our welcoming, culinary haven.',
    explore_menu: 'Explore Menu',

    // Home - Browse Menu
    browse_title: 'Browse Our Menu',
    cat_breakfast: 'Breakfast',
    cat_breakfast_desc: 'Start your morning with fresh organic ingredients and rich aroma.',
    cat_main: 'Main Dishes',
    cat_main_desc: 'Savor artisan crafted steaks, burgers, and Italian pasta specialties.',
    cat_drinks: 'Drinks',
    cat_drinks_desc: 'Refreshing cocktails, smoothies, and authentic barista coffee.',
    cat_desserts: 'Desserts',
    cat_desserts_desc: 'Decadent chocolate cakes, pastries, and house made ice creams.',

    // Home - Healthy Section
    healthy_title: 'We provide healthy food for your family.',
    healthy_desc1: 'Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance.',
    healthy_desc2: 'At our restaurant, we believe that dining is not just about food, but also about the overall experience and warm hospitality.',
    more_about_us: 'More About Us',
    visit_us: 'Come and visit us',
    address_val: '837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles',

    // Home - Services
    services_title: 'We also offer unique services for your events',
    srv_caterings: 'Caterings',
    srv_birthdays: 'Birthdays',
    srv_weddings: 'Weddings',
    srv_events: 'Events',
    srv_desc: 'Tailored culinary experiences designed to make your celebrations unforgettable.',

    // Home - Fast Delivery
    delivery_title: 'Fastest Food Delivery in City',
    delivery_subtitle: 'Order from the comfort of your home and enjoy fresh, hot food delivered directly to your doorstep.',
    del_feature_1: 'Delivery within 30 minutes',
    del_feature_2: 'Best Offer & Prices',
    del_feature_3: 'Online Services Available',

    // Home - Testimonials
    testimonials_title: 'What Our Customers Say',
    t1_title: 'The best restaurant',
    t1_text: 'Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.',
    t1_name: 'Sophire Robson',
    t1_loc: 'Los Angeles, CA',
    t2_title: 'Simply delicious',
    t2_text: 'Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and plated to perfection.',
    t2_name: 'Matt Cannon',
    t2_loc: 'San Diego, CA',
    t3_title: 'One of a kind restaurant',
    t3_text: 'The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.',
    t3_name: 'Andy Smith',
    t3_loc: 'San Francisco, CA',

    // Home & Blog - Blog section
    blog_heading: 'Our Blog & Articles',
    read_all: 'Read All Articles',
    blog_page_title: 'Our Blog & Articles',
    blog_page_subtitle: 'We consider all the drivers of change gives you the components you need to create a truly delightful dining experience.',
    blog_loading: 'Loading posts...',

    // About Page
    about_hero_title: 'We provide healthy food for your family.',
    about_hero_desc1: 'Our story began with a vision to create a unique dining experience that merges fine dining, exceptional service, and a vibrant ambiance. Rooted in city culinary culture, we aim to honor our local roots while infusing a global palate.',
    about_hero_desc2: 'At our restaurant, we believe that dining is not just about food, but also about the overall experience and warm hospitality. Our staff, renowned for their warmth and dedication, strives to make every visit an unforgettable event.',
    about_video_title: 'Feel the authentic & original taste from us',
    about_feat_cuisine: 'Multi Cuisine',
    about_feat_cuisine_desc: 'In the new era of gastronomy, we craft diverse worldly specialties with authentic flavor.',
    about_feat_order: 'Easy To Order',
    about_feat_order_desc: 'Order your favorite meal effortlessly online with just a few clicks.',
    about_feat_delivery: 'Fast Delivery',
    about_feat_delivery_desc: 'Express doorstep delivery ensuring your meal arrives hot, fresh, and delicious.',
    about_stats_title: 'A little information for our valuable guest',
    about_stats_desc: 'At our restaurant, we believe that dining is not just about food, but also about the overall experience. Our staff strives to make every visit unforgettable.',
    about_stat_loc: 'Locations',
    about_stat_founded: 'Founded',
    about_stat_staff: 'Staff Members',
    about_stat_customers: 'Satisfied Customers',

    // Menu Page
    menu_page_title: 'Our Menu',
    menu_page_subtitle: 'We consider all the drivers of change gives you the components you need to create a truly delicious meal.',
    cat_all: 'All',
    add_to_cart: 'Add to Cart',
    added_to_cart: 'Added to cart!',

    // Book Table Page
    book_heading: 'Book A Table',
    book_subheading: 'We consider all the drivers of change gives you the components you need to change to create a truly memorable event.',
    form_date: 'Date',
    form_time: 'Time',
    form_name: 'Name',
    form_phone: 'Phone',
    form_guests: 'Total Person',
    form_book_now: 'Book A Table',
    form_enter_name: 'Enter your name',
    form_enter_phone: 'x-xxx-xxx-xxxx',

    // Contact Page
    contact_heading: 'Contact Us',
    contact_subheading: 'We consider all the drivers of change gives you the components you need to get in touch with our team.',
    contact_email: 'Email',
    contact_subject: 'Subject',
    contact_message: 'Message',
    contact_send: 'Send Message',

    // Order Online / Checkout
    order_heading: 'Your Order & Cart',
    order_empty: 'Your cart is currently empty',
    order_checkout: 'Proceed to Checkout',
    order_total: 'Total Amount',
    order_clear: 'Clear Cart',
    order_qty: 'Qty',
    order_price: 'Price',
    order_complete_title: 'Complete Your Order',
    order_delivery_details: 'Delivery Details',
    order_delivery_address: 'Delivery Address',
    order_phone_number: 'Phone Number',
    order_notes: 'Special Notes / Instructions',
    order_payment_method: 'Payment Method',
    order_cash: 'Cash on Delivery',
    order_card: 'Credit / Debit Card (Simulated)',
    order_summary: 'Order Summary',
    order_subtotal: 'Subtotal',
    order_shipping: 'Delivery Fee',
    order_free: 'Free',
    order_place_order: 'Confirm & Place Order',
    order_processing: 'Processing Order...',
    order_back_to_menu: 'Back to Menu',

    // Auth (Login & Register)
    login_title: 'Welcome Back',
    login_email: 'Email Address',
    login_email_placeholder: 'Enter your email',
    login_password: 'Password',
    login_password_placeholder: 'Enter your password',
    login_button: 'Login',
    login_no_account: "Don't have an account?",
    login_register_now: 'Register here',
    admin_credentials_box: 'Demo Admin Credentials:',
    register_title: 'Create An Account',
    register_name: 'Full Name',
    register_name_placeholder: 'Enter your full name',
    register_phone: 'Phone Number',
    register_phone_placeholder: 'Enter your phone number',
    register_button: 'Sign Up',
    register_has_account: 'Already have an account?',
    register_login_now: 'Login here',

    // Profile Page
    profile_title: 'My Profile & Activity',
    profile_welcome: 'Welcome,',
    profile_bookings: 'My Bookings',
    profile_orders: 'My Orders',
    profile_no_bookings: 'No bookings found.',
    profile_no_orders: 'No orders found.',
    profile_book_now: 'Book a Table Now',
    profile_order_now: 'Order Food Now',
    profile_status: 'Status',
    profile_date: 'Date',
    profile_guests: 'Guests',
    profile_total: 'Total',

    // Footer
    footer_about: 'In the new era of technology we look in the future with certainty and pride for our company.',
    footer_pages: 'Pages',
    footer_utility: 'Utility Pages',
    footer_hours: 'Opening Hours',
    footer_mon_fri: 'Mon - Fri: 8.00am - 9.00pm',
    footer_sat_sun: 'Sat - Sun: 8.00am - 11.00pm',
    footer_rights: '© 2026 Bistro Bliss. All Rights Reserved.',

    // Admin
    admin_title: 'Admin Dashboard',
    admin_menu: 'Menu Items',
    admin_posts: 'Blog Posts',
    admin_bookings: 'Bookings',
    admin_orders: 'Orders',
    admin_messages: 'Messages',
    admin_users: 'Users',
    admin_edit: 'Edit',
    admin_delete: 'Delete',
    admin_save: 'Save Changes',
    admin_cancel: 'Cancel',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    about: 'من نحن',
    menu: 'قائمة الطعام',
    blog: 'المدونة',
    contact: 'تواصل معنا',
    book_a_table: 'احجز طاولة',
    login: 'تسجيل الدخول',
    register: 'حساب جديد',
    profile: 'الملف الشخصي',
    admin: 'لوحة الإدارة',
    logout: 'خروج',
    cart: 'السلة',

    // Top Bar
    phone_label: '(414) 857 - 0107',
    email_label: 'yummy@bistrobliss.com',

    // Home - Hero
    hero_title: 'أشهى المأكولات المختارة لذوقك الرفيع',
    hero_subtitle: 'اكتشف عالماً من النكهات الرائعة واللحظات التي لا تُنسى في وجهتك المفضلة لأطيب المأكولات.',
    explore_menu: 'استكشف المنيو',

    // Home - Browse Menu
    browse_title: 'تصفح قائمة الطعام',
    cat_breakfast: 'فطور صباحي',
    cat_breakfast_desc: 'ابدأ يومك بوجبات فطور طازجة ومكونات صحية غنية بالنكهة.',
    cat_main: 'أطباق رئيسية',
    cat_main_desc: 'استمتع بأشهى أطباق اللحوم المشوية، والبرجر، والباستا الإيطالية.',
    cat_drinks: 'مشروبات وعصائر',
    cat_drinks_desc: 'تشكيلة مميزة من العصائر المنعشة والقهوة المحضرة بعناية.',
    cat_desserts: 'حلويات شرقية وغربية',
    cat_desserts_desc: 'كعكات الشوكولاتة والحلويات الطازجة والآيس كريم اللذيذ.',

    // Home - Healthy Section
    healthy_title: 'نقدم طعاماً صحياً وفاخراً لك ولعائلتك.',
    healthy_desc1: 'بدأت قصتنا بشغف لتقديم تجربة طعام استثنائية تجمع بين فن الطهي الراقي، والخدمة الممتازة، والأجواء الدافئة.',
    healthy_desc2: 'في مطعمنا نؤمن بأن تناول الطعام ليس مجرد وجبة، بل هو تجربة كرم ضيافة مميزة تبقى في الذاكرة دائماً.',
    more_about_us: 'المزيد عنا',
    visit_us: 'تفضل بزيارتنا',
    address_val: 'شارع 837 مارشال لين، لوس أنجلوس، الولايات المتحدة',

    // Home - Services
    services_title: 'نقدم خدمات مخصصة لجميع حفلاتكم ومناسباتكم',
    srv_caterings: 'بوفيهات وحفلات',
    srv_birthdays: 'أعياد ميلاد',
    srv_weddings: 'أفراح ومناسبات',
    srv_events: 'فعاليات واجتماعات',
    srv_desc: 'نبتكر أشهى قوائم الطعام لتناسب ضيوفكم وتجعل مناسباتكم مناسبة سعيدة وتاريخية.',

    // Home - Fast Delivery
    delivery_title: 'أسرع خدمة توصيل طعام في المدينة',
    delivery_subtitle: 'اطلب وأنت في بيتك بكل راحة، وسنصلك بوجبتك ساخنة وطازجة وفي أسرع وقت ممكن.',
    del_feature_1: 'التوصيل خلال 30 دقيقة فقط',
    del_feature_2: 'أفضل الأسعار والعروض التوفيرية',
    del_feature_3: 'خدمة الطلب والمتابعة أونلاين 24/7',

    // Home - Testimonials
    testimonials_title: 'آراء وتقييمات زبائننا الكرام',
    t1_title: 'أفضل مطعم على الإطلاق',
    t1_text: 'تناولنا العشاء الليلة الماضية وانبهرنا حقاً بالتجربة! منذ لحظة دخولنا، استقبلتنا أجواء دافئة وضيافة راقية لا تُنسى.',
    t1_name: 'صوفي روبسون',
    t1_loc: 'لوس أنجلوس، كاليفورنيا',
    t2_title: 'طعام لذيذ وتجربة فريدة',
    t2_text: 'المطعم فاق كل توقعاتي من جميع النواحي. الأجواء هادئة ومميزة، وكل طبق تم إعداده وتقديمه بمنتهى الإتقان.',
    t2_name: 'مات كانون',
    t2_loc: 'سان دييغو، كاليفورنيا',
    t3_title: 'مطعم فريد من نوعه',
    t3_text: 'التجربة هنا لا مثيل لها. الأطباق استثنائية والنكهات غنية جداً، كانت الوجبة هي الأفضل بلا منازع. نوصي به بشدة.',
    t3_name: 'آندي سميث',
    t3_loc: 'سان فرانسيسكو، كاليفورنيا',

    // Home & Blog - Blog section
    blog_heading: 'أحدث مقالاتنا وأخبار الطهي',
    read_all: 'عرض كافة المقالات',
    blog_page_title: 'مقالاتنا وأخبار الطهي',
    blog_page_subtitle: 'نشارككم أسرار وفنون الطهي وأحدث النصائح والوصفات الشهية من طهاتنا المحترفين.',
    blog_loading: 'جاري تحميل المقالات...',

    // About Page
    about_hero_title: 'نقدم طعاماً صحياً وفاخراً لك ولعائلتك.',
    about_hero_desc1: 'بدأت قصتنا برؤية تهدف لتقديم تجربة طعام فريدة تجمع بين المذاق الراقي والخدمة الاستثنائية والأجواء المبهجة المستوحاة من تقاليد الطهي العريقة.',
    about_hero_desc2: 'نؤمن في مطعمنا بأن تناول الطعام ليس مجرد وجبة، بل هو تجربة متكاملة تصنع ذكريات سعيدة مع الأحباء بكرم الضيافة والاهتمام بأدق التفاصيل.',
    about_video_title: 'عِش المذاق الأصيل والنكهات الحقيقية معنا',
    about_feat_cuisine: 'مأكولات متنوعة عالمية',
    about_feat_cuisine_desc: 'نقدم تشكيلة متنوعة من أفضل الأطباق الشرقية والغربية بأعلى معايير الجودة العالمية.',
    about_feat_order: 'سهولة الطلب أونلاين',
    about_feat_order_desc: 'طلب طعامك المفضل أصبح أسرع وأسهل بخطوات بسيطة ومباشرة عبر موقعنا.',
    about_feat_delivery: 'توصيل فوري وسريع',
    about_feat_delivery_desc: 'خدمة توصيل فورية تضمن وصول طعامك ساخناً وطازجاً لباب منزلك في أسرع وقت.',
    about_stats_title: 'معلومات وإحصائيات لضيوفنا الكرام',
    about_stats_desc: 'نحرص دائماً على تقديم أرقى مستويات الخدمة لضيوفنا، مع فريق عمل متفانٍ يسعى لجعل كل زيارة تجربة استثنائية لا تُنسى.',
    about_stat_loc: 'فروعنا',
    about_stat_founded: 'سنة التأسيس',
    about_stat_staff: 'أفراد الفريق',
    about_stat_customers: 'عملاء راضون',

    // Menu Page
    menu_page_title: 'قائمة طعام بيسترو بليس',
    menu_page_subtitle: 'اختر من بين تشكيلتنا المتنوعة من الوجبات والمشروبات المحضرة بأعلى معايير الجودة والنظافة.',
    cat_all: 'الكل',
    add_to_cart: 'أضف إلى السلة',
    added_to_cart: 'تمت الإضافة إلى السلة!',

    // Book Table Page
    book_heading: 'حجز طاولة في المطعم',
    book_subheading: 'احجز طاولتك مسبقاً لقضاء أجمل الأوقات مع عائلتك وأصدقائك بدون أي انتظار.',
    form_date: 'التاريخ',
    form_time: 'الوقت',
    form_name: 'الاسم الكريم',
    form_phone: 'رقم الهاتف',
    form_guests: 'عدد الأشخاص',
    form_book_now: 'تأكيد حجز الطاولة',
    form_enter_name: 'اكتب اسمك هنا',
    form_enter_phone: '05xxxxxxxx',

    // Contact Page
    contact_heading: 'تواصل معنا',
    contact_subheading: 'نسعد دائماً باستقبال استفساراتكم واقتراحاتكم وسنقوم بالرد عليكم بأسرع وقت.',
    contact_email: 'البريد الإلكتروني',
    contact_subject: 'الموضوع',
    contact_message: 'نص الرسالة',
    contact_send: 'إرسال الرسالة',

    // Order Online / Checkout
    order_heading: 'سلة الطلبات والمشتريات',
    order_empty: 'سلتك فارغة حالياً، تصفح المنيو وأضف وجباتك المفضلة',
    order_checkout: 'إتمام الطلب وتأكيد الشراء',
    order_total: 'المبلغ الإجمالي',
    order_clear: 'تفريغ السلة',
    order_qty: 'الكمية',
    order_price: 'السعر',
    order_complete_title: 'إتمام طلبك وتأكيد العنوان',
    order_delivery_details: 'بيانات التوصيل',
    order_delivery_address: 'عنوان التوصيل بالكامل',
    order_phone_number: 'رقم الهاتف للتواصل',
    order_notes: 'ملاحظات خاصة للطلب (اختياري)',
    order_payment_method: 'طريقة الدفع المفضلة',
    order_cash: 'الدفع نقداً عند الاستلام (كاش)',
    order_card: 'الدفع ببطاقة بنكية / فيزا (تجريبي)',
    order_summary: 'ملخص الطلب',
    order_subtotal: 'المجموع الفرعي',
    order_shipping: 'رسوم التوصيل',
    order_free: 'مجاني',
    order_place_order: 'تأكيد وإرسال الطلب الآن',
    order_processing: 'جاري تأكيد ومعالجة الطلب...',
    order_back_to_menu: 'العودة لقائمة الطعام',

    // Auth (Login & Register)
    login_title: 'تسجيل الدخول إلى حسابك',
    login_email: 'البريد الإلكتروني',
    login_email_placeholder: 'أدخل بريدك الإلكتروني',
    login_password: 'كلمة المرور',
    login_password_placeholder: 'أدخل كلمة المرور',
    login_button: 'تسجيل الدخول',
    login_no_account: 'ليس لديك حساب حتى الآن؟',
    login_register_now: 'أنشئ حساباً جديداً هنا',
    admin_credentials_box: 'بيانات حساب الآدمن للتجربة:',
    register_title: 'إنشاء حساب جديد',
    register_name: 'الاسم الكامل',
    register_name_placeholder: 'اكتب اسمك كاملاً',
    register_phone: 'رقم الهاتف',
    register_phone_placeholder: 'اكتب رقم هاتفك',
    register_button: 'إنشاء الحساب الآن',
    register_has_account: 'لديك حساب بالفعل؟',
    register_login_now: 'سجل دخولك من هنا',

    // Profile Page
    profile_title: 'الملف الشخصي والنشاطات',
    profile_welcome: 'أهلاً بك،',
    profile_bookings: 'حجوزاتي السابقة والحالية',
    profile_orders: 'طلباتي السابقة',
    profile_no_bookings: 'لا توجد أي حجوزات طاولات مسجلة باسمك بعد.',
    profile_no_orders: 'لا توجد أي طلبات طعام سابقة حتى الآن.',
    profile_book_now: 'احجز طاولة في المطعم الآن',
    profile_order_now: 'اطلب وجباتك المفضلة أونلاين',
    profile_status: 'الحالة',
    profile_date: 'التاريخ',
    profile_guests: 'الأفراد',
    profile_total: 'الإجمالي',

    // Footer
    footer_about: 'نلتزم بتقديم تجربة طعام فريدة ومميزة مع أجود المكونات وأفضل خدمة لجميع روادنا.',
    footer_pages: 'روابط سريعة',
    footer_utility: 'خدمات إضافية',
    footer_hours: 'أوقات العمل',
    footer_mon_fri: 'من الإثنين إلى الجمعة: 8:00 ص - 9:00 م',
    footer_sat_sun: 'السبت والأحد: 8:00 ص - 11:00 م',
    footer_rights: '© 2026 مطعم بيسترو بليس. جميع الحقوق محفوظة.',

    // Admin
    admin_title: 'لوحة التحكم والإدارة',
    admin_menu: 'أكلات المنيو',
    admin_posts: 'مقالات المدونة',
    admin_bookings: 'الحجوزات',
    admin_orders: 'الطلبات',
    admin_messages: 'الرسائل',
    admin_users: 'المستخدمين',
    admin_edit: 'تعديل',
    admin_delete: 'حذف',
    admin_save: 'حفظ التعديل',
    admin_cancel: 'إلغاء',
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('bistro_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('bistro_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (language === 'ar') {
      document.body.classList.add('arabic-font');
    } else {
      document.body.classList.remove('arabic-font');
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
