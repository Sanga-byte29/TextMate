//action to push the data to reducer
export const SET_PROJECTS = (projects) => {
    return {
        type: "SET_PROJECTS",
        projects: projects,
    };
};
//action to remove the data from state
export const SET_PROJECTS_NULL = () => {
    return {
        type: "SET_PROJECTS_NULL",
 
    };
};