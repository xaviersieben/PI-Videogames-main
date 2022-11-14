import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import HomePage from "./Components/HomePage";
import DetailVideo from "./Components/DetailVideo";
import CreateVideo from "./Components/CreateVideo";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <div className="App">
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/videogames/:id" component={DetailVideo}></Route>
            <Route exact path="/videogames" component={CreateVideo}></Route>
          </div>
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
