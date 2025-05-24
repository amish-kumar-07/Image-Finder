# 🖼️ Image Finder App

A modern web app to search, save, and manage high-quality images using the **Unsplash API**. Users can sign in, search for images, and save/delete their favorite images securely in a **PostgreSQL database** powered by **Neon** and managed via **Drizzle ORM**.

## 🌐 Live Demo

🔗 [https://image-finder-ecru-phi.vercel.app](https://image-finder-ecru-phi.vercel.app)

---

## 🚀 Features

- 🔍 Search millions of images from Unsplash
- ✅ User authentication via **Auth.js**
- 💾 Save your favorite images to your profile
- ❌ Delete saved images anytime
- 🧩 Built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**
- 🐘 Database: **Neon (PostgreSQL)** + **Drizzle ORM**
- ☁️ Hosted on **Vercel**

---

## ⚠️ Note on Authentication

> ❗ This app uses **Google OAuth** for login and is currently in **testing mode**.  
> Only **2 specific test Gmail accounts** (added manually in the Google Cloud Console) are allowed to log in during this phase.

If you are not one of the approved test users, you'll encounter a **"This app is not verified"** error from Google.  
This limitation is due to Google’s policy of allowing a maximum of **100 users** in OAuth testing mode unless the app undergoes **OAuth verification**.

---

## 🛠️ Tech Stack

| Frontend        | Backend / DB           |
|-----------------|------------------------|
| Next.js 14      | Next.js App Router     |
| TypeScript      | Neon PostgreSQL        |
| Tailwind CSS    | Drizzle ORM            |
| Auth.js (NextAuth) | REST API Routes    |

---

## 📸 Screenshots

| Home Page | Search Results | Saved Images |
|-----------|----------------|--------------|
| ![Home](https://github.com/user-attachments/assets/3652d5fd-afa1-4641-994f-5c08448cbe22) | ![Search](https://github.com/user-attachments/assets/0de88cb4-564d-4c31-9c74-2baeebb0c229) | ![Saved](https://github.com/user-attachments/assets/25f3fa5b-419a-4417-a732-99bbf815cf3d) |

---

## 🗂️ Folder Structure

```

app/
├── page.tsx              # Homepage with search functionality
├── api/
│   ├── search/route.ts   # Fetch images from Unsplash
│   ├── save/route.ts     # Save image to DB
│   ├── delete/route.ts   # Delete image from DB
│   └── auth/\[...nextauth].ts # Auth.js configuration

components/
├── SearchInput.tsx       # Input box for searching
├── ImageGrid.tsx         # Display search results
├── SavedImages.tsx       # Show user’s saved images

lib/
├── unsplash.ts           # Unsplash fetch logic
├── db.ts                 # Neon & Drizzle setup
├── auth.ts               # JWT & user session logic

````

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/image-finder-app.git
cd image-finder-app
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file and configure the following:

```env
# Unsplash
UNSPLASH_ACCESS_KEY=your_unsplash_api_key

# Auth.js (Google Provider)
AUTH_SECRET=your_auth_secret
AUTH_PROVIDER_CLIENT_ID=your_client_id
AUTH_PROVIDER_CLIENT_SECRET=your_client_secret

# Database (Neon)
DATABASE_URL=your_neon_database_url
```

### 4. Setup Database with Drizzle

```bash
npx drizzle-kit push
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## 💾 Database Schema (Example)

* **User** (id, name, email)
* **SavedImage** (id, userId, url, description, createdAt)

---

## 🔒 Authentication

This project uses `Auth.js` (formerly NextAuth.js) for secure authentication.

* Social login via **Google**
* JWT-based session management
* Only pre-approved Gmail users can log in in testing mode

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* 📷 [Unsplash](https://unsplash.com/) – Free image API
* 🔐 [Auth.js](https://authjs.dev/) – Authentication framework
* 🧪 [Drizzle ORM](https://orm.drizzle.team/) – Type-safe PostgreSQL ORM
* 🐘 [Neon](https://neon.tech/) – Serverless PostgreSQL
* ⚡ [Next.js](https://nextjs.org/) – Fullstack React Framework
* 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework

