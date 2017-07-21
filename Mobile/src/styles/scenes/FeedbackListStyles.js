// Import Libraries
import { StyleSheet } from 'react-native';

// Import Styles
import { container } from '../common/container_styles';

const styles = StyleSheet.create({
  container,
  background: {
    flex: 1,
    width: null,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  	categoryText:{
    textAlign:'center',
    color:'white',
    fontWeight:'600',
    margin:5,
  },
});

export default styles;
