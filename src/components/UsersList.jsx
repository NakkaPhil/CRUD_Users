import React from 'react'
import axios from 'axios'
export default function UsersList({users, getUsers, selectUser}) {

  
  const deleteUser = (id)=>{
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}`)
    .then(()=> getUsers())
  }

 
  return (
    <div>
      <ul>
        {users.map((u)=>(
          <li key={u['id']}>
            <div className="userInfo">
              <div className="userData">
                <h3>{u['first_name']} {u['last_name']}</h3>
                <p>{u['email']}</p>
                <p><i className='bx bx-cake'></i>   {u['birthday']}</p>
              </div>
              <div className='actions'>
                <button onClick={()=>deleteUser(u['id'])}><i className='bx bx-trash' style={{color:'#c10e0e'}}></i></button>
                <button onClick={()=> selectUser(u)}><i className='bx bxs-edit-alt' style={{color:'#2f2d2d'}}></i></button>
              </div>
            </div>
            </li>
        ) )}
      </ul>
    </div>
  )
}
