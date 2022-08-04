import React, { Component } from 'react'
import { SubmitButton } from '../Common/SubmitButton/SubmitButton.components'

export class IssueBookForm extends Component {
  render() {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>

            <h1> {this.props.title} </h1>
            <br />

            <form onSubmit={this.props.onSubmit}>
                <label htmlFor='name' className='form-label'> Name </label>
                <input type="text" className='form-control' id='name' disabled value={this.props.data.name}/>

                <label htmlFor='bid' className='form-label'> Book Id </label>
                <input type='number' className="form-control" id="bid" disabled value={this.props.data.bid}/>

                <label htmlFor='status' className='form-label'> Status </label>
                <input type="text" className="form-control" name='status' id="status" disabled value ={this.props.status} />
                
                <label htmlFor='return_date' className='form-label'> Return Date </label>
                <input type="date" className="form-control" id="return_date" name='return_date' onChange={this.props.handleChange} />

                <label htmlFor='reader_id' className='form-label'> Reader Id </label>
                <input type="text" className="form-control" name='reader_id' id="reader_id" onChange={this.props.handleChange} />

                <br />
                <br />
                <SubmitButton 
                    isSubmitting = {this.props.isSubmitting}
                    enabledLabel = {this.props.enabledLabel}
                    disabledLabel = {this.props.disabledLabel}
                />

            </form>

        </div>
    )
  }
}
