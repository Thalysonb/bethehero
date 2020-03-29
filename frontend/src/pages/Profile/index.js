import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import logoimg from '../../assets/logo.svg'
import './styles.css'
import api from '../../services/api'
export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    useEffect(() =>{
        api.get('profile', 
            {headers:{
                Authorization : ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })

    }, [ongId]);

    async function HandleDeleteIncident(id){
        console.log('id caralhudo', id);
        try{
            await api.delete(`incidents/${id}`,
                {headers:{
                    Authorization : ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.')
        }
    }
    function handleLogOut(){
        localStorage.clear();
        history.push('/');

    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="Be the Hero"/>
                <span>Bem-vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogOut} type="button">
                    <FiPower size={18} color="#E02041"/>    
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident =>(
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button type="button" onClick={() => HandleDeleteIncident(incident.id)}>
                            <FiTrash2 sise={20}  color="#a8a8b3"/>
                        </button>
                    </li>
                ))}

            </ul>
        </div>
    )
}