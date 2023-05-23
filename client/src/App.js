import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./views/Landing/Landing";
import Create from "./views/Create/Create";
import Details from "./components/Details/Details";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" render={(props) => {
    if (props.location.pathname !== "/" && !props.location.pathname.startsWith("/details/")) {
      return <Navbar />;
          }
        }} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={Create} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;
