import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import ExpandableView from '../../../../components/ExpandableView/ExpandableView';
import Procedures from './Procedures';
import CurrentProblems from './CurrentProblems';
import ResolvedProblems from './ResolvedProblems';
import FunctionalStatus from './FunctionalStatus';

const ProblemsAndProcedures = () => {
  const {t} = useTranslation();

  return (
    <View>
      <ExpandableView title={t('Current Problems')} expandLevel={2}>
        <CurrentProblems />
      </ExpandableView>
      <ExpandableView
        title={t('Resolved or Inactive Problems')}
        expandLevel={2}>
        <ResolvedProblems />
      </ExpandableView>
      <ExpandableView title={t('Procedures')} expandLevel={2}>
        <Procedures />
      </ExpandableView>
      <ExpandableView title={t('Functional Status')} expandLevel={2}>
        <FunctionalStatus />
      </ExpandableView>
    </View>
  );
};

export default ProblemsAndProcedures;
