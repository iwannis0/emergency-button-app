import {useState} from 'react';

export function useModal(initValue = false) {
  const [modalVisible, setModalVisible] = useState(initValue);

  const setTrue = () => setModalVisible(true);
  const setFalse = () => setModalVisible(false);

  return [modalVisible, setModalVisible, setTrue, setFalse];
}
