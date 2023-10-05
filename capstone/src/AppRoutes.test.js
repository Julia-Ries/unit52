import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

describe('AppRoutes Component', () => {
  it('renders Home component when path is /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  it('renders DetectLanguage component when path is /detect', () => {
    render(
      <MemoryRouter initialEntries={['/detect']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Detect Language Component')).toBeInTheDocument();
  });

  it('renders SupportedLanguages component when path is /supportedlanguages', () => {
    render(
      <MemoryRouter initialEntries={['/supportedlanguages']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Supported Languages Component')).toBeInTheDocument();
  });
});
