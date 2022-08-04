const redirectToAdminDashboard = (props,response) => {
    if(!response.data.user.role){
        props.push('/admin-dashboard')
    }
}

const redirectToStaffDashboard = (props, response) => {
    if(response.data.user.role === 'staff'){
        props.push('/staff-dashboard')
    }
}

export const Redirect = {
    redirectToAdminDashboard,
    redirectToStaffDashboard
}