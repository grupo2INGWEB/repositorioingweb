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
import ListAllResources from './page/list-resource/list-all-resources';
import MyResources from './page/my-resources/myResource';

const App = () => {
  return (
    <Router>
      <LayoutHeader>
        <Switch>
          <Route path='/' exact component={Home} />
            {/* <Home />
          </Route> */}
          <Route path='/create-resource' exact component={CreateResource}/>
            {/* <CreateResource />
          </Route> */}
          <Route path='/single-resource' exact component={SingleResource}/>
          <Route path='/all-resource' exact component={ListAllResources}/>
          <Route path='/my-resource' exact component={MyResources}/>
            {/* <SingleResource />
          </Route> */}
        </Switch>
      </LayoutHeader>
    </Router>

  );
}

export default App;
