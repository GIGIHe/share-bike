  import React, { Component } from 'react';
  import {HashRouter,Route,Switch} from 'react-router-dom';
  import Admin from '../views/admin'
  import home from '../views/Home';
  import not from '../views/404/Not';
  class Router extends Component {
      render() {
        return (
          <HashRouter>
            <div>
              <Switch>
                <Route path='/admin' render={()=>
                      <Admin>
                        <Switch> 
                          <Route path='/admin/home' component={home}></Route>              
                          <Route component={not}></Route> 
                      </Switch>
                    </Admin>
                }>
                </Route>
                    <Route component={not}></Route> 
              </Switch>
            </div>
          </HashRouter>
        
        );
      }
    }

  export default Router;
