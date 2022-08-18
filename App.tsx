import React, { useEffect, useState, useRef } from 'react'
import {
    Text,
    useColorScheme,
    View,
    StatusBar,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native'

import styled from 'styled-components/native'

const App: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark'
    const [isRunning, setIsRunning] = useState(false)
    const [time, setTime] = useState('')

    // const [repsPerSet, setRepsPerSet] = useState(0)
    // const [currentSet, setCurrentSet] = useState(0)
    // const [targetSets, setTargetSets] = useState(0)

    const [repTime, setRepTime] = useState(2)
    const [currentRep, setCurrentRep] = useState(0)
    const [targetReps, setTargetReps] = useState(42)

    const intervalRef = useRef(0)

    const fadeAnim = useRef(new Animated.Value(1)).current

    const handleStart = () => {
        setIsRunning(true)

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start()

        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            setCurrentRep(prev => prev + 1)
        }, repTime * 1000)
    }

    const handlePause = () => {
        setIsRunning(false)

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()

        clearInterval(intervalRef.current)
    }

    const options = [1, 2, 3, 5, 7, 10]

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#000',
            }}>
            <StatusBar backgroundColor="#000" />
            <CenterView>
                <CenterCount>
                    {currentRep < 10 ? '0' + currentRep.toString() : currentRep}
                </CenterCount>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <OptionsTitle>Select Timing :</OptionsTitle>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        {options.map(option => (
                            <TouchableWithoutFeedback
                                key={option}
                                onPress={() => {
                                    setRepTime(option)
                                }}>
                                <OptionItem isSelected={option === repTime}>
                                    <OptionText isSelected={option === repTime}>
                                        {option.toString()}s
                                    </OptionText>
                                </OptionItem>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </Animated.View>
                <ButtonContainer
                    activeOpacity={0.6}
                    isRunning={isRunning}
                    onPress={() => (isRunning ? handlePause() : handleStart())}>
                    <ButtonText>{isRunning ? 'PAUSE' : 'START'}</ButtonText>
                </ButtonContainer>
            </CenterView>
        </View>
    )
}

const CenterView = styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CenterCount = styled.Text`
    font-family: 'Inter-Light';
    letter-spacing: -20px;
    font-size: 240px;
    text-align: center;
    color: white;
`

const ButtonContainer = styled.TouchableOpacity`
    position: absolute;
    bottom: 50px;
    background-color: ${(props: { isRunning: boolean }) =>
        props.isRunning ? '#df4e4e' : '#2cd8ce'};
    padding: 15px;
    width: 300px;
    border-radius: 15px;
`

const ButtonText = styled.Text`
    font-family: 'Inter-Medium';
    text-align: center;
    font-size: 20px;
    color: black;
    text-transform: uppercase;
`

const OptionItem = styled.View`
    margin: 5px;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: ${(props: { isSelected: boolean }) =>
        props.isSelected ? '#ffffffdd' : '#ffffff44'};
`

const OptionText = styled.Text`
    font-family: 'Inter-Bold';
    color: ${(props: { isSelected: boolean }) => (props.isSelected ? 'black' : 'white')};
`

const OptionsTitle = styled.Text`
    font-family: 'Inter-Regular';
    color: white;
    margin: 5px;
`

export default App
