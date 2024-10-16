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