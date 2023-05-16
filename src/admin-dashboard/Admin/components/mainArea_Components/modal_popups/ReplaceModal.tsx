/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'react-bootstrap/Modal';
import './replaceModal.css';

interface modalvars {
  replaceModalOpen: any
  setReplaceModalOpen: any
}

function ReplaceModal(props: modalvars): JSX.Element {
  const { replaceModalOpen, setReplaceModalOpen } = props;
  const handleClose = () => setReplaceModalOpen(false);

  return (
    <>
      <Modal show={replaceModalOpen} onHide={handleClose} animation={false} className='removeModal'>
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
      </Modal>
    </>
  );
}

export default ReplaceModal;