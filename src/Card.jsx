import React, { Fragment } from 'react';

export const Card = (props) => {
    const {
        components,
        index,
        task,
        columnId,
        editing
    } = props;
    if (task.type) {
        const Component = components[task.type];
        return (
            <Fragment>
                <Component
                    {...task}
                    taskIndex={index}
                    columnId={columnId}
                    editing={editing}
                />
            </Fragment>
        )
    }

    return null;
};


