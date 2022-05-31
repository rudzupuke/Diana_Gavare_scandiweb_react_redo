import { Component } from "react";
import { CartStore } from "../../Stores/CartStore";
import { CurrencyStore } from "../../Stores/CurrencyStore";

import { toJS } from "mobx";
import { observer } from "mobx-react";
import CartOverlayProduct from "./CartOverlayProduct";
import Button from "./Button";

class CartOverLayContainer extends Component {
    state = {};

    addToCart = (productId, attributeType, attribute) => {
        CartStore.addProductToCart(productId, attributeType, attribute);
    };

    removeFromCart = (uniqueId) => {
        CartStore.removeProductFromCart(uniqueId);
    };
    render() {
        return (
            <>
                <h3 className="cart-overlay__cart-heading">
                    My bag,{" "}
                    <span className="cart-overlay__cart-heading--thin">
                        {CartStore.itemsInCart} items
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
                            selectedAttribute={toJS(product.attribute)}
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
            </>
        );
    }
}

export default observer(CartOverLayContainer);
