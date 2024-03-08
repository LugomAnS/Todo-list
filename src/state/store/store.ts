import {taskReducer} from '../../components/reducers/tasks/reducer';
import {listReducer} from '../../components/reducers/todoLists/reducer';
import {combineReducers, legacy_createStore} from 'redux';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: listReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;