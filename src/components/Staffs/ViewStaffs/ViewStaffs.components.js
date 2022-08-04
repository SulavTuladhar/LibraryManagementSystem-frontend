import React, { Component } from 'react'
import { handleError } from '../../../utils/errorHandler';
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';

export class ViewStaffs extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        httpClient
            .GET(`/user/staffs`, true)
                .then(res=> {
                        this.setState({
                            data: res.data.data
                    })
                })
                .catch(err => {
                    handleError(err)
                })
                .finally(()=> {
                    this.setState({
                        isLoading: false
                    })
                })
    }

    editStaff(id){
        this.props.history.push(`/edit-staff/${id}`)
    }

    removeStaff(id,index){
        const confirmation = window.confirm('Are you sure ?')
        if(confirmation){
            httpClient.DELETE(`/user/staffs/${id}`, true)
                .then(res=> {
                    notify.showInfo('Staff Removed')
                    const {data} = this.state;
                    data.splice(index,1)
                    this.setState({
                        data
                    })
                })
                .catch(err => {
                    handleError(err);
                })
        }
    }


  render() {
    let content = this.state.isLoading
        ? <h1> Loading </h1>
        : <div className='container'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th> id </th>
                        <th> Name </th>
                        <th> Username </th>
                        <th> Email </th>
                        <th> Department </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (this.state.data || []).map((data,index) => (
                            <tr key={index}>
                                <td> {data.id} </td>
                                <td> {data.name} </td>
                                <td> {data.username} </td>
                                <td> {data.email} </td>
                                <td> {data.dept} </td>
                                <td>
                                    <button className='btn btn-primary' onClick={()=> this.editStaff(data.id)}> Edit </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={()=> this.removeStaff(data.id, index)}> Delete </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    return (
      <div className='container'>
        {content}
      </div>
    )
  }
}
