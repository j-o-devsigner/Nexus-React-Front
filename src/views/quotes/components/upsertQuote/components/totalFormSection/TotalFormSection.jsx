import React from 'react'
import { Button, Errors, Input, Label, Confirm } from '../../../../../../components/form/components'
import { useNavigate } from 'react-router'
import { QuoteFormContext } from '../../../../../../contexts/QuoteFormContext'
import Success from '../../../../../../components/form/components/Success/Success'

const TotalFormSection = ( {closeUpdateForm} ) => {

    const {
        listDone,
        calculateTotal,
        inputShippingValue,
        total,
        validateSubmitData,
        submitData,
        setConfirmSubmit,
        action,
        updateData,
        errors,
        confirmSubmit,
        closeForm,
        successMessage,
        quoteNumber,
    } = React.useContext(QuoteFormContext)

    const closeConfirm = () => {
        setConfirmSubmit(false)
    }

    return (
        <>
            <div className="nexus__form-section_total">
                {errors.shippingInput && <Errors message="Enter a shipping value"/>}
                {confirmSubmit && <Confirm title={action === "create" ? "Create Quote" : "Update Quote"} text="Have you already validated all the data of your quote?" acceptAction={action === "create" ? submitData : updateData} declineAction={closeConfirm} />}
                {successMessage && <Success message={action === "create" ? `done successfully, Quote ${quoteNumber} created`  : "done successfully"} doneAction={action === "create" ? closeForm : closeForm}/>}
                        <Label>Shipping Value</Label>
                        <Input
                            onChange={calculateTotal}
                            placeholder="0"
                            className={errors.shippingInput ? "total-inputs input-error" : "total-inputs"}
                            value={inputShippingValue}
                            readOnly={!listDone}
                        ></Input>
                        <Label>Total</Label>
                        <Input
                            className="total-inputs"
                            readOnly
                            placeholder="0.00"
                            value={parseFloat(total).toFixed(2)}
                        ></Input>
                        {action === "update" ?
                        <Button
                            type="button"
                            id="nexus__form-section_total-btnClose"
                            onClick={closeUpdateForm}
                            >Cancel
                        </Button>
                        :
                        <Button
                            type="button"
                            id="nexus__form-section_total-btnClose"
                            onClick={closeForm}
                            >Cancel Quote
                        </Button>
                        }
                        {action === "update" ?
                        <Button
                            id="nexus__form-section_total-btnCreate"
                            className="nexus__form-create-btn"
                            onClick={validateSubmitData}
                            disabled={!listDone}
                            >Edit Quote
                        </Button>
                        :
                        <Button
                            id="nexus__form-section_total-btnCreate"
                            className="nexus__form-create-btn"
                            onClick={validateSubmitData}
                            disabled={!listDone}
                            >Create Quote
                        </Button>
                        }
                    </div>
        </>
    )
}

export default TotalFormSection