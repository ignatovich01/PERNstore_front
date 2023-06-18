import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div>
      <ListGroup>
        {device.types.map((type) => (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            active={type.id === device.selectedType.id}
            onClick={() => {
              type.id !== device.selectedType.id
                ? device.setSelectedType(type)
                : device.setSelectedType(0);
            }}
            key={type.id}>
            {type.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
});

export default TypeBar;
