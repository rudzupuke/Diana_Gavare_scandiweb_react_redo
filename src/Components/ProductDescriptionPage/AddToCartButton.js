import { Component } from "react";

class AddToCartButton extends Component {
    render() {
        return (
            <button
                className="pdp-add-to-cart-button"
                onClick={this.props.handleClick}
                disabled={this.props.inStock ? false : true}
            >
                Add to cart
            </button>
        );
    }
}

export default AddToCartButton;
