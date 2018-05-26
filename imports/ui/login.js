import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';



class Login extends Component {

    render() {

        return(
            <div>
                Login UI
            </div>
        );
    }

}

export default withTracker(() => {
    return {
        //tasks: Tasks.find({}).fetch(),
    };
})(Login);