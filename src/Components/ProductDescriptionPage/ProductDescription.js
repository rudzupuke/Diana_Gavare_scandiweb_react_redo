import { Component } from "react";

class ProductDescription extends Component {
    render() {
        return (
            <div
                className="product-description-container"
                dangerouslySetInnerHTML={{
                    __html: this.props.productDescription,
                }}
            ></div>
        );
    }
}

export default ProductDescription;
