import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getData, getDroppable } from './Helper';
import { FooterFlex } from '@scripty/styles';

export const Board = (props) => {
    const { board, setBoard, cards, setCards, components, editing, onAddBtnClick, onChooseBtnClick } = props;
    const content = getData('column', board, cards, components, editing, onAddBtnClick, onChooseBtnClick);
    const footer = getData('footer', board, cards, components, editing, onAddBtnClick, onChooseBtnClick);
    const top = getData('top', board, cards, components, editing, onAddBtnClick, onChooseBtnClick);
    const bottom = getData('bottom', board, cards, components, editing, onAddBtnClick, onChooseBtnClick);

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
            const newColumnOrder = Array.from(board.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...board,
                columnOrder: newColumnOrder
            }

            setBoard(newState);
            return;
        }

        const start = board.columns[source.droppableId];
        const finish = board.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...board,
                columns: {
                    ...board.columns,
                    [newColumn.id]: newColumn
                }
            }

            setBoard(newState);
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
            ...board,
            columns: {
                ...board.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        setBoard(newState);
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
