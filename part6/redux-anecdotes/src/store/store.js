import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer, {setNotes} from '../reducers/anecdotesReducer';
import filterReducer from '../reducers/filterAnecdotesReducer';
//importamos el servicio
import anecdotesService from '../../services/anecdotes';



const store = configureStore({
reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer 
}
});

//anecdotesService.getAll().then(anecdotes => store.dispatch(setNotes(anecdotes)));



export default store;