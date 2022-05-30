import { Component } from "react";

import { graphql } from "@apollo/client/react/hoc";
import { getProductQuery } from "../../Queries/queries";
import { CartStore } from "../../Stores/CartStore";

import AttributeInput from "../ProductDescriptionPage/AttributeInput";

import CartProductName from "./CartProductName";
import CartProductPrice from "./CartProductPrice";
import CartProductAmountController from "./CartProductAmountController";
import CartProductImage from "./CartProductImage";
import { Link } from "react-router-dom";

class CartItem extends Component {
    addToCart = (productId, attributeType, attribute) => {
        CartStore.addProductToCart(productId, attributeType, attribute);
    };

    removeFromCart = (uniqueId) => {
        CartStore.removeProductFromCart(uniqueId);
    };

    render() {
        if (this.props.data.loading) return <p>loading...</p>;
        return (
            <div className="cart-item">
                <div className="cart-item__left-container">
                    <Link
                        className="cart-item__link"
                        to={`/pdp/${this.props.productId}`}
                    >
                        <CartProductName
                            brandName={this.props.data.product.brand}
                            productName={this.props.data.product.name}
                            path={`/pdp/${this.props.productId}`}
                        />
                        <CartProductPrice
                            currentCurrency={this.props.currentCurrency}
                            prices={this.props.data.product.prices}
                            path={`/pdp/${this.props.productId}`}
                        />
                    </Link>
                    {/* if product has no attributes, don't render AttributeInput component */}
                    <div className="cart-item__attributes">
                        {this.props.data.product.attributes[0] &&
                            this.props.data.product.attributes[0].items.map(
                                (attr) => (
                                    <AttributeInput
                                        key={attr.id}
                                        id={attr.id}
                                        name={attr.name}
                                        itemValue={attr.value}
                                        selectedAttribute={this.props.attribute}
                                        disabled={true}
                                    />
                                )
                            )}
                    </div>
                </div>

                <div className="cart-item__right-container">
                    <CartProductAmountController
                        addToCart={this.addToCart}
                        removeFromCart={this.removeFromCart}
                        {...this.props}
                    />
                    <CartProductImage
                        img={this.props.data.product.gallery[0]}
                        gallery={this.props.data.product.gallery}
                        productName={this.props.data.product.name}
                    />
                </div>
            </div>
        );
    }
}

export default graphql(getProductQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.productId,
            },
        };
    },
})(CartItem);
