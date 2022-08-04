import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { SubmitButton } from '../../Common/SubmitButton/SubmitButton.components';

const defaultForm = {
    name: '',
    username: '',
    password: ''
}


export class AdminRegister extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isSubmittng: false
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
            .POST(`/auth/adminRegister`, this.state.data)
                .then(res=> {
                    notify.showSuccess('Admin Added Successfully')
                    this.props.history.push('/admin-login')
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
        let usernameErr = this.state.data['username'] ? '' : 'Required field'
        let passwordErr = this.state.data['password'] ? '' : 'Required field'

        this.setState({
            error: {
                name: nameErr,
                username: usernameErr,
                password: passwordErr
            }
        })
        let validForm = !(nameErr || usernameErr || passwordErr )
        return validForm
    }


  render() {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center' style={{height: "100vh"}}> 
        <h1> Register Admin </h1>
        <br />
        <form onSubmit={this.onSubmit}>
            <label htmlFor='name' className='form-label'> Name </label>
            <input type="text" name="name" id="name" className="form-control" onChange={this.handleChange}/>
            <label htmlFor='password' className='form-label'> Password </label>
            <input type="password" name="password" id="password" className="form-control" onChange={this.handleChange}/>
            <label htmlFor='username' className='form-label'> Username </label>
            <input type="text" name="username" id="username" className="form-control" onChange={this.handleChange}/>
            <br />
            <SubmitButton 
                isSubmitting = {this.state.isSubmitting}
                enabledLabel = 'Register'
                disabledLabel = 'Registering'
            />
        </form>
      </div>
    )
  }
}
