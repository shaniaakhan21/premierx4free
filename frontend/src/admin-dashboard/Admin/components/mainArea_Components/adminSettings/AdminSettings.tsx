import './adminSettingStyles.css';
import React, { useCallback, useEffect } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { useAuth } from "../../../../../contexts/auth.context";
import { useInputState } from "../../../../../hooks/useInputState";
import { UpdateProfileRequest, useUpdateProfile } from "../../../../../services/my";
import { uploadDocument } from "../../../../../services/upload";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { Avatar } from "@mui/material";

interface Props {
  imageUrl: string;
  fullName: string;
  email: string;
  phone: string;
  zip: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  onCancel: () => void;
  onSave: () => void;
}


function AdminSettings() {
  const { enqueueSnackbar } = useSnackbar()
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
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (e: any) {
      enqueueSnackbar(e.response?.data?.message ?? e.message, { variant: 'error' })
    }
  }, [state, mutate, user, enqueueSnackbar])

  useEffect(() => {
    if (user) {
      setState(cs => ({
        ...cs,
        name: user?.agentProfile?.name ?? '',
        email: user?.email ?? '',
        contactNo: user?.agentProfile?.contactNo ?? '',
        zip: user?.agentProfile?.location?.zip ?? '',
        profileImage: user?.agentProfile?.profileImage ?? '',
      }))
    }
  }, [user])

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        enqueueSnackbar('Uploading profile image...', { variant: 'info' })
        const uploaded = await uploadDocument(user!, file)
        setState(cs => ({ ...cs, profileImage: uploaded?.[0] }))
        enqueueSnackbar('Profile image uploaded successfully', { variant: 'success' })
      } catch (e) {
        enqueueSnackbar('Failed to upload profile image', { variant: 'error' })
      }
    }
  }, [user])

  return (
    <div className='settings-container'>
      <span className='textCustom'>Settings</span>
      <div className="mainBox">
        <Row className='row-design'>
          <Col xs={3} lg={2} className='profile-position'>
            <Avatar className="img-in-circle"
                   src={state.profileImage ?? ''} alt={user?.agentProfile?.name ?? ''} />
            <input type='file' style={{ display: 'none' }} id='profileImage' name='profileImage' onChange={handleFileChange} />
            <div className="edit-icon">
              <label htmlFor='profileImage'>
                <img src='/assets/svg/Dashboard/pencil-icon.svg' />
              </label>
            </div>
          </Col>

          <Col lg={10} className='card-container'>
            <h3 className="card-title">{user?.agentProfile?.name}</h3>
            <p className="card-text">{user?.email}</p>
          </Col>

        </Row>
        <div className="form-box">
          <div className='form-box-firstPart'>
            <div className='form-box-field'>
              <Form.Group controlId="fullName">
                <Form.Label className='form-box-lable1'>Full Name</Form.Label>
                <Form.Control type="text" defaultValue='Heather Stephens' className='form-box-inputArea' name='name'
                              value={state.name} onChange={onChange} />
              </Form.Group>
            </div>
            <div className='form-box-field'>
              <Form.Group controlId="email">
                <Form.Label className='form-box-lable1'>Email Address</Form.Label>
                <Form.Control type="email" defaultValue='heatherstephens@gmail.com' className='form-box-inputArea'
                              name='email' value={state.email} onChange={onChange} />
              </Form.Group>
            </div>


            <div className='form-box-field'>
              <Form.Group controlId="phone">
                <Form.Label className='form-box-lable1'>Phone Number</Form.Label>
                <Form.Control type="tel" defaultValue='9987665945' className='form-box-inputArea' name='contactNo'
                              value={state.contactNo} onChange={onChange} />
              </Form.Group>
            </div>
            <div className='form-box-field'>
              <Form.Group controlId="zip">
                <Form.Label className='form-box-lable1'>Zip Code</Form.Label>
                <Form.Control type="text" defaultValue='56690' className='form-box-inputArea' name='zip'
                              value={state.zip} onChange={onChange} />
              </Form.Group>
            </div>
          </div>


          <div className='form-box-firstPart'>
            <div className='horizontalLine'>
              <hr />
            </div>
            <div className='form-box-field-top'>
              <Form.Group controlId="currentPassword">
                <Form.Label className='form-box-lable2'>Current Password</Form.Label>
                <Form.Control type="password" defaultValue='abc@123' className='form-box-inputArea' name='password'
                              value={state.password} onChange={onChange} />
              </Form.Group>
            </div>


            <div className='form-box-field'>
              <Form.Group controlId="newPassword">
                <Form.Label className='form-box-lable2'>New Password</Form.Label>
                <Form.Control type="password" defaultValue='abcd@123' className='form-box-inputArea' name='newPassword'
                              value={state.newPassword} onChange={onChange} />
              </Form.Group>
            </div>
            <div className='form-box-field'>
              <Form.Group controlId="confirmNewPassword">
                <Form.Label className='form-box-lable2'>Confirm Password</Form.Label>
                <Form.Control type="password" defaultValue='abcd@123' className='form-box-inputArea' name='confirm'
                              value={state.confirm} onChange={onChange} />
              </Form.Group>
            </div>
          </div>
          <div className='form-box-buttonContainer'>
            <div>
              <button className='form-box-saveButton' onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AdminSettings;
