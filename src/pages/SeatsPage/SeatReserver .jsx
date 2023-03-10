import { useState } from "react"

export default function SeatReserver ({seat, compradores, setCompradores, selectedSeatsID, selectedNumber}){
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const data = {idAssento: selectedSeatsID[selectedNumber.indexOf(seat)], nome, cpf}

  function handleReserverObj(){
    if(!compradores.some(seat => seat.idAssento === data.idAssento)){
      const order = [...compradores, data];
      setCompradores(order);
    }
  }
  return (
    <>
      <label htmlFor={`name${seat}`}>Nome do Comprador {seat}:</label>
        <input
            placeholder="Digite seu nome..."
            required
            id={`name${seat}`}
            name={`name${seat}`}
            onChange={e => setNome(e.target.value)}
            value={nome}
            data-test="client-name"
        />

        <label htmlFor={`cpf${seat}`}>CPF do Comprador {seat}:</label>
        <input
            placeholder="Digite seu CPF..."
            required
            id={`cpf${seat}`}
            name={`cpf${seat}`}
            onChange={e => setCpf(e.target.value)}
            value={cpf}
            data-test="client-cpf"
            onBlur = {() => handleReserverObj()}
        />
    </>
  )
}