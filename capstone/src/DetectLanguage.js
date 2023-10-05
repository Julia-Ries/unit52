import React, {useEffect, useState} from 'react';
import LanguageApi from "./Api"
import languageCodeToName from './languageMappings'; 

import './DetectLanguage.css';


function DetectLangauge(){
    const [sourceText, setSourceText] = useState('');
    const [detectedLanguage, setDetectedLanguage] = useState('');
    const [languages, setLanguages] = useState([]);


    useEffect(() => {
        async function fetchLanguages(){
            try {
                const availableLanguages = await LanguageApi.getLanguages();
                setLanguages(availableLanguages);
            } catch (error){
                console.error('Error fetching languages:', error)
            }
        }
        fetchLanguages();
    }, []);

    useEffect(() => {
    async function detectLanguage(){
            try {
                const detectionInfo = await LanguageApi.detectLanguage(sourceText);
                const detectedCode = detectionInfo[0][0].language;
                setDetectedLanguage(detectedCode);
            } catch (error){
                console.error('Error detecting language:', error)
            }
        }
        if(sourceText) {
            detectLanguage();
        }
    }, [sourceText]);

    const getLanguageName = (code) => {
        return languageCodeToName[code] || code;
      };

    const handleSubmit = async () => {
        if(sourceText) {
            try {
                const detectionInfo = await LanguageApi.detectLanguage(sourceText);
                const detectedCode = detectionInfo[0][0].language;
                setDetectedLanguage(detectedCode);
            } catch (error){
                console.error('Error detecting language:', error)
            }
        }
    };

    return (
        <div className='detect-language'>
              <h3 className='title'>Language Detection</h3>
            <textarea className='text-input'
                placeholder="Enter text to detect its language"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
            />
            {/* <button onclick={handleSubmit}>Submit</button> */}

            {detectedLanguage && (
        <p>Detected Language : {getLanguageName(detectedLanguage)}</p>
      )}
        </div>
    );
};


export default DetectLangauge;