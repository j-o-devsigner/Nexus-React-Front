import React from 'react'
import { Input, Label, Select, Option, Errors } from '../../../../../../components/form/components'
import { QuoteFormContext } from '../../../../../../contexts/QuoteFormContext'

const DiscountsFormSection = () => {


    const {
        onChangeDiscount,
        listDone,
        valueSelectDiscount,
        subtotal,
        calculatePercentage,
        calculateFixedAmount,
        inputValueFixed,
        inputValuePercentage,
        discountValue,
        errors,
    } = React.useContext(QuoteFormContext)

    return (
        <>
            <div className="nexus__form-section_discounts">
                {errors.percentageInput && <Errors message="enter a percentage to discount"/>}
                {errors.invalidPercentage && <Errors message="The value of the percentage cannot exceed 99"/>}
                {errors.valueFixedInput && <Errors message="enter a fixed amount to discount"/>}
                {errors.invalidValueFixed && <Errors message="The fixed amount cannot be greater than the subtotal"/>}
                    <Label>Discounts</Label>
                    <Select
                        id="select-discount"
                        value={valueSelectDiscount}
                        onChange={onChangeDiscount}
                        disabled={!listDone}
                    >
                    <Option
                        key="1"
                        value="1"
                        >No discount
                    </Option>
                    <Option
                        key="2"
                        value="2"
                        >Percentage
                    </Option>
                    <Option
                        key="3"
                        value="3"
                        >Fixed Amount
                    </Option>
                    </Select>
                    {valueSelectDiscount === "1" && <div>
                        <Label>Subtotal</Label>
                        <Input
                            className="readOnly-numbers"
                            placeholder="0"
                            value={Number(subtotal).toFixed(2)}
                            readOnly
                        ></Input>
                        </div>}
                    {valueSelectDiscount === "2" &&
                    <div>
                        <Label>Percentage</Label>
                        <Input
                            id="percentage-input"
                            className={errors.percentageInput ? "input-error" : ""}
                            value={inputValuePercentage}
                            onChange={calculatePercentage}
                            readOnly={!listDone}
                            placeholder="20..."
                        ></Input>
                        <Label>Discount Value</Label>
                        <Input
                            className="readOnly-numbers"
                            placeholder="0"
                            value={discountValue}
                            readOnly
                        ></Input>
                        <Label>Subtotal</Label>
                        <Input
                            className="readOnly-numbers"
                            placeholder="0"
                            value={parseFloat(subtotal).toFixed(2)}
                            readOnly
                        ></Input>
                    </div>
                    }
                    {valueSelectDiscount === "3" &&
                    <div>
                        <Label>Discount Value</Label>
                        <Input
                            className={errors.percentageInput ? "readOnly-numbers input-error" : "readOnly-numbers"}
                            onChange={calculateFixedAmount}
                            value={inputValueFixed}
                            readOnly={!listDone}
                            placeholder="0"
                        ></Input>
                        <Label>Subtotal</Label>
                        <Input
                            className="readOnly-numbers"
                            readOnly
                            placeholder="0"
                            value={parseFloat(subtotal).toFixed(2)}
                        ></Input>
                        </div>
                    }
                </div>
        </>
    )
}

export default DiscountsFormSection