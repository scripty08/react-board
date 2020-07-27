import React, { Fragment, useEffect, useState } from 'react';
import { Board } from '../../../src';
import { useStore } from '@scripty/react-store';
import { EditButton, SaveButton } from '@scripty/react-buttons';
import { Article } from '@scripty/react-articles';
import { nanoid } from 'nanoid';
import './Example.scss';

export const Example = () => {
    const { boardsStore } = useStore('boardsStore');
    const data = boardsStore.getAt(0);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        boardsStore.proxy.read({ assignment: 'Dashboard' });
    }, []);

    const onEdit = () => {
       setEditing(!editing);
    }

    const onAddBtnClick = (columnId) => {
        let id = nanoid();

        data.tasks[id] = {
            id: id,
            type: 'Article',
            edit: true,
            content: {
                title: '',
                html: '',
            }
        };

        data.columns[columnId].taskIds.unshift(id);
        data.set(data);
        boardsStore.setData(data);
    }

    const onDeleteBtnClick = (task) => {
        delete data.tasks[task.id]
        data.set(data);
    }

    const onSave = () => {
        boardsStore.proxy.update({ assignment: 'Dashboard', ...data });
        setEditing(!editing);
    }

    const onOkBtnClick = (task, content) => {
        data.tasks[task.id].content = content;
        delete data.tasks[task.id]['edit'];
        data.set(data);
        boardsStore.setData(data);
    }

    const onCancelBtnClick = (task) => {
        if (task.content.title === '' && task.content.title === '') {
            delete data.tasks[task.id]
            data.set(data);
            boardsStore.setData(data);
        }
    }

    const ArticleCard = (props) => {
        return (
            <Article
                edit={props.edit}
                {...props.content}
                showToolbar={props.editing}
                onOkBtnClick={onOkBtnClick.bind(null, props)}
                onCancelBtnClick={onCancelBtnClick.bind(null, props)}
                onDeleteBtnClick={onDeleteBtnClick.bind(null, props)}
            />
        );
    }

    return (
        <Fragment>
            <SaveButton onClick={onSave}/>
            <EditButton onClick={onEdit}/>
            <Board
                state={data}
                setState={state => data.set(state)}
                cards={{ Article: ArticleCard }}
                editing={editing}
                onAddBtnClick={onAddBtnClick}
            />
        </Fragment>
    )

}
