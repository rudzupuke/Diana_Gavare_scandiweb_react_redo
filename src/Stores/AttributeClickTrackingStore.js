import { makeObservable, observable, action } from "mobx";

// AttributeClickTrackingStore is for tracking wheter user has clicked/chosen an attribute for the product.

class AttributeClickTrackingStoreImpl {
    trackedProducts =
        JSON.parse(sessionStorage.getItem("trackedProducts")) || [];

    constructor() {
        makeObservable(this, {
            trackedProducts: observable,
            trackProduct: action,
            untrackProduct: action,
            isProductTracked: observable,
            getProductAttribute: observable,
        });
    }

    findIndex(productId) {
        const index = this.trackedProducts.findIndex(
            (product) => product.productId === productId
        );
        const noMatchFound = index === -1;

        return { index, noMatchFound };
    }

    trackProduct(productId, attributeType) {
        const { index, noMatchFound } = this.findIndex(productId);
        const product = {
            productId: productId,
            attributeType: attributeType,
        };

        if (noMatchFound) {
            this.trackedProducts.push(product);

            // if product is tracked & user decides to change the attribute, new product is not added, but the
            // attribute in the existing product object is changed:
        } else {
            this.trackedProducts[index].attributeType = attributeType;
        }
        sessionStorage.setItem(
            "trackedProducts",
            JSON.stringify(this.trackedProducts)
        );
    }

    untrackProduct(productId) {
        const { index, noMatchFound } = this.findIndex(productId);

        if (!noMatchFound) {
            this.trackedProducts.splice(index, 1);
            sessionStorage.setItem(
                "trackedProducts",
                JSON.stringify(this.trackedProducts)
            );
        }
    }

    isProductTracked(productId) {
        const { _, noMatchFound } = this.findIndex(productId);

        const isTracked = !noMatchFound;

        return isTracked;
    }

    getProductAttribute(productId) {
        const { index, noMatchFound } = this.findIndex(productId);

        if (noMatchFound) return null;

        return this.trackedProducts[index].attributeType;
    }
}

export const AttributeClickTrackingStore =
    new AttributeClickTrackingStoreImpl();
