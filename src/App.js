import { Router } from "@reach/router";

import Feed from "./components/feed";

function App() {
  return (
    <Router>
      <Feed path="/" /> 
    </Router>
  );
}

export default App;
