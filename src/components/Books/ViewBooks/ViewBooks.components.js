import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';
import { Book } from '../Book.components';

export class ViewBooks extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            isLoading: false
        }
        this.removeBook = this.removeBook.bind(this);
        this.editBook = this.editBook.bind(this);
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        httpClient.GET(`/book`)
            .then(response => {
                this.setState({
                    data: response.data
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
    
    editBook(id){
        this.props.history.push(`/edit-book/${id}`)
    }

    removeBook(id,index){
        const confirmation = window.confirm('Are you sure ?');
        if(confirmation){
            httpClient.DELETE(`/book/${id}`, true)
                .then(response => {
                    notify.showInfo("Book removed", response)
                    const {data} = this.state
                    data.splice(index,1)
                    this.setState({
                        data
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            }
    }


  render() {
    return (
      <Book 
        data = {this.state.data}
        isLoading = {this.state.isLoading}
        removeBook = {this.removeBook}
        fromView
        editBook = {this.editBook}
      />
    )
  }
}
