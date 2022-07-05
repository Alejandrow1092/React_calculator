import './css/App.css';
import {useReducer} from 'react';
import DigitButton from './DigitButton'
import React from 'react'
import ActionButton from './ActionButton';

export const ACTIONS={
  ADD_DIGIT: 'add-digit',
  choose_op: 'choose-operation',
  CLEAR: 'clear',
  delete_digit: 'delete-digit',
  evaluate: 'evaluate'
}

//maneja todos los estados, tienen un tipo y una accion
//payload es la acumulacion de numeros en la pantalla de la calculadora
function reducer (state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit==="0" && state.currentOperand==="0") return state;
      
      if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }

      if(payload.digit==="." && state.currentOperand.includes(".")){
        return state
      }
      return{
        ...state,
         currentOperand: `${state.currentOperand || " "}${payload.digit}`,
      };

    case ACTIONS.choose_op:
      if(state.currentOperand == null && state.previousOperand ==null){
        return state;
      }

      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.symbol
        }
      }

      if(state.previousOperand == null){
        return{
          ...state,
          
          previousOperand:  state.currentOperand,
          operation: payload.symbol,
          currentOperand: null,
        }
      }

      return{
          ...state,
          previousOperand: evaluate(state),
          operation: payload.symbol,
          currentOperand: null
      }

    case ACTIONS.evaluate:
        if (state.previousOperand===null || state.currentOperand===null
              || state.operation===null){
          return state
        }
        
        
        return{
          ...state,
          overwrite: true,
          operation: null,
          previousOperand: null,
          currentOperand: evaluate(state)
        }
    case ACTIONS.CLEAR:
      return {}
    }
}

//funcion que hace todas la operaciones
const evaluate = ({currentOperand, previousOperand, operation}) =>{
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  
  let computation = "";
  if(isNaN(prev) || isNaN(current)) return "";

  switch(operation){
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "+/-":
        computation = prev + current;
        break;
  }
  
  return computation.toString()
}

const App =()=> {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, 
    {});

  return (
    <div className="calculator">
      
      <section className='display'>
        <div id='operation'>{previousOperand} {operation}</div>
        <div id='result'> {currentOperand}</div>
      </section>

      <section className='buttons'>
        <button className='btn-gray' onClick={()=>dispatch({type: ACTIONS.CLEAR})}><span>c</span></button>
        <ActionButton clas="btn-orange" symbol="+/-" dispatch={dispatch}/>
        <ActionButton clas="btn-orange" symbol="%" dispatch={dispatch}/>
        <ActionButton clas="btn-orange" symbol="/" dispatch={dispatch}/>
        <DigitButton digit="7" disptach={dispatch}/> 
        <DigitButton digit="8" disptach={dispatch}/> 
        <DigitButton digit="9" disptach={dispatch}/> 
        <ActionButton clas="btn-orange" symbol="x" dispatch={dispatch}/>
        <DigitButton digit="4" disptach={dispatch}/> 
        <DigitButton digit="5" disptach={dispatch}/> 
        <DigitButton digit="6" disptach={dispatch}/> 
        <ActionButton clas="btn-orange" symbol="-" dispatch={dispatch}/>
        <DigitButton digit="1" disptach={dispatch}/> 
        <DigitButton digit="2" disptach={dispatch}/> 
        <DigitButton digit="3" disptach={dispatch}/> 
        <ActionButton clas="btn-orange" symbol="+" dispatch={dispatch}/>
        <DigitButton id="grow" digit="0" disptach={dispatch}/> 
        <DigitButton digit="." disptach={dispatch}/> 
        <button className='btn-orange' onClick={()=>dispatch({type: ACTIONS.evaluate})}>=</button>
      </section>
    </div>
  );
}

export default App;
