import React, { Fragment } from 'react';

export const Card = (props) => {
    const {
        components,
        index,
        task,
        editing
    } = props;
    if (task.type) {
        const Component = components[task.type];
        return (
            <Fragment>
                <Component
                    {...task}
                    editing={editing}
                />
            </Fragment>
        )
    }

    return null;
};


