import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
	Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
}

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [dataLoaded, setDataLoaded] = useState(false);

	if (!dataLoaded) {
		return (<AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} />);
	}

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
	}
	return (
		<View style={styles.screen}>
			<Header title="Guess the Number" />
			{userNumber ?
				<GameScreen userChoice={userNumber} /> :
				<StartGameScreen startGameHandler={startGameHandler} />
			}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	}
});
