const environment = {
	getUfs: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
	getCities: (uf: string) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
};

export default environment;