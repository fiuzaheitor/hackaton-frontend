import { gql } from "@apollo/client";

export const M_LOGIN = gql`
  mutation LoginUser($data: LoginUserInput) {
    loginUser(data: $data) {
      token
    }
  }
`;

export const M_CREATE_USER = gql`
  mutation CreateUser($data: UserInput) {
    createUser(data: $data) {
      id
    }
  }
`;

export const M_DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const M_UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: UserInput) {
    updateUser(id: $id, data: $data) {
      id
    }
  }
`;

export const M_CREATE_KID = gql`
  mutation CreateKid($data: KidInput) {
    createKid(data: $data) {
      id
      birthDate
    }
  }
`;

export const M_DELETE_KID = gql`
  mutation DeleteKid($id: ID!) {
    deleteKid(id: $id) {
      id
    }
  }
`;

export const M_UPDATE_KID = gql`
  mutation UpdateKid($id: ID!, $data: KidInput) {
    updateKid(id: $id, data: $data) {
      id
    }
  }
`;

export const M_CREATE_GESTATION = gql`
  mutation CreateGestation($data: GestationInput) {
    createGestation(data: $data) {
      id
    }
  }
`;

export const M_DELETE_GESTATION = gql`
  mutation DeleteGestation($id: ID!) {
    deleteGestation(id: $id) {
      id
    }
  }
`;

export const M_UPDATE_GESTATION = gql`
  mutation UpdateGestation($id: ID!, $data: GestationInput) {
    updateGestation(id: $id, data: $data) {
      id
    }
  }
`;

export const M_CREATE_CONSULTATION = gql`
  mutation CreateConsultation($data: ConsultationInput) {
    createConsultation(data: $data) {
      id
    }
  }
`;

export const M_DELETE_CONSULTATION = gql`
  mutation DeleteConsultation($id: ID!) {
    deleteConsultation(id: $id) {
      id
    }
  }
`;

export const M_UPDATE_CONSULTATION = gql`
  mutation UpdateConsultation($id: ID!, $data: ConsultationInput!) {
    updateConsultation(id: $id, data: $data) {
      id
    }
  }
`;

export const M_CREATE_VACCINE_CARD = gql`
  mutation CreateVaccineCard($data: VaccineCardInput) {
    createVaccineCard(data: $data) {
      id
    }
  }
`;

export const M_DELETE_VACCINE_CARD = gql`
  mutation DeleteVaccineCard($id: ID!) {
    deleteVaccineCard(id: $id) {
      id
    }
  }
`;

export const M_UPDATE_VACCINE_CARD = gql`
  mutation UpdateVaccineCard($id: ID!, $data: VaccineCardInput) {
    updateVaccineCard(id: $id, data: $data) {
      id
    }
  }
`;

export const M_CREATE_VACCINE = gql`
  mutation CreateVaccine($data: VaccineInput) {
    createVaccine(data: $data) {
      id
    }
  }
`;

export const M_DELETE_VACCINE = gql`
  mutation DeleteVaccine($id: ID!) {
    deleteVaccine(id: $id) {
      id
    }
  }
`;

export const M_UPDATE_VACCINE = gql`
  mutation UpdateVaccine($id: ID!, $data: VaccineInput) {
    updateVaccine(id: $id, data: $data) {
      id
    }
  }
`;

export const M_CREATE_VACCINE_TEMPLATE = gql`
    mutation CreateVaccineTemplate($data: VaccineTemplateInput) {
        createVaccineTemplate(data: $data) {
            id
        }
    }
`;

export const M_DELETE_VACCINE_TEMPLATE = gql`
    mutation DeleteVaccineTemplate($id: ID!) {
        deleteVaccineTemplate(id: $id) {
            id
        }
    }
`;

export const M_UPDATE_VACCINE_TEMPLATE = gql`
    mutation UpdateVaccineTemplate($id: ID!, $data: VaccineTemplateInput) {
        updateVaccineTemplate(id: $id, data: $data) {
            id
        }
    }
`;