import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './uploadMore.css'
import * as React from 'react';

interface modalvars {
    uploadMoreModalOpen:any
    setUploadMoreModalOpen:any
}

function UploadMoreModal(props:modalvars):JSX.Element {
  const [show, setShow] = useState(false);
  const {classes} = useStyles()

  const {uploadMoreModalOpen,setUploadMoreModalOpen} = props

  const handleClose = () => setUploadMoreModalOpen(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={uploadMoreModalOpen} onHide={handleClose} animation={false} className='removeModal'>
        {/* <Modal.Header closeButton>
          <Modal.Title>Replace The Document</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className='modal-heading'>
            <p>Upload More Documents</p>
          </div>

          <div className='uploadMore_content'>
                    <div style={{marginTop:"28px"}}>
                    <label className='formLabel'> Upload Documents</label>
                      <div className='uploadDocument_form_container'>
                          <input className='uploadDocument_form_input' />
                          <div className='uploadDocument_form_button'>Upload File</div>
                      </div>
                    </div>

                      <div className='head_form_container'>
                          <div className='head_form_container'>
                              <label className='formLabel'>Head</label>
                              <input className='head_form_input' />
                          </div>
                      </div>

                      <div className='description_form_container'>
                          <div className='description_form_container'>
                            <label className='formLabel'>Description</label>
                              <textarea className='description_form_input' />
                          </div>
                      </div>
            
          </div>

          <div className='uploadMore_button_container'>
            <div>
              <button className='uploadMore_cancel_button'>Cancel</button>
            </div>

            <div>
              <button className='uploadMore_save_button'>Save</button>
            </div>

          </div>

        </Modal.Body>
        {/* <Modal.Footer className='removeModal_footer'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

const useStyles = makeStyles() (() => ({
  removeModal_footer:{
    // backgroundColor:"teal"
  },
}))

export default UploadMoreModal;