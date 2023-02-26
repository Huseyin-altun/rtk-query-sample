import { createPortal } from "react-dom";

export const ModalHeader = ({ children }: any) => {
  return (
    <>
      <h3 className="font-bold text-lg">{children}</h3>
    </>
  );
};

export const ModalFooter = ({ actions, handleClick }: any) => {
  if (actions) {
    return (
      <>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleClick}>
            Cancel{" "}
          </button>
          {actions}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="modal-action">
        <label className="btn btn-ghost" onClick={handleClick}>
          Cancel{" "}
        </label>
      </div>
    </>
  );
};

export const Modal = ({ show, onCloseButtonClick, children, actions }: any) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      {createPortal(
        <>
          <div>
            <input
              type="checkbox"
              id="my-modal-6"
              checked
              onChange={() => {}}
              className="modal-toggle"
            />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                {children}
                <ModalFooter
                  actions={actions}
                  handleClick={onCloseButtonClick}
                />
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};
