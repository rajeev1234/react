import React,{Suspense, lazy} from "react"
import { Redirect } from "react-router"
import App from './App'
import { BrowserRouter, Switch, Route } from 'react-router-dom';


const Routes = () => (
  <main>
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
      

        <Redirect from="*" to="/app/page-not-found" />
      </Switch>
      </BrowserRouter>
  </main>
);

export default Routes;