import { createStore } from 'redux'
import { Reducer, initialStage } from './reducer'

export const ConfigureStore = () => {
     const store = createStore( Reducer, initialStage )
     return store
}