import { Component } from "react";
import { CurrencyStore } from "../../Stores/CurrencyStore";
import { observer } from "mobx-react";
import { graphql } from "@apollo/client/react/hoc";
import { getCurrenciesQuery } from "../../Queries/queries";

class CurrencySwitcher extends Component {
    handleClick = (e, currencySymbol) => {
        CurrencyStore.changeCurrency(currencySymbol);
        this.props.closeCurrencySwitcher(e);
    };

    displayCurrencies() {
        if (this.props.currencies.loading) {
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
                            onClick={(e) =>
                                this.handleClick(e, currency.symbol)
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

export default graphql(getCurrenciesQuery, { name: "currencies" })(
    observer(CurrencySwitcher)
);
