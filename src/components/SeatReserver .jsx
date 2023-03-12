import { useState } from "react"

export default function SeatReserver({ seat, compradores, setCompradores, selectedSeatsID, selectedNumber }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const data = { idAssento: selectedSeatsID[selectedNumber.indexOf(seat)], nome, cpf };

  function handleReserverObj() {
    if (!compradores.some(seat => seat.idAssento === data.idAssento)) {
      const order = [...compradores, data];
      setCompradores(order);
    } else {
      const seller = compradores.find(({idAssento}) => idAssento === data.idAssento);
      seller.nome = nome;
      seller.cpf = cpf;
    }
  }

  function checkSeat () {
    if(!seat){
      return true;
    }
    return false;
  }
  return (
    <>
      <label htmlFor={`name${selectedNumber.length <= 1 ? "" : seat}`}>Nome do Comprador {selectedNumber.length <= 1 ? "" : seat}:</label>
      <input
        placeholder="Digite seu nome..."
        required
        id={`name${seat}`}
        name={`name${seat}`}
        onChange={e => setNome(e.target.value)}
        value={nome}
        data-test="client-name"
        disabled = {checkSeat()}
        onBlur={() => handleReserverObj()}
      />

      <label htmlFor={`cpf${selectedNumber.length <= 1 ? "" : seat}`}>CPF do Comprador {selectedNumber.length <= 1 ? "" : seat} (apenas numeros):</label>
      <input
        placeholder="Digite seu CPF (apenas numeros)"
        required
        disabled = {checkSeat()}
        minLength = {11}
        maxLength = {14}
        value={cpf}
        id={`cpf${seat}`}
        name={`cpf${seat}`}
        onChange={e => setCpf(e.target.value)}
        onBlur={() => handleReserverObj()}
        data-test="client-cpf"
        
      />
    </>
  )
}