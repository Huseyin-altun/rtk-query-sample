import { api } from "./api";
export interface Employee {
  id: number;
  firstName: string;
  gender: GenderEnum;
}

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}


export const employeeApi = api.injectEndpoints({
  endpoints: (build) => ({
    addEmployee: build.mutation<Employee, Partial<Employee>>({
      query(body) {
        return {
          url: `employees`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: [{ type: "Employees", id: "LIST" }],
    }),
    getEmployeeAll: build.query<any, void>({
      query: () => ({ url: "employees" }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }: Employee) => ({ type: "Employees", id })),
              { type: "Employees", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Posts", id: "LIST" }],
    }),
    getEmployee: build.query<Employee, number>({
      query: (id) => `employees/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Employees", id }],
    }),

    updateEmployee: build.mutation<Employee, Partial<Employee>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `employees/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Employees", id }],
    }),
    deleteEmployees: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `employees/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Employees", id }],
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useGetEmployeeAllQuery,
  useGetEmployeeQuery,
  useDeleteEmployeesMutation,
  useUpdateEmployeeMutation,
} = employeeApi;
