import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../assets/styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {horizontalScale} from '../../assets/styles/scaling';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import ResourceSelection from './components/ResourceSelection';
import ShlGeneration from './components/ShlGeneration';
import {useRecoilState} from 'recoil';
import {summaryResourcesState} from '../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import {SummaryResources} from '../../features/recoil/atoms/SummaryResources/SummaryResources';
import {FlatList} from 'react-native-gesture-handler';
import {IShl} from '../../features/recoil/interfaces/IShl';
import {shlHistoryState} from '../../features/recoil/atoms/ShlHistory/shlHistoryState';
import MySHLink from './components/MySHLink';

const ShlScreen = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [summaryResources, setSummaryResources] = useRecoilState(
    summaryResourcesState,
  );
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);
  console.log('shlHistory', shlHistory);
  return (
    <SafeAreaView style={styles.container}>
      <ModalComponent
        title={t('shl.info-title')}
        visibility={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}>
        <ScrollView>
          <Text style={[globalStyle.descriptionBlackL2, styles.infoContainer]}>
            {t('shl.info')}
          </Text>
        </ScrollView>
      </ModalComponent>

      <ModalComponent
        title={
          !summaryResources.ready
            ? t('shl.selection-title')
            : t('shl.generation-title')
        }
        visibility={modalVisible}
        onClose={() => {
          setSummaryResources(new SummaryResources(false, []));
          setModalVisible(false);
        }}>
        <View>
          {!summaryResources.ready ? (
            <ResourceSelection />
          ) : (
            <ShlGeneration closeModal={setModalVisible} />
          )}
        </View>
      </ModalComponent>

      <View style={styles.infoIconContainer}>
        <TouchableOpacity
          onPress={() => {
            setInfoModalVisible(true);
          }}>
          <FontAwesomeIcon
            icon={faInfo}
            color="#212121"
            size={horizontalScale(16)}
          />
        </TouchableOpacity>
      </View>

      <View style={globalStyle.marginTop60}>
        <TouchableOpacity
          style={[globalStyle.Button, globalStyle.fullyCentered]}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={globalStyle.buttonText}>{t('shl.create')}</Text>
        </TouchableOpacity>
        <Text style={styles.myLinksText}>{t('shl.previous')}</Text>
        <FlatList
          data={shlHistory.shLinks}
          keyExtractor={(item: IShl) => item.shl}
          renderItem={({item}) => {
            return <MySHLink data={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShlScreen;
