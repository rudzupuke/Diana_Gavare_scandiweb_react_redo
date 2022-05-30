import { Component } from "react";

class CartProductPrice extends Component {
    createPrice = () => {
        const currentCurrency = this.props.prices.filter((price) => {
            return price.currency.symbol === this.props.currentCurrency;
        });

        return (
            <>
                {currentCurrency[0].currency.symbol} {currentCurrency[0].amount}
            </>
        );
    };

    render() {
        return <p className="cart-product-price">{this.createPrice()}</p>;
    }
}

export default CartProductPrice;
