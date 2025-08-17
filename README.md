# Let Me Cook - Personal Recipe Diary & Tech Playground

A personal online recipe diary showcasing a collection of favorite recipes. This project serves a dual purpose: acting as a small, personal cookbook and as a playground for experimenting with new web technologies, libraries, and performance optimization techniques.

**Live Site:** [letmecook.cz](https://letmecook.cz)

## About The Project

This application is primarily a digital space to document and share recipes I love to cook. It's designed to be a clean, user-friendly, and accessible interface for my personal collection.

Simultaneously, it functions as my personal **tech playground**. I use this project to test and implement new frontend libraries, explore different approaches to building web applications with Next.js, and continuously focus on optimizing performance and adhering to best practices.

## Key Technologies

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Localization:** [next-international](https://github.com/QuiiBz/next-international) (using i18next)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
*   **Deployment:** [Vercel](https://vercel.com/)

## Core Features

*   **Multi-language Support:** Interface and recipes available in Czech, English, Vietnamese, and Taiwanese.
*   **Accessibility (A11y):** Continuous focus on accessibility, incorporating skip links, semantic HTML, ARIA attributes, and color contrast considerations.
*   **Performance Optimization:** Attention to performance metrics using tools like Vercel Analytics and Speed Insights.
*   **Static Data Approach:** Recipes are stored directly within the codebase (`src/data/recipes/`) as structured TypeScript objects.

## Design Decision: Data Management

Given the project's primary function as a *personal* cookbook with a limited, stable set of recipes, and its secondary function as a *tech playground*, storing recipes directly in the codebase ("hardcoded") was the most practical choice. It avoids the overhead of setting up and maintaining a CMS or database, allowing focus to remain on frontend experimentation and implementation details, while still providing a functional way to handle recipe data for the application's scope.

**Performance:** Performance is actively monitored. You can check the current status using [Google PageSpeed Insights](https://pagespeed.web.dev/analysis?url=https://letmecook.cz).

## Licensing

The source code of this application is licensed under the **MIT License** (see the `LICENSE` file).

The content, including recipe texts and images within the `src/data/recipes/` and `public/images/` directories, is **Copyright (c) 2025 Tomáš Dinh - All Rights Reserved**. You may not reproduce, distribute, or modify the content without explicit permission from the copyright holder.
