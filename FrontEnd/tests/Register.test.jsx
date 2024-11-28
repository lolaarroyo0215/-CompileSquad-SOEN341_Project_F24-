import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../src/Register';

describe('Register component', () => {
  it('renders the Gina Cody School Peer Assessment heading', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Assert that the main heading is present
    expect(screen.getByText(/gina cody school peer assessment/i)).toBeDefined();
  });
});