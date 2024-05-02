import React, {useEffect, useState} from 'react';
import {getExamLinks, getUrlsLinksTerms} from '../api/newApis';
import {useDispatch} from 'react-redux';
import {dispatch_ExamLinks, dispatch_TermLinks} from '../redux/actions';

const MainContext = React.createContext();

export const MainProvider = ({children}) => {
  const dispatch = useDispatch();
  const [notitfyScreen, setNotifyScreen] = useState(0);
  const [refreshExamStates, setRefreshExamStates] = useState(0);

  const getAllLinkTerms = async () => {
    const links = await getUrlsLinksTerms();
    const examlinks = await getExamLinks();
    dispatch(dispatch_ExamLinks(examlinks));
    dispatch(dispatch_TermLinks(links));
  };

  useEffect(() => {
    getAllLinkTerms();
  }, []);

  return (
    <MainContext.Provider
      value={{
        notitfyScreen,
        setNotifyScreen,
        setRefreshExamStates,
        refreshExamStates,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
