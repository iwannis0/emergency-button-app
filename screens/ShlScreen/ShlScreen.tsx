import React, {useState, useEffect} from 'react';
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
import {useRecoilState, useResetRecoilState} from 'recoil';
import {summaryResourcesState} from '../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import {SummaryResources} from '../../features/recoil/atoms/SummaryResources/SummaryResources';
import {FlatList} from 'react-native-gesture-handler';
import {IShl} from '../../features/recoil/interfaces/IShl';
import {shlHistoryState} from '../../features/recoil/atoms/ShlHistory/shlHistoryState';
import MySHLink from './components/MySHLink';
import Loading from '../../components/Loading/Loading';
import {getLinks} from './api/getLinks';
import {userState} from '../../features/recoil/atoms/User/userState';

const ShlScreen = () => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [summaryResources, setSummaryResources] = useRecoilState(
    summaryResourcesState,
  );
  const [user, _] = useRecoilState(userState);
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);
  const [shlLog, setShlLog] = useState<IShl[]>([]);
  const resetSHLHistory = useResetRecoilState(shlHistoryState);
  const [loading, setLoading] = useState(true);
  const [isResetComplete, setIsResetComplete] = useState(false);

  useEffect(() => {
    setShlLog(shlHistory.shLinks);
    resetSHLHistory();
    setIsResetComplete(true);
  }, []);

  useEffect(() => {
    if (!isResetComplete) {
      return;
    }

    const fetchShlHistory = async () => {
      try {
        setLoading(true);
        const data = await getLinks(user.token, user.id);

        if (!data || !data.data) {
          throw new Error('No data received from the server.');
        }

        const newShlHistory = data.data.map((item: IShl) => {
          const foundShl = shlLog.find((shl: IShl) => shl.shl === item.shl);
          return {
            shl: item.shl,
            label: item.label,
            creationDate: item.creationDate,
            expirationDate: item.expirationDate,
            accessCount: item.accessCount,
            failedAccessCount: item.failedAccessCount,
            passcode: foundShl ? foundShl.passcode : 'Not saved in device',
          };
        });

        setShlHistory((prev: any) => ({
          ...prev,
          shLinks: [...prev.shLinks, ...newShlHistory],
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShlHistory();
  }, [isResetComplete]);

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
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default ShlScreen;
