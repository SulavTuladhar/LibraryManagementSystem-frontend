import React, { Component } from 'react'

export class Book extends Component {
  
  render() {
    console.log(this.props.data);
    let content = this.props.isLoading
        ? <p>Loading</p>
        : <table className='table table-hover'> 
            <thead>
                <tr>
                    <th > Book Id </th>
                    <th> Name </th>
                    <th> Status </th>                   
                        {
                            localStorage.getItem('token')
                            ? <th> Actions </th>
                            : ""
                        }
                  
                </tr>
            </thead>
            <tbody>
                {
                    (this.props.data || []).map((data,index) => (
                        <tr key={index}>
                            { console.log("data >> ", data)}
                            <td> {data.bid} </td>
                            <td> {data.name} </td>
                            <td> {data.status} </td>
                            {
                                localStorage.getItem('token') && this.props.fromView
                                ?  
                                    <td> 
                                        <button className='btn btn-primary' onClick={()=> this.props.editBook(data.bid)}> Edit </button> 
                                        &nbsp;
                                        <button className='btn btn-danger' onClick={()=> this.props.removeBook(data.bid, index)}> Delete </button>
                                    </td>
                                : localStorage.getItem('token') && this.props.fromIssued
                                    ? 
                                        <td> 
                                            <button className='btn btn-success' onClick={()=> this.props.returnBook(data.bid)}> Return </button>
                                        </td>
                                    : localStorage.getItem('token') && this.props.fromAvailable
                                        ? <td> 
                                            <button className='btn btn-primary' onClick={()=> this.props.issueBook(data.bid)}> Issue </button> 
                                        </td>
                                        : ""
                            }
                        </tr>
                    ))    
                }
            </tbody>
        </table> 
    return (
        <div className='container'> {content} </div>
    )
  }
}
