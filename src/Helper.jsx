import React, {Fragment} from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { ContainerFlex, FooterFlex } from '@scripty/styles';
import { Column } from './Column';

export const getDroppable = (props) => {

    const { editing, position, data } = props;

    console.log(data, ' data ---------------------- ');
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

const getColumn = (state, columnId, index, cards, editing, onAddBtnClick) => {
    const column = state.columns[columnId];
    const tasks = column.taskIds.map((taskId) => {
        return state.tasks[taskId]
    });

    return <Column
        key={column.id}
        column={column}
        tasks={tasks}
        index={index}
        cards={cards}
        editing={editing}
        onAddBtnClick={onAddBtnClick}
    />;
};

export const getData = (placement, state, cards, editing, onAddBtnClick) => {
    return state.columnOrder.map((columnId, index) => {
        if (columnId.indexOf(placement) !== -1) {
            return getColumn(state, columnId, index, cards, editing, onAddBtnClick);
        }
        return null;

    }).filter(rec => rec !== null);
}
