import React from 'react';
import {Switch,Route} from "react-router-dom";
import Map from "./views/map";
import Sidebar from "./views/sidebar";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path="/" render={props =>
                <div>
                    <Map/>
                    <Sidebar/>
                </div>
            }/>
        </Switch>
    </div>
  );
}

export default App;
