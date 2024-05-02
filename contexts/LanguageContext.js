import React, {createContext, useState, useContext} from 'react';
import i18n from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchLanguage} from '../redux/actions'
export const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export const LanguageProvider = ({children}) => {
  const {lang} = useSelector(state => state.userReducer);
  const [language, setLanguage] = useState(lang);
  const dispatch = useDispatch();
  
  const onChangeLanguage = lng => {
    setLanguage(lng);
    dispatch(dispatchLanguage(lng));
    i18n.changeLanguage(lng);
  };

  const value = {
    language,
    onChangeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
