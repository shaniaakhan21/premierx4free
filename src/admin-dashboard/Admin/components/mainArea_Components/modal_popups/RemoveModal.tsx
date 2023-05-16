/* eslint-disable @typescript-eslint/no-explicit-any */
import Modal from 'react-bootstrap/Modal';
import './removeModal.css';

interface modalvars {
    removeModalOpen:any
    setRemoveModalOpen:any
}

function RemoveModal(props:modalvars):JSX.Element {
  const {removeModalOpen,setRemoveModalOpen} = props;
  const handleClose = () => setRemoveModalOpen(false);

  return (
    <>
      <Modal show={removeModalOpen} onHide={handleClose} animation={false} className='removeModal'>
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
      </Modal>
    </>
  );
}

export default RemoveModal;