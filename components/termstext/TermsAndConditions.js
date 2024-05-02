import React from 'react';
import getStyles from './style';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Text, View} from 'react-native';
import {handlePrivacy, handleTerms} from '../../utils/DefaultMethods';
import {RFS, isPAD} from '../../dimensions/dimensions';

const TermsConditions = ({modal = false, signup}) => {
  const {t} = useTranslation();
  const {lang, termsLinks} = useSelector(state => state.userReducer);
  const styles = getStyles(lang);
  return (
    <>
      {signup ? (
        <>
          <View style={styles.termsConditionContainer1}>
            <Text
              style={modal ? styles.termsConditions1 : styles.termsConditions2}>
              {t('overAll.premiumTerms')}
              {lang == 'en' && (
                <Text
                  style={{fontFamily: 'Assistant-Bold'}}
                  onPress={() => handlePrivacy(termsLinks.policy)}>
                  {' '}
                  {t('overAll.privacy')}{' '}
                </Text>
              )}
              {lang == 'en' && <Text>{t('overAll.and')} </Text>}
              {lang == 'en' && (
                <Text
                  style={{fontFamily: 'Assistant-Bold'}}
                  onPress={() => handleTerms(termsLinks.terms)}>
                  {t('overAll.terms')}{' '}
                </Text>
              )}
            </Text>
            {lang == 'he' && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: RFS(10)}}>.Estatest </Text>
                <Text
                  onPress={() => handleTerms(termsLinks.terms)}
                  style={{fontFamily: 'Assistant-Bold', fontSize: RFS(10)}}>
                  {t('overAll.terms')}
                </Text>
                <Text style={styles.termsConditions1}>{t('overAll.and')}</Text>
                <Text
                  onPress={() => handlePrivacy(termsLinks.policy)}
                  style={{fontFamily: 'Assistant-Bold', fontSize: RFS(10)}}>
                  {t('overAll.policy')}
                </Text>
                <Text style={styles.termsConditions1}>
                  {t('overAll.consent')}
                </Text>
              </View>
            )}
          </View>
        </>
      ) : (
        <>
          <View style={styles.termsConditionContainer1}>
            <Text
              style={modal ? styles.termsConditions1 : styles.termsConditions2}>
              {t('overAll.premiumTerms')}
              {lang == 'en' && (
                <Text
                  style={{fontFamily: 'Assistant-Bold'}}
                  onPress={() => handlePrivacy(termsLinks.policy)}>
                  {' '}
                  {t('overAll.privacy')}{' '}
                </Text>
              )}
              {lang == 'en' && <Text>{t('overAll.and')} </Text>}
              {lang == 'en' && (
                <Text
                  style={{fontFamily: 'Assistant-Bold'}}
                  onPress={() => handleTerms(termsLinks.terms)}>
                  {t('overAll.terms')}{' '}
                </Text>
              )}
            </Text>
            {lang == 'he' && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: RFS(10)}}>.Estatest </Text>
                <Text style={{fontSize: RFS(10)}}> של</Text>
                <Text
                  onPress={() => handleTerms(termsLinks.terms)}
                  style={{fontFamily: 'Assistant-Bold', fontSize: RFS(10)}}>
                  {t('overAll.terms')}
                </Text>
                <Text
                  style={[
                    styles.termsConditions1,
                    {fontSize: isPAD ? RFS(10) : RFS(12)},
                  ]}>
                  {''}
                  ול{' '}
                </Text>
                <Text
                  onPress={() => handlePrivacy(termsLinks.policy)}
                  style={{fontFamily: 'Assistant-Bold', fontSize: RFS(10)}}>
                  {t('overAll.policy')}
                </Text>
                <Text style={[styles.termsConditions1, {fontSize: RFS(10)}]}>
                  {t('overAll.consent')}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default TermsConditions;
