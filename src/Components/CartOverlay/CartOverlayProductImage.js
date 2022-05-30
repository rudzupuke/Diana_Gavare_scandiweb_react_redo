import { Component } from "react";

class CartOverlayProductImage extends Component {
    render() {
        return (
            <img
                className="cart-overlay__item-image"
                src={this.props.image}
                alt={this.props.productName}
            />
        );
    }
}

export default CartOverlayProductImage;
