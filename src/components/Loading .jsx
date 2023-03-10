import styled from "styled-components";
import loading from "../assets/img/loading.gif"

export default function Loading (){
  return(
    <LoadingScreen>
        <img src={loading} alt="gif de loading" />
    </LoadingScreen>
  )
}

const LoadingScreen = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`