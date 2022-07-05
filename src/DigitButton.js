import {ACTIONS} from './App'


//component, props, elements
const DigitButton=({disptach, digit, id})=>{
    return <button id={id} onClick={()=>disptach({type: ACTIONS.ADD_DIGIT,  payload: {digit}})}>{digit}
        </button>
}

export default DigitButton;