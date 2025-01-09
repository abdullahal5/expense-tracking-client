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
    getAllExpenseByQuery: builder.query({
      query: ({ category }) => {
        return {
          url: `/expense/get-all?category=${category}`,
          method: "GET",
        };
      },
      providesTags: ["expense"],
    }),
    getSinleExpense: builder.query({
      query: ({ userId, category }) => {
        console.log(userId, category);
        return {
          url: `/expense/get-single-by-category/${userId}`,
          method: "GET",
          params: category,
        };
      },
      providesTags: ["expense"],
    }),
    getSingleExpenseById: builder.query({
      query: ({ id }) => {
        return {
          url: `/expense/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["expense"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, expenseData }) => {
        console.log(id);
        return {
          url: `/expense/update/${id}`,
          method: "PUT",
          body: expenseData,
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
  useGetAllExpenseByQueryQuery,
  useUpdateExpenseMutation,
  useGetSingleExpenseByIdQuery,
  useDeleteExpenseMutation,
} = expenseApi;
