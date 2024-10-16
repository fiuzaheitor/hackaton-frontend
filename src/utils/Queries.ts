import { useQuery } from "@apollo/client";

import { G_USER, G_USERS, G_KID, G_KIDS } from "../graphql/Queries";

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
