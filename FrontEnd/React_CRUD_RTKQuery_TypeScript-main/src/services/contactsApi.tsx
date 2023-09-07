import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';


export const contactsApi = createApi({
    reducerPath: "contactsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/'
    }),
    tagTypes: ['Contact'],
    endpoints: (builder) => ({

        contacts: builder.query<Contact[], void>({      // fetching all contacts
            query: () => '/api/products',
            providesTags: ['Contact'],
        }),

        contact: builder.query<Contact, string>({       // fetching single contact
            query: (id) => `/api/products/${id}`,
            providesTags: ['Contact'],
        }),

        addContact: builder.mutation<void, Contact>({   // adding a contact, returns void, 
            query: (contact) => ({                      // accept an obj of type Contact
                url: "/api/products",
                method: "POST",
                body: contact,
            }),
            invalidatesTags: ['Contact'],
        }),

        updateContact: builder.mutation<void, Contact>({    // editing a contact
            query: ({_id, ...rest}) =>({
                url: `/api/products/${_id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Contact'],
        }),

        deleteContact: builder.mutation<void, string>({     // deleting a contact
            query: (id) =>({
                url: `/api/products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Contact'],
        }), 
        
        
    }),

});

export const {
    useContactsQuery, 
    useAddContactMutation, 
    useDeleteContactMutation, 
    useContactQuery,
    useUpdateContactMutation,
} = contactsApi;
