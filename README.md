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

> ❗ Since the app uses **Google OAuth** for login and is not yet verified for public use by Google, it is currently in **testing mode**. This means **only 2 specific test Gmail accounts** (added manually in the Google Cloud Console) can access the app.

If you're not one of the pre-approved testers, you will encounter a "This app is not verified" error from Google when trying to log in.

To make it publicly accessible, the app would need to go through Google’s OAuth verification process (which allows up to 100 users in testing, or unlimited after full verification).

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
|----------|----------------|--------------|
| ![Home](![Screenshot 2025-05-24 072309](https://github.com/user-attachments/assets/3652d5fd-afa1-4641-994f-5c08448cbe22)
) | ![Search](![Screenshot 2025-05-24 081345](https://github.com/user-attachments/assets/0de88cb4-564d-4c31-9c74-2baeebb0c229)
) | ![Saved](![Screenshot 2025-05-24 072257](https://github.com/user-attachments/assets/25f3fa5b-419a-4417-a732-99bbf815cf3d)
) |

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

# Auth.js (e.g. GitHub or Email Provider)
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

This project uses `Auth.js` (formerly NextAuth.js) to handle authentication.

* Social login support (Google, etc.)
* JWT-based session management
* Test users limited to pre-approved emails while in OAuth testing mode

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* 📷 [Unsplash](https://unsplash.com/) – Free image API
* 🔐 [Auth.js](https://authjs.dev/) – Secure authentication
* 🧪 [Drizzle ORM](https://orm.drizzle.team/) – Type-safe database access
* 🐘 [Neon](https://neon.tech/) – Serverless PostgreSQL
* ⚡ [Next.js](https://nextjs.org/) – Fullstack React framework
* 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS

```

