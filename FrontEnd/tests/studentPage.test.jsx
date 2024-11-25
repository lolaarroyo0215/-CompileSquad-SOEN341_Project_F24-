import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainStudentPage from '../src/mainStudentPage';

describe('MainStudentPage component', () => {
  it('renders the View My Grades and View My Teams buttons', () => {
    render(
      <BrowserRouter>
        <MainStudentPage />
      </BrowserRouter>
    );

    // Assert that the main heading is present
    expect(screen.getByText(/View My Grades/i)).toBeDefined();
    expect(screen.getByText(/View My Teams/i)).toBeDefined();
  });
});