import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'loginStore',
    model: {
        fields: [
            { name: 'loggedIn', type: 'boolean' },
            { name: 'username', type: 'string'},
            { name: 'password', type: 'password'}
        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            login: {
                url: '/users/login',
                method: 'post'
            }
        }
    }
});
