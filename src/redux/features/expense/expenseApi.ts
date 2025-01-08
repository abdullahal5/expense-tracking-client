import { baseApi } from "../../api/baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addExpense: builder.mutation({
      query: (userInfo) => ({
        url: "/expense/create",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["expense"],
    }),
    getAllExpense: builder.query({
      query: () => {
        return {
          url: `/expense/get-all`,
          method: "GET",
        };
      },
      providesTags: ["expense"],
    }),
    getSinleExpense: builder.query({
      query: ({ id }) => {
        return {
          url: `/expense/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/expense/update/${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["expense"],
    }),
    deleteExpense: builder.mutation({
      query: (args) => {
        return {
          url: `/expense/delete/${args}`,
          method: "DELETE",
          body: args,
        };
      },
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useAddExpenseMutation,
  useGetAllExpenseQuery,
  useGetSinleExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
