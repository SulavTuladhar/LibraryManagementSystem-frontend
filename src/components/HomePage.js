import React, { Component } from 'react'

export class HomePage extends Component {
  render() {
    return (
      <div className='container mt-5 d-flex justify-content-center'>
        <button className='btn btn-primary mx-4' onClick={()=> this.props.history.push('/admin-login')}> Are you Admin ? </button>
        <button className='btn btn-primary mx-4' onClick={()=> this.props.history.push('/staff-login')}> Are you Staff ? </button>
        <button className='btn btn-primary mx-4' onClick={()=> this.props.history.push('/books')}> Are you Student ? </button>
      </div>
    )
  }
}
