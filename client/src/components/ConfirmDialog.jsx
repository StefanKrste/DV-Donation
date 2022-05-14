import React from 'react'
// import '../ConfirmDialog.css'

function ConfirmDialog( {showDialog} ) {

    if(!showDialog) {
        return <></>
    }
  return (
    <div>
        <div className='overlay'>
            <div className='dialog'>
                <div className='dialog__content'>
                    <h2 className='dialog__title'>Delete</h2>
                    <p className='dialog__description'>Are you sure</p>
                </div>

                <hr />
                <div className='dialog_footer'>
                    <button className='dialog__cancel'>Cancel</button>
                    <button className='dialog__confirm'> Yes</button>

                </div>

            </div>
        </div>    
    </div>
  )
}

export default ConfirmDialog