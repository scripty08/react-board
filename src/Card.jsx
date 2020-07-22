import React from 'react';

export const Card = (props) => {
    const {
        cards,
        index,
        task,
        editing
    } = props;

    if (task.type) {
        const Component = cards[task.type]
        return (
            <Component
                key={index}
                {...task}
                editing={editing}
            />
        )
    }

    return null;
};


