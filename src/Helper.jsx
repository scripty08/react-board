import React, {Fragment} from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ContainerFlex, FooterFlex } from '@scripty/styles';
import { Column } from './Column';
import { customAlphabet } from 'nanoid';

export const getDroppable = (props) => {

    const { editing, position, data } = props;

    if (data.length === 0) return null;

    return (
        <Droppable isDropDisabled={!editing} droppableId={position + '-columns'} direction={'horizontal'} type={'column'}>
            {(provided) => (
                <ContainerFlex
                    id={position}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    layout={'sized'}
                >
                    {data}
                    {provided.placeholder}
                </ContainerFlex>
            )}
        </Droppable>
    );
}

const getColumn = (board, cards, columnId, index, components, editing, onAddBtnClick) => {
    const column = board.columns[columnId];

    const tasks = column.taskIds.map((taskId) => {
        return cards.find( rec => rec._id === taskId);
    });

    return <Column
        key={column.id}
        column={column}
        tasks={tasks}
        index={index}
        components={components}
        editing={editing}
        onAddBtnClick={onAddBtnClick}
    />;
};

export const getData = (placement, board, cards, components, editing, onAddBtnClick) => {
    return board.columnOrder.map((columnId, index) => {
        if (columnId.indexOf(placement) !== -1) {
            return getColumn(board, cards, columnId, index, components, editing, onAddBtnClick);
        }
        return null;

    }).filter(rec => rec !== null);
}

export const getCardIds = (board) => {
    const columns = board.columns;
    let _ids = [];
    Object.keys(columns).forEach((key) => {
        columns[key].taskIds.map((rec) => {
            _ids.push(rec);
        });
    });

    return _ids;
}

export const createCardModel = (store, type, data = {}) => {
    const nanoid = customAlphabet('1234567890abcdef', 24);
    return store.createModel({
        _id: nanoid(),
        type: type,
        edit: true,
        content: data
    });
}

export const updateCardModel = (cardsStore, article, _id) => {
    const cards = cardsStore.data;
    let filteredCards = cards.filter(rec => rec._id === _id);
    filteredCards[0].set({content: article, edit: false});
    cardsStore.update(filteredCards[0]);
}

export const updateBord = (boardsStore, columnId, model) => {
    const board = boardsStore.getAt(0);
    board.columns[columnId].taskIds.unshift(model._id);
    board.set(board);
    boardsStore.add(board);
}
