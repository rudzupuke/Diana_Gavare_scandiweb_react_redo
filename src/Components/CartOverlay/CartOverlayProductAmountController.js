import { Component } from "react";

class CartOverlayProductCountController extends Component {
    render() {
        return (
            <div className="cart-overlay__item-count-controller">
                <button
                    className="cart-overlay__item-count-button"
                    onClick={() =>
                        this.props.addToCart(
                            this.props.productId,
                            this.props.attributeType,
                            this.props.selectedAttribute
                        )
                    }
                >
                    +
                </button>
                <span className="cart-overlay__item-count">
                    {this.props.count}
                </span>
                <button
                    className="cart-overlay__item-count-button"
                    onClick={() =>
                        this.props.removeFromCart(this.props.uniqueId)
                    }
                >
                    -
                </button>
            </div>
        );
    }
}

export default CartOverlayProductCountController;
