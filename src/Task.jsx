import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'inherit')};
`;

export const Task = (props) => {
    const { task, index } = props;

    return (
        <Draggable
            draggableId={task.id}
            index={index}
        >
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    className={'task'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {task.content}
                </Container>
            )}

        </Draggable>
    );
}
