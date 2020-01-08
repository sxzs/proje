import React from 'react';
import io from 'socket.io-client';

import { connect } from 'react-redux';
import propTypes from 'prop-types';

export const CTX = React.createContext();

const initState = {
    general: [

    ],
    topic2: [

    ],
    topic3: [

    ],
}

function reducer(state, action) {
    const { from, msg, topic } = action.payload;
    switch (action.type) {
        case 'RECEIVE_MASSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    { from, msg }
                ]
            }
        default:
            return state;
    }
}



let socket;

function sendChatAction(value) {
    socket.emit('chat message', value)
}

function ChatStore(props) {
    //const { user1 } = this.props.auth;
    //console.log(props.auth.user.name)
    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', (msg) => {
            dispatch({ type: 'RECEIVE_MASSAGE', payload: msg })
        });
    }

    if (props.auth.user) {
        const user = props.auth.user.name;
        return (
            <CTX.Provider value={{ allChats, sendChatAction, user }}>
                {props.children}
            </CTX.Provider>
        )
    } else {
        const user = 'user ' + Math.random(100).toFixed(2);
        return (
            <CTX.Provider value={{ allChats, sendChatAction, user }}>
                {props.children}
            </CTX.Provider>
        )
    }


    /* return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    ) */
}

ChatStore.prototype = {
    auth: propTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(ChatStore);