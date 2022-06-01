import { Component } from "react";

import { CurrencyStore } from "../../Stores/CurrencyStore";
import { CartStore } from "../../Stores/CartStore";
import OrderButton from "./OrderButton";
import { observer } from "mobx-react";

class CartProductTotalPrice extends Component {
    state = {};
    render() {
        return (
            <div className="cart-product-total-price">
                <div>
                    <p className="cart-product-total-price__tax">
                        Tax {CartStore.tax.tax}%:{" "}
                        <span className="cart-product-total-price__tax--bold">
                            {CurrencyStore.currency}
                            {CartStore.tax.calculatedTax}
                        </span>
                    </p>
                    <p className="cart-product-total-price__qty">
                        Quantity:{" "}
                        <span className="cart-product-total-price__qty--bold">
                            {CartStore.totalProducts}
                        </span>
                    </p>
                </div>
                <p className="cart-product-total-price__total">
                    Total:{" "}
                    <span className="cart-product-total-price__qty--bold">
                        {CurrencyStore.currency}
                        {Math.round(
                            (CartStore.totalPrice +
                                CartStore.tax.calculatedTax) *
                                100
                        ) / 100}
                    </span>
                </p>
                <OrderButton text="order" />
            </div>
        );
    }
}

export default observer(CartProductTotalPrice);
