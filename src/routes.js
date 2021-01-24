import React,{Suspense, lazy} from "react"
import { Redirect } from "react-router"
import App from './App'
import Pay from './components/PayPage'
import { BrowserRouter, Switch, Route } from 'react-router-dom';


const Routes = () => (
  <main>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/pay" component={Pay} />
      

        <Redirect from="*" to="/app/page-not-found" />
      </Switch>
      </BrowserRouter>
  </main>
);

export default Routes;