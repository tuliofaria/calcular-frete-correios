import React, { useState } from 'react'

const SERVICOS = {
  '04014': 'SEDEX a vista',
  '04510': 'PAC a vista'
}

const Index = () => {
  const [form, setForm] = useState({
    cepOrigem: '37552171',
    cepDestino: '37552100',
    codigoServico: '04510'
  })
  const [answer, setAnswer] = useState({})
  const onChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
    setForm(oldForm => {
      return ({
        ...oldForm,
        [name]: value
      })
    })
  }
  const onServicoChange = evt => {
    const name = 'codigoServico'
    const value = evt.target.options[evt.target.selectedIndex].value
    setForm(oldForm => {
      return ({
        ...oldForm,
        [name]: value
      })
    })
  }
  const calculate = async() => {
    const res = await fetch('/api/calcular-frete', { method: 'POST', body: JSON.stringify(form) })
    const json = await res.json()
    setAnswer(json)
  }
  return (
    <div className='rounded bg-gray-100 mx-auto my-6 w-1/2 px-6 py-8'>
      <h1 className='font-bold'>Calcular valor frete:</h1>
      <input type='text' value={form.cepOrigem} name='cepOrigem' onChange={onChange} maxLength='8' className='border p-4 block' />
      <input type='text' value={form.cepDestino} name='cepDestino' onChange={onChange} maxLength='8' className='border p-4 block' />
      <select className='border p-4 block' onChange={onServicoChange}>
        {Object.keys(SERVICOS).map(idServico => {
          return <option key={idServico} value={idServico}>{SERVICOS[idServico]}</option>
        })}
      </select>
      <button onClick={calculate} className='bg-gray-200 p-4 rounded block'>Calcular</button>
      <div className='border m-2 p-2'>
        <h2>Resposta:</h2>
        <pre>{JSON.stringify(answer, null, 2)}</pre>
      </div>
    </div>
  )
}
export default Index
