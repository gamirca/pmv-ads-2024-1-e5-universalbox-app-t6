import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [deletarCliente, setDeletarCliente] = useState({ ClienteId: '' })

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('/apicliente');
        if (!response.ok) {
          throw new Error('Erro ao obter os dados');
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchClientes();
  }, []);

  const DeleteCliente = async () => {
    const newData = await fetch('/deletarCliente', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(deletarCliente)
    })
      .then(res => res.json());
  }


  const DeleteClienteState = async (clienteId) => {
    console.log(clienteId)
    setDeletarCliente({ ClienteId: parseInt(clienteId) })
  }

  useEffect(() => {
    if (deletarCliente.ClienteId !== '') {
      DeleteCliente();
    }
  }, [deletarCliente])

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Lista de Clientes</h2>
        <Link to="/cadastrocliente" className="btn btn-primary mb-3">Cadastrar Novo Cliente</Link>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">CPF</th>
              <th scope="col">Telefone</th>
              <th scope="col">CEP</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.ClienteId}>
                <td>{cliente.ClienteId}</td>
                <td>{cliente.ClienteNome}</td>
                <td>{cliente.ClienteCpf}</td>
                <td>{cliente.ClienteTelefone}</td>
                <td>{cliente.ClienteCep}</td>
                <td><Button value={"Deletar"} onClick={(clienteId) => DeleteClienteState(cliente.ClienteId)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;