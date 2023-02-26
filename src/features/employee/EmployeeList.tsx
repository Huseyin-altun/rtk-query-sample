import {
  useGetEmployeeAllQuery,
  useDeleteEmployeesMutation,
  Employee,
} from "../../app/services/employee";
import { Modal, ModalHeader } from "../../components/Modal";
import useModal from "../../utils/hooks/useModal";
import { EmployeeUpdateForm } from "./EmployeeUpdateForm";

interface Props {
  data: Employee;
  closeModal?: ()=>void;
}


export const EmployeeListItem: React.FC<Props>  = ({ data }) => {
  const [deletePost, response] = useDeleteEmployeesMutation();
  const [isShowingModal, toggleModal] = useModal(false);

  if (!data) return null;
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <img src={`https://robohash.org/${data.id}`} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {data.firstName}
        </h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div className="card-actions flex flex-nowrap">
          <button className="btn btn-primary" onClick={toggleModal}>
            Update
          </button>
          <button
            className="btn btn-error"
            onClick={() => {
              deletePost(data.id);
            }}
          >
            Delete
          </button>

          <Modal
            show={isShowingModal}
            onCloseButtonClick={toggleModal}
            actions={
              <button className="btn" form="updateForm" type="submit">
                Update
              </button>
            }
          >
            <ModalHeader>Robot Update</ModalHeader>
            <EmployeeUpdateForm employee={data} closeModal={toggleModal} />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export const EmployeeList = () => {
  const {
    data: employees,
    isLoading,
    isFetching,
    isError,
  } = useGetEmployeeAllQuery();

  if (isError) return <div>An error has qwe!</div>;

  if (isLoading) return <div>An error has qew!</div>;
  return (
    <div className="grid grid-cols-1   gap-12 md:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee: any, index: number) => (
        <EmployeeListItem data={employee} key={index}></EmployeeListItem>
      ))}
    </div>
  );
};


