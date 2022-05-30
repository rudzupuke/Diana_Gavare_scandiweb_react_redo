import { Component } from "react";

class OrderButton extends Component {
    state = {};
    render() {
        return <button className="order-button">{this.props.text}</button>;
    }
}

export default OrderButton;
