import styles from './UserAddressForm.module.scss';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const UserAddressForm = ({ action, actionText, ...props }) => {
  const [street, setStreet] = useState(props.street || '');
  const [houseNo, setHouseNo] = useState(props.houseNo || '');
  const [apartmentNo, setApartmentNo] = useState(props.apartmentNo || '');
  const [city, setCity] = useState(props.city || '');
  const [country, setCountry] = useState(props.country || '');

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    const formData = {
      street: street,
      houseNo: houseNo,
      apartmentNo: apartmentNo === '' ? null : apartmentNo,
      city: city,
      country: country,
    };
    action(formData);
  };

  return (
    <Form
      onSubmit={validate(handleSubmit)}
      className={`d-flex flex-column align-items-center my-4 ${styles.form}`}
    >
      <Form.Group className="mb-4 col-md-3" controlId="formStreet">
        <Form.Label>Street</Form.Label>
        <Form.Control
          {...register('street', { required: true })}
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
        />
        {errors.street && (
          <small className="d-block form-text text-danger mt-2">
            Street can't be empty.
          </small>
        )}
      </Form.Group>

      <div className="mb-4 row col-md-3 justify-content-start">
        <Form.Label className="p-0">House / Apartment No.</Form.Label>
        <Form.Group className="p-0 col-md-3" controlId="formHouseNo">
          <Form.Control
            {...register('houseNo', { required: true, min: 1 })}
            type="number"
            value={houseNo}
            onChange={(e) => setHouseNo(parseInt(e.target.value))}
            placeholder="No."
          />
        </Form.Group>

        <Form.Group className="p-0 col-md-3" controlId="formApartmentNo">
          <Form.Control
            {...register('apartmentNo', { min: 1 })}
            type="number"
            value={apartmentNo}
            onChange={(e) => setApartmentNo(parseInt(e.target.value))}
            placeholder="No."
          />
        </Form.Group>
        {errors.houseNo && (
          <small className="d-block p-0 form-text text-danger mt-2">
            House Number can't be empty.
          </small>
        )}
        {errors.apartmentNo && (
          <small className="d-block p-0 form-text text-danger mt-2">
            Apartment Number can't be empty.
          </small>
        )}
      </div>

      <Form.Group className="mb-4 col-md-3" controlId="formCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          {...register('city', { required: true })}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        {errors.city && (
          <small className="d-block form-text text-danger mt-2">
            City can't be empty.
          </small>
        )}
      </Form.Group>

      <Form.Group className="mb-4 col-md-3" controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <Form.Control
          {...register('country', { required: true })}
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
        />
        {errors.country && (
          <small className="d-block form-text text-danger mt-2">
            Country can't be empty.
          </small>
        )}
      </Form.Group>

      <Button variant="outline" type="submit">
        {actionText}
      </Button>
    </Form>
  );
};

export default UserAddressForm;

UserAddressForm.propTypes = {
  street: PropTypes.string,
  houseNo: PropTypes.number,
  apartmentNo: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
};
