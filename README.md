# 🍽️ Bistro Bliss - Restaurant & Online Ordering System

A modern, full-stack web application for a premier restaurant and culinary experience. Built with **React (Vite)** on the frontend and **Laravel 11 (PHP)** on the backend with **MySQL**.

---

## ✨ Features

- 🌐 **Full Bilingual Support (EN / AR):** Dynamic one-click language switcher with real-time RTL layout switching and Cairo typography.
- 🍔 **Interactive Menu:** Browse categories (Breakfast, Main Dishes, Drinks, Desserts) with instant filtering and cart management.
- 🛍️ **Cart & Online Ordering:** Add meals, review order summaries, specify delivery details, and choose payment methods (Cash on Delivery / Card).
- 📅 **Table Reservations:** Online table booking system with real-time status management (Pending, Accepted, Rejected).
- 📰 **Culinary Blog & Articles:** Rich blog articles with detailed views, recipes, and related posts.
- ✉️ **Contact & Feedback:** Interactive contact form saving customer inquiries directly to the database.
- 🔐 **Authentication & Roles:** Secure user registration, authentication (Sanctum tokens), and role-based access control (Admin vs. Customer).
- 🛠️ **Comprehensive Admin Dashboard:**
  - Full CRUD for Menu items (images, names, prices, categories, descriptions).
  - Full CRUD for Blog posts.
  - Live management of Table Bookings (Accept / Reject).
  - Order tracking and status management (`Pending`, `In Progress`, `Delivered`).
  - Customer messages and feedback review.
  - User accounts directory.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, React Router DOM, Lucide Icons, React Hot Toast, Vanilla CSS & CSS Modules.
- **Backend:** Laravel 11, PHP 8.2+, Laravel Sanctum (API Tokens), Eloquent ORM.
- **Database:** MySQL.

---

## 🚀 Getting Started

### 1. Prerequisites
- **PHP** >= 8.2 & **Composer**
- **Node.js** >= 18 & **npm**
- **MySQL** database server (e.g. via XAMPP)

---

### 2. Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Configure environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations and seeders (Creates 8 menu items, 12 blog posts, and admin account)
php artisan migrate:fresh --seed

# Link storage for uploaded images
php artisan storage:link

# Start the Laravel backend server (runs on http://127.0.0.1:8000)
php artisan serve
```

---

### 3. Frontend Setup (React + Vite)

```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server (runs on http://localhost:5173)
npm run dev
```

---

## 🔑 Demo Admin Credentials

You can log in to the Admin Dashboard using:
- **Email:** `admin@example.com`
- **Password:** `password`
