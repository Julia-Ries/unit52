import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import SupportedLanguages from './SupportedLanguages';
import languageCodeToName from './languageMappings';


describe('SupportedLanguages Component', () => {
    it('renders without errors', () => {
      render(<SupportedLanguages />);
      // Ensure that the component renders without errors
      expect(screen.getByText('Supported Languages')).toBeInTheDocument();
    });
  
    it('displays a list of supported languages', () => {
      render(<SupportedLanguages />);
  
      // Check if each language code and name is displayed
      Object.entries(languageCodeToName).forEach(([code, name]) => {
        expect(screen.getByText(code)).toBeInTheDocument();
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  

  });
  