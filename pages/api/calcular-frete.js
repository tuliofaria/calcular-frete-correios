
const urlBuilder = ({
  nCdEmpresa = '',
  sDsSenha = '',
  sCepOrigem = '',
  sCepDestino = '',
  nCdServico = ''
}) => {
  return `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=${nCdEmpresa}&sDsSenha=${sDsSenha}&sCepOrigem=${sCepOrigem}&sCepDestino=${sCepDestino}&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=20&nVlLargura=20&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=${nCdServico}&nVlDiametro=0&StrRetorno=xml&nIndicaCalculo=3`
}

import parser from 'fast-xml-parser'

export default async(req, res) => {
  const params = JSON.parse(req.body)
  const url = urlBuilder({
    sCepDestino: params.cepDestino,
    sCepOrigem: params.cepOrigem,
    nCdServico: params.codigoServico
  })

  const getCorreiosData = await fetch(url)
  const xml = await getCorreiosData.text()
  const json = parser.parse(xml)

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(json.Servicos.cServico))
}