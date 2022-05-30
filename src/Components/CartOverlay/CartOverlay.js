import { Component } from "react";
import CartOverLayContainer from "./CartOverLayContainer";

class CartOverlay extends Component {
    componentDidMount() {
        if (this.props.cartOverlayOpen) {
            document.body.style.overflow = "hidden";
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = "unset";
    }

    render() {
        return (
            <div
                className="cart-overlay"
                onClick={this.props.toggleCartOverlay}
            >
                <div className="cart-overlay__container">
                    <div
                        className="cart-overlay__cart"
                        onClick={(e) => {
                            // do not close modal if anything inside modal content is clicked
                            e.stopPropagation();
                        }}
                    >
                        <CartOverLayContainer />
                    </div>
                </div>
            </div>
        );
    }
}

export default CartOverlay;
