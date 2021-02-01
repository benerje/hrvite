import {createStore} from 'redux'
import Department from './reducers/reducer'

const store = createStore(Department,
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store