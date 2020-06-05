import React, { useState, useEffect, EventHandler } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styles from './styles';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api.service'
import * as Location from 'expo-location';

interface Item {
	id: number;
	title: string;
	image_url: string;
}

interface Point {
	id: number;
	name: string;
	image: string;
	latitude: number;
	longitude: number;
}

const Points = () => {
	const [items, setItems] = useState<Item[]>([]);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [points, setPoints] = useState<Point[]>([]);
	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
	const navigation = useNavigation();

	function handleNavigateBack() {
		navigation.goBack();
	}

	function handleNavigateToDetail(id: number) {
		navigation.navigate('Detail', { point_id: id });
	}

	function handleSelectedItems(id: number) {
		if (selectedItems.includes(id)) {
			setSelectedItems(selectedItems.filter(i => i !== id));
		} else {
			setSelectedItems([...selectedItems, id]);
		}
	}

	useEffect(() => {
		async function loadPosition() {
			const { status } = await Location.requestPermissionsAsync();

			if (status !== 'granted') {
				Alert.alert('Ooops...', 'Precisamos da sua permissão para obter a localização');
				return;
			}

			const location = await Location.getCurrentPositionAsync();

			const { latitude, longitude } = location.coords;
			setInitialPosition([latitude, longitude]);
		}

		loadPosition();
	}, []);

	useEffect(() => {
		api.get('items').then(response => {
			const { data } = response.data;
			setItems(data);
		});
	}, []);

	useEffect(() => {
		api.get('points', {
			params: {
				city: 'São Paulo',
				uf: 'SP',
				items: [1]
			}
		}).then(response => {
			const { data } = response.data;
			setPoints(data);
		});
	}, []);

	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleNavigateBack}>
					<Icon name='arrow-left' size={20} color='#34cb79' />
				</TouchableOpacity>

				<Text style={styles.title}> Bem vindo. </Text>
				<Text style={styles.description}> Encontre no mapa um ponto de coleta </Text>

				<View style={styles.mapContainer}>
					{
						initialPosition[0] !== 0 && (
							<MapView
								style={styles.map}
								initialRegion={{
									latitude: initialPosition[0],
									longitude: initialPosition[1],
									latitudeDelta: 0.014,
									longitudeDelta: 0.014
								}}
							>
								{
									points.map(point => (
										<Marker
											onPress={() => handleNavigateToDetail(point.id)}
											style={styles.mapMarker}
											coordinate={{
												latitude: point.latitude,
												longitude: point.longitude
											}}
										>
											<View style={styles.mapMarkerContainer}>
												<Image style={styles.mapMarkerImage} source={{ uri: point.image }} />
												<Text style={styles.mapMarkerTitle}> { point.name } </Text>
											</View>
										</Marker>
									))
								}
							</MapView>
						)
					}
				</View>
			</View>

			<View style={styles.itemsContainer}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
					{
						items.map(item =>
							<TouchableOpacity
								key={String(item.id)}
								style={[
									styles.item,
									selectedItems.includes(item.id) ? styles.selectedItem : {}
								]}
								onPress={() => handleSelectedItems(item.id)}
								activeOpacity={0.6}
							>
								<SvgUri width={42} height={42} uri={item.image_url} />
								<Text style={styles.itemTitle}> {item.title} </Text>
							</TouchableOpacity>
						)
					}
				</ScrollView>
			</View>
		</>
	);
};

export default Points;