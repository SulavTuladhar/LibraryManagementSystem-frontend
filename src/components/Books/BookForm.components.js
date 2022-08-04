import React, { Component } from 'react'
import { SubmitButton } from '../Common/SubmitButton/SubmitButton.components'

export class BookForm extends Component {
  render() {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center' style={{height : "100vh"}}>
        <h1> {this.props.title} </h1>
        <br />
        <form onSubmit={this.props.onSubmit}>
            <label htmlFor='name' className='form-label'> Name </label>
            <input type="text" name="name" className="form-control" id="name" onChange={this.props.handleChange} value={this.props.data.name}/>
            <p> {this.props.error.name} </p>
            <label htmlFor='bookId' className='form-label'> Book Id </label>
            <input type="number" name="bid" className="form-control" id="bookId" onChange={this.props.handleChange} value={this.props.data.bid}/>
            <p> {this.props.error.bid} </p>
            <br />
            <br />
            <SubmitButton 
                isSubmitting={this.props.isSubmitting}
                enabledLabel = {this.props.enabledLabel}
                disabledLabel = {this.props.disabledLabel}
            />
        </form>
      </div>
    )
  }
}
