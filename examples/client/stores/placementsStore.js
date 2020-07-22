import { createStore } from '@scripty/react-store';

export default createStore({
    name: 'placementsStore',
    model: {
        fields: [
            { name: 'placements', type: 'array' },
            { name: 'assignment', type: 'string' },
        ]
    },
    proxy: {
        rootProperty: 'entries',
        api: {
            findPlacements: {
                url: '/modules/findPlacements',
                method: 'get'
            },
            updatePlacements: {
                url: '/modules/updatePlacements',
                method: 'post'
            },
            destroyPlacements: {
                url: '/modules/destroyPlacements',
                method: 'post'
            }
        }
    }
});
