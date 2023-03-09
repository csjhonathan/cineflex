import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios";
import { useState, useEffect } from "react";
export default function SeatsPage() {
    const {idSessao} = useParams();
    const url = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const [session, setSession] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState ([])
    
    useEffect(() => {
        axios
            .get(url)
            .then(({data}) => {
                setSession(data)
            })
            .catch(erro => console.log(erro.response.data));

    },[]);

    function selectColor(status){
        if(status === "selected"){
            return {color : "#1AAE9E", border : "#0E7D71"};
        }else if(status === "available"){
            return {color : "#C3CFD9", border : "#7B8B99"};
        }
        return {color : " #FBE192", border : "#F7C52B"};
    }

    function selectSeat (seatId){
        if(!selectedSeats.includes(seatId)){
            const seats = [...selectedSeats, seatId]
            console.log(seats);
            setSelectedSeats(seats);
        }else{
            const removeSeat = selectedSeats.filter(seats => seats !== seatId);
            console.log(removeSeat);
            setSelectedSeats(removeSeat);
        }

        console.log()
    }
    

    if(!session){
        return <div>Olá</div>
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map(({id, name, isAvailable}) => {
                    return (
                        <SeatItem key = {id} 
                            isAvailable = {isAvailable} 
                            isSelected = {selectedSeats.includes(id)}
                            onClick = {() => selectSeat(id)}
                        >{name}</SeatItem>
                    )
                })}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle captionColor = {selectColor("selected")}/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle captionColor = {selectColor("available")}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle captionColor = {selectColor("unavailable")}/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <Link to ={`/sucesso`} >
                    <button>Reservar Assento(s)</button>
                </Link>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={session.movie.posterURL} alt={session.movie.title} />
                </div>
                <div>
                    <p>{session.movie.title}</p>
                    <p>{`${session.day.weekday} - ${session.name}`}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${({captionColor}) => captionColor.border};         // Essa cor deve mudar
    background-color: ${({captionColor}) => captionColor.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${({isAvailable, isSelected}) => isSelected ? "#0E7D71" : isAvailable ? "#808F9D" : "#F7C52B"};;         // Essa cor deve mudar
    background-color: ${({isAvailable, isSelected}) => isSelected ? "#1AAE9E" : isAvailable ? "#C3CFD9" : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`