import history from '@/utils/history';
export const loginAction = {
    login: param => {
        return dispatch => {
            const user = {
                id: 0,
                userName: param.userName
            }
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: "login",
                user
            });
            history.push('/');
        }
    },
    loginOut: param => {
        return dispatch => {
            localStorage.removeItem('user');
            dispatch({
                type: "loginOut",
                user: null
            });
            history.push("/login");
        }
    }
}
