import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
export default function App() {
    const [order, setOrder] = useState();
    const [home, setHome] = useState(false);
    const [idFilme, setIdFilme] = useState(false);
    const [sessionId, setSessionId] = useState(false);

    return (
        <BrowserRouter>
        
            <NavContainer>
                {!home?
                    <p>CINEFLEX</p>
                :
                    home
                }
            </NavContainer>

            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage setHome = {setHome} setIdFilme = {setIdFilme}/>} />
                <Route path="/assentos/:idSessao" element={<SeatsPage setHome = {setHome} setOrder = {setOrder}  idFilme = {idFilme} setSessionId = {setSessionId}/>} />
                <Route path="/sucesso" element={<SuccessPage setHome = {setHome} order = {order} sessionId = {sessionId}/>} />

            </Routes>

        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
    button{
        position: absolute;
        left: 30px;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: transparent;
    }
`
