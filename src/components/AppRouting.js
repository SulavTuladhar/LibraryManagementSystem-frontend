import React from 'react';
import { BrowserRouter,Redirect,Route,Switch } from 'react-router-dom';

import { AdminLogin } from './Auth/Login/adminLogin/AdminLogin.components';
import { StaffLogin } from './Auth/Login/staffLogin/StaffLogin.components';
import { AddBook } from './Books/AddBook/AddBook.components';
import { IssueBook } from './Books/IssueBook/IssueBook.components';
import { UpdateBook } from './Books/UpdateBook/UpdateBook.components';
import { ViewAvailableBooks } from './Books/ViewAvailableBooks/ViewAvailableBooks.components';
import { ViewBooks } from './Books/ViewBooks/ViewBooks.components';
import { ViewIssuedBooks } from './Books/ViewIssuedBooks/ViewIssuedBooks.components';
import { AdminDashboard } from './Dashboard/adminDashboard/AdminDashboard.components';
import { StaffDashboard } from './Dashboard/staffDashboard/StaffDashboard.components';
import { ViewStudents } from './Students/ViewStudents/ViewStudents.components';
import { AddStudent } from './Students/AddStudent/AddStudent.components';
import { UpdateStudent } from './Students/UpdateStudent/UpdateStudent.components';
import { Header } from './Common/Header/Header.components';
import { AddStaffs } from './Staffs/AddStaffs/AddStaffs.components';
import { ViewStaffs } from './Staffs/ViewStaffs/ViewStaffs.components';
import { EditStaff } from './Staffs/EditStaff/EditStaff.components';
import { HomePage } from './HomePage';
import { AdminRegister } from './Auth/Register/AdminRegister.components';

// Protected Route
const ProtectedRoute = ({component: Component, ...rest}) => {
    var token = localStorage.getItem('token');
    var user = localStorage.getItem('user');
    return <Route {...rest} render = {routerProps => (
        token && JSON.parse(user).role === 'staff'
            ? <>
                <Header isLoggedIn fromStaff/>
                <div className='main-content'>
                    <Component {...routerProps} />
                </div>
            </>
            : token && JSON.parse(user).role !== 'staff'
                ? <>
                    <Header isLoggedIn fromAdmin />
                    <div className='main-content'>
                        <Component {...routerProps} />
                    </div>
                </>
                : <Redirect to='/'></Redirect>
    )} />
}

const PublicRote = ({component: Component, ...rest})=> {
    var user = localStorage.getItem('user');

    return <Route {...rest} render = {routerProps=> (
        <>
            <Header isLoggedIn = {localStorage.getItem('token') ? true : false } fromAdmin = {localStorage.getItem('token') && JSON.parse(user).role !== 'staff' ? true : false}/>
            <div className='main-content'>
                <Component {...routerProps} />
            </div>
        </>
    )} />
}


export const AppRouting = (props)=> {
    return(
        <BrowserRouter>
            <Switch> 
                <PublicRote path="/" exact component={HomePage} />
                {/* Auth */}
                <PublicRote path="/staff-login" component={StaffLogin} />
                <PublicRote path="/admin-login" component={AdminLogin} />
                <PublicRote path="/admin-register" component={AdminRegister} />
                <ProtectedRoute path="/admin-dashboard" component={AdminDashboard} />
                <ProtectedRoute path="/staff-dashboard" component={StaffDashboard} />
                {/* Books */}
                <PublicRote path="/books" exact component={ViewBooks} />
                <ProtectedRoute path="/add-book" component={AddBook} />
                <ProtectedRoute path="/edit-book/:id" component={UpdateBook} />
                <PublicRote path="/books/issued" component={ViewIssuedBooks} />
                <PublicRote path="/books/available" component={ViewAvailableBooks} />
                <ProtectedRoute path="/books/issue/:id" component={IssueBook} />
                {/* Students */}
                <ProtectedRoute path="/students" component={ViewStudents} />
                <ProtectedRoute path="/add-student" component={AddStudent} />
                <ProtectedRoute path="/edit-student/:id" component={UpdateStudent} />
                {/* Staffs */}
                <ProtectedRoute path="/add-staff" component={AddStaffs} />
                <ProtectedRoute path="/staffs" component={ViewStaffs} />
                <ProtectedRoute path="/edit-staff/:id" component={EditStaff} />
            </Switch>
        </BrowserRouter>
    )
}