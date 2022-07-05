import { ACTIONS } from "./App";


const ActionButton=({dispatch, symbol, clas})=>{    
    return <button className={clas} onClick={()=>dispatch({type: ACTIONS.choose_op, payload:{symbol}})}>
        {symbol}
    </button>
}


export default ActionButton;