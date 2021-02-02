import TextField from '@material-ui/core/TextField';
import {Grid,Paper,Avatar,Button, withStyles} from '@material-ui/core'
import React,{useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {connect} from 'react-redux'


const UpdateDepartment = (props) => {
    const history  = useHistory()
    const [name,setname] = useState("")
    const [dId,setdId] = useState("")
    const [error,setError] = useState("")
    const PostData = ()=>{

        var payload = {
            dId:props.id,
            name:name
        };
        
  
    fetch("http://15.206.118.222:5000/admin/department/update",{
        method:"POST",
        headers:{
            "Content-Type":"application/json; charset=UTF-8",
            "Accepts":'application/json',
            "Authorization":"Bearer "+localStorage.getItem('jwt'),
            
        },
        body: JSON.stringify(payload)
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

    const paperStyle={padding:20,height:420,width:280,margin:"50px auto"}
    const button={margin:"20px"}
    return (
        
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Link to='/home'>
                 <Button  style={button} variant="contained" type="submit" color="primary">Back</Button>
                </Link>
            
                <Grid align="center">
                    <h2>Update Department</h2>
                    <TextField margin="normal" onChange={(e)=>setdId(e.target.value)} value={props.id}  id="outlined-basic" label="Department Id"  variant="outlined" />
                    <TextField margin="normal" value={name}  onChange={(e)=>{
                        setError('')
                        setname(e.target.value)}
                        }  id="outlined-basic" label="Department Name"  variant="outlined" />
                    <Button onClick={()=>PostData()} style={button} variant="contained" type="submit" color="primary">Add</Button>
                    <p style={{color:"red"}}>{error}</p>
                </Grid>
            </Paper>
        </Grid>
    )
}

const mapStateToProps = (state)=>({
    id:state.id
})

export default connect(mapStateToProps)(UpdateDepartment);
