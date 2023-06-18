import React, { useContext } from 'react'
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';    
import {Button } from  'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE , ADMIN_ROUTE} from '../utils/consts';
import {observer} from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';

const  NavBar = observer(()=> {
  const {user}  = useContext(Context)
    const navigate = useNavigate()
  

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      navigate(SHOP_ROUTE)
  }

  
  return (
<Navbar bg="dark" variant="dark">
        <Container>
            <NavLink style = {{color:'white',textDecoration : 'none'}} to ={SHOP_ROUTE}>Магазин</NavLink>
          
{user.getIsAuth() ?
    <Nav className="ml-auto" style = {{color:'white'}}> 
          <Button 
          variant="outline-light"
          onClick = {()=> navigate(ADMIN_ROUTE)}
          >
          Админ-панель</Button>
          <Button 
          variant="outline-light" 
          style ={{marginLeft : '8px'}}
          onClick = {()=>logOut()}
          >
            Выход</Button>
          </Nav>
   :
   <Nav className="ml-auto" style = {{color:'white'}}>
      <Button variant="outline-light"  onClick = {()=> navigate(LOGIN_ROUTE)} >авторизация</Button>
    </Nav>

   }

        </Container>
      </Navbar>
  )
})


export default NavBar;
