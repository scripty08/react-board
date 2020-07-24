import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'boardsStore',
    model: {
        fields: [
            { name: 'assignment', type: 'string', default: '' },
            { name: 'tasks', type: 'object' },
            { name: 'columns', type: 'object', default: {
                    "column-1" : {
                        "id" : "column-1",
                        "title" : "Column 1",
                        "taskIds" : []
                    },
                    "column-2" : {
                        "id" : "column-2",
                        "title" : "Column 2",
                        "taskIds" : []
                    },
                    "column-3" : {
                        "id" : "column-3",
                        "title" : "Column 3",
                        "taskIds" : []
                    }
                }},
            { name: 'columnOrder', type: 'array', default:[
                    "column-3",
                    "column-2",
                    "column-1"
                ]},
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
