import React, { Component } from "react";
import { ChatList } from "react-chat-elements";
import {FormControl, FormGroup, Button, InputGroup} from 'react-bootstrap';
import { newUser } from "./../requests";
/**
 *
 * Renders user list
 *
 * Used on both places Sign-in modal and as ChatList
 */

export default class UserList extends Component {
    state = {
        userData: [],
        searchQuery: null,
        newUserValue: ""
    };
    componentDidMount() {}
    searchInput(e) {
        let value = e.target.value;
        let searchQuery = null;
        if (value) {
            searchQuery = value;
        }
        this.setState({searchQuery});
    }

    newUserClick = (e) => {
        const min = 8;
        const max = 100;
        const rand = Math.floor(Math.random()*(max-min+1)+min)

        let value = e.target.value;
        let newUserValue = null;
        if (value) {
            newUserValue = value;
        }
        this.setState({newUserValue: e.target.value});
        
        newUser(rand,newUserValue);
    }

    onNewUserClicked() {
        if (!this.state.newUserValue) {
            return;
        }
        this.props.onNewUserClicked(this.state.newUserValue);
        console.log(this.state.newUserValue);
            this.setState({newUserValue: ""});
        
    }
    /**
     *
     * Implement filter logic on basis of search query.
     */
    getFilteredUserList() {
        return !this.state.searchQuery
                ? this.props.userData
                : this.props.userData.filter(user =>
                    user.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                );
    }
    render() {
        let users = this.getFilteredUserList();
        return (
                <div>
                    <FormGroup>
                        <FormControl
                            type="text"
                            className="hledac"
                            placeholder="Hledání"
                            onInput={this.searchInput.bind(this)}
                            />
                
                        {this.props.showSignInList ? (
                                    <InputGroup>  
                                        <FormControl
                                            type="text"
                                            placeholder="Přidat uživatele."
                                            className="pridatInput"
                                            onKeyPress={event => {
                                                    if (event.key === "Enter") {
                                                        this.newUserClick(event);
                                                                                                  }
                                            }}
                                            />
                                        <InputGroup.Button>
                                            <Button
                                                className="newUserButton"
                                                onClick={this.onNewUserClicked.bind(this)}
                                                >
                                                Přidat uživatele
                                            </Button>
                                        </InputGroup.Button>
                                    </InputGroup>
                                            ) : ""}
                    </FormGroup>
                                                        {users.length ? (
                                                    <ChatList
                                                        className={!this.props.showSignInList ? "chat-list" : "user-list"}
                                                        dataSource={users.map((f, i) => {
                                                                    let date = null;
                                                                    let subtitle = "";
                                                                    if (
                                                                            !this.props.showSignInList &&
                                                                            f.messages &&
                                                                            f.messages.length
                                                                            ) {
                                                                            let lastMessage = f.messages[f.messages.length - 1];
                                                                            date = new Date(lastMessage.timeStamp);
                                                                            subtitle =
                                                                                    (lastMessage.position === "right" ? "Poslední zpráva: " : f.name + ": ") +
                                                                                    lastMessage.text;
                                                        }
                                                        return {
                                                                                    alt: f.name,
                                                                                    title: f.name,
                                                                                    subtitle: subtitle,
                                                                                    date: date,
                                                                                    unread: f.unread,
                                                                            user: f
                                                        };
                                                        })}
                                                
                                                        onClick={
                                                                            !this.props.showSignInList
                                                                                    ? this.props.onChatClicked
                                                                                    : this.props.onUserClicked
                                                        }
                                                        />
                                                                ) : (
                                                                                    <div className="text-center no-users">Žádní přihlášení uživatelé.</div>
                                                                )}
                </div>
                                                    );
                        }
                    }
