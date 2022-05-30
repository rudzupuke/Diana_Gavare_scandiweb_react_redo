import { Component } from "react";

class AddToCartButton extends Component {
    render() {
        return (
            <button
                className="pdp-add-to-cart-button"
                onClick={this.props.handleClick}
            >
                Add to cart
            </button>
        );
    }
}

export default AddToCartButton;
