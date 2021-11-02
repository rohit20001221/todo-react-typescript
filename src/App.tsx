import "./App.css";
import Home from "./components/Home";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
