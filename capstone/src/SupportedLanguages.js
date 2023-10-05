import React from 'react';
import languageCodeToName from './languageMappings'; 
import './SupportedLanguages.css';

function SupportedLanguages() {
    return (
      <div className='languages-container'>
        <h2 className='title'>Supported Languages</h2>
        <ul className='languages-list'>
          {Object.entries(languageCodeToName).map(([code, name]) => (
            <li key={code} className='language-item'>
                <span className="language-code">{code}</span>
              <span className="language-name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default SupportedLanguages;