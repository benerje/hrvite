import TextField from '@material-ui/core/TextField';
import {Grid,Paper,Avatar, Button} from '@material-ui/core'
import LockOutlinesIcon from '@material-ui/icons/LockOutlined'
import React,{useState,useContext,} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import { LoginUser } from '../../actions';
import {connect} from 'react-redux'

const Login = (props) => {
    
    const history  = useHistory()
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")

    const PostData = ()=>{

    fetch("http://15.206.118.222:5000/admin/auth/login",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            username,
            password,
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
       if(data.status===401){
           if(data.data){
           setError(data.data)
           }
           else if(data.msg){
               setError(data.msg)
           }
       }

       else if(data.status==400){
        console.log(data.data.details[0].message)
        setError(data.data.details[0].message)
       }
       else {
           localStorage.setItem("jwt",data.token)
           localStorage.setItem("user",username)
           history.push('/home')
       }
    }).catch(err=>{
        console.log(err)
    })

    props.dispatch(LoginUser(username))
    }




    const paperStyle={padding:20,Height:40,width:280,margin:"50px auto"}
    const icon = {backgroundColor:'black'}
    const button={margin:"20px"}
    return (
        
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={icon}><LockOutlinesIcon/></Avatar>
                    <h2>SignIn</h2>
                    <TextField margin="normal" value={username}  onChange={(e)=>setUsername(e.target.value)}  id="outlined-basic" label="Email"  variant="outlined" />
                    <TextField margin="normal" id="outlined-basic" label="Password" type="password" variant="outlined" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <p style={{color:"red"}}>{error}</p>
                    <Button onClick={()=>PostData()} style={button} variant="contained" type="submit" color="primary">Sign In</Button>
                    
                </Grid>
            </Paper>
        </Grid>
    )
}


export default connect()(Login)
