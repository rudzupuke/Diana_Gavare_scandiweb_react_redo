import { makeObservable, observable, action } from "mobx";

class CurrencyStoreImpl {
    currency = "$";

    constructor() {
        makeObservable(this, {
            currency: observable,
            changeCurrency: action,
        });
    }

    changeCurrency(currencySymbol) {
        this.currency = currencySymbol;
    }
}

export const CurrencyStore = new CurrencyStoreImpl();
