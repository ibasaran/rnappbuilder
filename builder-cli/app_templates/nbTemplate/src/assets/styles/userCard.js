import {StyleSheet} from 'react-native';
import colors from './colors';
import {Platform} from 'react-native';

const styles = StyleSheet.create({
    elevationLow: {
        height: 400,
        width: '100%',
        flex: 1,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});

export default styles;