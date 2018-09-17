import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NewOutgoingComponent extends Component {

    static propTypes = {
        onAddOutgoing: PropTypes.func.isRequired
    };

    state = {
        newOutgoing: ''
    };

    render() {
        return (
            <form className="new-outgoing" onSubmit={this.addOutgoing}>
                <input id="outgoing-text" name="outgoingName" type="text" placeholder="Neue Ausgabe erfassen"
                       autoComplete="on"
                       value={this.state.newOutgoing}
                       onChange={this.onChange}
                />
                <button id="add-button" className="add-button">+</button>
            </form>
        );
    }

    onChange = (e) => {
        this.setState({newOutgoing: e.target.value});
    }

    addOutgoing = (e) => {
        e.preventDefault();
        this.props.onAddOutgoing(this.state.newOutgoing);
        this.setState({newOutgoing: ''});
    }
}

export default NewOutgoingComponent;