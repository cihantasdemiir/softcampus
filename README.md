# SoftCampus — Software Engineering Student Hub

A modern, community-oriented university platform for Software Engineering students.

## Design Philosophy

- Dark theme (GitHub + Discord inspired)
- Soft blue/purple accents
- Card-based, minimal, readable
- Academic / community-focused — NOT a startup SaaS

---

## Folder Structure

```
softcampus/
├── app.js                        ← Express entry point
├── package.json
├── views/
│   ├── partials/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   ├── index.ejs                 ← Announcements feed (homepage)
│   ├── discussions.ejs           ← Forum / discussion board
│   ├── discussion-detail.ejs     ← Single discussion thread
│   ├── announcement-detail.ejs  ← Single announcement
│   ├── gallery.ejs               ← Photo gallery
│   ├── login.ejs
│   ├── register.ejs
│   └── admin.ejs                 ← Admin dashboard (frontend only)
├── public/
│   ├── css/
│   │   └── style.css             ← Full design system (CSS variables, components)
│   ├── js/
│   │   └── main.js
│   └── images/                   ← Drop images here
└── index.html                    ← Static preview (open directly in browser)
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home / Feed | `/` | Announcements feed with filter tabs |
| Discussions | `/discussions` | Reddit-style forum with anonymous posting |
| Discussion Detail | `/discussions/:id` | Thread with nested replies |
| Announcement Detail | `/announcements/:id` | Full announcement page |
| Gallery | `/gallery` | Masonry photo grid with lightbox |
| Login | `/login` | Student sign in |
| Register | `/register` | Student registration |
| Admin | `/admin` | Admin dashboard (UI only) |

---

## Setup

```bash
npm install
npm run dev     # development with nodemon
npm start       # production
```

Server runs at: `http://localhost:3000`

Or open `index.html` directly in a browser to preview static version.

---

## Tech Stack

- **Backend:** Node.js + Express.js
- **Templates:** EJS
- **CSS:** Custom design system (no Tailwind or Bootstrap utility classes beyond grid)
- **UI Framework:** Bootstrap 5 (grid + resets only)
- **Fonts:** Outfit (display), Space Grotesk (body), DM Mono (code/labels)

---

## Key Features

### Announcements Feed
- Sorted by nearest date
- Filterable by type (Event / Internship / Workshop / News)
- Short cards + long cards with Read More
- Pinned announcement support
- Color-coded left border per type

### Discussions
- Reddit/forum-style layout with vote buttons
- Category tags
- **Anonymous posting** with badge indicator
- New topic modal with anonymous toggle
- Nested replies in thread view

### Gallery
- Masonry responsive grid
- Category filter (Hackathon / Workshop / Seminar / Social)
- Lightbox on click
- Placeholder tiles with emoji + event name

### Admin Dashboard
- Overview with stats and quick actions
- Manage Announcements (CRUD UI)
- Manage Discussions (moderation, flag review)
- Manage Users (list, ban/unban)
- Manage Gallery (upload zone, delete)

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#0d0f14` | Page background |
| `--bg-card` | `#181c26` | Card background |
| `--accent-blue` | `#4f7ef7` | Primary actions, links |
| `--accent-purple` | `#9b7df0` | Secondary, anonymous |
| `--accent-teal` | `#4ecdc4` | News, workshops |
| `--accent-amber` | `#f5a623` | Deadlines, pins |
| `--accent-green` | `#5cb85c` | Internships, success |
| `--accent-red` | `#e05c6b` | Errors, flagged |
