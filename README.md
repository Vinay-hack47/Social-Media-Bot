<img width="1896" height="602" alt="image" src="https://github.com/user-attachments/assets/a51bc9ac-37cd-4089-801f-967784ede7d4" />

<p align="center">
  <img src="https://drive.google.com/file/d/1goHtaOI2Qs6PIzwFYpc0ziQlXUv04I7u/view?usp=sharing" alt="Social Media Bot Banner" width="80%"/>
</p>

<h1 align="center">Social Media Bot 🧠📣</h1>

<p align="center"><b>Amplify Your Voice. Automate Your Social Success.</b></p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/status-production-brightgreen" alt="Status: Production Ready">
  <img src="https://img.shields.io/badge/backend-node--express-yellow" alt="Backend: Node.js">
  <img src="https://img.shields.io/badge/frontend-react--vite-blue" alt="Frontend: React + Vite">
</p>

<p align="center">
  <b>Modern full-stack automation for creators, teams, and developers.</b>
</p>

---


<h2>📌 Overview</h2>

<blockquote>
<b>Social Media Bot</b> is a <span style="color:#00b894"><b>full-stack, self-hosted automation platform</b></span> for scheduling, posting, and managing content across social media. Start with Twitter, expand to more. Built for modern teams, creators, and developers.
</blockquote>

<p align="center">
  <b>⚡ Modern full-stack, clean API, OAuth mastery, and production-readiness.</b>
</p>

---


<h2>🚀 Features</h2>

<ul>
  <li>🔄 <b>Cross-Platform Scheduling</b> – Schedule posts on Twitter (others coming soon)</li>
  <li>🔐 <b>Secure Authentication</b> – JWT-based login, user identity, and platform linking</li>
  <li>🖼️ <b>Cloud Media Uploads</b> – Seamless image/video handling via Cloudinary</li>
  <li>📊 <b>Analytics Dashboard</b> – Visualize post performance and engagement stats</li>
  <li>💬 <b>OAuth2 Twitter Integration</b> – PKCE flow, encrypted token storage</li>
  <li>🛠️ <b>Modular Backend</b> – Express APIs, job queues, and database abstraction</li>
  <li>🖥️ <b>Modern Frontend</b> – Built with React + Vite + Tailwind CSS</li>
  <li>🐳 <b>Docker-Ready</b> – Easily containerized for any environment</li>
</ul>

---



<h2>🧱 Tech Stack</h2>

<details>
<summary>🛠 <strong>Backend</strong></summary>

- <b>Node.js + Express</b> – REST API, auth, platform logic
- <b>MongoDB + Mongoose</b> – Structured data layer
- <b>Redis (Upstash)</b> – Caching and temporary state (OAuth)
- <b>Cloudinary</b> – Media uploads and CDN delivery

</details>

<details>
<summary>🎨 <strong>Frontend</strong></summary>

- <b>React + Vite</b> – Modern SPA with blazing fast dev
- <b>Redux</b> – Global state management
- <b>Tailwind CSS</b> – Utility-first, responsive styling

</details>

<details>
<summary>🔧 <strong>Tools & Utilities</strong></summary>

- <b>Axios</b> – API communication
- <b>Zod</b> – Schema validation
- <b>dotenv</b> – Environment config
- <b>Docker</b> – Containerized backend

</details>

---


<h2>⚙️ Getting Started</h2>


<h3>📦 Backend Setup</h3>

```bash
cd backend
npm install
cp .env.example .env   # Fill with your credentials
npm run dev
```


<h3>💻 Frontend Setup</h3>

```bash
cd frontend
npm install
npm run dev
```


<h3>🧪 Sample .env for Backend</h3>

```env
MONGO_URI=mongodb://localhost:27017/social-media-bot

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Twitter OAuth (v2)
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_CALLBACK_URL=http://localhost:3000/api/v1/twitter/callback

# Twitter v1/v2 Credentials (Optional)
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
ACCESS_TOKEN=...
ACCESS_SECRET=...
BEARER_TOKEN=...
APP_ID=...

# Redis
REDIS_URL=rediss://default:yourpassword@your-upstash-url:6379
UPSTASH_REDIS_REST_TOKEN=...

# App Security
TOKEN_ENCRYPTION_SECRET=your_encryption_secret
```

---


<h2>📈 Usage Examples</h2>


<h3>✅ Schedule a Post</h3>

```http
POST /api/v1/schedule
Content-Type: application/json
Authorization: Bearer <token>

{
  "platform": "twitter",
  "content": "Hello world!",
  "scheduledTime": "2025-07-23T10:00:00Z"
}
```


<h3>📊 Fetch Analytics</h3>

```http
GET /api/v1/analytics
Authorization: Bearer <token>
```

---


<h2>📚 API Endpoints Summary</h2>

| Method | Endpoint                        | Description                        |
|--------|----------------------------------|------------------------------------|
| POST   | /api/v1/auth/register           | Register new user                  |
| POST   | /api/v1/auth/login              | User login                         |
| GET    | /api/v1/user/me                 | Get logged-in user profile         |
| POST   | /api/v1/schedule                | Schedule a post                    |
| GET    | /api/v1/schedule                | List all scheduled posts           |
| POST   | /api/v1/twitter/post-tweet      | Post tweet via connected account   |
| GET    | /api/v1/twitter/auth-url        | Get Twitter OAuth URL              |
| GET    | /api/v1/twitter/callback        | OAuth callback for Twitter         |

---


<h2>🧩 Troubleshooting</h2>


<h3>Redis: <code>ECONNRESET</code> or <code>SocketClosedUnexpectedlyError</code></h3>
- Ensure `REDIS_URL` starts with `rediss://`
- Verify connectivity with:
  ```bash
  redis-cli --tls -u rediss://...
  ```


<h3>MongoDB Connection Errors</h3>
- Ensure `mongod` is running locally or your URI is correct.


<h3>Cloudinary Upload Errors</h3>
- Validate your `CLOUD_NAME`, `API_KEY`, and `API_SECRET`.


<h3>Common API Issues</h3>

| Error Code | Meaning        | Fix                        |
|------------|---------------|----------------------------|
| 401        | Unauthorized  | Ensure JWT is valid        |
| 400        | Bad Request   | Check required fields      |

---


<h2>📄 License</h2>

MIT License

---

<p align="center"><i>Crafted with ❤️ by Vinay Rajput — Showcasing full-stack skills, OAuth mastery, and backend architecture</i></p>
