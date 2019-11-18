import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Portal from 'components/Portal';
import Modal from 'components/Modal';
import apiCall from 'API';

const Message = ({ author, text }) => <div>{author}: {text}</div>;

Message.propTypes = {
    author: PropTypes.string,
    text: PropTypes.string,
};

const Contacts = ({ users, onSelect }) => (
    <div>
        Your Contacts:
        {
            users.map(user => (
                <div
                    key={user}
                    className="contact"
                    onClick={onSelect}
                >
                    {user}
                </div>
            ))
        }
    </div>
);

Contacts.propTypes = {
    users: PropTypes.array,
    onSelect: PropTypes.func,
};

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            messages: [],
            message: '',
            user: localStorage.getItem('username'),
            contact: null
        };
        this.socket = io('http://localhost:5000');
        this.socket.on('RECEIVE_MESSAGE', message => {
            this.addMessage(message);
        })
    }

    async componentDidMount() {
        const users = await apiCall('getChatUsers');
        this.setState({
            users
        });
    }

    getHistory = async (user1, user2) => {
        const history = await apiCall('getHistory', 'POST', { user1, user2 });
        this.setState({
            messages: history,
        })
    };

    handleSelect = async (e, value) => {
        const { user } = this.state;
        let contact;
        if (value !== null) {
            contact = e.target.innerHTML;
            this.getHistory(user, contact);
        }
        this.setState({
            contact,
        })
    };

    addMessage = (message) => {
        const { user, contact } = this.state;
        if (
            message.from === user && message.to === contact
            || message.from === contact && message.to === user
        ) {
            this.setState(prevState => ({
                messages: prevState.messages.concat([message])
            }));
        }
    };

    sendMessage = (e) => {
        e.preventDefault();
        const { user, contact, message } = this.state;
        this.socket.emit('SEND_MESSAGE', {
            from: user,
            to: contact,
            text: message
        });
        this.setState({
            message: ''
        });
    };

    handleChange = e => {
        this.setState({
            message: e.target.value
        })
    };

    render() {
        const { messages, users, contact } = this.state;
        const { isOpen, onToggle } = this.props;
        return (
            <>
                <Portal open={isOpen}>
                    <Modal handleClose={onToggle}>
                        <div className="modal-body">
                            {
                                contact ? (
                                    <React.Fragment>
                                         <span
                                             className="btn btn-secondary btn-sm position-absolute"
                                             onClick={(e) => this.handleSelect(e, null)}
                                         >
                                                {`<`}
                                            </span>
                                        <div className="text-center mb-4">
                                            Chat with <b>{contact.toUpperCase()}</b>
                                        </div>
                                        <div className="messages">
                                            {
                                                messages && messages.map((message, i) =>
                                                    <Message key={i} author={message.from} text={message.text}/>
                                                )
                                            }
                                        </div>
                                        <form className="mt-4" onSubmit={e => this.sendMessage(e)}>
                                            <input
                                                type="text"
                                                placeholder="Message"
                                                className="form-control"
                                                value={this.state.message}
                                                onChange={this.handleChange}
                                            />
                                            <button className="btn btn-secondary mt-2">Send</button>
                                        </form>
                                    </React.Fragment>
                                ) : (
                                    <Contacts users={users} onSelect={this.handleSelect}/>
                                )
                            }
                        </div>
                    </Modal>
                </Portal>
                <span
                    id="chat-open-button"
                    className="btn btn-secondary position-absolute mr-3"
                    onClick={onToggle}
                >
                    Open Chat
                </span>
            </>
        )
    }
}

Chat.propTypes = {
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func,
};

export default Chat;
