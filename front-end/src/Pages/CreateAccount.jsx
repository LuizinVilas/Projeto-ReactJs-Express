import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PopUpMessage from './PopUpMessage.jsx';

function CreateAccount(){
    const [Username, SetUsername] = useState('');
    const [Password, SetPassword] = useState('');
    const [ConfirmPassword, SetConfirmPassword] = useState('');
    const [Message, SetMessage] = useState('');

    function ResetMessage(){
        SetMessage('');
    }

    async function EnviarRequisicao(event) {
        event.preventDefault();
        if(Password == ConfirmPassword){
            const DadosForms = {CreateUsername: Username, CreatePassword: Password, Creating: true}
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
        } else {
            SetMessage('Wrong Password!');
        }
    }

    return (
        <>
            <PopUpMessage message ={Message}/>
            <form className='Container' id='FadeInElement' onSubmit={EnviarRequisicao}>
                <h1>Create Account</h1>
                <input type="text" placeholder='Username' value={Username} onChange={(event) => SetUsername(event.target.value)} required/>
                <input type="text" placeholder='Password' value={Password} onChange={(event) => SetPassword(event.target.value)} required/>
                <input type="password" placeholder='Confirm Password' value={ConfirmPassword} onChange={(event) => SetConfirmPassword(event.target.value)} required/>
                <button onClick={ResetMessage}>Submit</button>
                <Link to="/"><a href='#'>Already have a account?</a></Link>
                <Link to="/ListUsers"><a href='#'>See users!</a></Link>
            </form> 
        </>
    ) 
}

export default CreateAccount