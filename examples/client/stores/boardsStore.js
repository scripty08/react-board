import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'boardsStore',
    model: {
        fields: [
            { name: 'assignment', type: 'string', default: '' },
            { name: 'tasks', type: 'object' },
            { name: 'columns', type: 'object', default: {
                    "top-1" : {
                        "id" : "top-1",
                        "title" : "Top 1",
                        "class": "col-12",
                        "taskIds" : []
                    },
                    "column-1" : {
                        "id" : "column-1",
                        "title" : "Column 1",
                        "class": "col-3",
                        "taskIds" : []
                    },
                    "column-2" : {
                        "id" : "column-2",
                        "title" : "Column 2",
                        "class": "col-6",
                        "taskIds" : []
                    },
                    "column-3" : {
                        "id" : "column-3",
                        "title" : "Column 3",
                        "class": "col-3",
                        "taskIds" : []
                    },
                    "footer-1" : {
                        "id" : "footer-1",
                        "title" : "Footer 1",
                        "class": "col-3",
                        "taskIds" : []
                    },
                    "footer-2" : {
                        "id" : "footer-2",
                        "title" : "Footer 2",
                        "class": "col-3",
                        "taskIds" : []
                    },
                    "footer-3" : {
                        "id" : "footer-3",
                        "title" : "Footer 3",
                        "class": "col-3",
                        "taskIds" : []
                    },
                    "footer-4" : {
                        "id" : "footer-4",
                        "title" : "Footer 4",
                        "class": "col-3",
                        "taskIds" : []
                    },
                    "bottom-1" : {
                        "id" : "bottom-1",
                        "title" : "Bottom 1",
                        "class": "col-12",
                        "taskIds" : []
                    }
                }},
            { name: 'columnOrder', type: 'array', default:[
                    "top-1",
                    "column-3",
                    "column-2",
                    "column-1",
                    "footer-1"
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
