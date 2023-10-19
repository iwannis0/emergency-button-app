import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Animated, Text, Image} from 'react-native';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import PropTypes from 'prop-types';
import Subtitle from '../Subtitle/Subtitle';

const ExpandableContainer = ({expanded, no_items, children}) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: !expanded ? no_items * 94 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [expanded, height, no_items]);

  return (
    <Animated.View>
      {!expanded && ( // Conditional rendering
        <>{children}</>
      )}
    </Animated.View>
  );
};

const ExpandableView = props => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={styles.toggle}>
        <Text style={[globalStyle.descriptionBlack, styles.toggleText]}>
          {props.title}
        </Text>
      </TouchableOpacity>
      <View style={styles.arrow_container}>
        <Image
          style={[
            styles.arrow_image,
            {
              transform: [{rotate: isExpanded ? '90deg' : '-90deg'}],
            },
          ]}
          source={require('../../assets/images/forNavigation/Arrow.png')}
        />
      </View>
      <ExpandableContainer expanded={isExpanded} no_items={2}>
        {props.children}
      </ExpandableContainer>
    </View>
  );
};

ExpandableView.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default ExpandableView;
