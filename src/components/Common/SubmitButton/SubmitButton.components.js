import React from "react";

export const SubmitButton = (props) => {
    const disabledLabel = props.disabledLabel || 'Submitting ....';
    const enabledLabel = props.enabledLabel || 'Submit';

    let btn = props.isSubmitting
        ? <button disabled className="btn btn-secondary" style={{width: "100%"}}> {disabledLabel} </button>
        : <button type="submit" className="btn btn-primary" style={{width: "100%"}}> {enabledLabel} </button>
    
    return btn;
}