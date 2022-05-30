import { Component } from "react";
import AttributeInput from "./AttributeInput";

class AttributesContainer extends Component {
    render() {
        return (
            <div className="attributes-container">
                <h3 className="attributes-container__name">
                    {this.props.attributeName + ":"}
                </h3>

                <div className="attributes-container__items">
                    {this.props.attributeItems.map((item) => {
                        return (
                            <AttributeInput
                                itemValue={item.value}
                                key={item.value}
                                name={this.props.attributeName}
                                handleAttributeClick={
                                    this.props.handleAttributeClick
                                }
                                disabled={false}
                                selectedAttribute={this.props.selectedAttribute}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default AttributesContainer;
