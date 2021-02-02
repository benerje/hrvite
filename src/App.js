import './App.css';
import Login from './components/login/Login';
import React,{useEffect,createContext,useReducer,useContext} from 'react'
import {BrowserRouter,Route, Switch, useHistory} from 'react-router-dom'
import CreateDepartment from './components/createDepartment';
import UpdateDepartment from './components/updateDepartment';
import Home2 from './components/home/Home2';
import {connect} from 'react-redux'
import ButtonAppBar from './components/navBar';
import jwt from "jsonwebtoken"


const App=() =>{
  const history = useHistory()
  if(localStorage.jwt){
    jwt.verify(localStorage.jwt,'secret',function(err,decode){
      if(err){
        console.log(err)
        history.push('/')
      }
    })
  }
  return (
    <div >
          <BrowserRouter>
            <Switch>        
               <Route exact path="/home">
                   <ButtonAppBar/>
                    <Home2 />  
                </Route>

                <Route exact path="/">
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
