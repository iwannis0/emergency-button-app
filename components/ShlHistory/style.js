import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
  },
  listItemText: {
    fontSize: 18,
  },
  rightAction: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  flipCard: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
  },
});

export default styles;
