// @ts-ignore
import styled from 'styled-components/native'

export const CenterView = styled.View`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CenterCount = styled.Text`
    font-family: 'Inter-Light';
    letter-spacing: -20px;
    font-size: 240px;
    text-align: center;
    color: white;
`

export const ButtonContainer = styled.TouchableOpacity`
    position: absolute;
    bottom: 50px;
    background-color: '#2cd8ce';
    padding: 15px;
    width: 350px;
    border-radius: 15px;
`

export const SmallButton = styled(ButtonContainer)`
    width: 200px;
    position: relative;
`

export const ButtonText = styled.Text`
    font-family: 'Inter-Medium';
    text-align: center;
    font-size: 20px;
    color: black;
    text-transform: uppercase;
`

export const OptionItem = styled.View`
    margin: 5px;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: ${(props: { isSelected: boolean }) =>
        props.isSelected ? '#ffffffdd' : '#ffffff44'};
`

export const OptionText = styled.Text`
    font-family: 'Inter-Bold';
    color: ${(props: { isSelected: boolean }) => (props.isSelected ? 'black' : 'white')};
`

export const OptionsTitle = styled.Text`
    font-family: 'Inter-Regular';
    color: white;
    margin: 5px;
`
