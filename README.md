# Job Board (Laravel + React)

A full-stack Job Board web application built with **Laravel (backend)** and **React (frontend)**. This project enables employers to post jobs and job seekers to browse listings with a modern and responsive UI.

---

## 🚀 Features

⭐ User authentication (register/login)  
📋 Job listing creation, editing & deletion  
🔍 Browse & search available jobs  
📡 API-driven frontend with React that consumes Laravel backend endpoints

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Backend   | Laravel (PHP) |
| Frontend  | React.js |
| Database  | MySQL / MariaDB |
| UI        | Tailwind CSS / Bootstrap (or your chosen lib) |

---

## 📸 Screenshots

_Add your images here (replace the sample paths below):_

![Homepage Screenshot]
<img width="1902" height="876" alt="Screenshot 2026-01-03 173752" src="https://github.com/user-attachments/assets/b7df5ac4-f7d3-4cd9-84b8-e54c72ffc055" />

![Job Listing Screenshot](./images/job-listing.png)
<img width="1916" height="867" alt="Screenshot 2026-01-03 173852" src="https://github.com/user-attachments/assets/8a314d44-deb5-4d9e-b917-4ccd7583613f" />

![Job Details Screenshot]
<img width="1920" height="880" alt="Screenshot 2026-01-03 173917" src="https://github.com/user-attachments/assets/8454fa70-3a3b-4021-949c-a4b40294d77a" />


---

## 🧑‍💻 Installation

### Backend (Laravel)

```bash
git clone https://github.com/Skyakash990/Job-Board-Laravel-React.git
cd Job-Board-Laravel-React/job-board-backend

composer install
cp .env.example .env
php artisan key:generate

# configure your DB credentials in .env
php artisan migrate
php artisan serve
