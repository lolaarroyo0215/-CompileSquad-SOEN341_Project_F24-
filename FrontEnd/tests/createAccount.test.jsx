import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateAccount from '../src/CreateAccount';

describe('createAccount component', () => {
  it('renders the Gina Cody School Peer Assessment heading', () => {
    render(
      <BrowserRouter>
        <CreateAccount />
      </BrowserRouter>
    );

    // Assert that the main heading is present
    expect(screen.getByText(/Gina Cody School Peer Assessment/i)).toBeDefined();
    expect(screen.getByText(/Create account/i)).toBeDefined();
  });
});