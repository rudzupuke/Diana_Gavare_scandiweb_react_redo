import { Component } from "react";
import Button from "./Button";
import CartOverlayProduct from "./CartOverlayProduct";

import { CurrencyStore } from "../../Stores/CurrencyStore";
import { CartStore } from "../../Stores/CartStore";
import { observer } from "mobx-react";

class CartOverlay extends Component {
    componentDidMount() {
        if (this.props.cartOverlayOpen) {
            document.body.style.overflow = "hidden";
        }
    }

    componentWillUnmount() {
        document.body.style.overflow = "unset";
    }

    addToCart = (productId, attributeType, attribute) => {
        CartStore.addProductToCart(productId, attributeType, attribute);
    };

    removeFromCart = (uniqueId) => {
        CartStore.removeProductFromCart(uniqueId);
    };

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
                        <h3 className="cart-overlay__cart-heading">
                            My bag,{" "}
                            <span className="cart-overlay__cart-heading--thin">
                                {CartStore.totalProducts} items
                            </span>
                        </h3>
                        <div className="cart-overlay__products-container">
                            {CartStore.cart.map((product) => (
                                <CartOverlayProduct
                                    productId={product.productId}
                                    key={product.uniqueId}
                                    count={product.count}
                                    currencySymbol={CurrencyStore.currency}
                                    productCount={product.count}
                                    selectedAttribute={product.attribute}
                                    uniqueId={product.uniqueId}
                                    addToCart={this.addToCart}
                                    removeFromCart={this.removeFromCart}
                                    attributeType={product.attributeType}
                                />
                            ))}
                        </div>

                        <div className="cart-overlay__total-price">
                            <span>Total</span>{" "}
                            <span>
                                {CurrencyStore.currency} {CartStore.totalPrice}
                            </span>
                        </div>
                        <div className="cart-overlay__buttons">
                            <Button
                                path="/cart"
                                text="View Bag"
                                buttonType="secondary"
                                handleClick={this.props.toggleCartOverlay}
                            />
                            <Button
                                path="#"
                                text="Check Out"
                                buttonType="primary"
                                handleClick={this.props.toggleCartOverlay}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(CartOverlay);
