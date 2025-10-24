import { useReducer } from "react"
import { GlobalContext } from "./GlobalContext"
 const initialState={count:0}
    const reducer=(state,action)=>{
        switch(action.type){
            case "INCREMENT":
                return{count:state.count+1}
            case "DECREMENT":
                return{count:state.count-1}
            case "RESET":
                return {count:initialState.count}
            default:
                return state
        }
    }
export const GlobalProvider=({children})=>{
   
    const [state, dispatch] = useReducer(reducer, initialState)
     return(
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
     )
}