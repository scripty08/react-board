import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Column } from './Column';
import { ContainerFlex, FooterFlex } from '@scripty/styles';

export const Board = (props) => {
    const { state, setState, cards, editing, onAddBtnClick } = props;
    const content = state.columnOrder.map((columnId, index) => {
        if (columnId.indexOf('column') !== -1) {
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
        }
        return null;

    }).filter(rec => rec !== null);

    const footer = state.columnOrder.map((columnId, index) => {
        if (columnId.indexOf('footer') !== -1) {
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
        }
        return null;

    }).filter(rec => rec !== null);

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

            <Droppable isDropDisabled={!editing} droppableId={'content-columns'} direction={'horizontal'} type={'column'}>
                {(provided) => (
                    <ContainerFlex
                        id={'content'}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        layout={'sized'}
                    >
                        {content}
                        {provided.placeholder}
                    </ContainerFlex>
                )}
            </Droppable>

            <Droppable isDropDisabled={!editing} droppableId={'footer-columns'} direction={'horizontal'} type={'column'}>
                {(provided) => (
                    <FooterFlex
                        id={'footer'}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        layout={'sized'}
                    >
                        {footer}
                        {provided.placeholder}
                    </FooterFlex>
                )}
            </Droppable>

        </DragDropContext>
    )
}
