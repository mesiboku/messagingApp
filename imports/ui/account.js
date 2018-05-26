import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Accounts extends Component {

    render() {

        return(
            <div>
                Accounts UI
            </div>
        );
    }

}


export default withTracker(() => {
    return {
        //tasks: Tasks.find({}).fetch(),
    };
})(Accounts);