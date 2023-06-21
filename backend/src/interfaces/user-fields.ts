export interface UserSelect {
    values?: {
        id?: boolean,
        firstName?: boolean,
        lastName?: boolean,
        email?: boolean,
        contact?: boolean,
        password?: boolean
    },

    relations?: {
        pages?: boolean
        donations?: boolean
    }
}
