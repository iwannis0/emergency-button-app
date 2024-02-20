import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../assets/styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {horizontalScale} from '../../assets/styles/scaling';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import {shLinksState} from '../../features/recoil/atoms/Shlinks/shlinksState';
import MySHLink from './components/MySHLink/MySHLink';
import ViewLink from './components/viewLink/ViewLink';
import EditLink from './components/editLink/EditLink';

const ShlScreen = ({children}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const [myLinks, setMyLinks] = useRecoilState(shLinksState);
  const [info, setInfo] = React.useState({});
  const [action, setAction] = React.useState('view');

  const renderViewLink = () => {
    return <ViewLink {...info} />;
  };

  const renderEditLink = () => {
    return <EditLink {...info} />;
  };

  const addNewLink = () => {
    // Define the new link object
    const newLink = {
      id: '1', // Generate a unique ID
      label: 'Link number 1',
      shlink: 'sdfdsaf adsfadfasf adsfdsf',
      passcode: '1234',
      dateGenerated: Date.now(),
      expirationDate: Date.now(),
    };
    // Update the state with the new link
    setMyLinks(oldLinksArray => {
      return {
        ...oldLinksArray,
        links: [...oldLinksArray.links, newLink],
      };
    });
  };

  const clearData = () => {
    // Set the state to its initial state or an empty state
    setMyLinks({links: []});
  };

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

      {modalVisible && (
        <ModalComponent
          title={''}
          visibility={modalVisible}
          onClose={() => setModalVisible(false)}>
          {action === 'view' ? renderViewLink() : renderEditLink()}
        </ModalComponent>
      )}

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
            addNewLink();
          }}>
          <Text style={globalStyle.buttonText}>{t('shl.create')}</Text>
        </TouchableOpacity>
        <Text style={styles.myLinksText}>{t('shl.previous')}</Text>
        <FlatList
          data={myLinks.links}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <MySHLink
              label={item.label}
              viewLink={() => {
                setAction('view');
                setModalVisible(true);
                setInfo({
                  id: item.id,
                  label: item.label,
                  shlink: item.shlink,
                  passcode: item.passcode,
                  expirationDate: item.expirationDate,
                  dateGenerated: item.dateGenerated,
                });
              }}
              editLink={() => {
                setAction('edit');
                setModalVisible(true);
                setInfo({
                  id: item.id,
                  label: item.label,
                  shlink: item.shlink,
                  passcode: item.passcode,
                  expirationDate: item.expirationDate,
                  dateGenerated: item.dateGenerated,
                });
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShlScreen;
