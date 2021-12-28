import React from "react";
import { AppProvider } from "./context/context";
import Navigator from "./routes/homeStack";

export default function App() {
  return (
    <AppProvider>
      <Navigator />
    </AppProvider>
  );
}
