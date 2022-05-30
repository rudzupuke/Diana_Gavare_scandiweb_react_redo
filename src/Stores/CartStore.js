import { makeObservable, observable, action, computed } from "mobx";
import { CurrencyStore } from "./CurrencyStore";

class CartStoreImpl {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    constructor() {
        makeObservable(this, {
            cart: observable,
            addProductToCart: action,
            removeProductFromCart: action,
            itemsInCart: computed,
            totalPrice: computed,
            tax: computed,
        });
    }

    addProductToCart(productId, attributeType, attribute, prices) {
        if (!attribute) return;

        // creating a uniqueId because user can add one product with different attributes to the cart ( for example,
        // coat with size M is one product & coat with size L another)
        const uniqueId = productId + attribute;

        const index = this.cart.findIndex(
            (product) => product.uniqueId === uniqueId
        );
        const noMatchFound = index === -1;

        const product = {
            uniqueId: uniqueId,
            productId: productId,
            attributeType: attributeType,
            attribute: attribute,
            prices: prices,
            count: 1,
        };

        if (noMatchFound) {
            this.cart.push(product);
        } else {
            this.cart[index].count++;
        }

        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    removeProductFromCart(uniqueId) {
        const index = this.cart.findIndex(
            (product) => product.uniqueId === uniqueId
        );
        if (this.cart[index].count === 1) {
            this.cart.splice(index, 1);
        } else {
            this.cart[index].count--;
        }

        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    get totalPrice() {
        let total = 0;
        this.cart.forEach((product) => {
            const index = product.prices.findIndex(
                (price) => price.currency.symbol === CurrencyStore.currency
            );

            total += product.prices[index].amount * product.count;
        });

        // rounding the total price to two decimal places:
        return Math.round(total * 100) / 100;
    }

    get tax() {
        const totalPrice = this.totalPrice;
        const tax = Math.round(((totalPrice * 10) / 100) * 100) / 100;

        return tax;
    }

    get itemsInCart() {
        return this.cart.length;
    }
}

export const CartStore = new CartStoreImpl();
