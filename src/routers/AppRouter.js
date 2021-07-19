import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import LayoutHeader from "../components/layout/header/header"
import CreateResource from "../page/create-resource/createResource"
import Home from "../page/home"
import ListAllResources from "../page/list-resource/list-all-resources"
import MyResources from "../page/my-resources/myResource"
import SingleResource from "../page/single-resource/singleResource"
import PendingResources from "../page/pending-resource/pendingResource"
import UserManagement from "../page/user-management/userManagement"
import EditResource from "../page/edit-resource/editResource"
import ListTagsIguales from "../page/list-tagsIguales/list-tagsIguales"

export const AppRouter = () => {
    return (
        <Router>
            {/* Aqui se muestra elheader )(nav) */}
            <LayoutHeader>
                <Switch>
                    <Route path='/create-resource' exact component={CreateResource} />
                    <Route path='/my-resource' exact component={MyResources} />
                    <Route path='/pending-resource' exact component={PendingResources} />
                    <Route path='/users' exact component={UserManagement} />
                    <Route path='/edit-resource' exact component={EditResource} />
                    <Route path='/resources-tags' exact component={ListTagsIguales} />
                    <Route path='/all-resource' exact component={ListAllResources} />
                    <Route path='/single-resource/:id' exact component={SingleResource} />
                    <Route path='/' exact component={Home} />
                </Switch>
            </LayoutHeader>
        </Router>
    )
}