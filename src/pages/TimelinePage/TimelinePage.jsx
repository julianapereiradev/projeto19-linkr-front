import { useContext, useEffect } from 'react'
import Header from '../../components/Header/Header'
import {ColorText} from './Styles'
import AuthContext from '../../contexts/AuthContext'
import { validateUser } from '../../constants/functions'

export default function TimelinePage() {
    const { user, setUser } = useContext(AuthContext)


  useEffect(() => {

    validateUser(user, setUser); //Garante a persistência do token do usuário mesmo depois do F5

  }, [user]);
    
    console.log('user do context aqui:', user)

    return (
        <>
        <Header />
        <ColorText>Timeline</ColorText>
        </>
    )
}