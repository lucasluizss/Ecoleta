import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, Linking } from 'react-native';
import styles from './styles';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import api from '../../services/api.service';
import { AppLoading } from 'expo';
import * as MailComposer from 'expo-mail-composer';
import environment from '../../../environments/environments';
import DetailParams from '../../models/Detail/detail-params.interface';
import DetailResponse from '../../models/Detail/detail-response.interface';

const Detail = () => {
	const [data, setData] = useState<DetailResponse>({} as DetailResponse);
	const navigation = useNavigation();
	const route = useRoute();

	const routeParams = route.params as DetailParams;

	useEffect(() => {
		api.get(`points/${routeParams.point_id}`).then(response => {
			const { data } = response.data;
			setData(data);
		});
	}, []);

	function handleNavigateBack() {
		navigation.goBack();
	}

	function handleComposeEmail() {
		MailComposer.composeAsync({
			subject: `Interesse na coleta de resíduos em ${data.point.name}`,
			recipients: [data.point.email]
		});
	}

	function handleWhatsapp() {
		Linking.openURL(environment.whatsappUrl(data.point.whatsapp));
	}

	if (!data.point) {
		return <AppLoading />;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleNavigateBack}>
					<Icon name='arrow-left' size={20} color='#34cb79' />
				</TouchableOpacity>

				<Image style={styles.pointImage} source={{ uri: data.point.image }} />

				<Text style={styles.pointName}> {data.point.name} </Text>
				<Text style={styles.pointItems}> {data.items.map(item => item.title).join(', ')} </Text>

				<View style={styles.address}>
					<Text style={styles.addressTitle}> Endereço </Text>
					<Text style={styles.addressContent}> São Paulo, SP </Text>
				</View>
			</View>

			<View style={styles.footer}>
				<RectButton style={styles.button} onPress={handleWhatsapp}>
					<FontAwesome name='whatsapp' size={20} color='#FFF' />
					<Text style={styles.buttonText}> Whatsapp </Text>
				</RectButton>

				<RectButton style={styles.button} onPress={handleComposeEmail}>
					<Icon name='mail' size={20} color='#FFF' />
					<Text style={styles.buttonText}> E-mail </Text>
				</RectButton>
			</View>
		</SafeAreaView>
	);
};

export default Detail;