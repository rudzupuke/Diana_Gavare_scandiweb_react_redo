import { Component } from "react";

class CartOverlayProductName extends Component {
    render() {
        return (
            <>
                <h2 className="cart-overlay__item-brand">
                    {this.props.brandName}
                </h2>
                <h2 className="cart-overlay__item-name">
                    {this.props.productName}
                </h2>
            </>
        );
    }
}

export default CartOverlayProductName;
