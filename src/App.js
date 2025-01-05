import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default App;
