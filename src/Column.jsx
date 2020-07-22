import React from 'react';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

const Title = styled.h3`
    padding: 8px;
`;

const InnerList = React.memo(({ tasks }) => {
    return tasks.map((task, index) => <Task index={index} key={task.id} task={task}/>)
});

export const Column = (props) => {
    const { column, tasks, index } = props;

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provider) => (
                <div
                    className={'column'}
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                >
                    <Title {...provider.dragHandleProps}>{column.title}</Title>
                    <Droppable droppableId={column.id} type={'task'}>
                        {(provided, snapshot) => (
                            <Container
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                               <InnerList tasks={tasks}/>
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );

}
