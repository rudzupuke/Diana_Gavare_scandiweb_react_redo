import { Component } from "react";
import { CurrencyStore } from "../../Stores/CurrencyStore";
import { observer } from "mobx-react";

class ProductCardPriceContainer extends Component {
    createPrice() {
        const currentCurrency = this.props.prices.filter((price) => {
            return price.currency.symbol === CurrencyStore.currency;
        });

        return (
            <>
                {currentCurrency[0].currency.symbol} {currentCurrency[0].amount}
            </>
        );
    }
    render() {
        return (
            <p
                className={
                    this.props.inStock
                        ? "product-card-price"
                        : "product-card-price out-of-stock"
                }
            >
                {this.createPrice()}
            </p>
        );
    }
}

export default observer(ProductCardPriceContainer);
