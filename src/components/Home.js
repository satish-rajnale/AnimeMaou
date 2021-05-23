import React from 'react'
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
function Home({props}) {
    
    return (
      <Router>
        <Switch>
        <div className="App">
        <Header />
        <div className="content-wrap">
        <Sidebar topAnime={props.topAnime} />
        <MainContent
         props={props}
        />
        </div>
        </div>
        </Switch>
        </Router>
    )
}

export default Home
