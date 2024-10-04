import globalReducer from '@/state';
import { api } from '@/state/api';
import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useRef } from 'react';
import {
  Provider,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem(_key: string): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(
      _key: string,
      value: string
    ): Promise<string> {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem(_key: string): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global'],
};
const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: [
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
          ],
        },
      }).concat(api.middleware),
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<
  typeof makeStore
>;
export type RootState = ReturnType<
  AppStore['getState']
>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

/* PROVIDER */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(
    storeRef.current
  );

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
