/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'react-bootstrap/Modal';
import './addCategory.css';

interface modalvars {
  addCategoryModalOpen: any
  setAddCategoryModalOpen: any
}

function AddCategoryModal(props: modalvars): JSX.Element {
  const { addCategoryModalOpen, setAddCategoryModalOpen } = props;
  const handleClose = () => setAddCategoryModalOpen(false);

  return (
    <>
      <Modal show={addCategoryModalOpen} onHide={handleClose} animation={false} className='removeModal'>
        <Modal.Body>
          <div className='modal-heading'>
            <p>Add Category</p>
          </div>

          <div className='addCategory_content'>
            <div className='categoryName_form_container'>
              <div className='categoryName_form_container'>
                <label className='formLabel'>Category Name</label>
                <input className='categoryName_form_input' />
              </div>
            </div>
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
      </Modal>
    </>
  );
}

export default AddCategoryModal;