import React, { Component } from 'react'
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { StudentForm } from '../StudentForm.components'

const defaultForm = {
    name: '',
    email: '',
    username: '',
    dept: '',
    password: ''
}

export class AddStudent extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false
        }
    }

    onSubmit = e =>{
        e.preventDefault();
        let validForm = this.validateForm();
        if(!validForm) return

        // API CALL
        httpClient 
            .POST(`/auth/studentRegister`, this.state.data, true)
                .then(res=> {
                    notify.showInfo('Student Added Successfully');
                    this.props.history.push('/students')
                })
                .catch(err=> {
                    console.log(err);
                })
    }

    handleChange = e =>{
        let{name,value} = e.target;
        this.setState(preState => ({
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
        let nameErr = this.state.data['name'] ? '' : 'required field';
        let emailErr = this.state.data['email'] ? '' : 'required field';
        let usernameErr = this.state.data['username'] ? '' : 'required field';
        let deptErr = this.state.data['dept'] ? '' : 'required field';

        this.setState({
            error: {
                name: nameErr,
                email: emailErr,
                username: usernameErr,
                dept: deptErr
            }
        })
        let validForm = !(nameErr || emailErr || usernameErr || deptErr)
        return validForm
    }

  render() {
    return (
      <StudentForm 
        title = "Add Student"
        error = {this.state.error}
        data = {this.state.data}
        isSubmitting = {this.state.isSubmitting}
        handleChange = {this.handleChange}
        onSubmit = {this.onSubmit}
        enabledLabel = "Add"
        disabledLabel = "Adding"
      />
    )
  }
}
