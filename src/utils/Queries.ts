import { useQuery } from "@apollo/client";

import { G_USER, G_USERS, G_KID, G_KIDS, G_KIDS_BY_MOM, G_VACCINES_BY_VACCINE_CARD, G_GESTATION, G_GESTATIONS, G_GESTATIONS_BY_USER, G_CONSULTATION, G_CONSULTATIONS, G_CONSULTATIONS_BY_GESTATION, G_VACCINE_CARD, G_VACCINE_CARDS, G_VACCINE_CARD_BY_KID, G_VACCINE, G_VACCINES } from "../graphql/Queries";

export const useGetUser = (id: string) => {
  const { data, loading, error } = useQuery(G_USER, 
    { fetchPolicy: 'cache-and-network', 
    variables: { id } }
  );

    return { data, loading, error };
};

export const useGetUsers = () => {
  const { data, loading, error } = useQuery(G_USERS, { fetchPolicy: 'cache-and-network' });

    return { data, loading, error };
};

export const useGetKid = (id: string) => {
  const { data, loading, error } = useQuery(G_KID, 
    { fetchPolicy: 'cache-and-network', 
    variables: { id } }
  );

    return { data, loading, error };
};

export const useGetKids = () => {
  const { data, loading, error } = useQuery(G_KIDS, { fetchPolicy: 'cache-and-network' });

    return { data, loading, error };
};

export const useGetKidsByMom = (momId: string) => {
    const { data, loading, error } = useQuery(G_KIDS_BY_MOM, 
        { fetchPolicy: 'cache-and-network', 
        variables: { momId } }
    );
    
        return { data, loading, error };
}


export const useGetGestation = (id: string) => {
    const { data, loading, error } = useQuery(G_GESTATION, 
        { fetchPolicy: 'cache-and-network', 
        variables: { id } }
    );

    return { data, loading, error };
};

export const useGetGestations = () => {
    const { data, loading, error } = useQuery(G_GESTATIONS, { fetchPolicy: 'cache-and-network' });

    return { data, loading, error };
};

export const useGetGestationsByUser = (userId: string) => {
    const { data, loading, error } = useQuery(G_GESTATIONS_BY_USER, 
        { fetchPolicy: 'cache-and-network', 
        variables: { userId } }
    );

    return { data, loading, error };
};

export const useGetConsultation = (id: string) => {
    const { data, loading, error } = useQuery(G_CONSULTATION, 
        { fetchPolicy: 'cache-and-network', 
        variables: { id } }
    );

    return { data, loading, error };
};

export const useGetConsultations = () => {
    const { data, loading, error } = useQuery(G_CONSULTATIONS, { fetchPolicy: 'cache-and-network' });

    return { data, loading, error };
};

export const useGetConsultationsByGestation = (gestationId: string) => {
    const { data, loading, error } = useQuery(G_CONSULTATIONS_BY_GESTATION, 
        { fetchPolicy: 'cache-and-network', 
        variables: { gestationId } }
    );

    return { data, loading, error };
};

export const useGetVaccineCard = (id: string) => {
    const { data, loading, error } = useQuery(G_VACCINE_CARD, 
        { fetchPolicy: 'cache-and-network', 
        variables: { id } }
    );

    return { data, loading, error };
};

export const useGetVaccineCards = () => {
    const { data, loading, error } = useQuery(G_VACCINE_CARDS, { fetchPolicy: 'cache-and-network' });

    return { data, loading, error };
};

export const useGetVaccineCardByKid = (kidId: string) => {
    const { data, loading, error } = useQuery(G_VACCINE_CARD_BY_KID, 
        { fetchPolicy: 'cache-and-network', 
        variables: { kidId } }
    );

    return { data, loading, error };
};

export const useGetVaccine = (id: string) => {
    const { data, loading, error } = useQuery(G_VACCINE, 
        { fetchPolicy: 'cache-and-network', 
        variables: { id } }
    );

    return { data, loading, error };
};

export const useGetVaccines = () => {
    const { data, loading, error } = useQuery(G_VACCINES, { fetchPolicy: 'cache-and-network' });

    return { data, loading, error };
};

export const useGetVaccinesByVaccineCard = (vaccineCardId: string) => {
    const { data, loading, error } = useQuery(G_VACCINES_BY_VACCINE_CARD, 
        { fetchPolicy: 'cache-and-network', 
        variables: { vaccineCardId } }
    );

    return { data, loading, error };
};
