import {Linking} from 'react-native';

export const handlePrivacy = privacyPolicy => {
  Linking.openURL(privacyPolicy);
};
export const handleTerms = termsOfUsee => {
  Linking.openURL(termsOfUsee);
};
export const handleEULA = EULA => {
  Linking.openURL(EULA);
};

export const openWhatsapp = EULA => {
  Linking.openURL('https://wa.me/message/25TFKHZCA36UP1');
};
