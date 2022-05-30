import { Component } from "react";

class ShowMoreButton extends Component {
    state = {};
    render() {
        return (
            <button
                className="show-more-button"
                onClick={this.props.handleClick}
            >
                Show More
            </button>
        );
    }
}

export default ShowMoreButton;
