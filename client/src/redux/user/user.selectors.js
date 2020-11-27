import { createSelector } from 'reselect';

//input selector (doesnt use createSelector)

    //input selector gets the whole state and returns only slice of it 1 layer deep usually
const selectUser = state => state.user


//output selector (uses both input selector and createSelector)

     //output selector  gets 2 params, 1 is the list of the input selector(S) 2 is a func that retutn the value we want out of the createSelector
export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
);