import React, { useContext, useState } from 'react'
import { Button, Card, Container ,Form, FormControl} from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration , login } from '../http/userAPI';
import {observer} from 'mobx-react-lite'
import { Context } from '..';

 const Auth = observer(()=> {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const navigate = useNavigate()

  const {user} = useContext(Context)

  const [email,setEmail] =useState('');
  const [password,setPassword] =useState('');

  const click = async ()=>{
 try{
  let data;
  if (isLogin){
   data = await login(email,password);
   console.log(data)
  } else {
   data = await registration(email,password);
   console.log(data)
  }
  user.setUser(data);
  user.setIsAuth(true)
  navigate(SHOP_ROUTE)
 }catch (e){
  alert(e.response.data.message)
}

  }

  return (
    <div>
      <Container className='d-flex justify-content-center align-items-senter' style = {{marginTop :' 5%'}}>

        <Card style={{width : 600}} className='p-5'>
          <h2 className='m-auto'>{isLogin ? 'Вход' : 'Регистрация'}</h2>
          <Form className='d-flex flex-column'>
              <FormControl
              placeholder='введите емаил '
              className='mt-2'
              value={email}
              onChange={e=>setEmail(e.target.value)}/>
               <FormControl
              placeholder='введите пароль '
              className='mt-2'
              value={password}
              onChange={e=>setPassword(e.target.value)}
              type='password'/>

            <div className='d-flex justify-content-between mt-3' style={{display:"flex", flexDirection : 'row', padding:'0 5px'}}>
             
            {isLogin ? 
             <div >
              Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>зарегистрируйтесь</NavLink>
             </div> 
             : 
              <div >
               Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
            </div>}
            
              <Button  className='align-self-end' variant='outline-success' onClick={()=>click(email,password)}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
            </div>

          </Form>
        </Card>
      </Container>
    </div>
  )
})


export default Auth;
