//action to push the data to reducer
export const SET_USER = (user) => {
    return {
        type: "SET_USER",
        user: user,
    };
};
//action to remove the data from state
export const SET_USER_NULL = () => {
    return {
        type: "SET_USER_NULL",
 
    };
};