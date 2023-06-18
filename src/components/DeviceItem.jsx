import React from 'react'
import { Card, Col } from 'react-bootstrap';
import {Image} from 'react-bootstrap'
import star from '../assets/star.png'
import { DEVICE_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, getDownloadURL  } from "firebase/storage";



function DeviceItem({device}) {
  const storage = getStorage();
  const navigate = useNavigate()
  let itemName = device.name.split(' ').join('_');
  getDownloadURL(ref(storage, `images/${itemName}`))
  .then((url) => {
    console.log(itemName)
   document.querySelectorAll(`#${itemName}`).forEach((img)=>{
   img.setAttribute('src', url); 
    });
 })
  .catch((error) => {
      console.log(error.message)
   }
); 
  return (
    <Col md={3} className='mt-3 ' onClick={()=>navigate(DEVICE_ROUTE + '/' + device.id) } >
        <Card style={{marginRight : 10 , width : 150,cursor : 'pointer'}} border={"light"}>
            <Image id = {itemName}  style={{ width:150, height:150}} src={``} alt="qq" />
            {/* <Image style={{ width:150, height:150}} src={process.env.REACT_APP_API_URL + device.img} alt="qq" /> */}
            <div className='d-flex justify-content-between'>
                <div>{device.price}RUB</div>
                <div className='d-flex align-items-center'>
                    {device.rating}
                    <img src={star} width={15} height={15} />
                </div>
            </div>
            <div>{device.name}</div>
        </Card>
    </Col>
  )
}

export default  DeviceItem;