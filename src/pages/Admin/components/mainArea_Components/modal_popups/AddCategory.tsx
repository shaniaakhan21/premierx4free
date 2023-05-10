import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './addCategory.css'

interface modalvars {
    addCategoryModalOpen:any
    setAddCategoryModalOpen:any
}

function AddCategoryModal(props:modalvars):JSX.Element {
  const [show, setShow] = useState(false);
  const {classes} = useStyles()

  const {addCategoryModalOpen,setAddCategoryModalOpen} = props

  const handleClose = () => setAddCategoryModalOpen(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={addCategoryModalOpen} onHide={handleClose} animation={false} className='removeModal'>
        {/* <Modal.Header closeButton>
          <Modal.Title>Replace The Document</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className='modal-heading'>
            <p>Add Category</p>
          </div>

          <div className='addCategory_content'>
                    {/* <div style={{marginTop:"28px"}}>
                    <label className='formLabel'> Upload Documents</label>
                      <div className='uploadDocument_form_container'>
                          <input className='uploadDocument_form_input' />
                          <div className='uploadDocument_form_button'>Upload File</div>
                      </div>
                    </div> */}

                      <div className='categoryName_form_container'>
                          <div className='categoryName_form_container'>
                              <label className='formLabel'>Category Name</label>
                              <input className='categoryName_form_input' />
                          </div>
                      </div>

                      {/* <div className='description_form_container'>
                          <div className='description_form_container'>
                            <label className='formLabel'>Description</label>
                              <textarea className='description_form_input' />
                          </div>
                      </div> */}
            
          </div>

          <div className='addCategory_button_container'>
            <div>
              <button className='addCategory_cancel_button'>Cancel</button>
            </div>

            <div>
              <button className='addCategory_save_button'>Save</button>
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

export default AddCategoryModal;