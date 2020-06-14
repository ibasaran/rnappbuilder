import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import ReduxStore from './src/store/store';

const storeInst = ReduxStore.getInstance();
const store = storeInst.store;


export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </Provider>
    );
}