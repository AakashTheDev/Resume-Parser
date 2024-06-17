import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import pdfToText from 'react-pdftotext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    experience: '',
    role: '',
    web: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const extractText = (event) => {
    const file = event.target.files[0];
    if (file) {
      pdfToText(file)
        .then(text => {
          console.log('Extracted text:', text); // Log the extracted text for debugging
          prefillForm(text);
        })
        .catch(error => console.error("Failed to extract text from pdf", error));
    }
  };

  const prefillForm = (textContent) => {
    // Updated regex to better capture each field individually
    const nameMatch = textContent.match(/Name:\s*([^\n\r,]*)/i);
    const emailMatch = textContent.match(/Email:\s*([^\n\r,]*)/i);
    const phoneMatch = textContent.match(/Phone:\s*([^\n\r,]*)/i);
    const addressMatch = textContent.match(/Address:\s*([^\n\r,]*)/i);
    const educationMatch = textContent.match(/Education:\s*([^\n\r,]*)/i);
    const experienceMatch = textContent.match(/Experience:\s*([^\n\r,]*)/i);
    const roleMatch = textContent.match(/Role:\s*([^\n\r,]*)/i);
    const webMatch = textContent.match(/Website:\s*([^\n\r,]*)/i);


    setFormData({
      name: nameMatch ? nameMatch[1].trim() : '',
      email: emailMatch ? emailMatch[1].trim() : '',
      phone: phoneMatch ? phoneMatch[1].trim() : '',
      address: addressMatch ? addressMatch[1].trim() : '',
      education: educationMatch ? educationMatch[1].trim() : '',
      experience: experienceMatch ? experienceMatch[1].trim() : '',
      role: roleMatch ? roleMatch[1].trim() : '',
      web: webMatch ? webMatch[1].replace(/\s/g, '') : '' // Remove any spaces within the URL
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Resume Form</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formEducation">
              <Form.Label>Education</Form.Label>
              <Form.Control
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formExperience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={formData?.web ? 5 : 6}>
            <Form.Group className="mb-3" controlId="formWeb">
              <Form.Label>Web</Form.Label>
              <Form.Control
                type="text"
                name="web"
                value={formData.web}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          {formData?.web && (
            <Col md={1}>
              <Form.Group className="mb-3" controlId="formWeb">
                <Form.Label>{"------------"}</Form.Label>
                <a href={formData?.web} target="_blank" rel="noopener noreferrer">
                  <Button>
                    Visit
                  </Button>
                </a>
              </Form.Group>
            </Col>
          )}
        </Row>
        <Form.Group className="mb-3" controlId="formResume">
          <Form.Label>Upload Resume (PDF)</Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf"
            onChange={extractText}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default App;

