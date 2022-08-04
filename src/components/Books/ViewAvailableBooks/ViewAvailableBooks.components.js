import React, { Component } from 'react'
import { httpClient } from '../../../utils/httpClient';
// import { notify } from '../../../utils/toastr';
import { Book } from '../Book.components';

export class ViewAvailableBooks extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            isLoading: false
        }
        this.issueBook = this.issueBook.bind(this);
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        httpClient.GET(`/book/available`)
            .then(response => {
                this.setState({
                    data: response.data.data
                })
            })
            .catch(err=> {
                console.log('err');
            })
            .finally(()=>{
                this.setState({
                    isLoading: false
                })
            })
       
    }

    issueBook(id){
        console.log(this.props);
        this.props.history.push(`/books/issue/${id}`)
    }

  render() {
    return (
      <Book 
        data = {this.state.data}
        isLoading = {this.state.isLoading}
        fromAvailable
        issueBook = {this.issueBook}
      />
    )
  }
}
