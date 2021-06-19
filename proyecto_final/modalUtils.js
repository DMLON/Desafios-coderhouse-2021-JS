/**
 * Crea un modal y lo agrega al body, una vez que se termina de mostrar se elimina de forma automatica
 * @param {string} title Titulo del modal
 * @param {string} modalBody Body del modal, debe ser en formato html
 * @param {string} modalId ID del modal (Por defecto es modal-error)
 */
export function createModalAndShow(title, modalBody, modalId = "modal-error") {
    const modal = createModal(title, modalBody, modalId);
    showModal(modal,modalId);
}

/**
 * Crea un modal en formato HTML como string
 * @param {string} title Titulo del modal
 * @param {string} modalBody Body del modal, debe ser en formato html
 * @param {string} modalId ID del modal (Por defecto es modal-error)
 * @returns string Modal como HTML
 */
export function createModal(title, modalBody,modalId = "modal-error"){
    const modal = `
    <div class="modal fade" id=${modalId} tabindex="-1" role="dialog" aria-labelledby="modal-errorTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-errorLongTitle">${title}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ${modalBody}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`;
    return modal;
}

/**
 * Muestra el modal en el body y lo elimina al cerrarse
 * @param {string} modal Modal en formato HTML
 * @param {string} modalId ID del modal (Por defecto es modal-error)
 */
export function showModal(modal,modalId="modal-error"){
    $('body').append(modal);
    $(`#${modalId}`).modal('show');
    //Apenas termine de desaparecer, lo elimino
    $(`#${modalId}`).on('hidden.bs.modal', function (e) {
        $(`#${modalId}`).remove();
    });
}