import "./App.css";
import { Modal, ModalHeader } from "./components/Modal";
import { EmployeeAddForm } from "./features/employee/EmployeeAddForm";
import { EmployeeList } from "./features/employee/EmployeeList";

import { Navbar } from "./layouts/navbar/Navbar";
import useModal from "./utils/hooks/useModal";

function App() {
  const [isShowingModal, toggleModal]: any = useModal(false);
  return (
    <div className="App">
      <Navbar />
      <div className="flex justify-end ...">
        <button className="btn btn-ghost" onClick={toggleModal}>
          Robot Add
        </button>
      </div>

      <Modal
        show={isShowingModal}
        onCloseButtonClick={toggleModal}
        actions={
          <button className="btn" form="addForm" type="submit">
            Add
          </button>
        }
      >
        <ModalHeader>Robot Add</ModalHeader>
        <EmployeeAddForm closeModal={toggleModal} />
      </Modal>
      <EmployeeList />
    </div>
  );
}

export default App;
