let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {
  user
} : {};
export default (state = initialState, action) => {
    switch(action.type) {
        case "login":
            return {
                user: action.user
            };
        default :
            return state;
    }
}
