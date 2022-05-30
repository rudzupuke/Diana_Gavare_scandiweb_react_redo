import { Component } from "react";

class CartOverlayProductPrice extends Component {
    createPrice = () => {
        const currentCurrency = this.props.prices.filter((price) => {
            return price.currency.symbol === this.props.currencySymbol;
        });

        return (
            <>
                {currentCurrency[0].currency.symbol} {currentCurrency[0].amount}
            </>
        );
    };
    render() {
        return <p className="cart-overlay__item-price">{this.createPrice()}</p>;
    }
}

export default CartOverlayProductPrice;
