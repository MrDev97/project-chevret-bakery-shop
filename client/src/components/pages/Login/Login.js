import styles from './Login.module.scss';
import { useState } from 'react';
import { Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { Alert, Progress } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addLoginRequest, getRequest } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);

  const request = useSelector(getRequest);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    const usr = {
      email,
      password,
    };
    setStatus(true);
    dispatch(addLoginRequest(usr));
    setEmail('');
    setPassword('');
  };

  if (request.success && status) {
    setTimeout(() => {
      navigate('/');
      window.location.reload();
      setStatus(false);
    }, 3000);
  }

  return (
    <Form
      onSubmit={validate(handleSubmit)}
      className={`d-flex flex-column align-items-center my-4 ${styles.form}`}
    >
      <h1>Login</h1>

      {request && request.pending && (
        <Progress animated color="success" value={50} />
      )}
      {request && request.error && status && (
        <Alert color="danger">{request.error}</Alert>
      )}
      {request && request.success && status && (
        <Row className="mb-3">
          <Col className="col-10 align-self-center">
            <Alert className="m-0" color="success">
              You have been Successfully Logged in! Redirecting...
            </Alert>
          </Col>
          <Col className="col-2 align-self-center">
            <Spinner animation="border" variant="success" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      )}

      <Form.Group className="mb-4 col-md-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          {...register('email', { required: true })}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && (
          <small className="d-block form-text text-danger mt-2">
            Email can't be empty.
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-4 col-md-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register('password', { required: true })}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && (
          <small className="d-block form-text text-danger mt-2">
            Password can't be empty.
          </small>
        )}
      </Form.Group>

      <Button variant="outline" type="submit">
        Login
      </Button>

      <h1 className="mb-4 mt-5">New To our Shop?</h1>
      <Link to={`/auth/register`} className={styles.link}>
        <Button variant="outline" type="submit">
          Register Now
        </Button>
      </Link>
    </Form>
  );
};

export default Login;
