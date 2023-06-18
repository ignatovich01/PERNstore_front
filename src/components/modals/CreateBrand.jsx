import React , {useState} from 'react'
import { Modal  , Button, Form, FormControl} from 'react-bootstrap'
import { createBrand } from '../../http/deviceAPI';

 function CreateBrand({show, onHide}) {

  const [brand, setBrand] = useState('');

  const addBrand = () => {
    createBrand({name : brand}).then(data=>setBrand(''))
    onHide();
   }

  return (
    <Modal
      show = {show}
      onHide = {onHide}
      size="lg"
    
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <FormControl
            placeholder='введите название типа'
            value={brand}
            onChange={e=>setBrand(e.target.value)}
            />

            
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
      <Button variant={'outline-success'} onClick={addBrand}>Добавить</Button>

      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand;