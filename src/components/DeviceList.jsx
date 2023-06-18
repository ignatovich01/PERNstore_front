import DeviceItem from './DeviceItem';
import React, {useContext} from 'react'
import { Context } from '..';

import { observer } from 'mobx-react-lite';





const DeviceList = observer(()=> {
    const {device} = useContext(Context)
    return (
        <div className='d-flex flex-direction-row flex-wrap'>
            {
            device.devices.map(device=>
            <DeviceItem key={device.id} device={device}  />   
            
                )}
          
        </div>
      )
})


export default DeviceList;