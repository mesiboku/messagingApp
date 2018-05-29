import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";

import Conversations from  "./conversation";
import Login from "./login";


class Home extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                    { !this.props.currentUser ? <Login /> : <Conversations  />}
                </div>
            </div>
        );
    }

}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Home);