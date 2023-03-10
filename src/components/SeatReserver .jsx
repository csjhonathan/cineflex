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
      const remove = compradores.filter(({idAssento})=> idAssento !== data.idAssento);
      const edited = [...remove, data];
      setCompradores(edited)
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

      <label htmlFor={`cpf${selectedNumber.length <= 1 ? "" : seat}`}>CPF do Comprador {selectedNumber.length <= 1 ? "" : seat}:</label>
      <input
        placeholder="Digite seu CPF..."
        required
        id={`cpf${seat}`}
        name={`cpf${seat}`}
        onChange={e => setCpf(e.target.value)}
        value={cpf}
        data-test="client-cpf"
        onBlur={() => handleReserverObj()}
        disabled = {checkSeat()}
      />
    </>
  )
}