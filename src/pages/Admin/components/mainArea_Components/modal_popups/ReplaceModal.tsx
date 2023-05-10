import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './replaceModal.css'

interface modalvars {
    replaceModalOpen:any
    setReplaceModalOpen:any
}

function ReplaceModal(props:modalvars):JSX.Element {
  const [show, setShow] = useState(false);
  const {classes} = useStyles()

  const {replaceModalOpen,setReplaceModalOpen} = props

  const handleClose = () => setReplaceModalOpen(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={replaceModalOpen} onHide={handleClose} animation={false} className='removeModal'>
        {/* <Modal.Header closeButton>
          <Modal.Title>Replace The Document</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className='modal-heading'>
            <p>Replace The Document</p>
          </div>

          <div className='replaceModal_content'>
            <div>
                <p>Current Document</p>
                <img src='/assets/svg/Dashboard/pyramid.svg' className='currentDocumentIcon' />
            </div>

            <div className='upload_newDocument_container'>
                <p>Upload New Document</p>
                <div className='uploadFile_form_container'>
                    <input className='uploadFile_form_input' />
                    <div className='uploadFile_form_button'>Upload File</div>
                </div>
            </div>
            
          </div>

          <div className='Replacemodal_button_container'>
            <div>
              <button className='replace_cancel_button'>Cancel</button>
            </div>

            <div>
              <button className='replace_save_button'>Save</button>
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

export default ReplaceModal;