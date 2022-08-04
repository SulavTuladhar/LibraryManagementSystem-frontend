import React from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import './Header.components.css'
const logout = history => {
  localStorage.clear();
  history.push('/')
}

const HeaderComponent = (props) => {
  // console.log("header",);
  let content = props.isLoggedIn
    ? <nav className='nav'>
        <div className='container d-flex align-items-center justify-content-around' style={{width: '20vw'}}>
        <div className="dropdown">
          {/* Books */}
          <button className="btn btn-outline-secondary dropdown-toggle" id="dropdown-books" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Books &nbsp;
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdown-books">
            <NavLink className="dropdown-item" activeClassName='selected' to='/books'> Books </NavLink>
            <NavLink className="dropdown-item" activeClassName='selected' to='/add-book'> Add Book </NavLink>
            <NavLink className="dropdown-item" activeClassName='selected' to='/books/available'> Available </NavLink>
            <NavLink className="dropdown-item" activeClassName='selected' to='/books/issued'> Issued </NavLink>
          </div>
          </div>
          {/* Students */}
          &nbsp;
          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle" id="dropdown-students" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Students &nbsp;
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdown-students">
              <NavLink className="dropdown-item" activeClassName='selected' to='/students'> Students </NavLink>
              <NavLink className="dropdown-item" activeClassName='selected' to='/add-student'> Add Student </NavLink>
            </div>
          </div> 
          {/* Staffs */}
          {
            props.fromAdmin
              ? <div className="dropdown">
                  <button className="btn btn-outline-secondary dropdown-toggle" id="dropdown-staff" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Staffs &nbsp;
                  </button>
                <div className="dropdown-menu" aria-labelledby="dropdown-staff">
                  <NavLink className="dropdown-item" activeClassName='selected' to='/staffs'> Staffs </NavLink>
                  <NavLink className="dropdown-item" activeClassName='selected' to='/add-staff'> Add Staff </NavLink>
                </div>
                </div> 
              : ""
          }
          <div className="dropdown">

          <button className="btn btn-danger" onClick={()=>logout(props.history)}> Logout </button>
          </div>
        </div>
      </nav>
    : <nav className='nav'>
        <div className='container d-flex align-items-center justify-content-between' style={{width: "20vw"}}> 
          <NavLink activeClassName='selected' className="btn btn-outline-secondary d-flex align-items-center" to='/books'> Books </NavLink>
          <NavLink activeClassName='selected' className="btn btn-outline-secondary d-flex align-items-center" to='/books/issued'> Issued Books </NavLink>
          <NavLink activeClassName='selected' className="btn btn-outline-secondary d-flex align-items-center" to='/books/available'> Available Books </NavLink>
          <NavLink activeClassName='selected' className="btn btn-primary d-flex align-items-center" to='/staff-login'> Login </NavLink>
        </div>
  </nav>

    return (
      <>
        {content}
      </>
    )
}

export const Header = withRouter(HeaderComponent)