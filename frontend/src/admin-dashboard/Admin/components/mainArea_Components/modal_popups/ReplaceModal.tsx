import {useCallback, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './replaceModal.css'
import * as React from 'react';
import MarketingMaterial from "../../../../../models/marketingMaterial.model";
import {useAuth} from "../../../../../contexts/auth.context";
import {removeMarketingMaterial, updateMarketingMaterial} from "../../../../../services/admin";
import MarketingDocumentPreview from "./MarketingDocumentPreview";
import MarketingMaterialsCategory from "../../../../../models/marketingMaterialsCategory.model";

interface ReplaceModalProps {
  onClose: (shouldRemove?: boolean) => void;
  document: MarketingMaterial;
}

function ReplaceModal({ onClose, document }: ReplaceModalProps):JSX.Element {
  const { user } = useAuth()

  const [state, setState] = useState<Partial<MarketingMaterial>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      await updateMarketingMaterial(user!, state as MarketingMaterial)
      onClose(true)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }, [user, document, onClose, state])

  useEffect(() => {
    setState({
      _id: document._id,
      head: document.head,
      document: document.document,
      category: (document?.category as MarketingMaterialsCategory)?._id ?? document.category
    })
  }, [document])

  return (
    <>
      <Modal show onHide={() => onClose()} animation={false} className='removeModal'>
        <Modal.Body>
          <div className='modal-heading'>
            <p>Replace The Document</p>
          </div>

          <div className='replaceModal_content'>
            <div>
                <p>Current Document</p>
                <MarketingDocumentPreview fileName={document?.document} alt={document?.head} />
            </div>

            <div className='upload_newDocument_container'>
                <p>Upload New Document</p>
                <div className='uploadFile_form_container'>
                    <input type='file' onChange={e => {
                      if (e.target.files?.[0]) setState(cs => ({ ...cs, document: e.target.files?.[0] as any }))
                    }} className='uploadFile_form_input' />
                    <div className='uploadFile_form_button'>Upload File</div>
                </div>
            </div>
          </div>

          <div className='Replacemodal_button_container'>
            <div>
              <button disabled={loading} className='replace_cancel_button' onClick={() => onClose()}>Cancel</button>
            </div>

            <div>
              <button disabled={loading} className='replace_save_button' onClick={onSubmit}>Save</button>
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
