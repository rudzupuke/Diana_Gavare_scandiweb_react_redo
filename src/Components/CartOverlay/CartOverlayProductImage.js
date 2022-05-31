import { Component } from "react";

class CartOverlayProductImage extends Component {
    render() {
        return (
            <div className="cart-overlay__item-image-wrapper">
                <img
                    className="cart-overlay__item-image"
                    src={this.props.image}
                    alt={this.props.productName}
                />
            </div>
        );
    }
}

export default CartOverlayProductImage;
