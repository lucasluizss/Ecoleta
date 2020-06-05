const environment = {
	getUfs: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
	getCities: (uf: string) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
	whatsappUrl: (phone: string) => `whatsapp://send?phone=${phone}&text=Tenho interesse na coleta de resíduos`
};

export default environment;