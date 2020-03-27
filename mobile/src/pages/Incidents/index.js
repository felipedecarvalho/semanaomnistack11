import React , { useState, useEffect } from 'react';
import { Feather } from "@expo/vector-icons" ;
import { useNavigation } from '@react-navigation/native';
import { View , FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1); //pagina 1
    const [loading, setLoading] = useState(false); //buscando dados novos, pra evitar busca-los de novo.

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail' ,  { incident } );
    }

    async function loadIncidents(){

        //evitar que outra requisicao seja feita, enquanto uma requisicao anterior já esta sendo feita !
        if (loading) {
            return;
        }

        //já carregou pelo menos a pagina 1, e o total de incidentes for igual ao valor da variavel "total", entao nao precisa buscar mais !
        if (total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents' , {
            params: { page }
        });

        //Este trocava uma pagina por outra = nao queremos isso !
        //setIncidents(response.data);

        //anexar novos registros (da  pagina 2 e etc) no objeto ja existente (pagina 1), 
        //senao, os registros da pagina 1 seriam trocados pelos registros da  pagina 2 = e isso nao queremos.
        //queremos mostrar todas as paginas, conforme vao sendo carregadas.
        setIncidents([...incidents , ...response.data]);  //anexar 2 vetores !!1

        setTotal(response.headers['x-total-count']);
        setPage(page + 1);

        setLoading(false);
            
    }

    //Executa a funcao do 1º parametro, sempre que o 2º parametro for alterado.
    useEffect( () => {
        loadIncidents();
    }, [] );

    return(

        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList                 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={ ( { item : incident } ) => (

                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.nome}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>                        
                        <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', { 
                                                        style: 'currency' , 
                                                        currency: 'BRL'
                                                    }
                                           ).format(incident.value)
                         }</Text>

                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetail(incident)} 
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />

                    </TouchableOpacity>

                </View>


                ) }
            />


        </View>

    );
}