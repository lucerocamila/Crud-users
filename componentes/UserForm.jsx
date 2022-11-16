import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import UserList from './UserList';
const UserForm = () => {

    const {handleSubmit, register, reset } = useForm();

    const[users,setUsers]=useState([])    
    const[error,setError]=useState(false)
    const[click,setInitial]=useState(false)
    const [userSelect,setSelectuser]=useState(null)
    const[show,setShow]=useState(false)
    const[successfully,setSuccess]=useState(false)
    const[Zoom,setZoom]=useState(true)
    const[mode,setMode]=useState(false)
    const [back,setBack]=useState(null)



    useEffect(()=>{
        axios.get("https://users-crud1.herokuapp.com/users/")
        .then(res=>{ 
                     setUsers(res.data)})
             
        },[])
          
                


    const load=()=>{
        axios.get("https://users-crud1.herokuapp.com/users/")
        .then(res=>setUsers(res.data))
    }

    const summit=(user)=>{

        if(userSelect!==null){
          up(user)
        }else{
            axios.post(`https://users-crud1.herokuapp.com/users/`,user)
            .then(()=>{
                truee()
                load()
                reset({
                    email:"",
                    password:"",
                    first_name:"",
                    last_name:"",
                    birthday:"",
                })
            })
            .catch(error=>{
                console.log(error.response?.data)
                    ward()
            })
        }   
    }

    const truee=()=>{
        setSuccess(true)
        setTimeout(()=>{
            setSuccess(false)
        },1500)
    }

    const ward=()=>{
                    setError(true)
                    setTimeout(()=>{
                        setError(false)
                    },1000)
    }

    const selectt=(user)=>{
        setSelectuser(user)
        setInitial(true)
        setZoom(false)
    }

const up=(userr)=>{
    console.log(userr)
    axios.put(`https://users-crud1.herokuapp.com/users/${userSelect.id}/`,userr)
    .then(()=>{
            truee()
        load()
        reset({
            email:"",
            password:"",
            first_name:"",
            last_name:"",
            birthday:"",
        })
        setSelectuser(null)
    })
    .catch(error=>{
        ward()
        console.log(error.response?.data)})
}

useEffect(()=>{
    if(userSelect){
        reset(userSelect)
    }
},[userSelect])


const Zoombutton=()=>{
    setZoom(false)
    setInitial(true)
}

const formquit=()=>{
    setInitial(false) 
    setZoom(true)
}    
return (
        <div>
            <section className='main'>
                <h1 className='title'>Welcome!</h1>
                <br />
                <h3>New User</h3>    
            </section>

            {Zoom?(
            <div className='zoom-user' onClick={()=>Zoombutton()}>
             <i className='bx bxs-user-plus'></i>
            </div>
            ):""}

            {click?(
    <article className='users-form'>
        
        
        <form action='' onSubmit={handleSubmit(summit)}>
            
            <div className='input-box'>
            <label htmlFor='first'>First name</label>
            <input {...register("first_name")} type="text" placeholder='First name' id='first' required=""/>
            </div>
            <div className='input-box'>
            <label htmlFor='last'>Last name</label>
            <input {...register("last_name")} type="text" placeholder='Last name' id='last' required=""/>
            </div>

            <div className='input-box'>
            <label htmlFor='brd'>Birthday <i className='bx bxs-cake'></i></label>
            <input {...register("birthday")} type="date" placeholder='birthday date' id='brd'/>
            </div>
            <div className='input-box'>
            <label htmlFor='email'>Email <i className='bx bxs-envelope'></i></label>
            <input {...register("email")} type="email" placeholder='E-mail' id='email'/>
            </div>

            <div className='input-box'>
            <label htmlFor='passwordd'>Password <i className='bx bxs-lock'></i></label>
            <input {...register("password")} type="text" placeholder='Password' id='passwordd' required=""/>
            <button type='button' onClick={()=>setShow(!show)}>{show?<i className='bx bx-low-vision'></i>:<i className='bx bxs-show'></i>}</button>
            </div>

            

          
            <button className='submit-button'>Upload</button>
        </form><div className='x-quit'>
            <i onClick={()=>{formquit()}} className='bx bx-x x-bg'></i>
            </div> 
        </article>):""}
           

            {successfully?(<div className='successfully'>
                <h2>Successfully created<i className='bx bxs-check-circle'></i></h2>
            </div>):""}

            {error?(<div className='error'>
               
                <p>Please, complete all fields properly</p> <i className='bx bx-error-alt'></i>
            </div>):""}
            
        <article className='users'>
        <UserList list={users} load={load} select={selectt} />
        </article>

        </div>
    );
};

export default UserForm;