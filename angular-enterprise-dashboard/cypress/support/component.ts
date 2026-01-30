// ***********************************************************
// This support file is loaded before all component tests
// Use this for component-specific setup
// ***********************************************************

// Import Cypress commands
import './commands';

// Import global styles for component testing
import '../../src/styles.scss';

// Mount command for Angular components
import { mount } from 'cypress/angular';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
