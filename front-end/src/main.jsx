import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Pages/App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)

/*<App /> 
/*{
      Users.map(User => {
        return (
          <UserCard key={User.Id} Username = {User.Username} Password = {User.Password} Contas = {User.Contas}/>
        )
      })
    }
*/  
