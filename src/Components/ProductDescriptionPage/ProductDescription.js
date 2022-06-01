import { Component } from "react";
import dompurify from "dompurify";

class ProductDescription extends Component {
    sanitize = dompurify.sanitize;
    render() {
        return (
            <div
                className="product-description-container"
                dangerouslySetInnerHTML={{
                    __html: this.sanitize(this.props.productDescription),
                }}
            ></div>
        );
    }
}

export default ProductDescription;
