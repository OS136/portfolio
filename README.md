# React Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features dynamic GitHub repository integration, smooth animations, and mobile-first design.

## 🚀 Live Demo

Visit the live site: [https://your-username.github.io/portfolio](https://your-username.github.io/portfolio)

## ✨ Features

- **Responsive Design**: Looks great on all devices and screen sizes
- **GitHub Integration**: Automatically showcases your repositories with live data
- **Interactive Sections**: Smooth animations and hover effects
- **Project Carousel**: Featured projects with slideshow functionality
- **Skills Visualization**: Interactive skill bars with proficiency levels
- **Contact Form**: Pre-filled email client integration
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Loading**: Optimized builds and efficient code splitting
- **Accessible**: Built with accessibility best practices

## 🛠️ Built With

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **GitHub API** - Dynamic repository data
- **GitHub Actions** - Automated deployment
- **GitHub Pages** - Free hosting

## 🏗️ Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── Layout.tsx     # Main layout wrapper
│   │   ├── Navigation.tsx # Navigation header
│   │   ├── Hero.tsx       # Hero section
│   │   ├── Experience.tsx # Work experience timeline
│   │   ├── Skills.tsx     # Skills grid with categories
│   │   ├── Projects.tsx   # Projects showcase
│   │   ├── ProjectCard.tsx # Individual project cards
│   │   ├── ProjectCarousel.tsx # Featured projects carousel
│   │   ├── Contact.tsx    # Contact form and info
│   │   └── Section.tsx    # Reusable section wrapper
│   ├── hooks/             # Custom React hooks
│   │   └── useGitHubRepos.ts # GitHub API integration
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # Type definitions
│   ├── data/              # Content configuration
│   │   └── content.ts     # All content data
│   ├── App.tsx            # Main app component
│   ├── index.tsx          # React entry point
│   └── index.css          # Global styles
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # Deployment workflow
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Fork and Clone

1. Fork this repository to your GitHub account
2. Clone your fork:
   ```bash
   git clone https://github.com/OS136/portfolio.git
   cd resume
   ```

### 2. Install Dependencies

```bash
npm install
```

### 3. Update Content

Edit `src/data/content.ts` with your information:

- **Personal Information**: Name, title, contact details
- **Work Experience**: Companies, positions, descriptions
- **Skills**: Technologies with proficiency levels
- **Projects**: Portfolio projects with links
- **Social Links**: GitHub, LinkedIn, etc.
- **GitHub Username**: For automatic repository fetching

### 4. Development

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
```

Creates an optimized build in the `build/` folder.

## 📝 Configuration

### Personal Information

Update your details in `src/data/content.ts`:

```typescript
export const resumeData: ContentData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your.email@example.com",
    // ... other fields
  },
  // ... other sections
};

// Update your GitHub username for automatic repo fetching
export const GITHUB_USERNAME = "your-github-username";
```

### GitHub Integration

To display your repositories:

1. Update `GITHUB_USERNAME` in `src/data/content.ts`
2. Make sure your repositories are public
3. Add good descriptions to your repos for better display

### Deployment Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"

2. **Update URLs**:
   - In `package.json`: Update homepage URL
   - In `public/index.html`: Update meta tags
   - In deployment workflow if needed

3. **Push to Main Branch**:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

The site will automatically deploy via GitHub Actions!

## 🎨 Customization

### Colors and Styling

Modify `tailwind.config.js` to change:

- Primary colors
- Fonts
- Animations
- Breakpoints

### Adding New Sections

1. Create component in `src/components/`
2. Import and add to `src/App.tsx`
3. Update navigation in `src/components/Navigation.tsx`

### Custom Animations

Add custom animations in `src/index.css` or `tailwind.config.js`.

## 📱 Mobile Optimization

The site is mobile-first with:

- Responsive navigation menu
- Touch-friendly interactions
- Optimized images and fonts
- Fast loading on mobile networks

## 🔧 Troubleshooting

### GitHub API Rate Limits

If you hit GitHub API limits, the repos section will show cached data or graceful fallbacks.

### Build Issues

1. Check Node.js version (18+ recommended)
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Deployment Issues

1. Check GitHub Actions logs in repository Actions tab
2. Verify GitHub Pages is enabled in repository settings
3. Ensure branch protection rules don't block deployments

## 🤝 Contributing

Feel free to:

- Report bugs
- Suggest features
- Submit pull requests
- Star the repository if helpful!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👏 Acknowledgments

- Built with Create React App
- Styled with Tailwind CSS
- Icons from Heroicons
- Fonts from Google Fonts
- Hosted on GitHub Pages

---

