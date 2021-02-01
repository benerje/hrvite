const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT'

export const updateDepartment = (id)=>(
    {
    type:UPDATE_DEPARTMENT,
    id
})

const LOGIN ="LOGIN"

export const LoginUser = (loginid)=>({
     type:LOGIN,
     loginid
})