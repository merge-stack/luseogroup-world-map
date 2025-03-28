import { StrictMode } from 'react'
import { createRoot, Root } from 'react-dom/client'
import './index.css'
import App from './App.js'

let reactRoot: Root | null = null;

function
  renderApp(container: HTMLElement) {
  reactRoot = createRoot(container);

  reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

// Expose the render function globally
(window as any).MyViteApp = {
  render: renderApp,
};