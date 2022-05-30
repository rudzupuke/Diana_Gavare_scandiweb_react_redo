import { Component } from "react";
import CartItem from "../../Components/CartPage/CartItem";
import { CartStore } from "../../Stores/CartStore";
import { CurrencyStore } from "../../Stores/CurrencyStore";
import { observer } from "mobx-react";
import CartProductTotalPrice from "../../Components/CartPage/CartProductTotalPrice";

class CartPage extends Component {
    render() {
        return (
            <div className="cart-container">
                <h1 className="cart-container__heading">Cart</h1>
                {CartStore.cart.map((product) => {
                    return (
                        <CartItem
                            key={product.uniqueId}
                            productId={product.productId}
                            currentCurrency={CurrencyStore.currency}
                            productCount={product.count}
                            attributeType={product.attributeType}
                            attribute={product.attribute}
                            uniqueId={product.uniqueId}
                        />
                    );
                })}
                <CartProductTotalPrice />
            </div>
        );
    }
}

export default observer(CartPage);
