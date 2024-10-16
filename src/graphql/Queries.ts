import { gql } from '@apollo/client'

export const G_USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            id
            name
            email
            cpf
            isActive
            phone
            lastActive
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
        }
    }
`

export const G_KID = gql`
    query Kid($id: ID!) {
        kid(id: $id) {
            id
            mom {
                id
                name
            }
            name
            birthDate
            isActive
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
        }
    }
`

export const G_KIDS_BY_MOM = gql`
    query GetKidsByMom($userId: ID!) {
        kidsByMom(userId: $userId) {
            id
            mom {
                id
                name
            }
            name
            birthDate
        }
    }
`

export const G_GESTATION = gql`
    query Gestation($id: ID!) {
        gestation(id: $id) {
            id
            user {
                id
                name
            }
            week
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
        }
    }
`

export const G_GESTATIONS_BY_USER = gql`
    query GestationsByMom($userId: ID!) {
        gestationsByMom(userId: $userId) {
            id
            user {
                id
                name
            }
            week
            createdAt
        }
    }
`

export const G_CONSULTATION = gql`
    query Consultation($id: ID!) {
        consultation(id: $id) {
            id
            date
            week
            gestation {
                id
                week
            }
            isFinished
        }
    }
`

export const G_CONSULTATIONS = gql`
    query Consultations {
        consultations {
            id
            date
            week
            gestation {
                id
                week
            }
            isFinished
        }
    }
`

export const G_CONSULTATIONS_BY_GESTATION = gql`
    query ConsultationsByGestation($gestationId: ID!) {
        consultationsByGestation(gestationId: $gestationId) {
            id
            date
            week
            gestation {
                id
                week
            }
            isFinished
        }
    }
`

export const G_VACCINE_CARD = gql`
    query VaccineCard($id: ID!) {
        vaccineCard(id: $id) {
            id
            kid {
                id
                name
            }
            applicationDate
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
        }
    }
`

export const G_VACCINE_CARD_BY_KID = gql`
    query VaccineCardByKid($kidId: ID!) {
        vaccineCardByKid(kidId: $kidId) {
            id
            kid {
                id
                name
            }
            applicationDate
        }
    }
`

export const G_VACCINE = gql`
    query Vaccine($id: ID!) {
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
        }
    }
`

export const G_VACCINES_BY_VACCINE_CARD = gql`
    query VaccinesByVaccineCard($vaccineCardId: ID!) {
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
        }
    }
`
