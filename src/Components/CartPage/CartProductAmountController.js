import { Component } from "react";

import increment from "../../Assets/increment.svg";
import decrement from "../../Assets/decrement.svg";

class CartProductAmountController extends Component {
    render() {
        return (
            <div className="cart-product-amount-controller">
                <button
                    className="cart-product-amount-controller__button"
                    onClick={() =>
                        this.props.addToCart(
                            this.props.productId,
                            this.props.attributeType,
                            this.props.attribute
                        )
                    }
                >
                    <img src={increment} alt="" />
                </button>
                <span className="cart-product-amount-controller__amount">
                    {this.props.productCount}
                </span>
                <button
                    className="cart-product-amount-controller__button"
                    onClick={() =>
                        this.props.removeFromCart(this.props.uniqueId)
                    }
                >
                    <img src={decrement} alt="" />
                </button>
            </div>
        );
    }
}

export default CartProductAmountController;
