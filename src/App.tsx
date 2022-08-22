import React, { createContext, useContext, useState, useRef } from 'react'
import {
    useColorScheme,
    View,
    StatusBar,
    TouchableWithoutFeedback,
    Animated,
    TouchableOpacity,
    Text,
} from 'react-native'

import {
    CenterCount,
    CenterView,
    ButtonContainer,
    ButtonText,
    OptionItem,
    OptionText,
    OptionsTitle,
    SmallButton,
    SmallButtonView,
} from './StyledComponents'

type runningState = 'running' | 'paused' | 'reset'

interface RunningStateContext {
    runningState: runningState
    setRunningState: React.Dispatch<React.SetStateAction<runningState>>
}

interface HandlerFunctionsContext {
    handleStart: () => void
    handlePause: () => void
    handleReset: () => void
}

const RunningState = createContext<RunningStateContext>({
    runningState: 'reset',
    setRunningState: () => null,
})
const HandlerFunctions = createContext<HandlerFunctionsContext>({
    handleStart: () => null,
    handlePause: () => null,
    handleReset: () => null,
})

const App: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark'
    const [runningState, setRunningState] = useState<runningState>('reset')
    const [time, setTime] = useState('')

    // const [repsPerSet, setRepsPerSet] = useState(0)
    // const [currentSet, setCurrentSet] = useState(0)
    // const [targetSets, setTargetSets] = useState(0)

    const [repTime, setRepTime] = useState(1)
    const [currentRep, setCurrentRep] = useState(0)

    const intervalRef = useRef(0)

    const fadeAnim = useRef(new Animated.Value(1)).current

    const handleStart = () => {
        setRunningState('running')
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
        setRunningState('paused')
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start()
        clearInterval(intervalRef.current)
    }

    const handleReset = () => {
        setRunningState('reset')
        clearInterval(intervalRef.current)
        setCurrentRep(0)
    }

    const options = [1, 2, 3, 5, 7, 10]

    return (
        <RunningState.Provider value={{ runningState, setRunningState }}>
            <HandlerFunctions.Provider value={{ handleStart, handlePause, handleReset }}>
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
                        <ButtonView />
                    </CenterView>
                </View>
            </HandlerFunctions.Provider>
        </RunningState.Provider>
    )
}

const ButtonView: React.FC = () => {
    const { runningState, setRunningState } = useContext(RunningState)
    const { handleStart, handlePause, handleReset } = useContext(HandlerFunctions)

    console.log(runningState)

    if (runningState === 'running') {
        return (
            <ButtonContainer color="#f0723d" onPress={() => handlePause()}>
                <ButtonText>Pause</ButtonText>
            </ButtonContainer>
        )
    }

    if (runningState === 'paused') {
        return (
            <SmallButtonView>
                <SmallButton color="#df4e4e" onPress={() => handleReset()}>
                    <ButtonText>Reset</ButtonText>
                </SmallButton>

                <SmallButton color="#c7c7c7" onPress={() => handleStart()}>
                    <ButtonText>Resume</ButtonText>
                </SmallButton>
            </SmallButtonView>
        )
    }

    return (
        <ButtonContainer onPress={() => handleStart()}>
            <ButtonText>Start</ButtonText>
        </ButtonContainer>
    )
}

export default App
