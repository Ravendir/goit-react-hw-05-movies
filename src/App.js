import React, { Suspense } from "react";
import styles from "./App.module.css";
import Loader from "./Components/loader/Loader";
import { Route, NavLink, Switch } from "react-router-dom";
import { mainRoutes } from "./routes/mainRoutes";

const App = () => (
  <div className={styles.App}>
    <nav>
      <ul className={styles.list}>
        {mainRoutes.map((route) => {
          return route.name ? (
            <li key={route.path}>
              <NavLink
                exact={route.exact}
                to={route.path}
                className={styles.app}
                activeClassName={styles.acvive}
              >
                {route.name}
              </NavLink>
            </li>
          ) : null;
        })}
      </ul>
    </nav>
    <Suspense fallback={<Loader />}>
      <Switch>
        {mainRoutes.map((route) => (
          <Route
            exact={route.exact}
            path={route.path}
            component={route.component}
            key={route.path}
          />
        ))}
      </Switch>
    </Suspense>
  </div>
);

export default App;
