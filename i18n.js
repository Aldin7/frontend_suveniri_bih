import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { supportedWaapiEasing } from 'framer-motion';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to MERNify!",
          welcomeSarajevo: "Welcome to Sarajevo!",
          login: "Login",
          register: "Register",
          hey: "Hey there!",
          enteryour: "Enter your username and password to Login",
          shopNow: "Shop Now",
          explore: "Explore our products",
          sales:"Souvenirs sales",
          follow:" Follow us on social media!",
          callus:"Call us",
          contact:"Contact us:",
          subscribe:"Subscribe",
          offersAndUpdates:"Be the first to hear about new products, exclusive events and offers.",
          haveAccount: "Don't have an account?",
          enterEmail: "Enter your email address",
          enterPassword: "Enter your password",
          support:"Support",
          login:"Login",
          register:"Register",
          rights:"All rights reserved.",
          follow:"Follow Us",
          searchProducts:"Search products...",
          name:"Name"

        }
      },
      bs: {
        translation: {
          welcome: "Dobrodošli na MERNify!",
          login: "Prijava",
          register: "Registracija",
          hey: "Hej tamo!",
          enteryour: "Unesite svoje korisničko ime i šifru za prijavu",
          welcomeSarajevo: "Dobrodošli u Sarajevo!",
          shopNow: "Kupi sada",
          explore: "Istražite naše proizvode",
          sales:"Prodaja suvenira",
          follow:" Pratite nas na društvenim mrežama!",
          callus:"Call us",
          contact:"Kontaktirajte nas:",
          subscribe:"Pretplatite se",
          offersAndUpdates:"Budite prvi koji će saznati za nove proizvode, ekskluzivne događaje i ponude.",
          haveAccount: "Nemate račun?",
          enterEmail: "Unesite svoju email adresu",
          enterPassword: "Unesite svoju šifru",
          support:"Podrška",
          login:"Prijava",
          register:"Registracija",
          rights:"Sva prava zadržana.",
          follow:"Pratite nas",
          searchProducts:"Pretraži proizvode...",
          name:"Ime"
        }
      }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
