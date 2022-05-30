import { Component } from "react";

class ProductName extends Component {
    render() {
        return (
            <div className="product-name">
                <h1 className="product-name__brand">{this.props.brandName}</h1>
                <h2 className="product-name__name">{this.props.productName}</h2>
            </div>
        );
    }
}

export default ProductName;
