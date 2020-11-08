import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from 'react-router-dom';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <Header></Header>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/exercise1">
              <Exercise1 />
            </Route>
            <Route path="/exercise2">
              <Exercise2 />
            </Route>
            <Route path="/exercise3">
              <Exercise3 />
            </Route>
            <Route path="/exercise4">
              <Exercise4 />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="selected" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="selected" to="/exercise1">
          exercise1
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="selected" to="/exercise2">
          exercise2
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="selected" to="/exercise3">
          exercise3
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="selected" to="/exercise4">
          exercise4
        </NavLink>
      </li>
    </ul>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Exercise1() {
  return (
    <div>
      <h2>Exercise1</h2>
    </div>
  );
}

function Exercise2() {
  return (
    <div>
      <h2>Exercise2</h2>
    </div>
  );
}

function Exercise3() {
  return (
    <div>
      <h2>Exercise3</h2>
    </div>
  );
}

function Exercise4() {
  return (
    <div>
      <h2>Exercise4</h2>
    </div>
  );
}
