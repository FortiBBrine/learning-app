
import {PaperProvider} from "react-native-paper";
import React from "react";
import Navigator from "./navigation/Navigator";
import "./language/i18n";
import {en, registerTranslation, ukUA} from "react-native-paper-dates";

export default function App() {

    registerTranslation("ua", ukUA);
    registerTranslation("uk", en);

    return (
        <PaperProvider>
            <Navigator />
        </PaperProvider>
  );
}
