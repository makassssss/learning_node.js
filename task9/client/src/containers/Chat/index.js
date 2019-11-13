import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Portal from '../../components/Portal';
import Modal from '../../components/Modal';

const Message = ({ author, text }) => <div>{author}: {text}</div>;

const Contacts = ({ users, onSelect }) => (
    <div>
        {
            users.map(user => (
                <div key={user} onClick={onSelect}>{user}</div>
            ))
        }
    </div>
);

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
        const users = await axios.get('http://localhost:5000/api/getChatUsers', {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => res.data);

        this.setState({
            users
        });
    }

    getHistory = async (user1, user2) => {
        const history = await axios.post('http://localhost:5000/api/getHistory', {
            user1,
            user2
        }, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
            .then(res => res.data);
        this.setState({
            messages: history,
        })
    };

    handleSelect = async (e, value) => {
        const user = localStorage.getItem('username');
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
        const { contact } = this.state;
        const user = localStorage.getItem('username');
        if ((message.from === user && message.to === contact) || (message.from === contact && message.to === user)) {
            this.setState(prevState => ({
                messages: prevState.messages.concat([message])
            }));
        }
    };

    sendMessage = (e) => {
        e.preventDefault();
        const { message, contact } = this.state;
        const author = localStorage.getItem('username');
        this.socket.emit('SEND_MESSAGE', {
            from: author,
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
            <React.Fragment>
                <Portal open={isOpen}>
                    <Modal handleClose={onToggle}>
                        <div className="modal-body">
                            {
                                contact ? (
                                    <React.Fragment>
                                        <div>Conversation with <b>{contact.toUpperCase()}</b></div>
                                        <button
                                            className="btn btn-secondary btn-sm mb-3"
                                            onClick={(e) => this.handleSelect(e, null)}
                                        >
                                            change contact
                                        </button>
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
                                            <br/>
                                            <button className="btn btn-secondary form-control">Send</button>
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
            </React.Fragment>
        )
    }
}

export default Chat;
