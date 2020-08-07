import React, { Fragment, useEffect, useState } from 'react';
import { Board, createCardModel, getCardIds, updateBord, updateCardModel } from '../../../src';
import { useStore } from '@scripty/react-store';
import { Toolbar } from '@scripty/react-toolbar';
import { Article } from '@scripty/react-articles';
import { Modal } from '@scripty/react-modal';
import './Example.scss';
import { Login } from '@scripty/react-login';
import { Table } from '@scripty/react-tables';

export const Example = () => {
    const { boardsStore } = useStore('boardsStore');
    const { cardsStore } = useStore('cardsStore');
    const { cardsTableStore } = useStore('cardsTableStore');
    const [ modalVisible, setModalVisible ] = useState(false);
    const board = boardsStore.getAt(0);
    const cards = cardsStore.data;
    const [editing, setEditing] = useState(false);
    const [columnId, setColumnId] = useState('');
    const [selection, setSelection] = useState([]);

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

    const onChooseBtnClick = async (columnId, type) => {
        setColumnId(columnId);
        await cardsTableStore.proxy.read({type: type});
        setModalVisible(true);
    };

    const onAddBtnClick = async (columnId, type) => {
        const model = createCardModel(cardsStore, type, {
            title: '',
            html: '',
        }, true);
        cardsStore.add(model);
        updateBord(boardsStore, columnId, model);
    }

    const onOkBtnClick = (_id, article) => {
        updateCardModel(cardsStore, article, _id);
    }

    const onDeleteBtnClick = (_id, columnId) => {
        // don´t delete card yet, because could be needed on other pages
        //cardsStore.removeById(_id);
        let columns = board.columns;
        const column = columns[columnId];
        column.taskIds.splice(column.taskIds.indexOf(_id), 1);
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
        console.log('submit login', '  ---------------------- ');
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
        const { edit, content, editing, _id, columnId } = props;
        return (
            <Article
                edit={edit}
                {...content}
                id={_id}
                showToolbar={editing}
                onOkBtnClick={onOkBtnClick.bind(null, _id )}
                onCancelBtnClick={onCancelBtnClick.bind(null, _id, content )}
                onDeleteBtnClick={onDeleteBtnClick.bind(null, _id, columnId )}
            />
        );
    }

    const onModalOkBtnClick = () => {
        selection.map((rec) => {
            const model = createCardModel(cardsStore, 'Article', rec.original._id, {
                title: rec.original.content.title,
                html: rec.original.content.html,
            });
            cardsStore.add(model);
            updateBord(boardsStore, columnId, model);
        });
        setModalVisible(false);
    }

    const onModalCancelBtnClick = () => {
        setModalVisible(false);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'Type',
                        accessor: 'type',
                    },
                    {
                        Header: 'Title',
                        accessor: (row, idx) => {
                            if (row.content !== null) {
                                if (typeof row.content.title !== 'undefined') {
                                    return row.content.title
                                }
                            }

                            return ''
                        },
                    },
                ],
            }
        ],
        []
    )

    const onPaginationChange = async (page, size) => {
        await cardsTableStore.proxy.read({pagination: {size, page}});
    };

    const onSelectionChange = (data) => {
        setSelection(data);
    };

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
                onChooseBtnClick={onChooseBtnClick}
            />
            <Modal
                title={'Choose Cards'}
                visible={modalVisible}
                onOk={onModalOkBtnClick}
                onCancel={onModalCancelBtnClick}
                onClose={onModalCancelBtnClick}
            >
                <Table
                    columns={columns}
                    data={cardsTableStore.rawData}
                    onSelectionChange={onSelectionChange}
                    pagination={cardsTableStore.pagination}
                    onPaginationChange={onPaginationChange}
                />
            </Modal>
        </Fragment>
    )

}
