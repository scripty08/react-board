import React, { useState } from 'react';
import { Board } from '../../../src';
import { initialData } from '../../../src/initial-data';

export const Example = () => {

    const [state, setState] = useState(initialData);

    return (
        <Board state={state} setState={setState} />
    )
}
