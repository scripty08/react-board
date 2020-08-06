import React, { Fragment, useEffect } from 'react';
import { useStore } from '@scripty/react-store';
import { useTable, useRowSelect } from 'react-table'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export const Chooser = (props) => {
    const { type } = props;
    const { cardsStore } = useStore('cardsStore');


    const onSelect = () => {
        cardsStore.proxy.read({ type: type });
    }


    if (type) {
        return (
            <Fragment>
                test
            </Fragment>
        )
    }

    return null;
};


