import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Card } from './Card';

const Container = styled.div`
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'inherit')};
`;

export const Task = (props) => {
    const { task, index, components, editing} = props;
    return (
        <Draggable
            draggableId={task._id}
            index={index}
            isDragDisabled={!editing}
        >
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    className={'task'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card
                        editing={editing}
                        task={task}
                        index={index}
                        components={components} />
                </Container>
            )}

        </Draggable>
    );
}
