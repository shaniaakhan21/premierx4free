import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './removeModal.css'
import * as React from 'react';

interface modalvars {
    removeModalOpen:any
    setRemoveModalOpen:any
}

function RemoveModal(props:modalvars):JSX.Element {
  const [show, setShow] = useState(false);
  const {classes} = useStyles()

  const {removeModalOpen,setRemoveModalOpen} = props

  const handleClose = () => setRemoveModalOpen(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={removeModalOpen} onHide={handleClose} animation={false} className='removeModal'>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div>
            <img src='/assets/svg/Dashboard/modal_icon_trash.svg' className='modalTrashIcon' />
          </div>

          <div className='modal_text_container'>
            <p className='modal_text'>Do you want to remove this document?</p>
          </div>

          <div className='modal_button_container'>
            <div>
              <button className='no_button'>No</button>
            </div>

            <div>
              <button className='yes_button'>Yes</button>
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

export default RemoveModal;