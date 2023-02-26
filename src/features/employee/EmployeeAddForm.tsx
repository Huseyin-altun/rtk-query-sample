import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Employee, useAddEmployeeMutation } from "../../app/services/employee";

interface Props {

  closeModal: any;
}

export const EmployeeAddForm: React.FC<Props> = ({ closeModal }: any) => {
  const [addNewPost, response] = useAddEmployeeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>();
  const onSubmit: SubmitHandler<Employee> = (data) => {
    addNewPost(data)
      .unwrap()
      .then(() => {
        closeModal();
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form id="addForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col py-3	">
          <div className=" pb-5">
            <input
              type="text"
              id="firstName"
              placeholder="Robot Name"
              {...register("firstName", { required: true })}
              className="input w-full max-w-xs input-primary "
            />
            {errors.firstName && errors.firstName.type === "required" && (
              <div className="text-rose-400	">This is required</div>
            )}
          </div>

          <select
            className="select select-primary w-full max-w-xs"
            {...register("gender")}
          >
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </div>
      </form>
    </div>
  );
};
