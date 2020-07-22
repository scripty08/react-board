import React from 'react';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    padding: 8px;
    padding: ${props => (props.editing ? '8px' : '0')};
    border: ${props => (props.editing ? '1px dotted lightgrey' : 'none')};
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

const Title = styled.h3`
    display: ${props => (props.editing ? 'true' : 'none')};
    padding: 8px;
    background-color: ${props => (props.editing ? '#fcfcfc' : 'none')};
    border: ${props => (props.editing ? '1px dotted lightgrey' : 'none')};
    border-width: 1px 1px 0 1px;
`;

const InnerList = React.memo(({ tasks, cards, editing }) => {
    return tasks.map((task, index) => <Task index={index} key={task.id} task={task} cards={cards} editing={editing}/>)
});

export const Column = (props) => {
    const { column, tasks, index, cards, editing } = props;

    return (
        <Draggable isDragDisabled={!editing} draggableId={column.id} index={index}>
            {(provider) => (
                <div
                    className={'column'}
                    id={column.id}
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                >
                    <Title editing={editing} {...provider.dragHandleProps}>
                        {column.title}
                    </Title>
                    <Droppable isDropDisabled={!editing} droppableId={column.id} type={'task'}>
                        {(provided, snapshot) => (
                            <Container
                                editing={editing}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                               <InnerList tasks={tasks} cards={cards} editing={editing}/>
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );

}
