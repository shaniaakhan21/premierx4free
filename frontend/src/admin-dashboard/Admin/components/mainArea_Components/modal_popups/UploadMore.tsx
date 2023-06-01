import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { makeStyles } from '../../../../../utils/makeStyles'
import './uploadMore.css'
import MarketingMaterial from "../../../../../models/marketingMaterial.model";
import MarketingMaterialsCategory from "../../../../../models/marketingMaterialsCategory.model";
import { useAuth } from "../../../../../contexts/auth.context";
import { createMarketingMaterial } from "../../../../../services/admin";
import { useInputState } from "../../../../../hooks/useInputState";

interface UploadMoreModalProps {
  onClose: (shouldRemove?: boolean) => void
  category: MarketingMaterialsCategory
}

function UploadMoreModal({ category, onClose }: UploadMoreModalProps): JSX.Element {
  const { user } = useAuth()

  const [state, onChange, setState] = useInputState<Partial<Pick<MarketingMaterial, 'head' | 'description' | 'document' | 'category'>>>({})
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      await createMarketingMaterial(user!, state as MarketingMaterial)
      onClose(true)
    } catch (e: any) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }, [user, category, onClose, state])

  useEffect(() => {
    setState({
      category: category._id
    })
  }, [category])

  return (
    <>
      <Modal show onHide={() => onClose()} animation={false} className='removeModal'>
        <Modal.Body>
          <div className='modal-heading'>
            <p>Upload More Documents</p>
          </div>

          <code>{JSON.stringify(state)}</code>

          <div className='uploadMore_content'>
            <div style={{ marginTop: "28px" }}>
              <label className='formLabel'>Upload Documents</label>
              <div className='uploadDocument_form_container'>
                <input name='document' type='file' onChange={onChange} className='uploadDocument_form_input' />
                <div className='uploadDocument_form_button'>Upload File</div>
              </div>
            </div>

            <div className='head_form_container'>
              <div className='head_form_container'>
                <label className='formLabel'>Head</label>
                <input name='head' type='text' className='head_form_input' onChange={onChange} />
              </div>
            </div>

            <div className='description_form_container'>
              <div className='description_form_container'>
                <label className='formLabel'>Description</label>
                <textarea name='description' className='description_form_input' onChange={onChange} />
              </div>
            </div>
          </div>

          <div className='uploadMore_button_container'>
            <div>
              <button className='uploadMore_cancel_button' onClick={() => onClose()}>Cancel</button>
            </div>

            <div>
              <button className='uploadMore_save_button' onClick={onSubmit}>Save</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const useStyles = makeStyles()(() => ({
  removeModal_footer: {
    // backgroundColor:"teal"
  },
}))

export default UploadMoreModal;
