# ✅ TaskFlow Pro - Todo List

> A modern task management web application built with **React 19 + Vite + Tailwind CSS**. Organize your tasks with smooth animations and an intuitive interface.

🔗 **Live Demo:** https://irajfatima.github.io/Todo-list/

---

## ✨ Features

| Feature | Details |
|---------|---------|
| ➕ **Add Tasks** | Create new tasks quickly |
| ✏️ **Edit Tasks** | Modify task titles and descriptions |
| ❌ **Delete Tasks** | Remove completed or unwanted tasks |
| ✓ **Mark Complete** | Toggle task completion status |
| 🎨 **Smooth Animations** | Framer Motion for polished transitions |
| 🎯 **Priority Categories** | Organize tasks by color-coded categories |
| 🌈 **Modern UI** | Tailwind CSS for responsive design |
| 💾 **Persistent Storage** | Tasks stored locally in browser |
| 🚀 **Fast Performance** | Vite for instant HMR and optimized builds |

---

## 🏗️ Project Structure

```
Todo-list/
├── index.html                 # App entry point (TaskFlow Pro title)
├── package.json              # Dependencies & npm scripts
├── vite.config.js            # Vite configuration (base: /Todo-list/)
├── tailwind.config.js        # Tailwind CSS config with color safelist
├── postcss.config.js         # PostCSS configuration
├── eslint.config.js          # ESLint rules
├── src/
│   ├── main.jsx              # React app bootstrap (StrictMode)
│   ├── App.jsx               # Main app component (24.5KB)
│   ├── App.css               # Tailwind imports
│   ├── index.css             # Global styles & root variables
│   └── assets/               # Asset files
└── public/                   # Static assets
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **UI Framework** | React | 19.1.0 |
| **Build Tool** | Vite | 7.0.4 |
| **Styling** | Tailwind CSS | 3.4.17 |
| **Animations** | Framer Motion | 12.23.11 |
| **Icons** | Lucide React | 0.532.0 |
| **Utilities** | classnames | 2.5.1 |
| **UUID Generation** | uuid | 11.1.0 |
| **Linting** | ESLint | 9.30.1 |
| **CSS Processing** | PostCSS | 8.5.6 |
| **Deployment** | GitHub Pages | - |

---

## 📦 Dependencies

### Production
- **react** (19.1.0) - UI library
- **react-dom** (19.1.0) - React DOM rendering
- **framer-motion** (12.23.11) - Animation library
- **lucide-react** (0.532.0) - Icon library
- **classnames** (2.5.1) - Conditional className utility
- **uuid** (11.1.0) - Unique ID generation

### Development
- **vite** (7.0.4) - Build tool with HMR
- **@vitejs/plugin-react** (4.6.0) - React plugin for Vite
- **tailwindcss** (3.4.17) - Utility-first CSS framework
- **postcss** (8.5.6) - CSS transformation
- **autoprefixer** (10.4.21) - Vendor prefix automation
- **eslint** (9.30.1) - Code linting
- **gh-pages** (6.3.0) - GitHub Pages deployment

---

## 🎨 Styling

### Tailwind CSS Configuration
- **Content paths**: Scans `.jsx`, `.js`, `.html` files
- **Safelist**: Pre-includes dynamic color classes
  - Background colors: `bg-{red|green|blue|yellow|purple|gray|indigo}-{50-900}`
  - Text colors: `text-{red|green|blue|yellow|purple|gray|indigo|white}-{50-900}`
  - Border colors: `border-{red|green|blue|yellow|purple|gray|indigo}-{50-900}`
- **Gradients**: Gradient utilities (e.g., `bg-gradient-to-br`)
- **Backdrop Effects**: `backdrop-blur-sm` support

### Color System
- **Root Colors** (from index.css):
  - Text: `rgba(255, 255, 255, 0.87)`
  - Background: `#242424` (dark)
  - Font: System UI, Avenir, Helvetica, Arial, sans-serif

---

## 📝 Core Files

**App.jsx** (24,587 bytes)
- Main application component
- All task management logic
- UI rendering and state management

**index.css**
- Tailwind directives (base, components, utilities)
- Root CSS variables and font configuration
- System font stack
- Dark mode color scheme

**App.css**
- Tailwind CSS imports

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) **v18 or higher**
- npm (comes with Node.js)

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/IrajFatima/Todo-list.git
cd Todo-list

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Then open your browser to **http://localhost:5173**

---

## 📦 Available Scripts

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Create optimized production build (→ dist/)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint on all files
npm run predeploy # Build before deployment (auto-runs before deploy)
npm run deploy    # Deploy to GitHub Pages (dist/ folder)
```

---

## 🏗️ Build for Production

```bash
npm run build     # Generates optimized files in /dist
npm run preview   # Preview production build locally
npm run deploy    # Build & deploy to GitHub Pages
```

---

## 🔧 Vite Configuration

```javascript
// vite.config.js
{
  plugins: [react()],
  base: '/Todo-list/'  // GitHub Pages base path
}
```

The app is deployed to `/Todo-list/` subdirectory on GitHub Pages.

---

## 🎯 Application Features

### Task Management
- **Create Tasks** - Add new tasks with UUID
- **Edit Tasks** - Modify existing task content
- **Delete Tasks** - Remove tasks permanently
- **Mark Complete** - Toggle done/pending status

### Color Categories
- Tasks can be assigned to color-coded categories
- Supports: red, green, blue, yellow, purple, gray, indigo
- Dynamic color class generation

### Animations
- **Framer Motion** for smooth transitions
- Entry/exit animations for tasks
- Button hover effects
- Staggered animations for task lists

---

## 💾 Data Storage

Tasks are stored in **browser localStorage**:
- Data persists between sessions
- No backend required
- Automatic sync on state changes

---

## 🌐 GitHub Pages Deployment

### Automated Deployment
```bash
npm run deploy
```

This command:
1. Runs `npm run build` (creates `/dist`)
2. Deploys `/dist` to `gh-pages` branch
3. Published at: `https://irajfatima.github.io/Todo-list/`

### Manual Setup (if needed)
1. Enable GitHub Pages in repository settings
2. Set source branch to `gh-pages`
3. Base path is automatically `/Todo-list/`

---

## 📱 Responsive Design

- **Tailwind CSS** - Responsive utilities for all screen sizes
- **Mobile-first** approach
- Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`

---

## ♿ Accessibility

- **Semantic HTML** - Proper heading hierarchy
- **Keyboard Navigation** - Full keyboard support
- **ARIA Labels** - For screen readers
- **Color Contrast** - Meets WCAG standards

---

## 🚀 Performance

- **Vite** - Instant HMR during development
- **React 19** - Latest React optimizations
- **Code Splitting** - Automatic with Vite
- **Tree Shaking** - Removes unused code
- **CSS Optimization** - Tailwind purges unused styles

---

## 🔒 Security

- **StrictMode** - Highlights potential issues
- **No external API calls** - Data stored locally
- **Client-side only** - No backend vulnerabilities

---

## 📄 License

This project is open source and available for educational purposes.

---

**Start managing your tasks with TaskFlow Pro!** ✨📋
