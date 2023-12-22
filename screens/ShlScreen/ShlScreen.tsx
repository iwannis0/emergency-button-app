import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './styles';
import globalStyle from '../../assets/styles/globalStyle';
import {horizontalScale} from '../../assets/styles/scaling';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import MySHLink from './components/MySHLink/MySHLink';
import Loading from '../../components/Loading/Loading';
import ShlGeneration from './components/ShlGeneration/ShlGeneration';
import ResourceSelection from './components/ResourceSelection/ResourceSelection';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {shlHistoryState} from '../../features/recoil/atoms/ShlHistory/shlHistoryState';
import {IShl} from '../../features/recoil/interfaces/IShl';
import {SummaryResources} from '../../features/recoil/atoms/SummaryResources/SummaryResources';
import {summaryResourcesState} from '../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import {getLinks} from './api/shlFunctions';

const ShlScreen = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [shlLog, setShlLog] = useState<IShl[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isResetComplete, setIsResetComplete] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [user, _] = useRecoilState(userState);
  const resetSHLHistory = useResetRecoilState(shlHistoryState);
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);
  const [summaryResources, setSummaryResources] = useRecoilState(
    summaryResourcesState,
  );

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
      console.log(shlHistory.shLinks);
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
