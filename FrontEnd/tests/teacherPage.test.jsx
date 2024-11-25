import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainTeacherPage from '../src/mainTeacherPage';

describe('MainStudentPage component', () => {
  it('renders the View My Grades and View My Teams buttons', () => {
    render(
      <BrowserRouter>
        <MainTeacherPage />
      </BrowserRouter>
    );

    // Assert that the main heading is present
    expect(screen.getByText(/Create Classes/i)).toBeDefined();
    expect(screen.getByText(/Create Teams/i)).toBeDefined();
  });
});