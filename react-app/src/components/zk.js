import React, { Component } from "react";
import Avatar from 'react-avatar';

export default class zk extends Component {
  state = {};
  render() {
    return (
            <Avatar size="50" round='{true}' 
    color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name="kane" />
    );
  }
}
