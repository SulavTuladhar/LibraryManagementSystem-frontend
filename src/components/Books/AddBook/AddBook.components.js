import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { BookForm } from '../BookForm.components';

const defaultForm = {
    name: '',
    bid: ''
}

export class AddBook extends Component {
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

    onSubmit = (e) => {
        e.preventDefault();
        let validForm = this.validateForm()
        if(!validForm) return;
        this.setState({
            isSubmitting: true
        })
        // API CALL
        httpClient
            .POST(`/book`, this.state.data, true)
                .then(response=> {
                    notify.showSuccess('Book Added')
                    this.props.history.push('/books')
                })
                .catch(err=> {
                    handleError(err);
                })
                .finally(()=> {
                    this.setState({
                        isSubmitting: false
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
        let nameErr = this.state.data['name'] ? '' :'required Field'
        let bidErr = this.state.data['bid'] ? '' :'required Field'

        this.setState({
            error: {
                name: nameErr,
                bid: bidErr
            }
          
        })
        let validForm = !(nameErr || bidErr)
        return validForm
    }


  render() {
    return (
      <BookForm 
        title = "Add Book"
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
