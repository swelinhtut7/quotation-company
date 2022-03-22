import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Form, Button  } from "react-bootstrap";
import '../styles/login.css'

export function Login({email,password,onLogin}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onLogin)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="label1">Email address</Form.Label>
        <Form.Control
          style={{width: "67%"}}
          type="email"
          placeholder="Enter email"
          className="box"
          defaultValue={email}
          {...register("email", { required: true })}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label className="label2">Password</Form.Label>
        <Form.Control
          style={{width: "67%"}}
          type="password"
          className="box"
          placeholder="Enter password"
          defaultValue={password}
          {...register("password", { required: true, min: 8 })}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your password with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Button type="submit" className="login-btn">Login</Button>
    </Form>
  );
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onLogin: PropTypes.func
};

Login.defaultProps = {
  email: null,
  password: false,
  onLogin: undefined,
};
