import React, { useState, useEffect } from 'react';
import ContactCard from '../components/ContactCard/ContactCard';
import axios from 'axios';
import { Button, InputAdornment, TextField } from '@mui/material';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

function Contacts() {
  const [contatos, setContatos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); 

  const contactsPerPage = 5;
  const totalPages = Math.ceil(contatos.length / contactsPerPage);

  const startIndex = currentPage * contactsPerPage;
  const endIndex = startIndex + contactsPerPage;
  const filteredContacts = contatos.filter((contato) =>
  contato.nome.toLowerCase().includes(searchTerm.toLowerCase())
);

  const currentContacts = filteredContacts.slice(startIndex, endIndex);

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

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:3333/api/contatos/${contactId}`);
      toast.success(`Cadastro deletado com sucesso!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        progress: undefined, 
      });
      const updatedContacts = contatos.filter((contato) => contato.id !== contactId);
      setContatos(updatedContacts);
    } catch (error) {
      console.error('Erro ao deletar contato:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };  
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); 
  };

  const renderPaginationButtons = () => (
    <div className='Pagination'>
      <Button
        color='info'
        style={{color:'#ffff'}}
        variant='contained'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Anterior
      </Button>
      <span>Página {currentPage + 1} de {totalPages}</span>
      <Button
        color='info'
        style={{color:'#ffff'}}
        variant='contained'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        Próximo
      </Button>
    </div>
  );

  return (
    <div className='Page'>
      <title>Newsletter: Comunidade</title>
      <h1>Comunidade</h1> 
      <div className='Links'>
      <TextField
        size='small'
        type="text"
        className="Input"
        label="Pesquisar por nome"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <BsSearch/>
            </InputAdornment>
          ),
        }}
      />

      </div>
      <p>Veja os participantes da comunidade!</p>     
      <div style={{width:"100%"}}>
        <div className='ContactsList'>
          {currentContacts.map((contato) => (
            <ContactCard
              key={contato.id}
              id={contato.id}
              name={contato.nome}
              email={contato.email}
              onDelete={() => handleDeleteContact(contato.id)} 
            />
          ))}
        </div>
        {renderPaginationButtons()}
        
      </div>
    </div>
  );
}

export default Contacts;
