import './styles.css';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { submitCompany } from '../../../services/submitCompany';
import { Backdrop, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSnackbar } from "notistack";

function AgentSubmitCompany(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState<string | undefined>();

  interface FormData {
    name?: string,
    phone?: string,
    address?: string,
    contactPersonName?: string,
    contactPersonPhone?: string,
    employeeCount?: number,
    fullTime?: number,
    partTime?: number,
    insuranceInfo?: string,
    commissionRate?: number,
    fullInsured?: boolean,
    selfInsured?: boolean,
    notInsured?: boolean,
    typeOfBusiness?: string
  }

  const [formData, setFormData] = useState<FormData>({
    fullInsured: true
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    setLoading("Submitting Company Data")
    try {
      const user = JSON.parse(localStorage.getItem('user') ?? "")
      if (!formData.fullTime || !formData.partTime || !formData.employeeCount || (formData.fullTime! + formData.partTime!) !== formData.employeeCount!) {
        throw new Error('Employee Count does not match Full Time and Part Time')
      }
      await submitCompany(formData, user?.jwtToken)
    } catch (e: any) {
      enqueueSnackbar(e.response.data.message ?? e.message, { variant: 'error' });
    } finally {
      setLoading(undefined)
      enqueueSnackbar("Company Submitted Successfully", { variant: 'success' });
    }
  }


  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1, flexDirection: 'column' }}
        open={!!loading}
      >
        {loading?.endsWith('successfully') ? <CheckCircleIcon sx={{ fontSize: 50, color: 'white' }} /> :
          <CircularProgress color="inherit" />}
        {loading}
      </Backdrop>
      <Form noValidate={false} validated={validated} onSubmit={handleSubmit} className='company-form'>
        <span className='textCustom'>Submit New Companies </span>
        <div className="box-with-shadow">
          <Row className='first-phone-row'>
            <Col lg={6}>
              <Form.Group controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control required type="text" onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter a company name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control required type="text" onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter a phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Form.Group controlId="companyAddress">
                <Form.Label>Company Address</Form.Label>
                <Form.Control required as="textarea" rows={3} onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter a company address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='first-phone-row'>
            <Col>
              <Form.Group controlId="contactPersonName">
                <Form.Label>Contact Person Name</Form.Label>
                <Form.Control required type="text" onChange={(e) => {
                  setFormData({ ...formData, contactPersonName: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter a contact person name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="contactPersonPhone">
                <Form.Label>Contact Person Phone</Form.Label>
                <Form.Control required type="text" onChange={(e) => {
                  setFormData({ ...formData, contactPersonPhone: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter a contact person phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='first-phone-row'>
            <Col>
              <Form.Group controlId="currentNumberOfEmployees">
                <Form.Label>Current Number of Employees</Form.Label>
                <Form.Control required type="number" onChange={(e) => {
                  setFormData({ ...formData, employeeCount: parseInt(e.target.value, 10) })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter the current number of employees.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fullTime">
                <Form.Label>Full Time</Form.Label>
                <Form.Control required type="number" onChange={(e) => {
                  setFormData({ ...formData, fullTime: parseInt(e.target.value, 10) })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter the number of full-time employees.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="partTime">
                <Form.Label>Part Time</Form.Label>
                <Form.Control required type="number" onChange={(e) => {
                  setFormData({ ...formData, partTime: parseInt(e.target.value, 10) })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter the number of part-time employees.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='first-phone-row'>
            <Col lg={12}>
              <Form.Group controlId="insuranceInfo">
                <Form.Label>Insurance Info</Form.Label>
                <Form.Control required type="text" onChange={(e) => {
                  setFormData({ ...formData, insuranceInfo: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter insurance info.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="flex-box-it first-phone-row">
            <Col>
              <Form.Group controlId="fullInsured" className='another-flex'>
                <Form.Label>Insurance Type</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => {
                  setFormData(cs => {
                    const fullInsured = e.target.value === 'full'
                    const selfInsured = e.target.value === 'self'
                    const notInsured = e.target.value === 'not'
                    return ({ ...cs, fullInsured, selfInsured, notInsured })
                  })
                }}>
                  <option value="full">Fully Insured</option>
                  <option value="self">Self Insured</option>
                  <option value="not">Not Insured</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="typeOfBusiness">
                <Form.Label>Type of Business</Form.Label>
                <Form.Control required type="text" onChange={(e) => {
                  setFormData({ ...formData, typeOfBusiness: e.target.value })
                }} />
                <Form.Control.Feedback type="invalid">
                  Please enter the type of business.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='align-it-end'>
            <Col lg={2} sm={1} className="Btn-Custom">
              <Button variant="secondary" type="button">
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
