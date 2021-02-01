const initialState ={
    id:"",
    loginid:""
}


const Department = (state=initialState,action)=>{
    console.log(action.id)
    switch(action.type){
        case "UPDATE_DEPARTMENT":
            return{
                id:action.id

            }
        case 'LOGIN' :
            return{
                loginid:action.loginid
            }  
            default:
                return state
    }
}
export default Department