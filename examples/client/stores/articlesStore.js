import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'articlesStore',
    model: {
        fields: [
            { name: 'title', type: 'string' },
            { name: 'html', type: 'string' },
            { name: '_id', type: 'string' },
            { name: 'layout_id', type: 'string' },
            { name: 'action', type: 'string' },

        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            update: {
                url: '/articles/update',
                method: 'post'
            },
        }
    }
});
