import "./App.css";
import Home from "./components/Home";
import { StoreProvider } from "./context/StoreContex";
import { initialState, reducer } from "./reducer";

function App() {
  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        <Home />
      </div>
    </StoreProvider>
  );
}

export default App;
