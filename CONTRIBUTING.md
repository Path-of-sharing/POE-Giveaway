# Contributing to POE Giveaway

First off, thank you for considering contributing to POE Giveaway! It's people like you that make this project better for the entire Path of Exile community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**
- **Title**: Clear and descriptive title
- **Description**: Detailed description of the issue
- **Steps to Reproduce**:
  1. Step one
  2. Step two
  3. ...
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**:
  - OS: [e.g., macOS 14.0, Windows 11]
  - Browser: [e.g., Chrome 120, Firefox 121]
  - Node Version: [e.g., 20.10.0]
  - Next.js Version: [from package.json]

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List any similar features** in other giveaway platforms
- **Include mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something isn't working
- `enhancement` - New feature or request

### Pull Requests

We actively welcome your pull requests! Here's how to contribute code:

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Ensure the test suite passes** (when available)
6. **Submit your pull request**

## 🛠️ Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/POE-Giveaway.git
   cd POE-Giveaway
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Set up the database**
   - Create a Supabase project
   - Run the SQL from `supabase/schema.sql` in the SQL Editor
   - Update your `.env.local` with the credentials

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## 🔄 Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Update the documentation** for any new features
3. **Follow the commit message guidelines** (see below)
4. **Ensure your code passes linting**:
   ```bash
   npm run lint
   ```
5. **Make sure your code builds successfully**:
   ```bash
   npm run build
   ```
6. **Keep your PR focused** - one feature or fix per PR
7. **Reference any related issues** in your PR description
8. **Request review** from maintainers
9. **Be responsive** to feedback and requested changes

### PR Title Format

Use conventional commits format:
- `feat: Add currency search feature`
- `fix: Resolve duplicate entry bug`
- `docs: Update installation instructions`
- `style: Format code with prettier`
- `refactor: Simplify winner selection logic`
- `test: Add tests for entry validation`
- `chore: Update dependencies`

## 💻 Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Define proper types** - avoid `any` when possible
- **Use interfaces** for object shapes
- **Export types** from `lib/types/` when reusable

### React/Next.js

- **Use functional components** with hooks
- **Follow the App Router** conventions
- **Keep components small** and focused
- **Use Server Components** by default, mark Client Components with `"use client"`
- **Prefer composition** over prop drilling

### Code Style

- **Use Tailwind CSS** for styling
- **Follow existing patterns** in the codebase
- **Keep it simple** - avoid over-engineering
- **Comment complex logic** but prefer self-documenting code
- **Use meaningful variable names**

### File Organization

```
- Components go in /components with index.tsx
- Pages go in /app following App Router structure
- API routes go in /app/api
- Utilities go in /lib/utils
- Types go in /lib/types
- Hooks go in /lib/hooks
```

### Code Formatting

We use ESLint for linting. Run before committing:
```bash
npm run lint
```

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

### Examples
```bash
feat(giveaway): add email notification for winners

fix(entries): prevent duplicate IP addresses from entering

docs(readme): add database setup instructions

refactor(components): simplify button component props
```

## 🧪 Testing

Currently, the project doesn't have a test suite, but we welcome contributions to add testing!

**Future testing priorities:**
- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for critical user flows
- Component tests for React components

To contribute tests:
1. Set up a testing framework (Jest, Vitest, Playwright recommended)
2. Add tests for your new feature or bug fix
3. Update this section with testing instructions

## 🎨 UI/UX Guidelines

- **Follow the POE aesthetic** - dark theme, gold accents
- **Keep it responsive** - mobile-first approach
- **Accessibility matters** - use semantic HTML, ARIA labels
- **Test on multiple browsers** - Chrome, Firefox, Safari
- **Use the custom fonts** - Cinzel and Cinzel Decorative for headings

## 📚 Documentation

- **Update README.md** for user-facing changes
- **Add inline comments** for complex logic
- **Update .env.example** if adding environment variables
- **Document new components** with JSDoc comments
- **Update CHANGELOG.md** (when we add one)

## 🐛 Known Issues

Check the [Issues](https://github.com/Path-of-sharing/POE-Giveaway/issues) page for known bugs and feature requests.

## ❓ Questions?

- Open a [Discussion](https://github.com/Path-of-sharing/POE-Giveaway/discussions) for general questions
- Check existing [Issues](https://github.com/Path-of-sharing/POE-Giveaway/issues) first
- Reach out to maintainers if needed

## 🙏 Recognition

Contributors will be recognized in:
- The README.md contributors section
- GitHub's contributors page
- Release notes for significant contributions

Thank you for contributing to POE Giveaway! 🎉
