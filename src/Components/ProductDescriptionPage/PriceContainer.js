import { Component } from "react";

import { CurrencyStore } from "../../Stores/CurrencyStore";
import { observer } from "mobx-react";

class PriceContainer extends Component {
    constructor(props) {
        super(props);
        this.currencyStore = CurrencyStore;
    }

    createPrice() {
        const currentCurrency = this.props.prices.filter((price) => {
            return price.currency.symbol === this.currencyStore.currency;
        });

        return (
            <p className="price-container__price">
                {currentCurrency[0].currency.symbol} {currentCurrency[0].amount}
            </p>
        );
    }
    render() {
        return (
            <div className="price-container">
                <h3 className="price-container__heading">Price:</h3>
                {this.createPrice()}
            </div>
        );
    }
}

export default observer(PriceContainer);
