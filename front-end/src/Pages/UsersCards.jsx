import './UsersCards.css';

function UserCard(props){
    return (
        <div className='Card'>
            <p>Id: <span>{props.Id}</span> </p>
            <p>Name: <span>{props.Username}</span> </p>
            <p>Password: <span>{props.Password}</span> </p>
            <p>Count: <span>{props.Contas}</span> </p>
        </div>
    )
}

export default UserCard