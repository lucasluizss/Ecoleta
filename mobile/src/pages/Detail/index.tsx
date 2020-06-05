import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import styles from './styles';
import { TouchableOpacity, RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';

const Detail = () => {
	const navigation = useNavigation();

	function handleNavigateBack() {
		navigation.goBack();
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleNavigateBack}>
					<Icon name='arrow-left' size={20} color='#34cb79' />
				</TouchableOpacity>

				<Image style={styles.pointImage} source={{ uri: 'https://bit.ly/3cwN3XQ' }} />

				<Text style={styles.pointName}> Mercado </Text>
				<Text style={styles.pointItems}> Lâmpadas, Óleo de Cozinha </Text>

				<View style={styles.address}>
					<Text style={styles.addressTitle}> Endereço </Text>
					<Text style={styles.addressContent}> São Paulo, SP </Text>
				</View>
			</View>

			<View style={styles.footer}>
				<RectButton style={styles.button} onPress={() => {}}>
					<FontAwesome name='whatsapp' size={20} color='#FFF' />
					<Text style={styles.buttonText}> Whatsapp </Text>
				</RectButton>

				<RectButton style={styles.button} onPress={() => {}}>
					<Icon name='mail' size={20} color='#FFF' />
					<Text style={styles.buttonText}> E-mail </Text>
				</RectButton>
			</View>
		</SafeAreaView>
	);
};

export default Detail;