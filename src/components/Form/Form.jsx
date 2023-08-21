import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css'; 
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';


function Formulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      nome,
      email,
    };
  
    try {
      const response = await axios.post('http://localhost:3333/api/cadastro', formData);
      toast.success(`Cadastro realizado com sucesso!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        progress: undefined, 
      });
      console.log('Dados enviados com sucesso!', response.data);
      setNome('');
      setEmail('');
    } catch (error) {
      toast.error(`Ops, cadastro não realizado.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        progress: undefined, 
      });
      console.error('Erro ao enviar os dados:', error);
    }
  };
  
    return (
    <div className='FormContainer'>
      <form onSubmit={handleSubmit} className='Form'>
          <TextField
            type="text"
            variant='outlined'
            className='Input'
            label='Nome'
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField
            type="email"
            variant='outlined'
            className='Input'
            label='E-mail'
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <button className="Submit" type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;
