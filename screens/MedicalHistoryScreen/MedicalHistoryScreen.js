import React from 'react';
import {View} from 'react-native';
import ExpandableView from '../../components/ExpandableView/ExpandableView';
import styles from '../AlertsScreen/style';
import globalStyle from '../../assets/styles/globalStyle';
import {useTranslation} from 'react-i18next';

const MedicalHistoryScreen = () => {
  const {t} = useTranslation();

  return (
    <View style={styles.background}>
      <View style={globalStyle.marginTop60}>
        <ExpandableView title={t('Epidimiological History')} />
        <ExpandableView title={t('Medical Personal History')} />
        <ExpandableView title={t('Gynecological History')} />
        <ExpandableView title={t('Social History')} />
        <ExpandableView title={t('Immunization')} />
        <ExpandableView title={t('Plan of Care')} />
      </View>
    </View>
  );
};

export default MedicalHistoryScreen;
