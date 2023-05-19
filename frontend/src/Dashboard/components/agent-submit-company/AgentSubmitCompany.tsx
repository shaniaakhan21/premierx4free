import './styles.css';
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function AgentSubmitCompany(): JSX.Element {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    return (
        <>

            <Form noValidate validated={validated} onSubmit={handleSubmit}  className='company-form'>
                <span className='textCustom'>Submit New Companies </span>
                <div className="box-with-shadow">
                    <Row className='first-phone-row'>
                        <Col lg={6}>
                            <Form.Group controlId="companyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a company name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="phoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a phone number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group controlId="companyAddress">
                                <Form.Label>Company Address</Form.Label>
                                <Form.Control required type="text" className='long-text-area'/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a company address.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row  className='first-phone-row'>
                        <Col>
                            <Form.Group controlId="contactPersonName">
                                <Form.Label>Contact Person Name</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a contact person name.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="contactPersonPhone">
                                <Form.Label>Contact Person Phone</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a contact person phone number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row  className='first-phone-row'>
                        <Col>
                            <Form.Group controlId="currentNumberOfEmployees">
                                <Form.Label>Current Number of Employees</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the current number of employees.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="fullTime">
                                <Form.Label>Full Time</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the number of full-time employees.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="partTime">
                                <Form.Label>Part Time</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the number of part-time employees.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='first-phone-row'>
                        <Col lg={6}>
                            <Form.Group controlId="insuranceInfo">
                                <Form.Label>Insurance Info</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter insurance info.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group controlId="insuranceInfo">
                                <Form.Label>Commission Rate</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter Commission Rate.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="flex-box-it first-phone-row">
                        <Col >
                            <Form.Group controlId="fullInsured" className='another-flex'>
                                <Form.Label>Full Insured</Form.Label>
                                <div key="inline-radio" >
                                    <Form.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        id="fullInsuredYes"
                                        name="fullInsured"
                                    />
                                    <Form.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        id="fullInsuredNo"
                                        name="fullInsured"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group controlId="selfInsured" className='another-flex'>
                                <Form.Label>Self Insured</Form.Label>
                                <div key="inline-radio">
                                    <Form.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        id="selfInsuredYes"
                                        name="selfInsured"
                                    />
                                    <Form.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        id="selfInsuredNo"
                                        name="selfInsured"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group controlId="noInsured" className='another-flex'>
                                <Form.Label>No Insured</Form.Label>
                                <div key="inline-radio">
                                    <Form.Check
                                        inline
                                        label="Yes"
                                        type="radio"
                                        id="noInsuredYes"
                                        name="noInsured"
                                    />
                                    <Form.Check
                                        inline
                                        label="No"
                                        type="radio"
                                        id="noInsuredNo"
                                        name="noInsured"
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group controlId="typeOfBusiness">
                                <Form.Label>Type of Business</Form.Label>
                                <Form.Control required type="text" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter the type of business.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='align-it-end'> 
                        <Col lg={2} sm={1} className="Btn-Custom">
                            <Button variant="secondary" type="button" >
                                Cancel
                            </Button>
                        </Col>
                        <Col lg={2} sm={1} className="Btn-Custom">
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>

    );
}

export default AgentSubmitCompany;