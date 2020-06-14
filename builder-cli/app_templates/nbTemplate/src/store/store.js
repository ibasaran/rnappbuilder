
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

export default class ReduxStore {


    static reduxStore = null;

    constructor() {
        this.store = createStore(reducers,
            applyMiddleware(
              reduxThunk,
            ),
        );
    }


    static getInstance() {
        if (ReduxStore.reduxStore == null) {
            ReduxStore.reduxStore = new ReduxStore();
        }
        return ReduxStore.reduxStore;
    }

}