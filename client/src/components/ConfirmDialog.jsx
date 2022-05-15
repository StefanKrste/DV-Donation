import React from 'react'
import DialogCSS from './ConfirmDialog.module.css'

function ConfirmDialog( {showDialog, title, description, cancelDialog, confirmDialog} ) {

    if(!showDialog) {
        return <></>
    }
  return (
    <div>
        <div className={DialogCSS.overlay}>
            <div className={DialogCSS.dialog}>
                <div className={DialogCSS.dialog__content}>
                    <h2 className={DialogCSS.dialog__title}>{title}</h2>
                    <p className={DialogCSS.dialog__description}>{description}</p>
                </div>

                <hr />
                <div className={DialogCSS.dialog__footer}>
                    <button className={DialogCSS.dialog__cancel} onClick={cancelDialog}>Cancel</button>
                    <button className={DialogCSS.dialog__confirm} onClick={confirmDialog}> Yes, delete it</button>

                </div>

            </div>
        </div>    
    </div>
  )
}

export default ConfirmDialog