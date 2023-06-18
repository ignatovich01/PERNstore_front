import React, { useState } from 'react'
import { Modal  , Button, Form, FormControl} from 'react-bootstrap'
import { createType } from '../../http/deviceAPI';

 function CreateType({show, onHide}) {

  const [type, setType] = useState('');

  const addType = () => {
    createType({name : type}).then(()=>setType(''))
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
            value={type}
            onChange={e=>setType(e.target.value)}/>

            
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
      <Button variant={'outline-success'} onClick={addType}>Добавить</Button>

      </Modal.Footer>
    </Modal>
  )
}

export default CreateType;