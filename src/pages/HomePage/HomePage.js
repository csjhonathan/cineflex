import styled from "styled-components"
import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function HomePage() {

    const [movies, setMovies] = useState(false);
    const urlMovies = "https://mock-api.driven.com.br/api/v8/cineflex/movies"

    useEffect(() => {
        axios
            .get(urlMovies)
            .then(({ data }) => setMovies(data))
            .catch(({ response }) => alert("Desculpe, mas não foi possível carregar a lista de filmes"))
    }, []);
    return (
        <PageContainer>
            Selecione o filme
            {!movies ?
                "CARREGANDO FILMES..."
            :       
                <ListContainer>
                    {movies.map(({id, title, posterURL, overview, relseaseDate}) => {
                        return (
                            
                            <Link to = {`/sessoes/${id}`} key = {id}>
                                <MovieContainer data-test = "movie">
                                    <img src={posterURL} alt={title} loading = "lazy" />
                                </MovieContainer>
                            </Link>
                        )
                    })}
                </ListContainer>
            }
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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`