import { useMutation } from "@apollo/client";
import {
  M_CREATE_CONSULTATION,
  M_CREATE_GESTATION,
  M_CREATE_KID,
  M_CREATE_VACCINE,
  M_CREATE_VACCINE_CARD,
  M_UPDATE_CONSULTATION,
  M_UPDATE_GESTATION,
} from "../graphql/Mutations";

export const useGestationMutations = () => {
  const [createGestation] = useMutation(M_CREATE_GESTATION);
  const [updateGestation] = useMutation(M_UPDATE_GESTATION);
  const [createKid] = useMutation(M_CREATE_KID);
  const [createVaccineCard] = useMutation(M_CREATE_VACCINE_CARD);
  const [createConsultation] = useMutation(M_CREATE_CONSULTATION, {
    refetchQueries: ["ConsultationsByGestation", "GestationsByMom"],
  });
  const [updateConsultation] = useMutation(M_UPDATE_CONSULTATION, {
    refetchQueries: ["ConsultationsByGestation", "GestationsByMom"],
  });
  const [createVaccine] = useMutation(M_CREATE_VACCINE, {
    refetchQueries: ["VaccinesByVaccineCard"],
  });

  return {
    createGestation,
    updateGestation,
    createKid,
    createVaccineCard,
    createConsultation,
    updateConsultation,
    createVaccine,
  };
};
