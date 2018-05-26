import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from 'react-sidebar';


import Header from "./header";
import Register from "./register";
import Home from "./home";
import Msg from "./msg";

class App extends Component {

    constructor(props) {
        super(props);
    }

        render() {
        return (
            <Router>
                <div className="container-fluid">
                    <div className="row">
                        <Header />
                    </div>
                    <div className="row">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/msg/:id" render={props => <Msg {...props}/>} />
                        {/*<Route path="/about" component={About} />
                        <Route path="/topics" component={Topics} />*/}
                    </div>
                </div>
            </Router>
        );
    };

}


export default withTracker(() => {
    return {
        //tasks: Tasks.find({}).fetch(),
    };
})(App);