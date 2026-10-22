# My Tuition Tracker — Tuition Session & Payment Tracker (Next.js + MongoDB)

**My Tuition Tracker** is a personal tuition management web app for private tutors, built with **Next.js** and **MongoDB**. Keep track of your tuition sessions and student payments in one simple dashboard instead of scattered notebooks and spreadsheets — add sessions, record payments, and always know exactly where you stand.

## Features

- **Session tracking** — log and review your tuition sessions in one place
- **Payment tracking** — record student payments and keep an eye on what's paid and what's due
- **Persistent storage** — all data is stored in MongoDB through Mongoose, so nothing is lost between visits
- **Full-stack Next.js app** — pages-router frontend with API routes in the same project
- **Clean, responsive UI** — Tailwind CSS with daisyUI components and React Icons

## Tech Stack

- **Framework:** Next.js 14 + React 18
- **Language:** JavaScript
- **Database:** MongoDB with Mongoose ODM
- **Styling:** Tailwind CSS + daisyUI

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Make sure MongoDB is running (locally or via MongoDB Atlas) and its connection URI is configured for the app before using the tracker.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

---

⭐ If this tracker makes your tutoring life easier, consider giving it a star — contributions and feedback are welcome!
