import { gql } from '@apollo/client'

export const M_LOGIN = gql`
  mutation LoginUser($data: LoginUserInput) {
    loginUser(data: $data) {
      token
    }
  }
`

export const M_CREATE_USER = gql`
  mutation CreateUser($data: UserInput) {
    createUser(data: $data) {
      id
    }
  }
`

export const M_DELETE_USER = gql`
    mutation DeleteUser($id: String) {
        deleteUser(id: $id) {
            id
        }
    }
`

export const M_UPDATE_USER = gql`
    mutation UpdateUser($id: String, $data: UserInput) {
        updateUser(id: $id, data: $data) {
            id
        }
    }
`

export const M_CREATE_KID = gql`
    mutation CreateKid($data: KidInput) {
        createKid(data: $data) {
            id
        }
    }
`

export const M_DELETE_KID = gql`
    mutation DeleteKid($id: String) {
        deleteKid(id: $id) {
            id
        }
    }
`

export const M_UPDATE_KID = gql`
    mutation UpdateKid($id: String, $data: KidInput) {
        updateKid(id: $id, data: $data) {
            id
        }
    }
`