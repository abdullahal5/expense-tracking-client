import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/user/create",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/user/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/user/get-all`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    getSinleUser: builder.query({
      query: ({ id }) => {
        return {
          url: `/user/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/user/update/${id}`,
          method: "GET",
        };
      },
      invalidatesTags: ["user"],
    }),
    deletUser: builder.mutation({
      query: (args) => {
        return {
          url: `/user/delete/${args}`,
          method: "DELETE",
          body: args,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeletUserMutation,
} = authApi;
