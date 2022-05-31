import { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getCategoryDataQuery } from "../../Queries/queries";
import { withRouter } from "../../withRouter";

import ProductContainer from "../../Components/ProductListingPage/ProductContainer";

class ProductListingPage extends Component {
    createCategoryName = () => {
        let categoryName = this.props.router.params.category;

        return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    };

    render() {
        if (this.props.data.loading) return <p>loading...</p>;
        return (
            <div className="plp-container">
                <h1 className="plp-container__heading">
                    {this.createCategoryName()}
                </h1>
                <ProductContainer data={this.props.data} />
            </div>
        );
    }
}

export default withRouter(
    graphql(getCategoryDataQuery, {
        options: (props) => {
            return {
                variables: {
                    title: props.router.params.category,
                },
            };
        },
    })(ProductListingPage)
);
