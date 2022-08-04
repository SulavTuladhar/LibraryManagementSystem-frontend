import React, { Component } from 'react'
import "./StaffLogin.component.css";
import {SubmitButton} from '../../../Common/SubmitButton/SubmitButton.components'
import { httpClient } from '../../../../utils/httpClient';
import { Redirect } from '../../../../utils/redirect';
import { handleError } from '../../../../utils/errorHandler';
import { Link } from 'react-router-dom';

const defaultForm = {
    username: '',
    password: ''
}

export class StaffLogin extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error:{
                ...defaultForm
            },
            isSubmitting: false,
            isValidForm: false,
            remember_me: false
        }
    }

    
    componentDidMount(){
        var token = localStorage.getItem('token');
        var user = localStorage.getItem('user');
        if(token && JSON.parse(user).role === 'staff'){
            this.props.history.push('/staff-dashboard')
        }
        if(token && JSON.parse(user).role !== 'staff'){
            this.props.history.push('/admin-login')
        }
    }

    onSubmit = e => {
        e.preventDefault();
        let isValidForm = this.validateForm();
        if(!isValidForm) return;

        this.setState({
            isSubmitting: true
        })

        // API CALL
        httpClient
            .POST(`/auth/login`, this.state.data)
                .then(response=>{
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('remember_me', this.state.remember_me)

                    // Redirect to Dashboard
                    Redirect.redirectToStaffDashboard(this.props.history, response)
                })
                .catch(err=>{ 
                    handleError(err)
                })
                .finally(()=>{
                    this.setState({
                        isSubmitting: false
                    })
                })
            
           
    }

    handleChange = e => {
        let {name,value,type,checked} = e.target;
        if(type === 'checkbox'){
            return this.setState({
                remember_me: checked
            })
        }
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
        let usernameErr = this.state.data['username'] ? '' :'required Field'
        let passwordErr = this.state.data['password'] ? '' :'required Field'

        this.setState({
            error: {
                username: usernameErr,
                password: passwordErr
            }
          
        })
        let validForm = !(usernameErr || passwordErr)
        return validForm
    }

  render() {
    return (
      <div className='loginForm'>
        <h1> Login </h1>
        <p> Please Login To Start Your Session </p>
        <div>
            <form onSubmit={this.onSubmit}>
                <label htmlFor='username' className='form-label'> Username </label>
                <input type="text" name="username" className="form-control" id="username" onChange ={this.handleChange}/>
                <p>{this.state.error.username}</p>
                <label htmlFor='password' className='form-label'> Password </label>
                <input type="password" name="password" className="form-control" id="password" onChange ={this.handleChange}/>
                <p>{this.state.error.password}</p>

                <input type="checkbox" name="remember_me" onChange={this.handleChange} id="check_box" />
                <label htmlFor='check_box'> &nbsp; Remember me </label>
                <br />
                <br />
                <SubmitButton 
                    isSubmitting={this.state.isSubmitting}
                    enabledLabel = "Login"
                    disabledLabel = "Logining .... "
                />
            </form>
            <br />
                <Link to='/admin-login'> Are you admin? </Link>
        </div>
      </div>
    )
  }
}
