import React from 'react';
import '@atlaskit/css-reset';
import { hot } from 'react-hot-loader/root';
import { Example } from './Example';
import placementsStore from '../stores/placementsStore';
import articlesStore from '../stores/articlesStore';
import { StoreProvider } from '@scripty/react-store';

const App = () => {

    let defaultStores = {
        placementsStore,
        articlesStore
    };

    return (
        <StoreProvider defaultStores={defaultStores}>
            <Example />
        </StoreProvider>
    );
};

export default hot(App);
