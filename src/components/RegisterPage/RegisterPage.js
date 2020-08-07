import React, { Component } from 'react';
import {connect} from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div>
        <RegisterForm />

        <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.history.push('/login')}}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPage);

