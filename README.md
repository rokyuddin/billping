# BillPing 💸

**Stop burning money on forgotten subscriptions.**

BillPing is a brutally simple subscription tracking platform that helps you monitor recurring expenses, receive smart reminders, and analyze your spending habits.

![BillPing Dashboard](https://via.placeholder.com/1200x600/0f0f0f/a3e635?text=BillPing+Dashboard)

## ✨ Features

- 🔐 **Secure Authentication**: Email/password and Google OAuth
- 📊 **Smart Dashboard**: Real-time overview of all subscriptions with stats
- 💰 **Cost Analytics**: Monthly and yearly spending breakdowns
- 📈 **Visual Charts**: Pie chart for categories, bar chart for trends
- 🔍 **Subscription Details**: View, edit, and delete individual subscriptions
- 📅 **Payment History**: Track all past payments per subscription
- ⚙️ **Settings**: Manage profile, preferences, and notifications
- 🔔 **Smart Reminders**: Get notified before bills are due (Coming Soon)
- 🌍 **Multi-Currency**: Support for USD, EUR, GBP, BDT, and more
- 🎨 **Neo-Brutalist Design**: Bold, high-contrast UI that stands out

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **UI Components**: Shadcn UI, Lucide Icons
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/billping.git
   cd billping
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run database migrations**

   The database schema is already applied via Supabase MCP. Check `docs/technical-spec.md` for details.

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗂️ Project Structure

```
billping/
├── src/
│   ├── app/
│   │   ├── actions/          # Server actions (auth, subscriptions)
│   │   ├── auth/             # Auth callback routes
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── analytics/    # Analytics with charts
│   │   │   ├── new/          # Add subscription
│   │   │   ├── settings/     # User settings
│   │   │   └── subscription/[id]/  # Subscription details
│   │   ├── login/            # Login page
│   │   ├── signup/           # Signup page
│   │   ├── globals.css       # Global styles + Neo-Brutalist theme
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── lib/
│   │   ├── supabase/         # Supabase clients (server & browser)
│   │   └── utils.ts          # Utility functions
│   └── middleware.ts         # Auth middleware
├── docs/                     # Documentation
│   ├── technical-spec.md
│   ├── design-system.md
│   ├── content-strategy.md
│   ├── project-plan.md
│   ├── phase-2-summary.md
│   └── phase-3-summary.md
├── public/                   # Static assets
└── package.json
```

## 🎨 Design System

BillPing uses a **Neo-Brutalist Soft** aesthetic:

- **Typography**: Space Grotesk (headings) + DM Sans (body)
- **Colors**:
  - Void Black (`#0f0f0f`)
  - Paper White (`#ffffff`)
  - Hyper Blue (`#2563eb`)
  - Acid Green (`#a3e635`)
  - Hot Pink (`#ec4899`)
- **UI Elements**: Thick borders (2px), hard shadows, sharp corners

See `docs/design-system.md` for full details.

## 📝 Documentation

- [Technical Specification](docs/technical-spec.md)
- [Design System](docs/design-system.md)
- [Content Strategy](docs/content-strategy.md)
- [Project Plan](docs/project-plan.md)

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- User data is isolated and encrypted
- OAuth tokens are securely managed by Supabase
- HTTPS enforced in production

## 🛣️ Roadmap

- [x] MVP: Core subscription tracking
- [x] Dashboard with stats and upcoming bills
- [x] Subscription detail page with edit/delete
- [x] Analytics dashboard with charts
- [x] Settings page with preferences
- [ ] Email reminders via Supabase Edge Functions
- [ ] Receipt/invoice attachments
- [ ] Budget goals and alerts
- [ ] Team/family plan support
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from Gumroad, Linear, and Figma
- Built with [Next.js](https://nextjs.org/), [Supabase](https://supabase.com/), and [Shadcn UI](https://ui.shadcn.com/)

---

**Built with hate for hidden fees.** 💀
