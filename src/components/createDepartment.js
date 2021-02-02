import TextField from '@material-ui/core/TextField';
import {Grid,Paper,Avatar,Button} from '@material-ui/core'
import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'

const CreateDepartment = () => {
    const history  = useHistory()
    const [name,setname] = useState("")
    const [error,setError] = useState('')

    const PostData = ()=>{
    fetch("http://15.206.118.222:5000/admin/department/add",{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "Accepts":'application/json',
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body: JSON.stringify({
            name,
        })
    }).then(res=>res.json())
    .then(data=>{
        console.log(data)
       if(data.status==400){
        setError(data.data.details[0].message)
       }
       else{
           alert("created success")
           history.push('/home')
       }
    }).catch(err=>{
        console.log(err)
    })
    }

    const paperStyle={padding:20,height:350,width:280,margin:"50px auto"}
    const button={margin:"20px"}
    return (
        
        <Grid>
            <Paper elevation={10} style={paperStyle}>
              <Link to='/home'>
                 <Button  style={button} variant="contained" type="submit" color="primary">Back</Button>
                </Link>
                <Grid align="center">
                    <h2>Create Department</h2>
                    <TextField margin="normal" value={name}  onChange={(e)=>setname(e.target.value)}  id="outlined-basic" label="CreateDepartment"  variant="outlined" readOnly/>
                    <Button onClick={()=>PostData()} style={button} variant="contained" type="submit" color="primary">Add</Button>
                    <p style={{color:"red"}}>{error}</p>
                </Grid>
                
            </Paper>
        </Grid>
    )
}

export default CreateDepartment
