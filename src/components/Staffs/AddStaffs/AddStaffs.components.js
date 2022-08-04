import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { StaffsForm } from '../StaffsForm.components'

const defaultForm = {
    name: '',
    email: '',
    username: '',
    dept: '',
    password: ''
}

export class AddStaffs extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmittng: false,
            isValidForm: false
        }
    }

    onSubmit = e => {
        e.preventDefault();
        let validForm = this.validateForm();
        if(!validForm) return;
        this.setState({
            isSubmittng: true
        })
        // API CALL
        httpClient
            .POST(`/auth/staffRegister`, this.state.data, true)
                .then(res=> {
                    notify.showSuccess('Staff Added Successfully')
                    this.props.history.push('/staffs')
                })
                .catch(err => {
                    handleError(err)
                })
                .finally(()=> {
                    this.setState({
                        isSubmittng: false
                    })
                })
    }

    handleChange = e => {
        let {name,value} = e.target;
        this.setState(preState=> ({
            data: {
                ...preState.data,
                [name]: value
            }
        }), ()=> {
            if(this.state.error[name]){
                this.validateForm()
            }
        })
    }

    validateForm = () => {
        let nameErr = this.state.data['name'] ? '' : 'Required field'
        let emailErr = this.state.data['email'] ? '' : 'Required field'
        let usernameErr = this.state.data['username'] ? '' : 'Required field'
        let deptErr = this.state.data['dept'] ? '' : 'Required field'
        let passwordErr = this.state.data['password'] ? '' : 'Required field'
        
        this.setState({
            error: {
                name: nameErr,
                email: emailErr,
                username: usernameErr,
                dept: deptErr,
                password: passwordErr
            }
        })
        let validForm = !(nameErr || emailErr || usernameErr || deptErr || passwordErr )
        return validForm
    }

  render() {
    return (
      <StaffsForm 
        title = "Add Staff"
        error = {this.state.error}
        data = {this.state.data}
        isSubmittng = {this.state.isSubmittng}
        handleChange = {this.handleChange}
        onSubmit = {this.onSubmit}
        enabledLabel = "Add"
        disabledLabel = "Adding"
      />
    )
  }
}
