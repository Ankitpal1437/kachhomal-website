# Kachhomal Sweets — Website

Modern multi-page website for Kachhomal Sweets, Ulhasnagar. Built with Node.js,
Express and EJS. Includes a working Order & Enquiry form that saves submissions
to `data/enquiries.json`.

## Pages
- `/` — Home
- `/about` — Our Story / heritage timeline
- `/menu` — Full menu with category tabs and pricing
- `/gallery` — Photo gallery
- `/contact` — Order & Enquiry form

## 1. Run locally
```bash
npm install
npm start
```
Visit `http://localhost:3000`.

## 2. Add product photos
Drop images into `public/images/` using the exact filenames listed in
`public/images/README.txt`. The templates already reference these filenames,
so the site will pick them up automatically — no code changes needed.

## 3. Push to GitHub
```bash
git add .
git commit -m "Kachhomal Sweets website"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 4. Deploy on Render
1. Go to [render.com](https://render.com) → **New** → **Web Service**.
2. Connect your GitHub account and select this repository.
3. Fill in:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Click **Create Web Service**. Render will build and give you a live URL
   (e.g. `https://kachhomal-sweets.onrender.com`).
5. Every future `git push` to `main` will auto-redeploy.

### Note on the enquiry form
Submissions are saved to `data/enquiries.json` on the server's disk. Render's
free tier has an **ephemeral filesystem** — this file resets on redeploy/restart,
so it's fine for testing but not for long-term storage. Before going fully live,
either:
- upgrade to a Render persistent disk, or
- connect a proper database (e.g. free-tier PostgreSQL on Render / MongoDB Atlas), or
- pipe submissions to email/WhatsApp/Google Sheets via a service like Zapier or Make.

Happy to wire up any of these next — just say the word.

## 5. Things to update before launch
- Replace placeholder phone number, email and exact address in
  `views/partials/footer.ejs` and `views/contact.ejs`.
- Add real product/shop photography to `public/images/`.
- Update ratings/stats in `views/index.ejs` if numbers change.

## Tech stack
- Node.js + Express (server, routing, form handling)
- EJS (shared header/footer templates)
- Vanilla CSS (custom design system — no framework)
- Vanilla JS (nav toggle, scroll reveal, menu tabs)
