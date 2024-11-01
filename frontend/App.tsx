
import {Provider} from "react-redux";
import {store, useAppSelector} from "./store/store";
import {PaperProvider} from "react-native-paper";
import React from "react";
import Navigator from "./navigation/Navigator";

export default function App() {

    return (
      <Provider store={store}>
          <PaperProvider>
              <Navigator />
          </PaperProvider>
      </Provider>
  );
}
