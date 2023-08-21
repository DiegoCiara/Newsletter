import React, { useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { Popover, Button } from '@mui/material';
import { BsTrash } from 'react-icons/bs';

function ContactCard(props) {
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const openPopover = Boolean(popoverAnchor);

  return (
    <div className='Card ContactCard'>
      <b className='data'>{props.name}</b>
      <span className='data'>{props.email}</span>
      <div className='ContainerIcons'>
        <MdMoreHoriz className='icon' onClick={handlePopoverOpen} />

        <Popover
          open={openPopover}
          anchorEl={popoverAnchor}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Button color='error' onClick={props.onDelete}><BsTrash className='icon'/> <b>Excluir</b></Button>
        </Popover>
      </div>
    </div>
  );
}

export default ContactCard;
