import React , { useState , useEffect } from 'react';
import { Link , useHistory } from 'react-router-dom'; //Link = usado para mudar a rota sem recarregar a página toda
import { FiPower , FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){

    const [incidents, setIncidents] = useState([]);

    //ajuda a fazer navegação via javascript
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongNome = localStorage.getItem('ongNome');

    //Executa a funcao do 1º parametro, sempre que o 2º parametro for alterado.
    useEffect( () => {
        api.get('profile', {
            headers:{
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId] );

    
    async function handleDeleteIncident(id){

        try{

            await api.delete(`incidents/${id}` , { 
                headers:{
                    Authorization: ongId
                }
            });

            //automaticamente filtra o objeto "incidents", 
            //retirando dele o regitro que foi excluido acima,
            //e assim, a tela é automaticamente atualizada, sem precisar recarregar a página
            setIncidents(incidents.filter(incident => incident.id !== id));


        } catch (err){
            alert('Erro ao deletar o caso, tente novamente !');
        }
    }

    function handleLogout(){

        localStorage.clear();

        //redireciona para a rota "raiz"
        history.push('/');
        
    }

    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongNome}</span>

                <Link className="button" to="/incidents/new">
                Cadastrar novo caso
                </Link>                

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>    

            <h1>Casos cadastrados</h1>    

            <ul>
                {incidents.map(incident => ( 

                    <li key={incident.id}>

                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO :</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR :</strong>
                        <p>{Intl.NumberFormat('pt-BR' , { style : 'currency' , currency: 'BRL'}).format(incident.value) }</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8b8b3" />                    
                        </button>

                    </li>

                ))}
                                                                
            </ul>

        </div>
    );
}