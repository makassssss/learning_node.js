import React from 'react';
import io from 'socket.io-client';

const Message = ({ author, text }) => <div>{author}: {text}</div>;

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: ''
        };
        this.socket = io('http://localhost:5000');
        this.socket.on('RECEIVE_MESSAGE', message => {
            this.addMessage(message);
        })
    }

    componentDidMount() {
        //get chat history
    }

    addMessage = (message) => (
        this.setState(prevState => ({
            messages: prevState.messages.concat([message])
        }))
    );

    sendMessage = (e) => {
        e.preventDefault();
        const { message } = this.state;
        this.socket.emit('say to', this.socket.id, {
                author: 'author',
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
        const { messages } = this.state;
        return (
            <div>
                {
                    messages && messages.map((message, i) =>
                        <Message key={i} author={message.author} text={message.text}/>
                    )
                }
                <form onSubmit={e => this.sendMessage(e)}>
                    <input
                        type="text"
                        placeholder="Message"
                        className="form-control"
                        value={this.state.message}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <button className="btn btn-primary form-control">Send</button>
                </form>
            </div>
        )
    }
}

export default Chat;
