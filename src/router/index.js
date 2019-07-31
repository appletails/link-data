import React, { Component } from 'react'
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import Header from '../layout/Header';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import routeConfig from './routeConfig';
import styles from './router.less';

class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <ScrollToTop>
          <Route render={(_this = this) => _this.location.pathname === '/' ? '' : <Header />} />
          <Route render={(_this = this) => _this.location.pathname === '/' ? '' : <Nav />} />
          <div className={styles.main}>
            <Switch>
              {
                routeConfig.map((item, i) =>
                  <Route exact path={item.path} component={item.component} key={i} />)
              }
              <Redirect to="/" />
            </Switch>
          </div>
          <Footer />
        </ScrollToTop>
      </HashRouter>
    )
  }
}

export default Routes