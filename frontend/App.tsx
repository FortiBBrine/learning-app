
import {PaperProvider} from "react-native-paper";
import React from "react";
import Navigator from "./navigation/Navigator";
import "./language/i18n";

export default function App() {

    return (
        <PaperProvider>
            <Navigator />
        </PaperProvider>
  );
}
