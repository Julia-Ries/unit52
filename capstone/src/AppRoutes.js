import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import DetectLangauge from './DetectLanguage';
import SupportedLanguages from './SupportedLanguages';


function AppRoutes(){
    return (
        <div>
            <Routes>
               <Route exact path='/' Component={Home}/> 
                <Route exact path='/detect' Component={DetectLangauge} />
                <Route exact path='/supportedlanguages' Component={SupportedLanguages} /> 

            </Routes>
        </div>
    )
};


export default AppRoutes;