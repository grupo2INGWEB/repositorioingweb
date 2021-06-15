import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './page/home';
import CreateResource from './page/create-resource/createResource';
import LayoutHeader from './components/layout/header/header';
import SingleResource from './page/single-resource/singleResource';

const App = () => {
  return (
    <Router>
      <LayoutHeader>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/create-resource' exact>
            <CreateResource />
          </Route>
          <Route path='/single-resource' exact>
            <SingleResource />
          </Route>
        </Switch>
      </LayoutHeader>
    </Router>

  );
}

export default App;
