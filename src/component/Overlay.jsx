// @flow
import React from 'react';
import type {Element, Node} from 'react';
import ReactModal from 'react-modal';

type Props = {
    title: string,
    isOpen: boolean,
    onAfterOpen: Function,
    onRequestClose: Function,
    render: ({onRequestClose: Function, title: string}) => Node,
    spruceName: string
};

export default class Overlay extends React.Component<Props> {
    static defaultProps = {
        onAfterOpen: () => {},
        spruceName: 'Overlay',
        title: 'Message'
    };

    render(): Element<any> {
        const {
            isOpen,
            onAfterOpen,
            onRequestClose,
            render,
            spruceName,
            title
        } = this.props;

        return <ReactModal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            className={`${spruceName}_content`}
            overlayClassName={spruceName}
            contentLabel={title}
        >
            {isOpen && render({
                onRequestClose,
                title
            })}
        </ReactModal>;
    }
}
