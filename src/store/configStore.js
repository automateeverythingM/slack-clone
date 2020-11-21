import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension";
import { rootReducer } from "./reducers/rootReducer";
const store = createStore(rootReducer, composeWithDevTools());


const StoreProvider = ({children})=> <Provider store={store}>{children}</Provider>;

    export default StoreProvider;