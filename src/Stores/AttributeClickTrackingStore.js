import { makeObservable, observable, action, toJS, has } from "mobx";

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

    hasNullValues(array) {
        const hasNullValues =
            JSON.stringify(array).match(/:null[\},]/) !== null;
        return hasNullValues;
    }

    trackProduct(productId, attributeType, attributeName, attributes) {
        // console.log(toJS(attributes));
        const { index, noMatchFound } = this.findIndex(productId);

        if (attributes.length === 1) {
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
        } else if (attributes.length > 1) {
            let attributesArray =
                JSON.parse(
                    sessionStorage.getItem(productId + " " + "attributesArray")
                ) || [];

            if (noMatchFound) {
                if (attributesArray.length === 0) {
                    attributes.forEach((attribute) => {
                        if (attribute.name === attributeName) {
                            attributesArray.push({
                                AttributeName: attribute.name,
                                attribute: attributeType,
                            });
                        } else {
                            attributesArray.push({
                                AttributeName: attribute.name,
                                attribute: null,
                            });
                        }
                    });
                } else if (attributesArray.length > 0) {
                    attributesArray.map((attribute) => {
                        if (attribute.AttributeName === attributeName) {
                            attribute.attribute = attributeType;
                        }
                    });
                }

                if (!this.hasNullValues(attributesArray)) {
                    const product = {
                        productId: productId,
                        attributeArray: attributesArray,
                    };
                    this.trackedProducts.push(product);
                }
            } else {
                this.trackedProducts[index].attributeArray.map((attribute) => {
                    if (attribute.AttributeName === attributeName) {
                        attribute.attribute = attributeType;
                    }
                });
            }
            sessionStorage.setItem(
                productId + " " + "attributesArray",
                JSON.stringify(attributesArray)
            );
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
            // sessionStorage.removeItem(productId + " " + "attributesArray");
        }
    }

    untractAttributesArray(productId) {
        let attributesArray = JSON.parse(
            sessionStorage.getItem(productId + " " + "attributesArray")
        );
        if (attributesArray) {
            attributesArray.forEach((attr) => (attr.attribute = null));

            sessionStorage.setItem(
                productId + " " + "attributesArray",
                JSON.stringify(attributesArray)
            );
        }
    }

    isProductTracked(productId) {
        const { index } = this.findIndex(productId);

        const isTracked = index >= 0;

        return isTracked;
    }

    getProductAttribute(productId) {
        const { index, noMatchFound } = this.findIndex(productId);

        if (noMatchFound) return null;

        if (this.trackedProducts[index].attributeArray) {
            if (
                !this.hasNullValues(this.trackedProducts[index].attributeArray)
            ) {
                return toJS(this.trackedProducts[index].attributeArray);
            }
        } else {
            return this.trackedProducts[index].attributeType;
        }
    }
}

export const AttributeClickTrackingStore =
    new AttributeClickTrackingStoreImpl();
