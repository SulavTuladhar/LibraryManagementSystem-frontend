import React, { Component } from 'react'
import { SubmitButton } from '../Common/SubmitButton/SubmitButton.components'

export class StudentForm extends Component {
  render() {
    return (
      <div className='d-flex flex-column align-items-center justify-content-center' style={{height: "100vh"}}>
        <h1> {this.props.title} </h1>
        <br />
        <form onSubmit={this.props.onSubmit} className="container">
            <label htmlFor='name' className='form-label'> Name </label>
            <input type="text" name='name' id='name' className='form-control' onChange={this.props.handleChange} value={this.props.data.name}/>
            <p> {this.props.error.name} </p>
            
            <label htmlFor='email' className='form-label'> Email </label>
            <input type="email" name='email' id='email' className='form-control' onChange={this.props.handleChange} value={this.props.data.email}/>
            <p> {this.props.error.email} </p>
            
            <label htmlFor='username' className='form-label'> Username </label>
            <input type="text" name='username' id='username' className='form-control' onChange={this.props.handleChange} value={this.props.data.username}/>
            <p> {this.props.error.username} </p>
            
            <label htmlFor='dept' className='form-label'> Department </label>
            <input type="text" name='dept' id='dept' className='form-control' onChange={this.props.handleChange} value={this.props.data.dept}/>
            <p> {this.props.error.dept} </p>
            
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
