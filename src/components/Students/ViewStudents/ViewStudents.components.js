import React, { Component } from 'react'
import { httpClient } from '../../../utils/httpClient';
import { notify } from '../../../utils/toastr';

export class ViewStudents extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            isLoading: false
        }
    }

    componentDidMount(){
        httpClient.GET('/user/students', true)
            .then(res=> {
                console.log('res >>', res.data.data);
                this.setState({
                    data: res.data.data
                })
            })
            .catch(err=> {
                console.log(err);
            })
    }

    editStudent(id){
        this.props.history.push(`/edit-student/${id}`)
    }

    removeStudent(id,index){
        const confirmation = window.confirm('Are you sure ?');
        if(confirmation){
            httpClient.DELETE(`/user/students/${id}`, true)
                .then(res=> {
                    notify.showInfo('Student Removed')
                    const {data} = this.state;
                    data.splice(index,1);
                    this.setState({
                        data
                    })
                })
                .catch(err=> {
                    console.log(err);
                })
        }
    }

  render() {
    let content = this.state.isLoading
        ? <p> Loading </p>
        : <table className='table table-hover'>
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
                    (this.state.data || []).map((data,index)=> (
                        <tr key={index}>
                            <td> {data.id} </td>
                            <td> {data.name} </td>
                            <td> {data.username} </td>
                            <td> {data.email} </td>
                            <td> {data.dept} </td>
                            <td> 
                                <button className='btn btn-primary' onClick={()=> this.editStudent(data.id)}> Edit </button>
                                &nbsp;
                                <button className='btn btn-danger' onClick={()=> this.removeStudent(data.id, index)}> Delete </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    return (
      <div className='container'> 
        {content}
      </div>
    )
  }
}
