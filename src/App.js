import { Router } from "@reach/router";

import Feed from "./pages/feed";
import About from "./pages/about";

function App() {
  return (
    <Router>
      <Feed path="/"/> 
		  <About path="/about"/>
    </Router>
  );
}

export default App;
