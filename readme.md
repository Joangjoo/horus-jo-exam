# User Management App (Laravel & Vue.js)

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

Aplikasi Full-Stack sederhana yang dibuat sebagai bagian dari tugas seleksi magang. Aplikasi ini mencakup sistem autentikasi pengguna dan manajemen data pengguna (CRUD) menggunakan Laravel sebagai backend API dan Vue.js sebagai frontend.

---

## ## Fitur Utama

-   🔐 **Autentikasi Pengguna**: Registrasi dan Login menggunakan JWT (JSON Web Tokens).
-   👤 **Manajemen Profil**: Pengguna dapat melihat dan memperbarui profil mereka sendiri.
-   📊 **Dashboard Admin**: Menampilkan semua data pengguna dalam format tabel.
-   🔍 **Pencarian Real-time**: Fitur pencarian untuk memfilter data pengguna berdasarkan nama atau username di dashboard.
-   ✏️ **CRUD Penuh**: Admin (semua user yang login) dapat membuat, membaca, memperbarui, dan menghapus data pengguna lain.
-   🐳 **Containerized**: Backend dan database berjalan di dalam container Docker untuk kemudahan setup.

---

## ## Teknologi yang Digunakan

#### **Backend (API)**
-   **Framework**: Laravel 11
-   **Database**: PostgreSQL
-   **Autentikasi**: `tymon/jwt-auth`
-   **Environment**: Docker & Docker Compose

#### **Frontend**
-   **Framework**: Vue.js 3 (dengan Vite)
-   **Routing**: Vue Router
-   **State Management**: Pinia
-   **HTTP Client**: Axios
-   **Styling**: Tailwind CSS

---

## ## Instalasi & Setup Lokal

Untuk menjalankan proyek ini di lingkungan lokal, ikuti langkah-langkah berikut:

### ### Prasyarat
-   Git
-   Docker & Docker Compose
-   Node.js (v18 atau lebih baru)
-   Composer

### ### 1. Setup Backend (Laravel)

```bash
# 1. Clone repository
git clone [URL_GITHUB_KAMU]
cd [NAMA_FOLDER_PROYEK]/backend

# 2. Salin file environment
cp .env.example .env

# 3. Jalankan container Docker (database PostgreSQL)
docker-compose up -d

# 4. Install dependensi Composer
composer install

# 5. Generate application key
php artisan key:generate

# 6. Generate JWT secret key
php artisan jwt:secret

# 7. Jalankan migrasi database untuk membuat tabel
php artisan migrate

# 8. Jalankan server Laravel (di terminal terpisah)
php artisan serve
# Backend akan berjalan di [http://127.0.0.1:8000](http://127.0.0.1:8000)
```

### ### 2. Setup Frontend (Vue.js)
Buka terminal baru untuk frontend.

```bash
# 1. Masuk ke folder frontend
cd ../frontend

# 2. Install dependensi Node.js
npm install

# 3. Jalankan server development Vite
npm run dev
# Frontend akan berjalan di http://localhost:5173 (atau port lain yang tersedia)
```
Buka `http://localhost:5173` di browser untuk melihat aplikasi.

---

## ## Ringkasan API Endpoint

| Method | Endpoint | Deskripsi | Butuh Autentikasi? |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registrasi user baru | Tidak |
| `POST` | `/api/auth/login` | Login user & dapatkan token | Tidak |
| `POST` | `/api/logout` | Logout & invalidate token | **Ya** |
| `GET` | `/api/users` | Ambil semua user (untuk dashboard) | **Ya** |
| `GET` | `/api/profile` | Ambil data user yang sedang login | **Ya** |
| `PUT` | `/api/users/{id}` | Update data user | **Ya** |
| `DELETE`| `/api/users/{id}` | Hapus user | **Ya** |

---

## ## Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).