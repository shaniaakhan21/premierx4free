import {Dispatch, SetStateAction, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './addCategory.css'
import * as React from 'react';

interface AddCategoryModalProps {
  onClose: () => void;
}

function AddCategoryModal({ onClose }: AddCategoryModalProps):JSX.Element {


  return (
    <>
      <Modal show={true} onHide={onClose} animation={false} className='removeModal'>
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
              <button className='addCategory_cancel_button' onClick={onClose}>Cancel</button>
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

const useStyles = makeStyles() (() => ({
  removeModal_footer:{
    // backgroundColor:"teal"
  },
}))

export default AddCategoryModal;
