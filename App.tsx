import "./gesture-handler";
import React from "react";
import AppNavigator from "./src/Navigation";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingProvider } from "./src/context/LoadingContext";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingProvider>
          <AppNavigator />
        </LoadingProvider>
      </PersistGate>
    </Provider>
  );
}
export default App;
