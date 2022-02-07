import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../apiConfig';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    todos: builder.query({
      query: () => '/todos',
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: '/todos',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Todo'],
    }),
    editTodo: builder.mutation({
      query: ({ data, id }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Todo'],
    }),
    editTodoIsComplete: builder.mutation({
      query: ({ data, id }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useEditTodoIsCompleteMutation,
  useDeleteTodoMutation,
} = todoApi;
