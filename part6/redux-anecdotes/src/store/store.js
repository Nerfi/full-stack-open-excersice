import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer, {setNotes} from '../reducers/anecdotesReducer';
import filterReducer from '../reducers/filterAnecdotesReducer';



const store = configureStore({
reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer 
}
});



export default store;