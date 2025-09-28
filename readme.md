# User Management App (Laravel & Vue.js)

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

Aplikasi Full-Stack sederhana yang dibuat sebagai bagian dari tugas seleksi magang.  
Aplikasi ini mencakup **sistem autentikasi pengguna** dan **manajemen data pengguna (CRUD)** dengan **Laravel** sebagai backend API dan **Vue.js** sebagai frontend.

---

## Fitur Utama

- 🔐 **Autentikasi Pengguna**: Registrasi & Login menggunakan JWT (JSON Web Token).  
- 👤 **Manajemen Profil**: User bisa melihat & update profil sendiri.  
- 📊 **Dashboard**: Menampilkan semua user dalam tabel.  
- 🔍 **Pencarian Real-time**: Filter user berdasarkan nama/username.  
- ✏️ **CRUD Penuh**: Update & Hapus user melalui modal konfirmasi.  
- 🎨 **UI Modern**: Dibangun dengan Tailwind CSS.  

---

## Teknologi yang Digunakan

### Backend (API)
- **Framework**: Laravel 11  
- **Database**: PostgreSQL  
- **Autentikasi**: `tymon/jwt-auth`  

### Frontend
- **Framework**: Vue.js 3 (Vite)  
- **Routing**: Vue Router  
- **State Management**: Pinia  
- **HTTP Client**: Axios  
- **Styling**: Tailwind CSS  

---

## Instalasi & Setup Lokal

### Prasyarat
- Git  
- Node.js v18+  
- Composer  
- PostgreSQL  

### 1. Setup Backend (Laravel)
```bash
# Clone repo
git clone [URL_GITHUB_KAMU]
cd backend

# Salin env
cp .env.example .env

# Install dependensi
composer install

# Generate key & JWT secret
php artisan key:generate
php artisan jwt:secret

# Migrasi database
php artisan migrate

# Jalankan server
php artisan serve
# backend berjalan di http://127.0.0.1:8000
