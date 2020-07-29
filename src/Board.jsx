import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getData, getDroppable } from './Helper';
import { ContainerFlex, FooterFlex } from '@scripty/styles';

export const Board = (props) => {
    const { state, setState, cards, editing, onAddBtnClick } = props;
    const content = getData('column', state, cards, editing, onAddBtnClick);
    const footer = getData('footer', state, cards, editing, onAddBtnClick);
    const top = getData('top', state, cards, editing, onAddBtnClick);
    const bottom = getData('bottom', state, cards, editing, onAddBtnClick);

    const onDragEnd = result => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if (type === 'column') {
            const newColumnOrder = Array.from(state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...state,
                columnOrder: newColumnOrder
            }

            setState(newState);
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            }

            setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        setState(newState);
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <div id={'container'}>
                {getDroppable({ editing, position: 'top', data: top })}
                {getDroppable({ editing, position: 'content', data: content})}
                {getDroppable({ editing, position: 'bottom', data: bottom })}
            </div>

            <FooterFlex>
                {getDroppable({ editing, position: 'footer', data: footer })}
            </FooterFlex>

        </DragDropContext>
    )
}
