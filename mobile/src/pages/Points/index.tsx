import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import api from '../../services/api.service'

interface Item {
	id: number;
	title: string;
	image_url: string;
}

const Points = () => {
	const [items, setItems] = useState<Item[]>([]);
	const navigation = useNavigation();

	function handleNavigateBack() {
		navigation.goBack();
	}

	function handleNavigateToDetail() {
		navigation.navigate('Detail');
	}

	useEffect(() => {
		api.get('items').then(response => {
			const { data } = response.data;
			setItems(data);
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
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: -23.6317334,
							longitude: -46.7381793,
							latitudeDelta: 0.014,
							longitudeDelta: 0.014
						}}
					>
						<Marker
							onPress={handleNavigateToDetail}
							style={styles.mapMarker}
							coordinate={{
								latitude: -23.6317334,
								longitude: -46.7381793
							}}
						>
							<View style={styles.mapMarkerContainer}>
								<Image style={styles.mapMarkerImage} source={{ uri: 'https://bit.ly/3cwN3XQ' }} />
								<Text style={styles.mapMarkerTitle}> Mercado </Text>
							</View>
						</Marker>
					</MapView>
				</View>
			</View>

			<View style={styles.itemsContainer}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
					{
						items.map(item =>
							<TouchableOpacity key={String(item.id)} style={styles.item} onPress={() => { }}>
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