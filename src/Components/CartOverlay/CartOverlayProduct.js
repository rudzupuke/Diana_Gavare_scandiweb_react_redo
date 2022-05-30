import { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProductQuery } from "../../Queries/queries";
import CartOverlayProductPrice from "./CartOverlayProductPrice";
import CartOverlayProductName from "./CartOverlayProductName";
import CartOverlayProductImage from "./CartOverlayProductImage";
import CartOverlayAttribute from "./CartOverlayAttribute";
import CartOverlayProductCountController from "./CartOverlayProductAmountController";

import { observer } from "mobx-react";

class CartOverlayProduct extends Component {
    state = {};

    render() {
        if (this.props.data.loading) return <p>loading...</p>;
        return (
            <div className="cart-overlay__items">
                <div className="cart-overlay__items-left">
                    <div>
                        <CartOverlayProductName
                            brandName={this.props.data.product.brand}
                            productName={this.props.data.product.name}
                        />
                        <CartOverlayProductPrice
                            prices={this.props.data.product.prices}
                            currencySymbol={this.props.currencySymbol}
                        />
                    </div>

                    {/* if there are no attributes then don't render CartOverlayAttribute component */}
                    {this.props.data.product.attributes[0] && (
                        <div className="cart-overlay__attributes">
                            {this.props.data.product.attributes[0].items.map(
                                (attr) => {
                                    return (
                                        <CartOverlayAttribute
                                            key={attr.id}
                                            id={attr.id}
                                            name={attr.name}
                                            itemValue={attr.value}
                                            selectedAttribute={
                                                this.props.selectedAttribute
                                            }
                                        />
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>

                <div className="cart-overlay__items-right">
                    <CartOverlayProductCountController {...this.props} />
                    <CartOverlayProductImage
                        image={this.props.data.product.gallery[0]}
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
})(observer(CartOverlayProduct));
