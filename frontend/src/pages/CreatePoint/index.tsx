import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../../services/api.service';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import Notification from '../../components/Notification';
import Item from '../../models/item.interface';
import UFResponse from '../../models/uf.interface';
import CityResponse from '../../models/city.interface';
import environment from '../../environments/environments';
import Dropzone from '../../components/Dropzone';

const CreatePoint = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [ufs, setUfs] = useState<string[]>([]);
	const [selectedUf, setSelectedUf] = useState('0');
	const [cities, setCities] = useState<string[]>([]);
	const [selectedCity, setSelectedCity] = useState('0');
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
	const [selectedFile, setSelectedFile] = useState<File>();

	const [notificationData, setNotificationData] = useState({
		show: false,
		error: false,
		message: ''
	});

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		whatsapp: ''
	});

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();
		const { name, email, whatsapp } = formData;
		const [latitude, longitude] = selectedPosition;

		const data = new FormData();
		data.append('name', name);
		data.append('email', email);
		data.append('whatsapp', String(whatsapp));
		data.append('uf', selectedUf);
		data.append('city', selectedCity);
		data.append('latitude', String(latitude));
		data.append('longitude', String(longitude));
		data.append('items', selectedItems.join(','));

		if (selectedFile) {
			data.append('image', selectedFile);
		}

		try {
			await api.post('points', data);

			setNotificationData({ 
				...notificationData,
				'message': 'Cadastro concluído!',
				'show': true
			});
		} catch (ex) {
			setNotificationData({
				...notificationData,
				'message': 'Falha ao enviar dados!',
				'show': true,
				'error': true
			});
		}
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value })
	}

	function handleSelectItem(id: number) {
		if (selectedItems.includes(id)) {
			const items = selectedItems.filter(item => item !== id);
			setSelectedItems(items);
		} else {
			setSelectedItems([...selectedItems, id]);
		}
	}

	function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
		const uf = event.target.value;
		setSelectedUf(uf);
	}

	function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
		const city = event.target.value;
		setSelectedCity(city);
	}

	function handleMapClick(event: LeafletMouseEvent) {
		setSelectedPosition([
			event.latlng.lat,
			event.latlng.lng
		]);
	}

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords;
			setInitialPosition([latitude, longitude]);
		});
	}, []);

	useEffect(() => {
		api.get('items').then(response => {
			const { data } = response.data;
			setItems(data);
		});
	}, []);

	useEffect(() => {
		axios.get<UFResponse[]>(environment.getUfs).then(response => {
			const ufInitials = response.data.map(uf => uf.sigla);
			setUfs(ufInitials);
		});
	}, []);

	useEffect(() => {
		if (selectedUf === '0') {
			return;
		}

		axios.get<CityResponse[]>(environment.getCities(selectedUf)).then(response => {
			const cities = response.data.map(city => city.nome);
			setCities(cities);
		});
	}, [selectedUf]);

	return (
		<div id="page-create-point">
			<Notification
				message={notificationData.message}
				show={notificationData.show}
				error={notificationData.error}
			/>
			<header>
				<img src={logo} alt="Ecoleta" />
				<Link to="/">
					<FiArrowLeft />
					Voltar para home
				</Link>
			</header>
			<form onSubmit={handleSubmit}>
				<h1> Cadastro do <br /> ponto de coleta </h1>

				<Dropzone onFileUploaded={setSelectedFile} />

				<fieldset>
					<legend>
						<h2> Dados </h2>
					</legend>

					<div className="field">
						<label htmlFor="name"> Name </label>
						<input type="text" name="name" id="name" onChange={handleInputChange} required />
					</div>

					<div className="field-group">
						<div className="field">
							<label htmlFor="email"> Email </label>
							<input type="email" name="email" id="email" onChange={handleInputChange} required />
						</div>
						<div className="field">
							<label htmlFor="whatsapp"> Whatsapp </label>
							<input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} required />
						</div>
					</div>

				</fieldset>

				<fieldset>
					<legend>
						<h2> Endereço </h2>
						<span> Selecione o endereço no mapa </span>
					</legend>

					<Map center={initialPosition} zoom={15} onClick={handleMapClick}>
						<TileLayer
							attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

						<Marker position={selectedPosition} />
					</Map>

					<div className="field-group">
						<div className="field">
							<label htmlFor="uf"> Estado (UF) </label>
							<select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf} required>
								<option defaultValue={0}> Selecione </option>
								{
									ufs.map(uf => (<option key={uf} value={uf}> {uf} </option>))
								}
							</select>
						</div>
						<div className="field">
							<label htmlFor="city"> Cidade </label>
							<select name="city" id="city" value={selectedCity} onChange={handleSelectedCity} required>
								<option defaultValue={0}> Selecione </option>
								{
									cities.map(city => (<option key={city} value={city}> {city} </option>))
								}
							</select>
						</div>
					</div>
				</fieldset>

				<fieldset>
					<legend>
						<h2> Itens de coleta </h2>
						<span> Selecione um ou mais itens abaixo </span>
					</legend>

					<ul className="items-grid">
						{
							items.map((item: Item) =>
								<li
									key={item.id}
									className={selectedItems.includes(item.id) ? 'selected' : ''}
									onClick={() => handleSelectItem(item.id)}
								>
									<img src={item.image_url} alt="teste" />
									<span> {item.title} </span>
								</li>
							)
						}
					</ul>
				</fieldset>

				<button type="submit"> Cadastrar ponto de coleta </button>
			</form>
		</div>
	);
};

export default CreatePoint;