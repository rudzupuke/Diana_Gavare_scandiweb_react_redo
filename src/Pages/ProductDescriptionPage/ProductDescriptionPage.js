import { Component } from "react";
import { withRouter } from "../../withRouter";
import { graphql } from "@apollo/client/react/hoc";
import { getProductQuery } from "../../Queries/queries";

import ProductInfo from "../../Components/ProductDescriptionPage/ProductInfo";
import ProductImages from "../../Components/ProductDescriptionPage/ProductImages";
import MainImage from "../../Components/ProductDescriptionPage/MainImage";

class ProductDescriptionPage extends Component {
    state = {
        currentImg: null,
    };

    componentDidMount() {
        if (!this.props.data.loading)
            this.setState({ currentImg: this.props.data.product.gallery[0] });
    }
    componentDidUpdate() {
        if (this.state.currentImg === null) {
            this.setState({ currentImg: this.props.data.product.gallery[0] });
        }
    }

    changeCurrentImage = (img) => {
        this.setState({ currentImg: img });
    };

    render() {
        if (this.props.data.loading) return <p>Loading...</p>;
        return (
            <div className="pdp-container">
                <ProductImages
                    productName={this.props.data.product.name}
                    gallery={this.props.data.product.gallery}
                    changeCurrentImage={this.changeCurrentImage}
                />
                <MainImage
                    image={this.state.currentImg}
                    productName={this.props.data.product.name}
                />

                <ProductInfo
                    productId={this.props.router.params.productId}
                    {...this.props.data.product}
                />
            </div>
        );
    }
}

export default withRouter(
    graphql(getProductQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.router.params.productId,
                },
            };
        },
    })(ProductDescriptionPage)
);
