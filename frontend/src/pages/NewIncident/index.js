import React , { useState } from 'react';
import { Link , useHistory } from 'react-router-dom'; //Link = usado para mudar a rota sem recarregar a página toda
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    //ajuda a fazer navegação via javascript
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try{

            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            //redireciona para a rota "profile"
            history.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar um CASO, tente novamente !');
        }
    }

    return (

        <div className="new-incident-container">        
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar Novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>

                <form onSubmit={handleNewIncident}>
                    
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}                        
                    />

                    
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}                        
                    />

                    <button className="button" type="sumbit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}