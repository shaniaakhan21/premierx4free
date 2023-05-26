import './styles.scss';
import React, {useCallback, useEffect} from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import {useAuth} from "../../../contexts/auth.context";
import {useInputState} from "../../../hooks/useInputState";
import {UpdateProfileRequest, useUpdateProfile} from "../../../services/my";

interface Props {
}



const AgentSettings: React.FC<Props> = () => {
    const { user } = useAuth()

    const [state, onChange, setState] = useInputState<UpdateProfileRequest & { confirm?: string }>({
        password: '',
        newPassword: '',
        confirm: '',
        name: '',
        email: '',
        contactNo: '',
        zip: '',
        profileImage: '',
    })

    const { mutate } = useUpdateProfile()

    const handleSubmit = useCallback(async () => {
        try {
            if (state.newPassword !== '' && state.newPassword !== state.confirm) {
                throw new Error('New password and confirm password does not match')
            }
            const req = { ...state }
            delete req.confirm
            if (req.password === '') delete req.password
            if (req.newPassword === '') delete req.newPassword

            await mutate(req)
            alert('Profile updated successfully')
        } catch (e: any) {
            if (e.response?.data?.message) {
                return alert(e.response.data.message)
            }
            alert(e.message)
        }
    }, [state, mutate, user])

    useEffect(() => {
        if (user) {
            setState(cs => ({
                ...cs,
                name: user?.agentProfile?.name ?? '',
                email: user?.email ?? '',
                contactNo: user?.agentProfile?.contactNo ?? '',
                zip: user?.agentProfile?.location?.zip ?? '',
            }))
        }
    }, [user])

    return (
        <div className='settings-main-box'>
            <span className='textCustom'>Settings</span>
            <div className="box-with-shadow after-it">
                <Row className='row-design'>
                    <Col xs={5} lg={2} className='profile-position' >
                        <Image className="img-in-circle" roundedCircle src={`/api/uploads/profileImage/${user?.agentProfile?.profileImage}`} />
                        <input type='file' style={{ display: 'none' }} id='profileImage' name='profileImage' onChange={onChange} />
                        <div className="edit-icon">
                            <label htmlFor='profileImage'>
                                <img src='assets/svg/Dashboard/pencil-icon.svg' />
                            </label>
                        </div>
                    </Col>

                    <Col lg={10} className='profile-text'>
                        <h3 className="card-title">{user?.agentProfile?.name}</h3>
                        <p className="card-text">{user?.email}</p>
                    </Col>

                </Row>
                <div className="form-box">
                    <Row className="form-row">
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Form.Group controlId="fullName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" value={state.name} name='name' onChange={onChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" value={state.email} name='email' onChange={onChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="form-row">
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Form.Group controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="tel" value={state.contactNo} name='contactNo' onChange={onChange} />
                            </Form.Group>
                        </Col>
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Form.Group controlId="zip">
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control type="text" value={state.zip} name='zip' onChange={onChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="bg-section">
                        <Row className="form-row">
                            <Col lg={6} md={6} xs={12} sm={12}>
                                <Form.Group controlId="currentPassword">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" value={state.password} name='password' onChange={onChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="form-row">
                            <Col lg={6} md={6} xs={12} sm={12}>
                                <Form.Group controlId="newPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" value={state.newPassword} name='newPassword' onChange={onChange} />
                                </Form.Group>
                            </Col>
                            <Col lg={6} md={6} xs={12} sm={12}>
                                <Form.Group controlId="confirmNewPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" value={state.confirm} name='confirm' onChange={onChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <Row className='align-it-end'>
                        <Col lg={2} className="Btn-Custom">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};


export default AgentSettings;
