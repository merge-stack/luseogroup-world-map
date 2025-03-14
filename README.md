# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Prerequisites

- Node.js v18.17.0  
  On macOS, you can install it via Homebrew:
  ```bash
  brew install node@18
  brew link --overwrite node@18 --force
  ```
  Alternatively, download from the official Node.js website.

## Environment Variables

Create a `.env` file in the project root with the following content:

```env
// .env file
VITE_REACT_APP_MAP_API_KEY=your_mapbox_api_key_here
```

## Installation and Running

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
