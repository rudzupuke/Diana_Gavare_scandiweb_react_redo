import { Component } from "react";
import { CurrencyStore } from "../../Stores/CurrencyStore";

class CurrencySwitcher extends Component {
    displayCurrencies() {
        if (this.props.loading) {
            return <p>...</p>;
        } else {
            return this.props.currencies.currencies.map((currency) => {
                return (
                    <li
                        className="currency-switcher-container__item"
                        key={currency.label}
                    >
                        <button
                            value={currency.label}
                            onClick={() =>
                                CurrencyStore.changeCurrency(currency.symbol)
                            }
                            className="currency-switcher-container__button"
                        >
                            <span>
                                {currency.symbol} {currency.label}
                            </span>
                        </button>
                    </li>
                );
            });
        }
    }

    render() {
        return (
            <div
                className="currency-switcher-container"
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}
            >
                <ul className="currency-switcher-container__items">
                    {this.displayCurrencies()}
                </ul>
            </div>
        );
    }
}

export default CurrencySwitcher;
