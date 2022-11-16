import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const UserList = ({list, select, load}) => {

    const [want,setWant]=useState(false)
    const[yes,setYes]=useState(false) 
    const [userdelete,setUserdelete]=useState(null)

    const deletexd=(user)=>{
        setWant(true)
        if(yes===true){
        actu(user)
    }
}


const actu=(user)=>{
    setYes(true)
    setWant(false)
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}/`)
    .then(()=>{
    setYes(false)
    load()
    setUserdelete(null)
})
}

    return (
        <>
           {want?(<div className='wants'>
            <h2>Do you want to delete this user?</h2>
            <div className='yes-no-btn'>
            <button onClick={()=>actu(userdelete)}>Yes</button>
            <button onClick={()=>setSure(false)}>No</button>
            </div>
            </div>):""}
         
                {list.length===0?<h3 className='createUser'></h3>:list.map(user=>{
                    return(
                        <div className="user-container">
                         <div className="edit-delete-box"> <button onClick={()=>{
                                deletexd(user)
                               setUserdelete(user) }}><i className='bx bx-trash' ></i></button>
                            <button onClick={()=>select(user)}><i className='bx bx-edit-alt' ></i></button> </div>
                        <ul className='user' key={user.id}>
                        <li>
                            <h3><i className='bx bxs-user'></i> {user.first_name} {user.last_name}</h3>
                            <p><i className='bx bxs-envelope'></i> {user.email}</p>
                            <p><i className='bx bx-calendar'></i> {user.birthday}</p>
                            
                        </li>
                        </ul>
       
                        </div>
                    )
                })}
        </>
    );
};

export default UserList;