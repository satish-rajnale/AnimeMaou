import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./components/About"
import Home from "./components/Home";


function App() {

  // const [recents, setRecents] = useState([]);



  // const getRecents = async() => {
  //   const temp = await fetch()
  //                         .then(res => res.json())

  //       setRecents(temp.anime.slice(0,5));
  // }
  // console.log(recents)



  return (
    <Router>
  
     
    
    
       
         <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
          <Home />
          </Route>
        </Switch>
       
     

    </Router>
  );
}

export default App;
