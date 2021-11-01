import "./App.css";
import Home from "./components/Home";
import { StoreProvider } from "./context/StoreContex";
import { TodoProvider } from "./context/TodoContex";
import { initialState, reducer } from "./reducer";

function App() {
  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
      <TodoProvider>
        <div className="App">
          <Home />
        </div>
      </TodoProvider>
    </StoreProvider>
  );
}

export default App;
