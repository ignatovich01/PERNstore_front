import React, { useContext,useState, useEffect}  from 'react'
import { Modal  , Button, Form, FormControl, Dropdown , Row, Col} from 'react-bootstrap'
import { Context } from '../../'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import { observer } from 'mobx-react-lite';
import firebase from 'firebase/app';


////
  import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDvjeSPzGvoy0ZwlILw2uCJIA4q9Az72Fw",
  authDomain: "store-18489.firebaseapp.com",
  projectId: "store-18489",
  storageBucket: "store-18489.appspot.com",
  messagingSenderId: "1094810767362",
  appId: "1:1094810767362:web:b7a714191405eab395d71b",
  measurementId: "G-V43YB1Y4FV"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
let pathReference;






 const CreateDevice = observer(({show, onHide}) =>{
  const {device} = useContext(Context)

  const [name , setName] = useState('');
  const [price , setPrice] = useState('')
  const [file , setFile] = useState(null)

  const [info , setInfo] = useState([]);

  useEffect(()=>{
    fetchTypes().then(data=>device.setTypes(data))
    fetchBrands().then(data=>device.setBrands(data))
  },[])

  function fileUpload(file,name){
    let itemName = name.split(' ').join('_');
    console.log(file.name + "____"+ name)
    const storageRef = ref(storage, 'images/' + itemName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    pathReference = ref(storage, `images/${itemName}`);
    // console.log(pathReference._location.path_)

  
  }


  function selectFile (e) {
    setFile(e.target.files[0])
console.log(e.target.files[0])
  }

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
}
const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
}
const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
}



const addDevice = () => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('price', `${price}`)
  formData.append('img', file)
  formData.append('brandId', device.selectedBrand.id)
  formData.append('typeId', device.selectedType.id)
  formData.append('info', JSON.stringify(info))
  
  fileUpload(file,name);
  createDevice(formData).then(() => onHide())
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
          <Dropdown>
            <DropdownToggle>{device.selectedType.name  || "Выберите тип"}</DropdownToggle>
            <DropdownMenu>
                {device.types.map((type)=>
                <DropdownItem onClick={()=> device.setSelectedType(type)} key = {type.id}>{type.name}</DropdownItem>
                )}
            </DropdownMenu>
          </Dropdown>
        </Form>

        <Form className='mt-2'>
          <Dropdown>
            <DropdownToggle>{device.selectedBrand.name || "Выберите бренд"}</DropdownToggle>
            <DropdownMenu>
                {device.brands.map((brand)=>
                <DropdownItem onClick={()=> device.setSelectedBrand(brand)} key = {brand.id}>{brand.name}</DropdownItem>
                )}
            </DropdownMenu>
          </Dropdown>
        </Form>
        <FormControl 
        placeholder = 'введите название(только буквы и цифры пж) )' 
        type = 'text' 
        className='mt-2'
        onChange={e=>setName(e.target.value)}
        value={name}
        />
        <FormControl 
        placeholder = 'введите стоимость устройства' 
        type = 'number' 
        className='mt-2'
        onChange={e=>setPrice(Number(e.target.value))}
        value={price}

        />
        <FormControl 
        placeholder = 'файл устройства' 
        type = 'file' 
        className='mt-2'
        onChange={selectFile}
        />
         <br></br>
        
        <Button variant='outline-dark' onClick={addInfo}>Добавить новое свойство - инфо</Button>
                    {info.map((item) =>
                 
                        <Row key = {item.number}>
                          <Col md={4} className='mt-3'>
                          <FormControl placeholder='введите название характеристики'
                          value= {item.title}  
                          onChange={(e)=>changeInfo('title' , e.target.value , item.number)}  
                          />
                            </Col>
                            <Col md={4} className='mt-3'>
                            <FormControl placeholder='введите описание характеристики'
                           value= {item.description}  
                           onChange={(e)=>changeInfo('description' , e.target.value , item.number)}  

                           />
                            </Col>
                            <Col md={4} className='mt-3'>
                                <Button variant={'outline-danger'} onClick={()=>removeInfo(item.number)}>delete</Button>
                            </Col>
                        </Row>)}

      </Modal.Body>
      <Modal.Footer>
      <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
      <Button variant={'outline-success'} onClick={addDevice}>Добавить</Button>

      </Modal.Footer>
    </Modal>
  )
})

export default CreateDevice;