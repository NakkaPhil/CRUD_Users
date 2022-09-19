import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form' 
import axios from 'axios'
export default function UsersForm({getUsers, userSelected, deselectUser}) {
    useEffect(()=>{
        if(userSelected){
            reset(userSelected)
        }
    },[userSelected])
    const {register, handleSubmit, reset} = useForm()

    
    const submit = (data)=>{
        if(userSelected){
            //Updating:
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
            .catch(e => console.log('There is an error updating with something like... ', e.response))
            .then(()=> clear())
        }else{
            //Creating:
            axios.post('https://users-crud1.herokuapp.com/users/', data)
            .catch(e => console.log('There is an error in the creation with something like... ', e.response))
            .then(()=>clear())
        }

    }

    const clear = ()=>{
        reset(
            {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                birthday: ''
            }
        )
        deselectUser()
        getUsers()
    }


  return (
    <form onSubmit={handleSubmit(submit)} className='userForm'>
        <div className="input-container name">
            <label htmlFor="FName"><i className='bx bx-user'></i></label>
            <div className="inputs-container">
                <input
                    required
                    id='FName'
                    type="text"
                    placeholder='first name'
                    {...register("first_name")}
                />

                <input
                    required
                    type="text"
                    placeholder='last name'
                    {...register("last_name")}
                />
            </div>
        </div>

        <div className="input-container">
            <label htmlFor="email"><i className='bx bx-envelope'></i></label>
            <input 
                required
                id='email'
                type="email"
                placeholder='type your email'
                {...register("email")}
            />
        </div>

        <div className="input-container">
            <label htmlFor="password"><i className='bx bx-lock-open-alt'></i></label>
            <input 
                required
                id='pass'
                type="password"
                placeholder='choose a password'
                {...register("password")}
            />
        </div>

        <div className="input-container">
            <label htmlFor="birthday"><i className='bx bx-cake'></i></label>
            <input 
                id='birthday'
                type="date"
                {...register("birthday")}
            />
        </div>
        <button className='chargeUser'>{userSelected ? 'Update User' : 'Upload User' }</button>
    </form>
  )
}
