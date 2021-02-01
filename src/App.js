import './App.css';
import Login from './components/login/Login';
import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import CreateDepartment from './components/createDepartment';
import UpdateDepartment from './components/updateDepartment';
import Home2 from './components/home/Home2';
import {connect} from 'react-redux'
import ButtonAppBar from './components/navBar';


const App=() =>{
  const history = useHistory()
  useEffect(()=>{
      const user = JSON.parse(localStorage.getItem('jwt'))
      if(user===null){
       history.push('/')
      }
  },[])
  return (
    <div >
          <BrowserRouter>
            <Switch>        
               <Route exact path="/">
                   <ButtonAppBar/>
                    <Home2 />  
                </Route>

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/createdepartment">
                    <ButtonAppBar/>
                    <CreateDepartment />
                </Route>   

                <Route path="/updatedepartment">
                    <ButtonAppBar/>
                    <UpdateDepartment />
                </Route>  
                
            </Switch>    
          </BrowserRouter>
    </div>
  );
}

export default connect()(App);
