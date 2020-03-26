import React , { useState } from 'react';
import { Link , useHistory } from 'react-router-dom'; //Link = usado para mudar a rota sem recarregar a página toda
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    //ajuda a fazer navegação via javascript
    const history = useHistory();

    //sempre que usar "await" , a funcao tem que ser "async" !!!
    async function handleRegister(e){
        e.preventDefault();  //evita recarregar a pagina após clicar em submit

        console.log({
            nome,
            email,
            whatsapp,
            city,
            uf
        });

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        };


        try{
           //sempre que usar "await" , a funcao tem que ser "async" !!!
            const response = await api.post('/ongs', data);

            alert(`Seu ID de acesso : ${response.data.id}`);

            //redireciona para a rota raiz.
            history.push('/');


        } catch (err){
            alert('`Erro no cadastro, tente novamente !');
        }

    }

    return (

        <div className="register-container">        
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>

                </section>

                <form onSubmit={handleRegister}>
                    
                    <input
                        placeholder="Nome da ONG" 
                        value={nome}
                        onChange={e => setNome(e.target.value)} />

                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <input
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />
                    
                    <div className="input-group">

                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />

                        <input
                            placeholder="UF"
                            style={{ width: 80}} 
                            value={uf}
                            onChange={e => setUf(e.target.value)} />

                    </div>

                    <button className="button" type="sumbit">Cadastrar</button>


                </form>
            </div>
        </div>
    );
}