// import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bgTr from './bg.json';
import enTr from './en.json';

const initI18n = async () => {
  // let savedLng = await AsyncStorage.getItem('lng');
  // if (!savedLng) savedLng = 'bg';
  const savedLng = 'bg';

  i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTr },
      bg: { translation: bgTr },
    }, 
    lng: savedLng,
    fallbackLng: 'bg',
    supportedLngs: ['bg', 'en'],
    interpolation: {
      escapeValue: false,
    },
  });
}

initI18n();

export default i18n;