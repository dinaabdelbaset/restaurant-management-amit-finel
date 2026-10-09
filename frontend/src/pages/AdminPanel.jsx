import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [tab, setTab] = useState('menu');
  
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [posts, setPosts] = useState([]);

  // new states
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', image: null });
  const [editingItemId, setEditingItemId] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null });
  const [editingPostId, setEditingPostId] = useState(null);

  const formatDateDisplay = (dateVal) => {
    if (!dateVal) return '-';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return dateVal;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = async () => {
    try {
      const [bRes, oRes, mRes, uRes, cRes, pRes] = await Promise.all([
        axios.get('/bookings'),
        axios.get('/orders'),
        axios.get('/menu'),
        axios.get('/admin/users'),
        axios.get('/contact'),
        axios.get('/posts')
      ]);
      setBookings(bRes.data);
      setOrders(oRes.data);
      setMenuItems(mRes.data);
      setUsers(uRes.data);
      setContacts(cRes.data);
      setPosts(pRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
    
    // Polling for real-time updates (every 30 seconds)
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`/bookings/${id}/status`, { status });
      toast.success(isAr ? 'تم تحديث حالة الحجز' : 'Booking status updated');
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'فشل تحديث حالة الحجز' : 'Failed to update booking status');
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`/orders/${id}/status`, { status });
      toast.success(isAr ? 'تم تحديث حالة الطلب' : 'Order status updated');
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'فشل تحديث حالة الطلب' : 'Failed to update order status');
    }
  };

  const addMenuItem = async (e) => {
    e.preventDefault();
    try {
      // For update, Laravel often expects POST with _method=PUT when sending FormData
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('price', newItem.price);
      formData.append('category', newItem.category);
      formData.append('description', newItem.description);
      if (newItem.image && typeof newItem.image !== 'string') formData.append('image', newItem.image);

      if (editingItemId) {
        formData.append('_method', 'PUT');
        await axios.post(`/menu/${editingItemId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success(isAr ? 'تم تعديل الصنف بنجاح' : 'Menu item updated successfully');
        setEditingItemId(null);
      } else {
        await axios.post('/menu', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success(isAr ? 'تمت إضافة الصنف بنجاح' : 'Menu item added successfully');
      }

      setNewItem({ name: '', description: '', price: '', category: '', image: null });
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'حدث خطأ أثناء حفظ الصنف' : 'Error saving menu item');
    }
  };
  
  const editMenuItem = (m) => {
    setEditingItemId(m.id);
    setNewItem({ name: m.name, description: m.description, price: m.price, category: m.category, image: m.image });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const deleteMenuItem = async (id) => {
    try {
      await axios.delete(`/menu/${id}`);
      toast.success(isAr ? 'تم حذف الصنف' : 'Menu item deleted');
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'فشل حذف الصنف' : 'Failed to delete menu item');
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      if (newPost.image && typeof newPost.image !== 'string') {
        formData.append('image', newPost.image);
      }

      if (editingPostId) {
        formData.append('_method', 'PUT');
        await axios.post(`/posts/${editingPostId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success(isAr ? 'تم تعديل المقال بنجاح' : 'Blog post updated successfully');
        setEditingPostId(null);
      } else {
        await axios.post('/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
        toast.success(isAr ? 'تمت إضافة المقال بنجاح' : 'Blog post added successfully');
      }

      setNewPost({ title: '', content: '', image: null });
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'حدث خطأ أثناء حفظ المقال' : 'Error saving blog post');
    }
  };

  const editPost = (p) => {
    setEditingPostId(p.id);
    setNewPost({ title: p.title, content: p.content, image: p.image });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const deletePost = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      toast.success(isAr ? 'تم حذف المقال' : 'Blog post deleted');
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'فشل حذف المقال' : 'Failed to delete blog post');
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/contact/${id}`);
      toast.success(isAr ? 'تم حذف الرسالة' : 'Message deleted');
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error(isAr ? 'فشل حذف الرسالة' : 'Failed to delete message');
    }
  };

  const tabs = [
    { id: 'menu', label: isAr ? '🍔 أكلات المنيو' : '🍔 Menu Items', count: menuItems.length },
    { id: 'posts', label: isAr ? '📰 مقالات المدونة' : '📰 Blog Posts', count: posts.length },
    { id: 'bookings', label: isAr ? '📅 الحجوزات' : '📅 Bookings', count: bookings.length },
    { id: 'orders', label: isAr ? '🛍️ الطلبات' : '🛍️ Orders', count: orders.length },
    { id: 'contacts', label: isAr ? '✉️ الرسائل' : '✉️ Messages', count: contacts.length },
    { id: 'users', label: isAr ? '👥 المستخدمين' : '👥 Users', count: users.length },
  ];

  if (!user || user.role !== 'admin') return null;

  return (
    <div className={`container ${styles.container}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className={styles.title} style={{ margin: 0 }}>{isAr ? 'لوحة تحكم المشرف' : 'Admin Dashboard'}</h1>
        <span style={{ backgroundColor: '#2C2F24', color: 'white', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem' }}>
          {isAr ? `مسجل باسم: ${user.name} (${user.role})` : `Logged in as: ${user.name} (${user.role})`}
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className={styles.navContainer} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button 
            key={t.id} 
            onClick={() => setTab(t.id)} 
            className={`${styles.navBtn} ${tab === t.id ? styles.navBtnActive : styles.navBtnInactive}`}
            style={{ 
              borderRadius: '8px', 
              padding: '0.6rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: tab === t.id ? '#2C2F24' : '#F0F0EE',
              color: tab === t.id ? 'white' : '#555',
              border: 'none',
              fontWeight: tab === t.id ? 'bold' : 'normal'
            }}
          >
            <span>{t.label}</span>
            <span style={{ 
              backgroundColor: tab === t.id ? 'var(--primary)' : '#ddd', 
              color: tab === t.id ? 'white' : '#333', 
              fontSize: '0.75rem', 
              padding: '0.1rem 0.45rem', 
              borderRadius: '10px' 
            }}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      <div>
        {tab === 'menu' && (
          <div>
            <div className={`card ${styles.cardSection}`} style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ margin: 0 }}>
                  {editingItemId 
                    ? (isAr ? '✏️ تعديل بيانات الوجبة' : '✏️ Edit Menu Item') 
                    : (isAr ? '➕ إضافة وجبة طعام جديدة للمنيو' : '➕ Add New Menu Item')}
                </h2>
                {editingItemId && (
                  <button type="button" onClick={() => { setEditingItemId(null); setNewItem({ name: '', description: '', price: '', category: '', image: null }); }} className="btn btn-outline" style={{ borderColor: '#D32F2F', color: '#D32F2F', padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>
                    {isAr ? 'إلغاء التعديل ✕' : 'Cancel ✕'}
                  </button>
                )}
              </div>

              {editingItemId && (
                <div style={{ backgroundColor: '#FFF4E5', border: '1px solid #FFE2B8', color: '#B76E00', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  {isAr 
                    ? '💡 أنتِ الآن في وضع التعديل: عدّلي البيانات المطلوبة بالأسفل ثم اضغطي "حفظ التعديل".' 
                    : '💡 You are now editing this item: modify the details below and click "Save Changes".'}
                </div>
              )}

              <form onSubmit={addMenuItem} className={styles.formContainer}>
                <div style={{ flex: '1 1 200px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'اسم الأكلة / الوجبة' : 'Item Name'}</label>
                  <input type="text" placeholder={isAr ? 'مثال: Cheese Burger' : 'e.g. Cheese Burger'} className="form-input" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required style={{ width: '100%' }} />
                </div>

                <div style={{ flex: '1 1 120px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'السعر ($)' : 'Price ($)'}</label>
                  <input type="number" step="0.01" placeholder={isAr ? 'مثال: 12.99' : 'e.g. 12.99'} className="form-input" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} required style={{ width: '100%' }} />
                </div>

                <div style={{ flex: '1 1 180px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'التصنيف' : 'Category'}</label>
                  <select className="form-input" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} required style={{ width: '100%' }}>
                    <option value="">{isAr ? 'اختر التصنيف...' : 'Select Category...'}</option>
                    <option value="Breakfast">{isAr ? 'Breakfast (فطور)' : 'Breakfast'}</option>
                    <option value="Main Dishes">{isAr ? 'Main Dishes (أطباق رئيسية)' : 'Main Dishes'}</option>
                    <option value="Drinks">{isAr ? 'Drinks (مشروبات)' : 'Drinks'}</option>
                    <option value="Desserts">{isAr ? 'Desserts (حلويات)' : 'Desserts'}</option>
                  </select>
                </div>

                <div style={{ flex: '1 1 220px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'تغيير / رفع صورة الوجبة' : 'Upload / Change Image'}</label>
                  <input type="file" accept="image/*" className="form-input" onChange={e => setNewItem({...newItem, image: e.target.files[0]})} style={{ width: '100%' }} />
                </div>

                {newItem.image && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.5rem 0' }}>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{isAr ? 'معاينة الصورة الحالية:' : 'Current Image Preview:'}</span>
                    <img 
                      src={newItem.image instanceof File ? URL.createObjectURL(newItem.image) : (newItem.image?.startsWith('http') ? newItem.image : `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${newItem.image}`)} 
                      alt="Preview" 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} 
                    />
                  </div>
                )}

                <div style={{ flex: '1 1 100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'وصف الوجبة والمكونات' : 'Description & Ingredients'}</label>
                  <textarea placeholder={isAr ? 'اكتبي وصفاً للوجبة والمكونات...' : 'Write description and ingredients...'} className="form-input" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} required style={{ width: '100%', minHeight: '80px' }}></textarea>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: '1 1 100%', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary">{editingItemId ? (isAr ? '💾 حفظ التعديل' : '💾 Save Changes') : (isAr ? '➕ إضافة الوجبة للمنيو' : '➕ Add Item to Menu')}</button>
                  {editingItemId && (
                    <button type="button" onClick={() => { setEditingItemId(null); setNewItem({ name: '', description: '', price: '', category: '', image: null }); }} className="btn btn-outline" style={{ borderColor: '#2C2F24', color: '#2C2F24' }}>
                      {isAr ? 'إلغاء التعديل' : 'Cancel'}
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            <div className={`card ${styles.cardSection}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ margin: 0 }}>{isAr ? `أكلات المنيو الحالية المعروضة بالموقع (${menuItems.length})` : `Current Menu Items (${menuItems.length})`}</h2>
                <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{isAr ? 'اضغطي على "تعديل" لتغيير أي أكلة أو صورتها أو سعرها' : 'Click "Edit" to modify any item, image, or price'}</span>
              </div>
              <ul className={styles.list}>
                {menuItems.map(m => (
                  <li key={m.id} className={styles.listItem} style={{ alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
                    <div className={styles.itemContent} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                      <img 
                        src={m.image ? (m.image.startsWith("http") ? m.image : `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${m.image}`) : 'https://placehold.co/100?text=Food'} 
                        alt={m.name} 
                        style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eee' }} 
                      />
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2C2F24' }}>{m.name}</div>
                        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                          <span style={{ backgroundColor: '#EBF3E8', color: '#2E7D32', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 'bold', marginInlineEnd: '0.5rem' }}>${m.price}</span>
                          <span style={{ backgroundColor: '#F0F0EE', color: '#555', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{m.category}</span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#777', marginTop: '0.35rem', maxWidth: '450px' }}>{m.description}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button onClick={() => editMenuItem(m)} style={{ backgroundColor: '#2C2F24', color: 'white', border: 'none', borderRadius: '6px', padding: '0.45rem 1rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>{isAr ? '✏️ تعديل' : '✏️ Edit'}</button>
                      <button onClick={() => deleteMenuItem(m.id)} style={{ backgroundColor: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2', borderRadius: '6px', padding: '0.45rem 0.8rem', cursor: 'pointer', fontSize: '0.85rem' }}>{isAr ? '🗑️ حذف' : '🗑️ Delete'}</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'posts' && (
          <div>
            <div className={`card ${styles.cardSection}`} style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ margin: 0 }}>
                  {editingPostId 
                    ? (isAr ? '✏️ تعديل بيانات المقال' : '✏️ Edit Blog Post') 
                    : (isAr ? '➕ إضافة مقال جديد للمدونة' : '➕ Add New Blog Post')}
                </h2>
                {editingPostId && (
                  <button type="button" onClick={() => { setEditingPostId(null); setNewPost({ title: '', content: '', image: null }); }} className="btn btn-outline" style={{ borderColor: '#D32F2F', color: '#D32F2F', padding: '0.3rem 0.8rem', fontSize: '0.85rem' }}>
                    {isAr ? 'إلغاء التعديل ✕' : 'Cancel ✕'}
                  </button>
                )}
              </div>

              {editingPostId && (
                <div style={{ backgroundColor: '#FFF4E5', border: '1px solid #FFE2B8', color: '#B76E00', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  {isAr 
                    ? '💡 أنتِ الآن في وضع تعديل المقال: عدّلي العنوان أو الصورة أو النص بالأسفل ثم اضغطي "حفظ التعديل".' 
                    : '💡 You are now editing this article: modify the details below and click "Save Changes".'}
                </div>
              )}

              <form onSubmit={addPost} className={styles.formContainer}>
                <div style={{ flex: '1 1 100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'عنوان المقال' : 'Article Title'}</label>
                  <input type="text" placeholder={isAr ? 'عنوان المقال...' : 'Article title...'} className="form-input" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required style={{ width: '100%' }} />
                </div>

                <div style={{ flex: '1 1 100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'تغيير / رفع صورة المقال' : 'Upload / Change Image'}</label>
                  <input type="file" accept="image/*" className="form-input" onChange={e => setNewPost({...newPost, image: e.target.files[0]})} style={{ width: '100%' }} />
                </div>

                {newPost.image && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.5rem 0' }}>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{isAr ? 'معاينة الصورة:' : 'Image Preview:'}</span>
                    <img 
                      src={newPost.image instanceof File ? URL.createObjectURL(newPost.image) : (newPost.image?.startsWith('http') ? newPost.image : `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${newPost.image}`)} 
                      alt="Preview" 
                      style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }} 
                    />
                  </div>
                )}

                <div style={{ flex: '1 1 100%' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: 600 }}>{isAr ? 'محتوى / نص المقال' : 'Article Content'}</label>
                  <textarea placeholder={isAr ? 'اكتبي نص المقال هنا...' : 'Write article content here...'} className="form-input" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} required style={{ width: '100%', minHeight: '130px' }}></textarea>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flex: '1 1 100%', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary">{editingPostId ? (isAr ? '💾 حفظ التعديل' : '💾 Save Changes') : (isAr ? '➕ إضافة المقال' : '➕ Add Post')}</button>
                  {editingPostId && (
                    <button type="button" onClick={() => { setEditingPostId(null); setNewPost({ title: '', content: '', image: null }); }} className="btn btn-outline" style={{ borderColor: '#2C2F24', color: '#2C2F24' }}>
                      {isAr ? 'إلغاء التعديل' : 'Cancel'}
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            <div className={`card ${styles.cardSection}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ margin: 0 }}>{isAr ? `مقالات المدونة الحالية بالموقع (${posts.length})` : `Current Blog Posts (${posts.length})`}</h2>
                <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{isAr ? 'اضغطي على "تعديل" لتغيير أي عنوان أو صورة أو محتوى مقال' : 'Click "Edit" to modify any title, image, or content'}</span>
              </div>
              <ul className={styles.list}>
                {posts.map(p => (
                  <li key={p.id} className={styles.listItem} style={{ alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
                    <div className={styles.itemContent} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                      <img 
                        src={p.image ? (p.image.startsWith("http") ? p.image : `${import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'}${p.image}`) : 'https://placehold.co/100?text=Post'} 
                        alt={p.title} 
                        style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #eee' }} 
                      />
                      <div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#2C2F24' }}>{p.title}</div>
                        <div style={{ fontSize: '0.85rem', color: '#777', marginTop: '0.35rem', maxWidth: '500px' }}>{p.content?.substring(0, 110)}...</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button onClick={() => editPost(p)} style={{ backgroundColor: '#2C2F24', color: 'white', border: 'none', borderRadius: '6px', padding: '0.45rem 1rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>{isAr ? '✏️ تعديل' : '✏️ Edit'}</button>
                      <button onClick={() => deletePost(p.id)} style={{ backgroundColor: '#FFEBEE', color: '#D32F2F', border: '1px solid #FFCDD2', borderRadius: '6px', padding: '0.45rem 0.8rem', cursor: 'pointer', fontSize: '0.85rem' }}>{isAr ? '🗑️ حذف' : '🗑️ Delete'}</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'bookings' && (
          <div className={`card ${styles.cardSection}`}>
            <h2>{isAr ? `إدارة الحجوزات (${bookings.length})` : `Manage Bookings (${bookings.length})`}</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tableHeader}>
                    <th className={styles.th}>{isAr ? 'العميل' : 'User'}</th>
                    <th className={styles.th}>{isAr ? 'التاريخ والوقت' : 'Date & Time'}</th>
                    <th className={styles.th}>{isAr ? 'الضيوف' : 'Guests'}</th>
                    <th className={styles.th}>{isAr ? 'الحالة' : 'Status'}</th>
                    <th className={styles.th}>{isAr ? 'الإجراء' : 'Actions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} className={styles.tr}>
                      <td className={styles.td}>{b.user?.name || (isAr ? 'عميل' : 'Customer')}</td>
                      <td className={styles.td}>{b.booking_date} {b.booking_time}</td>
                      <td className={styles.td}>{b.guests}</td>
                      <td className={styles.td}>
                        <span style={{
                          padding: '0.25rem 0.6rem',
                          borderRadius: '50px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          backgroundColor: b.status === 'Accepted' ? '#E8F5E9' : (b.status === 'Rejected' ? '#FFEBEE' : '#FFF3E0'),
                          color: b.status === 'Accepted' ? '#2e7d32' : (b.status === 'Rejected' ? '#c62828' : '#e65100'),
                        }}>
                          {b.status === 'Accepted' ? (isAr ? '✔ تم القبول' : '✔ Accepted') :
                           b.status === 'Rejected' ? (isAr ? '✖ مرفوض' : '✖ Rejected') :
                           (isAr ? '⏳ قيد الانتظار' : '⏳ Pending')}
                        </span>
                      </td>
                      <td className={styles.actionCell}>
                        {b.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: '0.4rem' }}>
                            <button onClick={() => updateBookingStatus(b.id, 'Accepted')} style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.82rem' }}>{isAr ? '✔ قبول الحجز' : '✔ Accept'}</button>
                            <button onClick={() => updateBookingStatus(b.id, 'Rejected')} style={{ backgroundColor: '#fff', color: '#c62828', border: '1.5px solid #c62828', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.82rem' }}>{isAr ? '✖ رفض' : '✖ Reject'}</button>
                          </div>
                        ) : (
                          <button onClick={() => updateBookingStatus(b.id, 'Pending')} style={{ color: '#666', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.75rem' }}>{isAr ? 'إعادة تعيين' : 'Reset'}</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className={`card ${styles.cardSection}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 style={{ margin: 0 }}>{isAr ? `إدارة ومتابعة طلبات الطعام (${orders.length})` : `Manage Customer Orders (${orders.length})`}</h2>
              <span style={{ fontSize: '0.85rem', color: '#666' }}>{isAr ? 'يمكنك قبول أو رفض الطلب فوراً أو تغيير حالته' : 'Accept or reject orders instantly or change status'}</span>
            </div>
            
            {orders.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: '#777' }}>{isAr ? 'لا توجد أي طلبات واردة حالياً.' : 'No customer orders placed yet.'}</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className={styles.table} style={{ width: '100%', minWidth: '750px' }}>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th className={styles.th}>{isAr ? 'رقم الطلب' : 'Order ID'}</th>
                      <th className={styles.th}>{isAr ? 'العميل وبيانات التواصل' : 'Customer & Phone'}</th>
                      <th className={styles.th}>{isAr ? 'عنوان التوصيل' : 'Delivery Address'}</th>
                      <th className={styles.th}>{isAr ? 'الوجبات المطلوبة' : 'Ordered Items'}</th>
                      <th className={styles.th}>{isAr ? 'المجموع والدفع' : 'Total & Payment'}</th>
                      <th className={styles.th}>{isAr ? 'القرار وحالة الطلب' : 'Action & Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} className={styles.tr}>
                        <td className={styles.td} style={{ fontWeight: 'bold' }}>
                          #{o.id}
                          <div style={{ fontSize: '0.72rem', color: '#888', marginTop: '0.2rem' }} dir="ltr">{formatDateDisplay(o.created_at)}</div>
                        </td>
                        <td className={styles.td}>
                          <div style={{ fontWeight: 600 }}>{o.user?.name || (isAr ? 'عميل' : 'Customer')}</div>
                          <div style={{ fontSize: '0.8rem', color: '#666' }}>📞 {o.phone || (isAr ? 'بدون رقم' : 'No phone')}</div>
                          <div style={{ fontSize: '0.75rem', color: '#888' }}>✉️ {o.user?.email}</div>
                        </td>
                        <td className={styles.td} style={{ maxWidth: '180px', fontSize: '0.85rem' }}>
                          <div>📍 {o.address}</div>
                          {o.notes && <div style={{ fontSize: '0.75rem', color: '#b76e00', marginTop: '0.25rem' }}>📝 {o.notes}</div>}
                        </td>
                        <td className={styles.td} style={{ fontSize: '0.85rem' }}>
                          <ul style={{ paddingInlineStart: '1.1rem', margin: 0 }}>
                            {o.order_items?.map((item, idx) => (
                              <li key={idx} style={{ marginBottom: '0.2rem' }}>
                                <strong>{item.quantity}x</strong> {item.menu_item?.name || (isAr ? 'وجبة طعام' : 'Meal')} 
                                <span style={{ color: '#888', fontSize: '0.75rem' }}> (${item.price})</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className={styles.td}>
                          <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1rem' }}>${o.total_amount}</div>
                          <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.15rem' }}>💳 {o.payment_method}</div>
                        </td>
                        <td className={styles.td}>
                          {o.status === 'Pending' ? (
                            <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', gap: '0.35rem' }}>
                                <button 
                                  onClick={() => updateOrderStatus(o.id, 'Accepted')} 
                                  style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '0.45rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                                >
                                  {isAr ? '✔ قبول الطلب' : '✔ Accept'}
                                </button>
                                <button 
                                  onClick={() => updateOrderStatus(o.id, 'Rejected')} 
                                  style={{ backgroundColor: '#fff', color: '#c62828', border: '1.5px solid #c62828', padding: '0.45rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                                >
                                  {isAr ? '✖ رفض' : '✖ Reject'}
                                </button>
                              </div>
                              <span style={{ fontSize: '0.75rem', color: '#e65100', fontWeight: 600 }}>{isAr ? '⏳ بانتظار قرارك' : '⏳ Pending decision'}</span>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              <span style={{
                                padding: '0.25rem 0.6rem',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                display: 'inline-block',
                                width: 'fit-content',
                                backgroundColor: o.status === 'Accepted' || o.status === 'Delivered' ? '#E8F5E9' : (o.status === 'Rejected' ? '#FFEBEE' : '#FFF3E0'),
                                color: o.status === 'Accepted' || o.status === 'Delivered' ? '#2e7d32' : (o.status === 'Rejected' ? '#c62828' : '#e65100'),
                              }}>
                                {o.status === 'Accepted' ? (isAr ? '✔ مقبول' : '✔ Accepted') :
                                 o.status === 'Delivered' ? (isAr ? '✔ تم التوصيل' : '✔ Delivered') :
                                 o.status === 'Rejected' ? (isAr ? '✖ مرفوض' : '✖ Rejected') :
                                 o.status}
                              </span>
                              <select 
                                value={o.status} 
                                onChange={(e) => updateOrderStatus(o.id, e.target.value)} 
                                style={{
                                  padding: '0.3rem 0.5rem',
                                  borderRadius: '5px',
                                  fontSize: '0.8rem',
                                  border: '1px solid #ccc',
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="Pending">{isAr ? 'قيد الانتظار (Pending)' : 'Pending'}</option>
                                <option value="Accepted">{isAr ? 'مقبول (Accepted)' : 'Accepted'}</option>
                                <option value="In Progress">{isAr ? 'جاري التحضير (In Progress)' : 'In Progress'}</option>
                                <option value="Delivered">{isAr ? 'تم التوصيل (Delivered)' : 'Delivered'}</option>
                                <option value="Rejected">{isAr ? 'مرفوض (Rejected)' : 'Rejected'}</option>
                              </select>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'contacts' && (
          <div className={`card ${styles.cardSection}`}>
            <h2>{isAr ? `رسائل التواصل (${contacts.length})` : `Contact Messages (${contacts.length})`}</h2>
            <ul className={styles.list}>
              {contacts.map(c => (
                <li key={c.id} className={styles.listItemMessage}>
                  <button onClick={() => deleteContact(c.id)} className={styles.deleteBtnAbsolute}>{isAr ? 'حذف' : 'Delete'}</button>
                  <div style={{ marginBottom: '0.5rem' }}><strong>{c.name}</strong> ({c.email})</div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{isAr ? 'الموضوع:' : 'Subject:'} {c.subject}</div>
                  <p style={{ color: '#666' }}>{c.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'users' && (
          <div className={`card ${styles.cardSection}`}>
            <h2>{isAr ? `المستخدمين المسجلين (${users.length})` : `Registered Users (${users.length})`}</h2>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tableHeader}>
                    <th className={styles.th}>{isAr ? 'الاسم' : 'Name'}</th>
                    <th className={styles.th}>{isAr ? 'البريد الإلكتروني' : 'Email'}</th>
                    <th className={styles.th}>{isAr ? 'الدور' : 'Role'}</th>
                    <th className={styles.th}>{isAr ? 'تاريخ التسجيل' : 'Registered At'}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className={styles.tr}>
                      <td className={styles.td}>{u.name}</td>
                      <td className={styles.td}>{u.email}</td>
                      <td style={{ padding: '1rem', color: u.role === 'admin' ? 'var(--primary)' : 'inherit', fontWeight: u.role === 'admin' ? 'bold' : 'normal' }}>{u.role}</td>
                      <td className={styles.td}>
                        <span dir="ltr" style={{ display: 'inline-block', unicodeBidi: 'embed', fontWeight: 600, color: '#444' }}>
                          {formatDateDisplay(u.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;


