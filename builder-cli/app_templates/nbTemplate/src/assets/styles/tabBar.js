import {StyleSheet} from 'react-native';
import colors from './colors';

const styles = StyleSheet.create({
    tabBarItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: colors.white,
        paddingHorizontal: 10,
      },
      tabBarIcon: {
        width: 28,
        height: 28,
      },
      tabBarIconFocused: {

        color: colors.blue,
      },
});

export default styles;