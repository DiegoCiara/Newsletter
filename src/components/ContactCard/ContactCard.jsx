import React, { useEffect, useState } from 'react';
import { MdEdit, MdMoreHoriz } from 'react-icons/md';
import { Popover, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import axios from 'axios';

function ContactCard(props) {
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(props.name);
  const [editedEmail, setEditedEmail] = useState(props.email);
  const [contatos, setContatos] = useState([]);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  
  const handleEditModalOpen = () => {
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  
  useEffect(() => {
    async function fetchContatos() {
      try {
        const response = await axios.get('http://localhost:3333/api/contatos');
        const reversedContatos = response.data.reverse(); 
        setContatos(reversedContatos);
      } catch (error) {
        console.error('Erro ao buscar contatos:', error);
      }
    }
    fetchContatos();
  }, []);

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:3333/api/contatos/${props.id}`, {
        nome: editedName,
        email: editedEmail,
      });
      toast.success(`Cadastro alterado com sucesso!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        progress: undefined, 
      });
      const contactId = props.id
      const updatedContacts = contatos.filter((contato) => contato.id !== contactId);
      setContatos(updatedContacts);
      handleEditModalClose();
    } catch (error) {
      toast.error(`Ops, cadastro não alterado.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        progress: undefined, 
      });
      console.error('Erro ao salvar edições:', error);
    }
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
          <div style={{display:"flex", flexDirection:"column"}}>
          <Button onClick={handleEditModalOpen}><MdEdit className='icon'/> <b>Editar</b></Button>
          <Button color='error' onClick={props.onDelete}><BsTrash className='icon'/> <b>Excluir</b></Button>
        </div>
        </Popover>
      </div>
      <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Editar Contato</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            style={{margin:'20px 0'}}
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            style={{margin:'20px 0'}}
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleEditModalClose}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactCard;
