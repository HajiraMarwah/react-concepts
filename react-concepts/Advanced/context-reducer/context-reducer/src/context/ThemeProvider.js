import { useReducer } from "react"
import { ThemeContext } from "./ThemeContext"

const initialState={
    theme:"light"
}
const themeReducer=(state,action)=>{
    switch(action.type){
        case "TOGGLE_THEME":
            return{
                ...state,
                theme:state.theme==="light"?"dark":"light"
            }
        default:
            return state
    }
}
export const ThemeProvider=({children})=>{
    const [state, dispatch] = useReducer(themeReducer, initialState)
   return (
    <ThemeContext.Provider value={{state,dispatch}}>
      {children}
    </ThemeContext.Provider>
   )
}