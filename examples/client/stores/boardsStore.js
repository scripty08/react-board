import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'boardsStore',
    model: {
        fields: [
            { name: 'assignment', type: 'string' },
            { name: 'tasks', type: 'object' },
            { name: 'columns', type: 'object' },
            { name: 'columnOrder', type: 'array' },
        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            read: {
                url: '/boards/read',
                method: 'get'
            },
            update: {
                url: '/boards/update',
                method: 'post'
            },
            destroy: {
                url: '/boards/destroy',
                method: 'post'
            }
        }
    }
});
