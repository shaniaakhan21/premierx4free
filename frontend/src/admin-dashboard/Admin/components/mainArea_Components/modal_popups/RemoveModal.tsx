import {useCallback, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './removeModal.css'
import * as React from 'react';
import MarketingMaterial from "../../../../../models/marketingMaterial.model";
import {removeMarketingMaterial} from "../../../../../services/admin";
import {useAuth} from "../../../../../contexts/auth.context";

interface RemoveModalProps {
  onClose: (shouldReload?: boolean) => void
  document: MarketingMaterial
}

function RemoveModal({ onClose, document }: RemoveModalProps):JSX.Element {
  const { user } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      await removeMarketingMaterial(user!, document?._id)
      onClose(true)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }, [user, document, onClose])

  return (
    <>
      <Modal show onHide={() => onClose()} animation={false} className='removeModal'>
        <Modal.Body>
          <div>
            <img src='/assets/svg/Dashboard/modal_icon_trash.svg' className='modalTrashIcon' />
          </div>

          <div className='modal_text_container'>
            <p className='modal_text'>Do you want to remove {document?.head}?</p>
          </div>

          <div className='modal_button_container'>
            <div>
              <button disabled={loading} className='no_button' onClick={() => onClose()}>No</button>
            </div>
            <div>
              <button disabled={loading} className='yes_button' onClick={onSubmit}>Yes</button>
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

export default RemoveModal;
