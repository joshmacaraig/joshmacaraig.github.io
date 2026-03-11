# Josh Macaraig — Portfolio

Personal site for showcasing my product engineering work, shipped projects, and creative playgrounds (games, experiments, and builds). It highlights my journey, skills, and hands-on demos such as the React arcade.

## Technologies Used

- React.js
- Tailwind CSS
- Framer Motion for animations
- React Router for navigation
- React Icons

## Project Structure

- `src/components` — Each major section (Hero, About, Experience, Skills, Projects, Playground, Contact) lives in its own folder.
- `src/data` — Centralized data for personal info, skills, and project metadata.
- `src/components/Games` — Mini games and experiments that are also showcased inside the app.

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/joshmacaraig/joshmacaraig.github.io.git
   cd joshmacaraig.github.io
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

## Deployment

This portfolio is set up to be deployed to GitHub Pages. To deploy:

```
npm run deploy
```

## Customize

1. Update `src/data/personal.js`, `skills.js`, and `projects.js` with your own information.
2. Swap out images or add new ones inside `public/assets/images`.
3. Adjust components or styling inside `src/components` / `src/styles` to make it your own.

## License

This project is open source and available under the MIT License.
