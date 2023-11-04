//action to push the data to reducer
export const SET_SEARCH_TERM = (searchTerm) => {
    return {
        type: "SET_SEARCH_TERM",
        searchTerm: searchTerm,
    };
};
//action to remove the data from state
export const SET_SEARCH_TERM_EMPTY = () => {
    return {
        type: "SET_SEARCH_TERM_EMPTY",
 
    };
};