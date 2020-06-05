import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import environment from '../../environments/environments';
import CityResponse from '../../models/Point/city.interface';
import UFResponse from '../../models/Point/uf.interface';
import RNPickerSelect from 'react-native-picker-select';


const Home = () => {
	const [ufs, setUfs] = useState<string[]>([]);
	const [selectedUf, setSelectedUf] = useState<string>('0');
	const [cities, setCities] = useState<string[]>([]);
	const [selectedCity, setSelectedCity] = useState<string>('0');
	const navigation = useNavigation();

	function handleNavigationToPoints() {
		navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
	}

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
		<ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={styles.imageBackground}>
			<View style={styles.main}>
				<Image source={require('../../assets/logo.png')} />
				<Text style={styles.title}> Seu marketplace de coleta de resíduos </Text>
				<Text style={styles.description}> Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente </Text>
			</View>

			<View style={styles.footer}>

				<RNPickerSelect
					style={{ inputIOS: styles.input, inputAndroid: styles.input }}
					onValueChange={setSelectedUf}
					value={selectedUf}
					items={ufs.map(uf => { return { label: uf, value: uf } })}
					placeholder={{
						label: 'Selecione o estado...',
						value: '0',
						color: '#9EA0A4',
					}}
				/>

				<RNPickerSelect
					style={{ inputIOS: styles.input, inputAndroid: styles.input }}
					disabled={selectedUf === '0'}
					onValueChange={setSelectedCity}
					value={selectedCity}
					items={cities.map(city => { return { label: city, value: city } })}
					placeholder={{
						label: 'Selecione a cidade...',
						value: '0',
						color: '#9EA0A4',
					}}
				/>

				<RectButton style={styles.button} onPress={handleNavigationToPoints}>
					<View style={styles.buttonIcon}>
						<Text>
							<Icon name='arrow-right' color='#FFF' size={24} />
						</Text>
					</View>
					<Text style={styles.buttonText}> Entrar </Text>
				</RectButton>
			</View>
		</ImageBackground>
	);
};

export default Home;