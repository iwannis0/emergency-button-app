import React, {useState, useEffect} from 'react';
import {View, Text, Animated, FlatList, Pressable, Alert} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {horizontalScale} from '../../assets/styles/scaling';
import ModalComponent from '../ModalComponent/ModalComponent';
import ViewLink from '../../screens/ShlScreen/components/ViewLink/ViewLink';
import {useRecoilState} from 'recoil';
import {shlHistoryState} from '../../features/recoil/atoms/ShlHistory/shlHistoryState';
import {userState} from '../../features/recoil/atoms/User/userState';
import Loading from '../Loading/Loading';
import {IShl} from '../../features/recoil/interfaces/IShl';
import {getLinks, deleteLink} from '../../screens/ShlScreen/api/shlFunctions';

const ListItem = ({item, onDelete}) => {
  const swipeThreshold = 80;
  const [modalVisible, setModalVisible] = useState(false);

  const renderRightActions = (progress, dragX: any) => {
    const opacity = dragX.interpolate({
      inputRange: [-swipeThreshold, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightAction}>
        <Animated.View style={{opacity}}>
          <FontAwesomeIcon
            icon={faTrashCan}
            color="white"
            size={horizontalScale(20)}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <View>
      {modalVisible && (
        <ModalComponent
          title={''}
          visibility={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}>
          <View>
            <ViewLink data={item} />
          </View>
        </ModalComponent>
      )}

      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => onDelete()}
        rightThreshold={swipeThreshold}>
        <Pressable
          style={styles.listItem}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.listItemText}>{item.label}</Text>
        </Pressable>
      </Swipeable>
    </View>
  );
};

const ShlHistory = () => {
  const [shlHistory, setShlHistory] = useRecoilState(shlHistoryState);
  const [user, _] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateHistory = async () => {
      try {
        const data = await getLinks(user.token, user.id);

        if (!data || !data.data) {
          throw new Error('No data received from the server.');
        }
        const updatedList = data.data.map((item: IShl) => {
          const existingItem = shlHistory.shLinks.find(
            shl => shl.shl === item.shl,
          );
          if (existingItem) {
            return {
              ...item,
              passcode: existingItem.passcode,
              accessCount: item.accessCount,
              failedAccessCount: item.failedAccessCount,
            };
          } else {
            return {
              ...item,
              passcode: 'Not stored locally',
            };
          }
        });
        setShlHistory({shLinks: updatedList});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    updateHistory();
  }, []);

  const handleDeleteShl = async (Delete_Link: string) => {
    return await deleteLink(Delete_Link, user.token)
      .then(response => {
        if (!response) {
          throw new Error('Error');
        }

        const updatedLinks = shlHistory.shLinks.filter(
          link => link.shl !== Delete_Link,
        );
        setShlHistory({...shlHistory, shLinks: updatedLinks});
        Alert.alert('Success', 'SHL deleted successfully');
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert('Error', 'Something went wrong');
      });
  };

  return (
    <View>
      <FlatList
        data={shlHistory.shLinks}
        renderItem={({item}) => (
          <ListItem
            item={item}
            onDelete={() => {
              Alert.alert(
                'Delete',
                'Are you sure you want to delete this SHL?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },

                  {text: 'OK', onPress: () => handleDeleteShl(item.shl)},
                ],
                {cancelable: false},
              );
            }}
          />
        )}
      />
      {loading && <Loading />}
    </View>
  );
};

export default ShlHistory;
