import { Component } from "react";
import { Link } from "react-router-dom";

class Button extends Component {
    state = {};
    render() {
        return (
            <Link
                className={`button--${this.props.buttonType}`}
                to={this.props.path}
                onClick={this.props.handleClick}
            >
                {this.props.text}
            </Link>
        );
    }
}

export default Button;
