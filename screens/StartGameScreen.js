import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Button, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmInputHandler = () => {
        const choosenNumber = parseInt(enteredValue);
        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Enter value 1 to 99', [{ text: 'OK', style: 'destructive', onPress: resetInputHandler }]);
            return;
        };
        setConfirmed(true);
        setSelectedNumber(choosenNumber);
        setEnteredValue('');
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start New Game</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input}
                        blurOnSubmit={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmed &&
                    <View style={styles.numberContainer}>
                        <Text>You Selected</Text>
                        <Text>{selectedNumber}</Text>
                        <Button title="Start Game" onPress={() => props.startGameHandler(selectedNumber)} color={Colors.accent} />
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 25,
        marginVertical: 10,
        fontFamily: 'open-sans-bold',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: '50%'
    },
    input: {
        width: 60,
        textAlign: 'center'
    },
    numberContainer: {
        paddingTop: 15,
        alignItems: 'center',
    },
});

export default StartGameScreen;