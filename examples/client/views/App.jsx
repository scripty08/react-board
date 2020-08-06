import React from 'react';
import '@scripty/styles';
import { hot } from 'react-hot-loader/root';
import { Example } from './Example';
import boardsStore from '../stores/boardsStore';
import cardsStore from '../stores/cardsStore';
import cardsTableStore from '../stores/cardsTableStore';
import { StoreProvider } from '@scripty/react-store';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {

    let defaultStores = {
        boardsStore,
        cardsStore,
        cardsTableStore
    };

    return (
        <StoreProvider defaultStores={defaultStores}>
            <Router>
                <Example />
            </Router>
        </StoreProvider>
    );
};

export default hot(App);
