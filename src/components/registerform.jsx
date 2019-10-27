import React from "react";
import Joi from "joi-browser";

import Input from "./common/input";
import auth from "../services/authService";
import { registerUser } from "../services/userService";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  doSubmit = async e => {
    try {
      const response = await registerUser(this.state.data);
      alert("User created sucessfully with id:" + response.data._id);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            onChange={this.handleChange}
            value={data.username}
            label="Username"
            error={errors.username}
          />
          <Input
            name="password"
            onChange={this.handleChange}
            value={data.password}
            label="Password"
            error={errors.password}
          />
          <Input
            name="name"
            onChange={this.handleChange}
            value={data.name}
            label="Name"
            error={errors.name}
          />
          <button disabled={this.validate()} className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
