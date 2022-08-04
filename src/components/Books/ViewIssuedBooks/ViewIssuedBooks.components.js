import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { Book } from '../Book.components';

export class ViewIssuedBooks extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            isLoading: false
        }
        this.returnBook = this.returnBook.bind(this)
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        httpClient.GET(`/book/issued`)
            .then(response => {
                this.setState({
                    data: response.data.data
                })
            })
            .catch(err=> {
                handleError(err)
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
       
    }

    returnBook(id){
        const confirmation = window.confirm('Are you sure ?');
        console.log("id is >>", id);
        if(confirmation){
            httpClient
                .PUT(`/book/return/${id}`, {bid: id}, true)
                    .then(res => {
                        notify.showInfo('Book returned')
                        this.props.history.push('/books')
                    })
                    .catch(err => {
                        console.log(err)
                    })
        }
    }

  render() {
    return (
      <Book 
        data = {this.state.data}
        isLoading = {this.state.isLoading}
        fromIssued
        returnBook = {this.returnBook}
      />
    )
  }
}
