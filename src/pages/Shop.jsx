import React, { useContext, useEffect } from 'react'
import { Col ,Container} from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchBrands, fetchTypes,fetchDevices } from '../http/deviceAPI';
import Pages from '../components/Pages';


///




///

 const  Shop = observer(()=> {
  const {device} = useContext(Context);
  
  useEffect(()=>{
    fetchTypes().then(data=>device.setTypes(data))
    fetchBrands().then(data=>device.setBrands(data))
    fetchDevices(null, null ,1, 3).then(data=>{
      device.setDevices(data.rows) ;
      //  console.log(data)
      device.setTotalCount(data.count)
      }) 
  },[])

  useEffect(()=>{
    fetchDevices(device.selectedType.id , device.selectedBrand.id , device.page ,3).then(data=>{
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  },[device.page , device.selectedType , device.selectedBrand])


  return (
<Container >
  <div style={{display: 'flex' , flexDirection: 'row'}}>
    <Col md={3} className='mt-3'>
      <TypeBar/>
    </Col>

    <Col md={9} style={{margin : '15px 20px'}}>
      <BrandBar/>
      <DeviceList style={{display: 'flex ' }}/>
     
    </Col>

  </div>
       <div style={{marginTop : 20, display : "flex" , justifyContent : 'center' }}>
           <Pages  />
       </div>
</Container>
  )
})
export default Shop;
