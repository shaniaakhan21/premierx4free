import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './replaceModal.css'
import MarketingMaterial from "../../../../../models/marketingMaterial.model";
import { useAuth } from "../../../../../contexts/auth.context";
import { updateMarketingMaterial } from "../../../../../services/admin";
import MarketingDocumentPreview from "./MarketingDocumentPreview";
import MarketingMaterialsCategory from "../../../../../models/marketingMaterialsCategory.model";
import { uploadDocument } from "../../../../../services/upload";
import { useSnackbar } from "notistack";

interface ReplaceModalProps {
  onClose: (shouldRemove?: boolean) => void;
  document: MarketingMaterial;
}

function ReplaceModal({ onClose, document }: ReplaceModalProps) {
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useAuth()

  const [state, setState] = useState<Partial<MarketingMaterial>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      await updateMarketingMaterial(user!, state as MarketingMaterial)
      onClose(true)
    } catch (e: any) {
      enqueueSnackbar(e.message ?? 'Error updating marketing material', { variant: 'error' })
    } finally {
      setLoading(false)
      enqueueSnackbar('Marketing material updated successfully', { variant: 'success' })
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

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        enqueueSnackbar('Uploading marketing material...', { variant: 'info' })
        const uploaded = await uploadDocument(user!, file)
        setState(cs => ({ ...cs, document: uploaded?.[0] }))
        enqueueSnackbar('Marketing material uploaded successfully', { variant: 'success' })
      } catch (e) {
        enqueueSnackbar('Failed to upload marketing material', { variant: 'error' })
      }
    }
  }, [user])

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
                <input type='file' onChange={handleFileChange} className='uploadFile_form_input' />
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

const useStyles = makeStyles()(() => ({
  removeModal_footer: {
    // backgroundColor:"teal"
  },
}))

export default ReplaceModal;
