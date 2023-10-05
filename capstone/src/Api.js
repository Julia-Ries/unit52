import axios from "axios";
// const baseURL = `http://localhost:5501`

const apiKey = '94793c8562msh22dbcfd661f3fbfp102f82jsn2273b1508c39';
const apiURL = 'https://google-translate1.p.rapidapi.com/language/translate/v2';



const translationApi = axios.create({
  baseURL: apiURL,
  headers: {
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    "X-RapidAPI-Key": apiKey,
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'application/gzip',
  },
});



class LanguageApi{
  static token;

    static async getLanguages(){
      console.log("API URL:", apiURL); 
      try{
        const response = await translationApi.get('/languages');
        const languagesData = response.data.data.languages;
        const transformedLanguages = languagesData.map((language) => ({
          code: language.language,
        }));
        console.log("languages response:", response.data.data.languages)
        return transformedLanguages;
    } catch (error) {
      console.error("error fetching languages", error);
      throw error;
    }
  }
   
    static async getTranslations(text, sourceLanguage, targetLanguage){
      try {
        const response = await translationApi.post(apiURL, {
          q: text,
          source: sourceLanguage,
          target: targetLanguage,
          format: "text",
        });
        return response.data.data.translations[0].translatedText;
      } catch (error){
        console.error("error fetching translations", error);
        throw error;
      }
    }  

    static async detectLanguage(text){
      try {
        const response = await translationApi.post(`${apiURL}/detect`, {
          q: text
        });
        console.log("detection response:", response.data.data.detections)
        return response.data.data.detections;

      }catch (error){
        console.error("error detecting  language", error);
        throw error;
      }
      }



    }

async function fetchAndLogData() {
  try {
    const languages = await LanguageApi.getLanguages();
    const translations = await LanguageApi.getTranslations(
      "hello",
      "en",
      "fr"
    );
    const detections = await LanguageApi.detectLanguage(
      "English is hard, but detectably so"
    );
 
    // You can now work with the fetched data as needed
    console.log("Languages:", languages);
    console.log("Translations:", translations);
    console.log('Detections:', detections);

  } catch (error) {
    // Handle any errors here
    console.error("Error:", error);
  }
}


fetchAndLogData();


export default LanguageApi;


