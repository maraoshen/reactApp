import React, { useRef, useState } from 'react';
// import Image from 'react-bootstrap/Image';
// import Button from 'react-bootstrap/Button';
import FormPreview from './FormPreview';
import { Container, Row, Col, Form, Image, Button, Card} from 'react-bootstrap';

function App() {
  const [userData, setUserData] = useState({})
  const [isValidData, setIsValidData] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [errors, setErrors] = useState([])
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const mobilePhoneRef = useRef();
  const roleRef = useRef();
  const imageRef = useRef();

  function validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  function inputChangedHandler(e) {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const mobilePhone = mobilePhoneRef.current.value;
    const role = roleRef.current.value;
    let errors = {};
    let formIsValid = true;

    if(!firstName){
      formIsValid = false;
      errors["firstName"] = "Cannot be empty";
    }

    if(!lastName){
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
    }

    if(!email){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    } else if(!validateEmail(email)) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
    }

    if(!mobilePhone){
      formIsValid = false;
      errors["mobilePhone"] = "Cannot be empty";
    }

    setIsValidData(formIsValid);
    setUserData(prevUserData => {
      prevUserData["firstName"] = firstName;
      prevUserData["lastName"] = lastName;
      prevUserData["email"] = email;
      prevUserData["mobilePhone"] = mobilePhone;
      prevUserData["role"] = role
      return prevUserData
    });
    setErrors(errors);
  }

  function imageChangedHandler(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result)
    }

   reader.readAsDataURL(file)
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={4}>
          <Form>
            <Form.Group>
              <Form.Row>
                <Col md={{ span: 8, offset: 2 }} xs={{ span: 4, offset: 4 }}>
                <Image alt='' className='img-thumbnail' src={imagePreviewUrl} hidden={!imagePreviewUrl} thumbnail/>
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.File type="file" name="image" accept="image/*" onChange={imageChangedHandler} ref={imageRef} />
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Control placeholder="First Name" ref={firstNameRef} type="text" onChange={inputChangedHandler} />
                <span style={{color: "red"}}>{errors["firstName"]}</span>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Control placeholder="Last Name" ref={lastNameRef} type="text" onChange={inputChangedHandler} />
                <span style={{color: "red"}}>{errors["lastName"]}</span>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Control placeholder="Email" ref={emailRef} type="email" onChange={inputChangedHandler} />
                <span style={{color: "red"}}>{errors["email"]}</span>
              </Form.Row>
              <br />
              <Form.Row>
                <Form.Control placeholder="Mobile Phone" ref={mobilePhoneRef} type="text" onChange={inputChangedHandler} />
                <span style={{color: "red"}}>{errors["mobilePhone"]}</span>
              </Form.Row>
              <br />
              <Form.Group as={Row} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Label column xs={2} sm={2}>Role:</Form.Label>
                <Col xs={4} sm={6}>
                  <Form.Control as="select" ref={roleRef} onChange={inputChangedHandler} >
                    <option value="JMO">JMO</option>
                    <option value="PGY1">PGY1</option>
                    <option value="PGY2">PGY2</option>
                    <option value="Surge">Surge</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Regis">Regis</option>
                  </Form.Control>
                </Col>
              </Form.Group>
              <br />
              <Form.Row>
                <Button disabled={!isValidData && !imagePreviewUrl} block>Save</Button>
              </Form.Row>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={8}>
          <Card body>
            <FormPreview userData={ userData } imagePreviewUrl={ imagePreviewUrl } />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App;
