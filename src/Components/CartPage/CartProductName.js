import { Component } from "react";

class CartProductName extends Component {
    state = {};
    render() {
        return (
            <>
                <h2 className="cart-product-brand">{this.props.brandName}</h2>
                <h2 className="cart-item-name">{this.props.productName}</h2>
            </>
        );
    }
}

export default CartProductName;
