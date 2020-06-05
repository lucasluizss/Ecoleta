import React, { useState, useEffect } from 'react';
import styles from './styles';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { View, ImageBackground, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Home = () => {
	const [ufs, setUfs] = useState();
	const [selectedUf, setSelectedUf] = useState();
	const [cities, setCities] = useState();
	const [selectedCity, setSelectedCity] = useState();
	const navigation = useNavigation();

	function handleNavigationToPoints() {
		navigation.navigate('Points');
	}

	useEffect(() => {

	}, []);

	return (
		<ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={styles.imageBackground}>
			<View style={styles.main}>
				<Image source={require('../../assets/logo.png')} />
				<Text style={styles.title}> Seu marketplace de coleta de resíduos </Text>
				<Text style={styles.description}> Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente </Text>
			</View>

			<View style={styles.footer}>
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