import { createStore } from "redux";
import { CounterReduxer } from "./reducer";

export const store=createStore(CounterReduxer)