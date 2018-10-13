import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Admin from '../views/admin'
import home from '../views/Home';
import order from '../views/Order'
import not from '../views/404/Not';
import echarts_bar from '../views/echarts/bar';
import echarts_pie from '../views/echarts/pie';
import orderDetail from '../views/detail/index'
  class Router extends Component {
      render() {
        return <div>
            <HashRouter>
              <div>
                < Switch>
                <Route path ="/orderDetail/:id" component = {orderDetail}> </Route>
                <Admin>
                  <Switch>
                  <Route path="/admin/home" component={home} />
                  <Route path="/admin/order" component={order} />
                  <Route path="/admin/echarts/bar" component={echarts_bar} />
                  <Route path="/admin/echarts/pie" component={echarts_pie} />
                  <Route component={not} />
                  <Redirect from="/" to="/admin/home" />
                  </Switch>
                </Admin>
                 <Route component={not} />
            </Switch>
              </div>
            </HashRouter>;
          </div>;
      }
}
  export default Router;
