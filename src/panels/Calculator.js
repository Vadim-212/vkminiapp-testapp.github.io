import React from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import { PanelHeader, PanelHeaderButton, Input, Div, Button } from '@vkontakte/vkui';
import { platform, IOS } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import './Calculator.css'

const osName = platform()
// const calculatorInput = <Input type="text" readOnly={true}/>

// const Calculator = props => (
//     <Panel id={props.id}>
//         <PanelHeader left={<PanelHeaderButton onClick={props.go} data-to="home">
//             {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
//         </PanelHeaderButton>}>
//             Calculator
//         </PanelHeader>
//         { calculatorInput }
//         <Div style={{display:"flex"}}>
//             <Button size="l" stretched onClick={buttonAction}>+</Button>
//             <Button size="l" stretched>-</Button>
//             <Button size="l" stretched>x</Button>
//             <Button size="l" stretched>/</Button>
//         </Div>
//     </Panel>
// );

class Calculator extends React.Component {
    //props
    constructor(props) {
        super(props)
        //this.props = props
        this.state =    {
            inputValue: ''
        }
        this.updateInputValue = this.updateInputValue.bind(this)
        this.buttonAction = this.buttonAction.bind(this)
        this.addInputValue = this.addInputValue.bind(this)
    }

    render() {
        return (
            <Panel id={this.props.id}>
                <PanelHeader left={<PanelHeaderButton onClick={this.props.go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}>
                    Calculator
                </PanelHeader>
                <Input id='calculator-input' type="text" readOnly={true} align="right" value={this.state.inputValue} onChange={e => this.updateInputValue(e.target.value)}/>
                <Div className='buttons-div' style={{ display: 'flex' }}>
                    <Button size="l" stretched onClick={this.buttonAction}>=</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>C</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>+</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>-</Button>
                </Div>
                <Div className='buttons-div' style={{display:"flex"}}>
                    <Button size="l" stretched onClick={this.buttonAction}>7</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>8</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>9</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>×</Button>
                </Div>
                <Div className='buttons-div' style={{display:"flex"}}>
                    <Button size="l" stretched onClick={this.buttonAction}>4</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>5</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>6</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>÷</Button>
                </Div>
                <Div className='buttons-div' style={{display:"flex"}}>
                    <Button size="l" stretched onClick={this.buttonAction}>1</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>2</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>3</Button>
                    <Button size="l" stretched onClick={this.buttonAction}>0</Button>
                </Div>
            </Panel>
        )
    }

    updateInputValue(value) {
        this.setState({
            inputValue: value
        })
    }

    addInputValue(value) {
        this.setState({
            inputValue: this.state.inputValue + value
        })
    }

    buttonAction(event) {
        let strToAdd = ''
        let inputValue = this.state.inputValue

        switch(event.target.innerText) {
            case '+':
            case '-':
            case '×':
            case '÷':
                if(inputValue.length == 0) {
                    break
                }
                if('+-×÷'.includes(inputValue[inputValue.length - 1])) {
                    break
                }
                if(inputValue.includes('=')) {
                    inputValue = inputValue.substr(inputValue.indexOf('=') + 1)
                }
            
                strToAdd = event.target.innerText
                break
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                strToAdd = event.target.innerText
                break
            case 'C':
                this.updateInputValue('')
                return
            case '=':
                try {
                    if(inputValue.length == 0) {
                        break
                    }
                    if(!inputValue.includes('+') && !inputValue.includes('-') &&
                    !inputValue.includes('×') && !inputValue.includes('÷')) {
                        break
                    }
                    if('+-×÷'.includes(inputValue[inputValue.length - 1])) {
                        break
                    }
                    strToAdd = '=' + Math.round(eval(inputValue.replace('×','*').replace('÷','/')) * Math.pow(10,7)) / Math.pow(10,7)
                    
                } catch (error) {
                    alert(error)
                }
                break
            default:
                break
        } 
        
        //this.addInputValue(strToAdd)
        this.updateInputValue(inputValue + strToAdd)
    }
}

// const buttonAction = (event) => {
//     switch(event.target.innerText) {
//         case '+':
//             calculatorInput.props.value = "123"
//             console.log(calculatorInput.props)
//             break
//         default:
//             break
//     }
// }

export default Calculator