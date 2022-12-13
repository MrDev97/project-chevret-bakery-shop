import styles from './SignUpForm.module.scss';
import { useState } from 'react';
import { Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { Alert, Progress } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addRegistrationRequest, getRequest } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dateToArray } from '../../../utils/dateToArray';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dateError, setDateError] = useState(false);
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
    setDateError(!dateOfBirth);
    const dateArr = dateToArray(dateOfBirth);
    const usr = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth: dateArr,
    };

    if (dateOfBirth) {
      setStatus(true);
      dispatch(addRegistrationRequest(usr));
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setDateOfBirth(new Date());
      setDateError(false);
    }
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
      <h1>Register</h1>

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
              You have been Successfully ! Redirecting...
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

      <Form.Group className="mb-4 col-md-3" controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          {...register('firstName', { required: true })}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        {errors.firstName && (
          <small className="d-block form-text text-danger mt-2">
            First Name can't be empty.
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-4 col-md-3" controlId="formLastName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          {...register('lastName', { required: true })}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        {errors.lastName && (
          <small className="d-block form-text text-danger mt-2">
            Last Name can't be empty.
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-4 col-md-3" controlId="formDateOfBirth">
        <Form.Label>Date Of Birth</Form.Label>
        <DatePicker
          wrapperClassName={`form-control ${styles.datepicker}`}
          selected={new Date(dateOfBirth)}
          onChange={(date) => setDateOfBirth(date)}
          placeholder="Enter Date of Birth"
          dateFormat="yyyy-MM-dd"
        />
        {dateError && (
          <small className="d-block form-text text-danger mt-2">
            Date of Birth can't be empty.
          </small>
        )}
      </Form.Group>

      <Button variant="outline" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default SignUpForm;
