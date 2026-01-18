# POE Giveaway 🎁

A modern, full-featured giveaway platform built for the Path of Exile community. Create, manage, and run fair giveaways for POE currency and items with built-in anti-cheat measures.

![POE Giveaway Banner](public/data/img/pepe.png)

## ✨ Features

- **🎯 Multiple Currency Support** - Support for all major POE currencies (Divine Orbs, Exalted Orbs, Chaos Orbs, Mirror of Kalandra, and more)
- **🔐 Secure Entry Management** - IP-based duplicate prevention and optional Reddit verification
- **🎲 Fair Winner Selection** - Random winner selection with visual spinner
- **📊 Real-time Updates** - Live participant count and entry updates using Supabase Realtime
- **🔒 Creator Authentication** - Password-protected giveaway management
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🌙 Dark Mode** - Beautiful dark theme with custom POE-inspired styling
- **🎨 Custom UI** - Path of Exile themed design with custom fonts and currency images
- **🔗 Shareable Links** - Unique URLs for each giveaway
- **⏰ Scheduled Giveaways** - Optional end dates for automatic closure
- **✅ Entry Confirmation** - Modal confirmation before submitting entries

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication:** Cookie-based session management
- **Real-time:** Supabase Realtime subscriptions
- **Deployment:** [Vercel](https://vercel.com/) (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) 20.x or later
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) account (free tier works)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/poe-giveaway.git
   cd poe-giveaway
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**

   a. Go to your [Supabase Dashboard](https://app.supabase.com/)

   b. Navigate to the SQL Editor

   c. Copy and run the contents of `supabase/schema.sql`

   This will create:
   - `giveaways` table for storing giveaway information
   - `entries` table for participant entries
   - Necessary indexes for performance
   - Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Usage

### Creating a Giveaway

1. Click "Create Giveaway" on the homepage
2. Fill in the giveaway details:
   - Your POE name (creator name)
   - Giveaway title
   - Description (optional)
   - Select currencies and quantities
   - Toggle "Require Reddit" if you want mandatory Reddit verification
3. Click "Create Giveaway"
4. **Save your password!** This is the only time you'll see it. You'll need it to manage the giveaway.
5. Share the generated URL with participants

### Joining a Giveaway

1. Visit a giveaway URL
2. Enter your POE character name
3. (Optional) Enter Reddit username and profile link if required
4. Review your entry in the confirmation modal
5. Click "Confirm Entry"
6. You'll see a success message with Pepe animation

### Managing a Giveaway

1. Click "Manage Giveaway" on the giveaway page
2. Enter the creator password you saved
3. Click "Select Winner" to randomly choose a winner
4. The winner will be displayed with a crown icon

## 🔒 Security Features

- **IP-based Duplicate Prevention** - Each IP can only enter a giveaway once
- **Username Uniqueness** - Participant names must be unique per giveaway
- **Reddit Verification** - Optional Reddit profile requirement
- **Password Protection** - Only creators can manage their giveaways
- **Row Level Security** - Database-level access controls
- **Input Validation** - Server-side and client-side validation

## 🗂️ Project Structure

```
poe-giveaway/
├── app/                          # Next.js app directory
│   ├── api/                     # API routes
│   │   └── entries/            # Entry creation API
│   ├── create-giveaway/        # Giveaway creation page
│   ├── giveaway/[slug]/        # Individual giveaway page
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                  # React components
│   ├── button/                 # Reusable button component
│   ├── currency-card/          # Currency display card
│   ├── entry-confirmation-modal/ # Entry confirmation
│   ├── giveaway-selector/      # Winner selection UI
│   ├── password-modal/         # Password modals
│   └── quantity-selector/      # Currency quantity picker
├── data/                        # Static data
│   └── currency.json           # POE currency definitions
├── lib/                         # Utility libraries
│   ├── hooks/                  # Custom React hooks
│   ├── supabase/              # Supabase clients
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
├── public/                      # Static assets
│   ├── data/img/              # Currency and UI images
│   └── font/                  # Custom fonts
├── supabase/                    # Supabase configuration
│   └── schema.sql             # Database schema
└── ...config files
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com/new)
3. Add your environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- Self-hosted with PM2 or Docker

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please open an issue with:
- A clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

## 💡 Feature Requests

Have an idea? Open an issue with the `enhancement` label and describe:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Path of Exile community for inspiration
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Vercel](https://vercel.com/) for hosting and Next.js
- All contributors who help improve this project

## 📞 Support

- 📧 Open an issue for bug reports or feature requests
- 💬 Join discussions in the Issues tab
- ⭐ Star this repo if you find it useful!

## 🗺️ Roadmap

- [ ] Twitch SSO integration for stream giveaways
- [ ] Email notifications for winners
- [ ] Advanced analytics dashboard
- [ ] Multiple winner selection
- [ ] Giveaway templates
- [ ] Public giveaway directory
- [ ] Discord webhook integration
- [ ] Customizable giveaway themes

---

Made with ❤️ for the Path of Exile community
