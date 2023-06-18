import React , {useState} from 'react'
import { Button, Container } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';
import CreateBrand from '../components/modals/CreateBrand';

 function AdminPanel() {
  const [brandVisible,setBrandVisible] = useState(false);
  const [typeVisible,setTypeVisible] = useState(false);
  const [deviceVisible,setDeviceVisible] = useState(false);


  return (
    <div>
      <Container className='d-flex flex-column'>
        <Button variant={'outline-dark'} className='mt-2' onClick = {()=>setTypeVisible(true)}> Добавить тип</Button>
        <Button variant={'outline-dark'} className='mt-2' onClick = {()=>setBrandVisible(true)}> Добавить бренд</Button>
        <Button variant={'outline-dark'} className='mt-2' onClick = {()=>setDeviceVisible(true)}> Добавить устройство</Button>

        <CreateType show = {typeVisible} onHide = {()=>setTypeVisible(false)}/>
        <CreateDevice show={deviceVisible} onHide = {()=>setDeviceVisible(false)}/>
        <CreateBrand show={brandVisible} onHide = {()=>setBrandVisible(false)}/>

      </Container>
    </div>
  )
}

export default AdminPanel;
