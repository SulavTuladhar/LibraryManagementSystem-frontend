import { notify } from "./toastr";

export const handleError = error => {
    debugger;
    console.log("error msg >> ", error.response);
    let err = error.response;
    let errMsg = 'Something went wrong';
    if(err){
        errMsg = err && err.data && err.data.msg
    }
    notify.showError(errMsg)
}