import './modal.css';

function Modal () {

    return (
        <div class="modal-container">
        <input id="modal-toggle" type="checkbox"/>
        
        <div class="modal-backdrop">
            <div class="modal-content">
            <label class="modal-close" for="modal-toggle">x</label>
            <h1>Success!</h1>
            <label class="modal-close button" for="modal-toggle">Close</label>
            </div>
        </div>
        </div>
    )
}

export default Modal;