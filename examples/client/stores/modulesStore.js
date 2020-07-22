import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'modulesStore',
    model: {
        fields: [
            { name: 'plugin', type: 'array' },
            { name: 'assignment', type: 'object'},
            { name: 'type', type: 'string'},
            { name: 'module_id', type: 'string'},
            { name: 'item_id', type: 'string'}
        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            findModules: {
                url: '/modules/findModules',
                method: 'get'
            },
            updateModules: {
                url: '/modules/updateModules',
                method: 'post'
            },
            destroyModules: {
                url: '/modules/destroyModules',
                method: 'post'
            }
        }
    }
});
