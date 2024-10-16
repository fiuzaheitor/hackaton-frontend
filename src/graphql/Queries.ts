import { gql } from '@apollo/client'

export const G_USER = gql`
    query User($id: String) {
        user(id: $id) {
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
    query Users {
        users {
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
    query Kid($id: String) {
        kid(id: $id) {
            id
            mom {
                id
                name
            }
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
    query Kids {
        kids {
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

export const G_KIDS_BY_MOM = gql`
    query GetKidsByMom($momId: String) {
        kidsByMom(momId: $momId) {
            id
            mom {
                id
                name
            }
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

export const G_GESTATION = gql`
    query Gestation($id: String) {
        gestation(id: $id) {
            id
            user {
                id
                name
            }
            week
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_GESTATIONS = gql`
    query Gestations {
        gestations {
            id
            user {
                id
                name
            }
            week
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_GESTATIONS_BY_USER = gql`
    query GestationsByUser($userId: String) {
        gestationsByUser(userId: $userId) {
            id
            user {
                id
                name
            }
            week
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_CONSULTATION = gql`
    query Consultation($id: String) {
        consultation(id: $id) {
            id
            date
            gestation {
                id
                week
            }
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_CONSULTATIONS = gql`
    query Consultations {
        consultations {
            id
            date
            gestation {
                id
                week
            }
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_CONSULTATIONS_BY_GESTATION = gql`
    query ConsultationsByGestation($gestationId: String) {
        consultationsByGestation(gestationId: $gestationId) {
            id
            date
            gestation {
                id
                week
            }
            createdAt
            updatedAt
            createdBy
            updatedBy
        }
    }
`

export const G_VACCINE_CARD = gql`
    query VaccineCard($id: String) {
        vaccineCard(id: $id) {
            id
            kid {
                id
                name
            }
            applicationDate
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`

export const G_VACCINE_CARDS = gql`
    query VaccineCards {
        vaccineCards {
            id
            kid {
                id
                name
            }
            applicationDate
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`

export const G_VACCINE_CARD_BY_KID = gql`
    query VaccineCardByKid($kidId: String) {
        vaccineCardByKid(kidId: $kidId) {
            id
            kid {
                id
                name
            }
            applicationDate
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`

export const G_VACCINE = gql`
    query Vaccine($id: String) {
        vaccine(id: $id) {
            id
            vaccineCard {
                id
                kid {
                    id
                    name
                }
            }
            name
            description
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`

export const G_VACCINES = gql`
    query Vaccines {
        vaccines {
            id
            vaccineCard {
                id
                kid {
                    id
                    name
                }
            }
            name
            description
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`

export const G_VACCINES_BY_VACCINE_CARD = gql`
    query VaccinesByVaccineCard($vaccineCardId: String) {
        vaccinesByVaccineCard(vaccineCardId: $vaccineCardId) {
            id
            vaccineCard {
                id
                kid {
                    id
                    name
                }
            }
            name
            description
            createdAt
            createdBy
            updatedAt
            updatedBy
        }
    }
`
