import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import PopUpMessage from './PopUpMessage.jsx';

function Login(){
    
    const [Username, SetUsername] = useState('');
    const [Password, SetPassword] = useState('');
    const [Message, SetMessage] = useState('');

    function ResetMessage(){
        SetMessage('');
    }

    async function EnviarRequisicao(event) {
        event.preventDefault();
        const DadosForms = {Username: Username, Password: Password, Creating: false}
        console.log(DadosForms);
        await fetch('http://127.0.0.1:3000/ProcessarDados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(DadosForms)
        })
        .then(Response => Response.json())
        .then((Response) => {
            SetMessage(Response.message);
        });
    }
    return (
        <>
            <PopUpMessage message = {Message}/>
            <form className='Container' id='FadeInElement' onSubmit={EnviarRequisicao}>
                <h1>Login</h1>
                <input type="text" placeholder='Username' value={Username} onChange={(event) => SetUsername(event.target.value)} required/>
                <input type="password" placeholder='Password' value={Password} onChange={(event) => SetPassword(event.target.value)} required/>
                <button onClick={ResetMessage}>Submit</button>
                <Link to="/CreateAccount"><a href='#'> Don't have a account? </a></Link>
                <Link to="/ListUsers"><a href='#'>See users!</a></Link>
            </form> 
        </>
    ) 
}

export default Login