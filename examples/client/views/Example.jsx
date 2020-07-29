import React, { Fragment, useEffect, useState } from 'react';
import { Board } from '../../../src';
import { useStore } from '@scripty/react-store';
import { EditButton, SaveButton } from '@scripty/react-buttons';
import { Article } from '@scripty/react-articles';
import { nanoid } from 'nanoid';
import './Example.scss';
import { Login } from '@scripty/react-login';

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

    const onAddBtnClick = (columnId, type) => {
        let id = nanoid();
        data.tasks[id] = {
            id: id,
            type: type,
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

    const onOkBtnClick = (id, article) => {
        data.tasks[id].content = article;
        delete data.tasks[id]['edit'];
        data.set(data);
        boardsStore.setData(data);
    }

    const onDeleteBtnClick = (id) => {
        delete data.tasks[id]
        data.set(data);
    }

    const onCancelBtnClick = (id, content) => {
        if (content.title === '' && content.title === '') {
            delete data.tasks[id]
            data.set(data);
            boardsStore.setData(data);
        }
    }

    const onSubmit = (data) => {
        console.log('login submit action', '  ---------------------- ');
    }

    const onSave = () => {
        boardsStore.proxy.update({ assignment: 'Dashboard', ...data });
        setEditing(!editing);
    }

    const LoginComponent = () => {
        return <Login loginPath={'/'} onLoginSubmit={onSubmit} />
    }

    const ArticleCard = (props) => {
        const { edit, content, editing, id } = props;

        return (
            <Article
                edit={edit}
                {...content}
                id={id}
                showToolbar={editing}
                onOkBtnClick={onOkBtnClick.bind(null, id )}
                onCancelBtnClick={onCancelBtnClick.bind(null, id, content )}
                onDeleteBtnClick={onDeleteBtnClick.bind(null, id, content )}
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
                cards={{ Article: ArticleCard, Login: LoginComponent }}
                editing={editing}
                onAddBtnClick={onAddBtnClick}
            />
        </Fragment>
    )

}
