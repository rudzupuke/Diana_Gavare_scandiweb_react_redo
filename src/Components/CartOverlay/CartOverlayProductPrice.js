import { Component } from "react";

class CartOverlayProductPrice extends Component {
    createPrice = () => {
        const currentCurrency = this.props.prices.filter((price) => {
            return price.currency.symbol === this.props.currencySymbol;
        });

        return (
            <>
                {currentCurrency[0].currency.symbol}{" "}
                {Math.round(
                    currentCurrency[0].amount * this.props.productCount * 100
                ) / 100}
            </>
        );
    };
    render() {
        return <p className="cart-overlay__item-price">{this.createPrice()}</p>;
    }
}

export default CartOverlayProductPrice;
