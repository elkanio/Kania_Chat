import React, { Component } from "react";
import { Navbar } from 'react-chat-elements';

export default class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar type="dark"
    center={
        <div class="textMess">MESSENGER</div>
    }
    right={
        <span className="signed-in-user">{(this.props.signedInUser || {}).name}</span>
    }/>
    );
  }
}
