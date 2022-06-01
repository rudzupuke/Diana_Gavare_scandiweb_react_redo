import { Component } from "react";

import AttributeInput from "./AttributeInput";
import { AttributeClickTrackingStore } from "../../Stores/AttributeClickTrackingStore";

class AttributesContainer extends Component {
    state = {};
    componentDidMount() {
        const trackedProducts = JSON.parse(
            sessionStorage.getItem("trackedProducts")
        );

        if (trackedProducts !== null && this.props.attributes.length > 1) {
            if (
                Array.isArray(trackedProducts) &&
                !AttributeClickTrackingStore.isProductTracked(
                    this.props.productId
                )
            ) {
                AttributeClickTrackingStore.untractAttributesArray(
                    this.props.productId
                );
            }
        }
    }

    render() {
        return (
            <div className="attributes-container">
                {this.props.attributes.map((attributeSet, index) => (
                    <div key={index}>
                        <h3 className="attributes-container__name">
                            {attributeSet.name + ":"}
                        </h3>

                        <div className="attributes-container__items">
                            {attributeSet.items.map((item) => (
                                <AttributeInput
                                    itemValue={item.value}
                                    attributeTypeCount={
                                        this.props.attributes.length
                                    }
                                    attributes={this.props.attributes}
                                    key={item.value}
                                    name={attributeSet.name}
                                    handleAttributeClick={
                                        this.props.handleAttributeClick
                                    }
                                    disabled={this.props.inStock ? false : true}
                                    selectedAttribute={
                                        this.props.selectedAttribute
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default AttributesContainer;
