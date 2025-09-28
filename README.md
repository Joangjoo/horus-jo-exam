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


## 📌 API Documentation

### ### Registrasi
Endpoint untuk membuat akun pengguna baru.

`POST /api/auth/register`

* **Body:**
    ```json
    {
      "nama": "Nama Pengguna Baru",
      "username": "usernamebaru",
      "email": "baru@email.com",
      "password": "password_rahasia"
    }
    ```

* **Response (Sukses `201 Created`):**
    ```json
    {
      "message": "Registrasi Berhasil",
      "user": {
        "nama": "Nama Pengguna Baru",
        "username": "usernamebaru",
        "email": "baru@email.com",
        "updated_at": "2025-09-27T17:30:00.000000Z",
        "created_at": "2025-09-27T17:30:00.000000Z",
        "id": 1
      }
    }
    ```
* **Response (Gagal `422 Unprocessable Entity`):**
    ```json
    {
        "message": "Validasi gagal",
        "errors": {
            "email": [
                "The email has already been taken."
            ]
        }
    }
    ```

---

### ### Login
Endpoint untuk mengautentikasi pengguna dan mendapatkan token JWT.

`POST /api/auth/login`

* **Body:**
    ```json
    {
      "username": "usernamebaru",
      "password": "password_rahasia"
    }
    ```
* **Response (Sukses `200 OK`):**
    ```json
    {
        "message": "Login berhasil",
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3Mi...",
        "token_type": "bearer",
        "expires_in": 3600
    }
    ```
* **Response (Gagal `401 Unauthorized`):**
     ```json
    {
        "message": "Username atau password salah."
    }
    ```