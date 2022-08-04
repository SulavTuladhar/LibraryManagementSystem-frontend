import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { IssueBookForm } from '../IssueBookForm.components'

const defaultForm = {
    name: '',
    bid: '',
    status: '',
    return_date: '',
    reader_id: ''
}

export class IssueBook extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            isSubmitting: false,

        }
    }

    componentDidMount(){
        this.bid = this.props.match.params['id'];
        httpClient
            .GET(`/book/${this.bid}`)
                .then(res => {
                    console.log("res >>", res.data.data[0]);
                    this.setState({
                        data: res.data.data[0]
                    })
                })
                .catch(err => {
                    console.log(err);
                })
    }

    onSubmit = e => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        httpClient
            .PUT(`/book/issue/${this.bid}`, this.state.data, true)
                .then(res=> {
                    notify.showSuccess('Issued')
                    this.props.history.push('/books')
                })
                .catch(err => {
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
        this.setState(preState => ({
            data: {
                ...preState.data,
                [name] : value
            }
        }))
    }

  render() {
    return (
      <IssueBookForm 
        data = {this.state.data}
        isSubmitting= {this.state.isSubmitting}
        title = "Issue Book"
        handleChange = {this.handleChange}
        onSubmit = {this.onSubmit}
        enabledLabel = "Issue"
        disabledLabel = "Issuing"
        status = "issued"
      />
    )
  }
}
