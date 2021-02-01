import { Button } from '@material-ui/core'
import React, { useEffect,useState } from 'react'
import './Home2.css'
import { Link} from 'react-router-dom'
import { updateDepartment } from '../../actions';
import {connect} from 'react-redux'

const Home2 = (props) => {

    const [rows,setrows] = useState([])
    const [loginid,setLoginId] = useState('')
  
    useEffect(()=>{
      const loginid = localStorage.getItem("user")
      setLoginId(loginid)
      fetch('http://15.206.118.222:5000/admin/department/list',{
          method:'GET',
          headers: { 
              "Content-type": "application/json; charset=UTF-8",
              "Accepts":'application/json',
              "Authorization":"Bearer "+localStorage.getItem('jwt'),
          }
      })
      .then(response => response.json())
      .then(response => {
          console.log(response.data) 
          setrows(response.data.rows)
      })
  },[])
  
      const clickHandler=(id1)=>{
          props.dispatch(updateDepartment(id1))
         
      }
      const button={marginTop:50,marginLeft:800}
  
    return (
        <div>
             {loginid==="admin@hrvite.com"|| loginid=="manager@hrvite.com"?
             <Link to = "/createdepartment">
                <Button variant="contained" style={button}  type="submit" color="primary">Add Department</Button> 
             </Link>:""}
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Name</th>
                        <th>Status</th>
                        {loginid=="admin@hrvite.com"||loginid=="manager@hrvite.com"?
                        <th>Update</th>:""}
                        {loginid==="admin@hrvite.com"?
                        <th>delete</th>:""}
                    </tr>
                </thead>
                <tbody>
                {rows?.map(row => (
                    <tr>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        {loginid=="admin@hrvite.com"|| loginid== "manager@hrvite.com"?
                        <td>
                        <Link to = "/updatedepartment">
                            <Button variant="contained" onClick={()=>clickHandler(row.id)} type="submit" color="primary">Update</Button>
                        </Link>

                        </td>:""}
                         
                        {loginid==="admin@hrvite.com"?
                        <td>
                        <Button variant="contained" type="submit" color="secondary">delete</Button>
                        </td> :
                        ""}

                    </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    )
}
const mapStateToProps = (state)=>({
    id:state.id,
    loginid:state.loginid
})

export default connect(mapStateToProps)(Home2);
