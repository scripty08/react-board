import React, { Fragment, useEffect, useState } from 'react';
import { Board, createCardModel, getCardIds, updateBord, updateCardModel } from '../../../src';
import { useStore } from '@scripty/react-store';
import { Toolbar } from '@scripty/react-toolbar';
import { Article } from '@scripty/react-articles';
import './Example.scss';
import { Login } from '@scripty/react-login';

export const Example = () => {
    const { boardsStore } = useStore('boardsStore');
    const { cardsStore } = useStore('cardsStore');
    const board = boardsStore.getAt(0);
    const cards = cardsStore.data;
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        boardsStore.proxy.read({ assignment: 'Test' });
    }, []);

    useEffect(() => {
        if (board.assignment !== '') {
            cardsStore.proxy.find({ _ids: getCardIds(board) });
        }
    }, [board]);

    const onEdit = () => {
       setEditing(!editing);
    }

    const onAddBtnClick = async (columnId, type) => {
        const model = createCardModel(cardsStore, type, {
            title: '',
            html: '',
        });
        cardsStore.add(model);
        updateBord(boardsStore, columnId, model);
    }

    const onOkBtnClick = (_id, article) => {
        updateCardModel(cardsStore, article, _id);
    }

    const onDeleteBtnClick = (_id) => {
        cardsStore.removeById(_id);
        delete board.tasks[_id]
        board.set(board);
    }

    const onCancelBtnClick = (_id, content) => {
        const dirtyRecords = cardsStore.getDirtyRecords();
        if (dirtyRecords) {
            cardsStore.removeById(_id);
        }

        setEditing(!editing);
    }

    const onSubmit = (data) => {
        console.log('login submit action', '  ---------------------- ');
    }

    const onSave = async () => {
        const dirtyRecords = cardsStore.getDirtyRecords();

        if (dirtyRecords && dirtyRecords.updated.length !== -1) {
            await cardsStore.proxy.update({cards: dirtyRecords.updated});
        }

        if (dirtyRecords && dirtyRecords.removed.length !== -1) {
            await cardsStore.proxy.destroy({cards: dirtyRecords.removed});
        }

        await boardsStore.proxy.update({ assignment: 'Test', ...board });
        setEditing(!editing);
    }

    const LoginComponent = () => {
        return <Login loginPath={'/'} onLoginSubmit={onSubmit} />
    }

    const ArticleCard = (props) => {
        const { edit, content, editing, _id } = props;

        return (
            <Article
                edit={edit}
                {...content}
                id={_id}
                showToolbar={editing}
                onOkBtnClick={onOkBtnClick.bind(null, _id )}
                onCancelBtnClick={onCancelBtnClick.bind(null, _id, content )}
                onDeleteBtnClick={onDeleteBtnClick.bind(null, _id, content )}
            />
        );
    }

    return (
        <Fragment>
            <Toolbar onSaveBtnClick={onSave} onEditBtnClick={onEdit} visible/>
            <Board
                board={board}
                setBoard={state => board.set(state)}
                cards={cards}
                setCards={cards => cards.set(cards)}
                components={{ Article: ArticleCard, Login: LoginComponent }}
                editing={editing}
                onAddBtnClick={onAddBtnClick}
            />
        </Fragment>
    )

}
