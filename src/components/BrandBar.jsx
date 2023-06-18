import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Form } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const BrandBar = observer ( ()=> {
    const {device} = useContext(Context)

  return (
    <Form  style={{display:"flex" , flexWrap:"wrap"}}>
       {device.brands.map(brand =>
        <Card
        onClick = {()=> {brand.id !== device.selectedBrand.id ? device.setSelectedBrand(brand)  : device.setSelectedBrand(0)}}

        key={brand.id}
        className='p-3'
        border = {brand.id === device.selectedBrand.id ? 'danger' : 'light'}
        style={{cursor:"pointer"}}>
            {brand.name}
        </Card>
        )}
    </Form>
  )
})


export default BrandBar;