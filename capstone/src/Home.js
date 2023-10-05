import React, {useEffect, useState} from 'react';
import LanguageApi from "./Api"
import DetectLanguage from './DetectLanguage.js';
import languageCodeToName from './languageMappings'; 
import './Home.css';




function Home(){

    const [sourceText, setSourceText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('fr');
    const [translatedText, setTranslatedText] = useState('');
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        async function fetchLanguages(){
            try {
                const availableLanuages = await LanguageApi.getLanguages();
                setLanguages(availableLanuages);
            } catch (error){
                console.error('Error fetching languages:', error)
            }
        }
        fetchLanguages();
    }, []);

    useEffect(() => {
        localStorage.setItem('sourceText', sourceText);
        localStorage.setItem('sourceLang', sourceLang);
        localStorage.setItem('targetLang', targetLang);
    }, [sourceText, sourceLang, targetLang]);

    useEffect(() => {
        const savedSourceText = localStorage.getItem('sourceText');
        const savedSourceLang = localStorage.getItem('sourceLang');
        const savedTargetLang = localStorage.getItem('targetLang');
    
        if (savedSourceText) {
          setSourceText(savedSourceText);
        }
    
        if (savedSourceLang) {
          setSourceLang(savedSourceLang);
        }
    
        if (savedTargetLang) {
          setTargetLang(savedTargetLang);
        }
      }, []);


    const handleTranslate = async () => {
        let retries = 3;
        while (retries > 0){
      try {
        const translation = await LanguageApi.getTranslations(
            sourceText, 
            sourceLang, 
            targetLang
            );
        setTranslatedText(translation);
        return;
      } catch (error) {
        console.error("Error translating text:", error);
        if(error.response && error.response.status === 429){
            await new Promise(resolve => setTimeout(resolve, 1000));
            retries --;
        } else {
            break;
        }
        }
      }
      console.error("max retries exceeded.")
    };
  
    return (
        <div className="homepage">
        <div className='Home'>
            <h1 className='title'>Translation App</h1>
            <textarea className='text-input'
                placeholder="Enter text to translate"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
            />
            <select className='select-lang' value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            {languages.map((language) => (
                <option key={language.code} value = {language.code}>
                    {languageCodeToName[language.code] || language.code}
                </option>
            ))}
            </select>
            <select className='select-lang' value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            {languages.map((language) => (
                <option key={language.code} value = {language.code}>
                    {languageCodeToName[language.code] || language.code}
                </option>
            ))}
            </select>
            <button onClick={handleTranslate}>Translate</button>
            
        <div className='translation-result'>
            <h2>Translation Result:</h2>
        <p>{translatedText} </p> 

        </div>
        <DetectLanguage />
        </div>

        </div>
    )

}

export default Home;