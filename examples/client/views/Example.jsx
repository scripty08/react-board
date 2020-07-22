import React, { Fragment, useEffect } from 'react';
import { Board } from '../../../src';
import { useStore } from '@scripty/react-store';
import { AddButton, SaveButton } from '@scripty/react-buttons';
import { Article } from '@scripty/react-articles';

export const Example = () => {
    const { boardsStore } = useStore('boardsStore');
    const data = boardsStore.getAt(0);

    useEffect(() => {
        boardsStore.proxy.read({ assignment: 'Dashboard' });
    }, []);

    const onAdd = () => {
        data.tasks['task-5'] = {
            id: 'task-5',
            type: 'Article',
            edit: true,
            content: {
                title: '',
                html: '',
            }
        };

        data.columns['column-2'].taskIds.push('task-5');
        data.set(data);
    }

    const onSave = () => {
        boardsStore.proxy.update({ assignment: 'Dashboard', ...data })
    }

    const onOkBtnClick = (task, content) => {
        data.tasks[task.id].content = content;
        delete data.tasks[task.id]['edit'];
        data.set(data);
    }

    const ArticleCard = (task, editing) => {
        return <Article edit={task.edit} {...task.content} showEditBtn={editing} onOkBtnClick={onOkBtnClick.bind(null, task)}/>
    }

    return (
        <Fragment>
            <AddButton onClick={onAdd}/>
            <SaveButton onClick={onSave}/>
            <Board
                state={data}
                setState={state => data.set(state)}
                cards={{ Article: ArticleCard }}
                editing={true}
            />
        </Fragment>
    )

}
