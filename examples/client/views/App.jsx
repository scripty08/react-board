import React from 'react';
//import '@scripty/styles';
import { hot } from 'react-hot-loader/root';
import { Example } from './Example';
import boardsStore from '../stores/boardsStore';
import { StoreProvider } from '@scripty/react-store';

const App = () => {

    let defaultStores = {
        boardsStore
    };

    return (
        <StoreProvider defaultStores={defaultStores}>
            <Example />
        </StoreProvider>
    );
};

export default hot(App);
