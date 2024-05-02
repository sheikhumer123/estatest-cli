import React from 'react';
import getStyles from './style';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {handlePrivacy, handleTerms} from '../../utils/DefaultMethods';
import {RFS} from '../../dimensions/dimensions';

const SignUpTerms = ({modal = false, signup}) => {
  const {t} = useTranslation();
  const {lang, termsLinks} = useSelector(state => state.userReducer);
  const styles = getStyles(lang);
  return (
    <>
      {signup ? (
        <>
          <View
            style={[
              styles.termsConditionContainer1,
              {
                flexDirection: lang == 'he' ? 'row-reverse' : 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.termsConditions1}>
              {t('overAll.signUptermsline1')}
            </Text>

            <Text
              style={{fontFamily: 'Assistant-Bold'}}
              onPress={() => handlePrivacy(termsLinks.policy)}>
              {' '}
              {t('overAll.policy')}
            </Text>

            <Text>{t('overAll.and')}</Text>
            <Text
              style={{fontFamily: 'Assistant-Bold'}}
              onPress={() => handlePrivacy(termsLinks.terms)}>
              {t('overAll.terms')}{' '}
            </Text>
            <Text> {t('overAll.of')}</Text>
            <Text>.Estatest </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SignUpTerms;
