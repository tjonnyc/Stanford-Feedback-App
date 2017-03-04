'use strict';

// Import Libraries
import { StyleSheet } from 'react-native';

// Import Styles
import { container } from './common/container_styles';
import { inputText } from './common/input_styles';
import { buttonText } from './common/button_styles';

const styles = StyleSheet.create({
	container,
	buttonText,
	lowWeight: {
		fontWeight: '300',
		fontSize: 16,
		textDecorationLine: 'underline',
	},
	text: {
		fontSize: 16
	},
	inputText: {
		...inputText,
		marginTop: 20
	}
});

export default styles;
