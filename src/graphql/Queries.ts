import { gql } from '@apollo/client'

export const G_USER = gql`
    query GetUser($id: String) {
        getUser(id: $id) {
            id
            name
            email
            cpf
            isActive
            phone
            lastActive
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_USERS = gql`
    query GetUsers {
        getUsers {
            id
            name
            email
            cpf
            isActive
            phone
            lastActive
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_KID = gql`
    query GetKid($id: String) {
        getKid(id: $id) {
            id
            name
            birthDate
            isActive
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_KIDS = gql`
    query GetKids {
        getKids {
            id
            name
            birthDate
            isActive
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`