import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { BookForm } from '../BookForm.components'

const defaultForm = {
    name: '',
    bid: ''
}


export class UpdateBook extends Component {
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

    componentDidMount(){
        this.bid = this.props.match.params['id'];
        httpClient
            .GET(`/book/${this.bid}`)
                .then(res=>{
                    console.log("res >>", res.data.data[0]);
                    this.setState({
                        data: res.data.data[0]
                    })
                })
                .catch(err=> {
                    console.log('error is >>', err);
                })
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
            .PUT(`/book/${this.bid}`, this.state.data, true)
                .then(response=> {
                    notify.showSuccess('Book Edited')
                    this.props.history.push('/books')
                })
                .catch(err=> {
                    handleError(err)
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
    console.log("state >>", this.state);
    return (
        <BookForm
            title = "Edit Book"
            error = {this.state.error}
            data = {this.state.data}
            isSubmitting = {this.state.isSubmitting}
            handleChange = {this.handleChange}
            onSubmit = {this.onSubmit}
            enabledLabel = "Edit"
            disabledLabel = "Editing"
        />
    )
  }
}
