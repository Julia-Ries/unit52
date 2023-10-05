import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Home from './Home';


describe('Home Component', () => {
    beforeEach(() => {
      // Reset the mock functions before each test
      LanguageApi.getLanguages.mockReset();
      LanguageApi.getTranslations.mockReset();
    });
  
    it('renders without errors', () => {
      render(<Home />);
      // Ensure that the component renders without errors
      expect(screen.getByText('Translation App')).toBeInTheDocument();
    });
  
    it('fetches available languages on mount', async () => {
      LanguageApi.getLanguages.mockResolvedValue([{ code: 'en', name: 'English' }, { code: 'fr', name: 'French' }]);
      render(<Home />);
      
      // Wait for the component to fetch languages
      await waitFor(() => {
        expect(LanguageApi.getLanguages).toHaveBeenCalledTimes(1);
      });
  
      // Check if the fetched languages are displayed
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('French')).toBeInTheDocument();
    });
  
    it('translates text when the translate button is clicked', async () => {
      LanguageApi.getTranslations.mockResolvedValue('Translated Text');
      render(<Home />);
      
      // Enter text and trigger translation
      const textArea = screen.getByPlaceholderText('Enter text to translate');
      fireEvent.change(textArea, { target: { value: 'Hello' } });
      fireEvent.click(screen.getByText('Translate'));
  
      // Wait for the translation to complete
      await waitFor(() => {
        expect(LanguageApi.getTranslations).toHaveBeenCalledTimes(1);
      });
  
      // Check if the translated text is displayed
      expect(screen.getByText('Translation Result:')).toBeInTheDocument();
      expect(screen.getByText('Translated Text')).toBeInTheDocument();
    });
  

  });
  