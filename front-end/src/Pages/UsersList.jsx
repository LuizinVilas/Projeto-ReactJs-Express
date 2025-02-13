import './UsersList.css';
import { Link } from 'react-router-dom';
import UserCard from './UsersCards';
import { useEffect, useState } from 'react';

function UsersList() {
    const [Users, SetUsers] = useState([]);
    const [Message, SetMessage] = useState('');
    const [InputValue, SetInputValue] = useState('');

    function FadeIn(){
        document.getElementById('List').animate([
            {opacity: 0},
            {opacity: 1}
        ], {
            duration: 2000,
            easing: 'ease'
        })
    }

    async function EnviarRequisicao(All, Username){
        if(All){
            await fetch('http://127.0.0.1:3000/ListarUsuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({All: true})
            })
            .then(Response => Response.json())
            .then((Response) => {
                if(Response.message){
                    SetMessage(Response.message);   
                } else {
                    SetUsers(Response.UserList);
                }
            })
        } else {
            await fetch('http://127.0.0.1:3000/ListarUsuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({Username: Username})
            })
            .then(Response => Response.json())
            .then((Response) => {
                if(Response.message){
                    SetMessage(Response.message);
                    SetUsers([]);
                } else {
                    SetUsers([Response.UserList]);   
                }
            })      
        }
    }

    useEffect( () => {  
        EnviarRequisicao(true);
    }, [])

    useEffect(() => {
        FadeIn();
    }, [Users])

    useEffect(() => {
        if(InputValue === ''){
            EnviarRequisicao(true);
        } else {
            EnviarRequisicao(false, InputValue);
        }
    }, [InputValue])

    return (
        <>
            <div className="ListContainer" id='FadeInElement'>
                <h1>User List</h1>     
                <input type="text" placeholder='Text the name' value={InputValue} onChange={(event) => SetInputValue(event.target.value)}/>
                <div className='List' id='List'>
                    {
                        Users.length > 0 && Users ? (
                            Users.map(User => {
                                console.log(Users);
                                return (
                                    <UserCard key={User.Id} Id = {User.Id} Username = {User.Username} Password = {User.Password} Contas = {User.Contas}/>
                                )
                            })
                        ) : (
                            <h2>{Message}</h2>
                        )
                    }
                </div>
                <Link to="/"><a href='#'>Comeback</a></Link>
            </div>
        </>
    )
}

export default UsersList