import React, {useState, useEffect} from 'react'
import UsersForm from './UsersForm'
import UsersList from './UsersList'
import axios from 'axios'

export default function UsersCard() {
  
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState(null)

  useEffect(()=>{
    getUsers()
  },[])

  const getUsers = ()=> {
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then(res => setUsers(res.data))
  }

  const selectUser =  user =>  setUserSelected(user)
  
  const deselectUser = ()=> setUserSelected(null)
  return (
    <div className='AppContainer'>
        <div className='usersShow'>
          <h1>Users List</h1>
            <UsersList 
            users={users}
            getUsers={getUsers}
            selectUser={selectUser}
            />
        </div>
        <div className='usersRegister'>
            <h1>New User</h1>
            <UsersForm 
            getUsers={getUsers}
            userSelected={userSelected}
            deselectUser={deselectUser}
            />
        </div>
    </div>
  )
}
