import React , { useState } from 'react';
import { Link , useHistory } from 'react-router-dom'; //Link = usado para mudar a rota sem recarregar a página toda
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';


export default function Logon(){

    const [id, setId] = useState('');

    //ajuda a fazer navegação via javascript
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            //console.log(response.data.nome);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongNome', response.data.nome);

            //redireciona para a rota "profile"
            history.push('/profile');

        }catch(err){
            alert('Falha no Login, tente novamente !');
        }
    }

    return(
       
        <div className="logon-container">        
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input                         
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)} />

                    <button className="button" type="submit">Entrar</button>

{/*
                    <a href="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </a>
*/}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>

                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}