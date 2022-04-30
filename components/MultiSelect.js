import React, { Component } from "react";
import MySelect from "./MySelect";
import { components } from "react-select";

const selectStyles = {
    menuList: styles => {
        return {
        ...styles,
        maxHeight: 100
        };
    },
    valueContainer : (styles) => {
        return {
            ...styles,
            maxHeight : "100px",
            overflowY : "auto"
        }
    },
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: "rgba(219, 39, 119, 0.1)",
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: "#db2777",
        fontWeight: 500,
        fontSize: 12
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: "#db2777",
        ':hover': {
            backgroundColor: "#db2777",
            color: 'white',
        },
    }),
    // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //     return {
    //         ...styles,
    //         backgroundColor: isSelected ? "#fbcfe8" : "white",
    //         color : isSelected ? "#db2777" : "#1f2937",
    //     };
    // },
};

const Option = (props) => {
    return (
        <div>
        <components.Option {...props}>
            <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            />{" "}
            <label>{props.label}</label>
        </components.Option>
        </div>
    );
};

const allOption = {
    label: "Select all",
    value: "*"
};

const ValueContainer = ({ children, ...props }) => {
    const currentValues = props.getValue();
    let toBeRendered = children;
    if (currentValues.some(val => val.value === allOption.value)) {
        toBeRendered = [[children[0][0]], children[1]];
    }

    return (
        <components.ValueContainer {...props}>
        {toBeRendered}
        </components.ValueContainer>
    );
};

const MultiValue = props => {
    let labelToBeDisplayed = `${props.data.label}, `;
    if (props.data.value === allOption.value) {
        labelToBeDisplayed = "All is selected";
    }
    return (
        <components.MultiValue {...props}>
        <span>{labelToBeDisplayed}</span>
        </components.MultiValue>
    );
};

export default class Example extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        // optionSelected: null
        // };
    }

    // handleChange = (selected) => {
    //     this.setState({
    //     optionSelected: selected
    //     });
    //     console.log('Fvcking selected: ', this.state.optionSelected)
    // };

    render() {
        return (
            <span
                className="d-inline-block"
                data-toggle="popover"
                data-trigger="focus"
                data-content="Please selecet account(s)"
            >
                <MySelect
                    className="w-65"
                    options={this.props.options}
                    isMulti
                    isClearable={false}
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                        Option,
                        ValueContainer,
                        MultiValue
                    }}
                    onChange={this.props.changeHandler}
                    allowSelectAll={true}
                    value={this.props.selectedPartners}
                    styles={selectStyles}
                />
            </span>
            );
    }
}

