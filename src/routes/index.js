import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Admin from '../views/admin'
import home from '../views/Home';
import order from '../views/Order'
import not from '../views/404/Not';
import echarts from '../views/echarts/index';
import orderDetail from '../views/detail/index'
  class Router extends Component {
      render() {
        return <div>
            <HashRouter>
              <div>
                <Admin>
                  <Switch>
                  <Route path="/admin/home" component={home} />
                  <Route path="/admin/order" component={order} />
                  <Route path="/admin/echarts" component={echarts} />
                  <Route component={not} />
                  <Redirect from="/" to="/admin/home" />
                  </Switch>
                </Admin>
                <Route path ="/orderDetail/:id" component = {orderDetail}> </Route>
              </div>
            </HashRouter>;
          </div>;
      }
}
  export default Router;
