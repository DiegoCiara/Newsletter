import React from 'react';
import Formulario from '../components/Form/Form';

function Home() {
  return (
    <div className='Page'>
      <title>Newsletter: Página inicial</title>
      <h1>Newsletter</h1>
      <p>Insira seu nome e e-mail para obter as melhores notícias no mundo de tecnologia!</p>
      <Formulario/>
    </div>
  );
}

export default Home;
