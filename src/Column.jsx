import React from 'react';
import { Task } from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { AddButton } from '@scripty/react-buttons';

const StyledColumn = styled.div`
    padding: 5px;
    border-radius: 2px;
    background-color: transparent;

    .h3 {
        padding: 8px;
    }

    .task {
        border-radius: 2px;
        margin-bottom: 8px;
    }
`;

const Container = styled.div`
    padding: ${props => (props.editing ? '8px' : '0')};
    border: ${props => (props.editing ? '1px dotted lightgrey' : 'none')};
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'transparent')};
    min-height: ${props => (props.editing ? '85px' : '0')};
`;

const Title = styled.h3`
    display: ${props => (props.editing ? 'true' : 'none')};
    padding: ${props => (props.editing ? '8px' : '0')};
    margin: 0;
    background-color: ${props => (props.editing ? '#fcfcfc' : 'transparent')};
    border: ${props => (props.editing ? '1px dotted lightgrey' : 'none')};
    border-width: 1px 1px 0 1px;

    > span {
       float: right;
       display: inline-bock;
    }
`;

const InnerList = React.memo(({ tasks, cards, editing }) => {
    return tasks.map((task, index) => {
        if (task) {
            return <Task index={index} key={task.id} task={task} cards={cards} editing={editing}/>
        }
        return null;
    })
});

export const Column = (props) => {
    const { column, tasks, index, cards, editing, onAddBtnClick = () => {} } = props;

    const onClick = (key) => {
        onAddBtnClick(column.id, key);
    };

    const getMenu = () => {
        let menu = [];
        Object.keys(cards).forEach((key, idx) => {
            menu.push(<a key={idx} aria-current={'page'} href={'#'} onClick={onClick.bind(null, key)} className={'active'}>{key}</a>);
        });

        return menu;
    };

    return (
        <Draggable isDragDisabled={!editing} draggableId={column.id} index={index}>
            {(provider) => (
                <StyledColumn
                    id={column.id}
                    className={column.class}
                    {...provider.draggableProps}
                    ref={provider.innerRef}
                >
                    <Title editing={editing} {...provider.dragHandleProps}>
                        {column.title} <span key={index}><AddButton color={'white'} iconBtn rounded items={getMenu()} /></span>
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
                </StyledColumn>
            )}
        </Draggable>
    );

}
