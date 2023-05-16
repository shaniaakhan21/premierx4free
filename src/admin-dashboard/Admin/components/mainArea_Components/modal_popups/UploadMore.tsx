/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'react-bootstrap/Modal';
import './uploadMore.css';

interface modalvars {
  uploadMoreModalOpen: any
  setUploadMoreModalOpen: any
}

function UploadMoreModal(props: modalvars): JSX.Element {
  const { uploadMoreModalOpen, setUploadMoreModalOpen } = props;
  const handleClose = () => setUploadMoreModalOpen(false);

  return (
    <>
      <Modal show={uploadMoreModalOpen} onHide={handleClose} animation={false} className='removeModal'>
        <Modal.Body>
          <div className='modal-heading'>
            <p>Upload More Documents</p>
          </div>
          <div className='uploadMore_content'>
            <div style={{ marginTop: '28px' }}>
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
      </Modal>
    </>
  );
}

export default UploadMoreModal;