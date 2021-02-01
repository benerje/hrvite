import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link,useHistory } from 'react-router-dom'
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const button={textDecoration:null}
  const history = useHistory()
  console.log(props.loginid)

  const [userid,setUserId] = useState('')
  useEffect(()=>{
    const loginid = localStorage.getItem("user")
    setUserId(loginid)
  },[])

  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            BEN
          </Typography>

          <Typography variant="h6" className={classes.title}>
            HELLO {userid}
          </Typography>
          
             <Button 
              onClick={()=>{
                localStorage.clear()
                history.push('/login')
                }
            }
             variant="contained" style={button} color="secondary">Logout</Button>
      
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state)=>({
    id:state.id,
    loginid:state.loginid
})

export default connect(mapStateToProps)(ButtonAppBar)