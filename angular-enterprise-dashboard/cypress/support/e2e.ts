// ***********************************************************
// This support file is loaded before all E2E tests
// Use this to add custom commands and global configuration
// ***********************************************************

// Import Cypress commands
import './commands';

// Prevent TypeScript errors on custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      // Add custom command types here as you create them
      // Example: login(email: string, password: string): Chainable<void>;
    }
  }
}

// Example: Hide fetch/XHR requests from command log (optional)
// const app = window.top;
// if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
//   const style = app.document.createElement('style');
//   style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
//   style.setAttribute('data-hide-command-log-request', '');
//   app.document.head.appendChild(style);
// }
