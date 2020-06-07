const environment = {
	apiBaseUrl: 'http://192.168.0.22:3333',
	getUfs: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
	getCities: (uf: string) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`,
	whatsappUrl: (phone: string) => `whatsapp://send?phone=${phone}&text=♻️ Olá, tenho interesse na coleta de resíduos.`
};

export default environment;