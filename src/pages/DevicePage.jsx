import React ,  {useEffect, useState} from 'react'
import {Card, Col, Image, Row , Button} from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

 function DevicePage() {
  const storage = getStorage();


  const [device,setDevice] = useState({info : []})

  const {id} = useParams();
  if(device.name){
    let itemName =device.name.split(' ').join('_');
    getDownloadURL(ref(storage, `images/${itemName}`))
    .then((url) => {
      const img = document.getElementById('myimg');
      img.setAttribute('src', url);
    })
    .catch((error) => {
        console.log(error.message)
  });

   
  }



  useEffect(()=>{
    fetchOneDevice(id).then(data=>setDevice(data))
  },[])

  // let itemName = device.name.split('');
  // console.log(device.name.split(' ').join('_'))

  return (
    <div style={{padding : 60}}>
      <Row style={{margin : 40}}>
      <Col md = {4} >
      <Image width = {300} height={300}   id='myimg' alt=''/>

      </Col>
      <Col md = {4}>
        <div>
          <h2>{device.name}</h2>
          <div className='d-flex align-items-center justify-content-center'
          style={{background:`url(${bigStar}) no-repeat center center` ,width : 240 , height :240 , backgroundSize : 'cover' , fontSize : 64 }}>{device.rating}</div>
        </div>
      </Col>
       
      <Col md = {4}>
      <Card className='d-flex flex-column align-items-center justify-content-around'
      style={{width:300, height : 300 , fontSize : 32 , border : '5px solid lightgray'}}
      >
          <h3>От : {device.price} руб.</h3>
          <Button variant={'outline-dark'}>Добавить в карзину</Button>
        </Card>
      </Col>
      </Row>
      
      <Row className='d-flex flex-column m-5 '>
      <h2>Характеристики</h2>
        {device.info.map((item,index)=>
     
          <Row 
          key = {item.id}
          style={{background: index % 2 === 0 ? 'lightgray' : 'transparent' , padding :10}}
          
          > {item.title} : {item.description}</Row>
          )}
      </Row>
    </div>
  )
}

export default DevicePage;
