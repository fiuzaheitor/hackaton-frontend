import { useMutation } from "@apollo/client";
import {
  M_CREATE_CONSULTATION,
  M_CREATE_GESTATION,
  M_CREATE_KID,
  M_CREATE_VACCINE,
  M_CREATE_VACCINE_CARD,
  M_DELETE_CONSULTATION,
  M_DELETE_GESTATION,
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
  const [deleteGestation] = useMutation(M_DELETE_GESTATION, {
    refetchQueries: ["GestationsByMom"],
  });
  const [deleteConsultation] = useMutation(M_DELETE_CONSULTATION, {
    refetchQueries: ["ConsultationsByGestation", "GestationsByMom"],
  });

  const createGestationMutation = async (
    userId: any,
    description: any,
    week: any,
  ) => {
    try {
      const newGestation = await createGestation({
        variables: {
          data: {
            user: userId,
            description: description,
            week: week,
            isFinished: false,
          },
        },
      }).then((res) => {
        return res.data.createGestation.id;
      });

      return newGestation;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateGestationMutation = async (gestationId: any, data: any) => {
    try {
      const newGestation = updateGestation({
        variables: {
          id: gestationId,
          data: data,
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const createKidMutation = async (momId: any, name: any, birthDate: any) => {
    try {
      const newKid = createKid({
        variables: {
          data: {
            mom: momId,
            name: name,
            birthDate: birthDate,
          },
        },
      }).then((res) => {
        return res.data.createKid;
      });
      return newKid;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const createVaccineCardMutation = async (kidId: any) => {
    try {
      const newVaccineCard = createVaccineCard({
        variables: {
          data: {
            kid: kidId,
          },
        },
      }).then((res) => {
        return res.data?.createVaccineCard?.id;
      });
      return newVaccineCard;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const createConsultationMutation = async (
    gestationId: any,
    date: any,
    week: any,
  ) => {
    try {
      const newConsultation = createConsultation({
        variables: {
          data: {
            gestation: gestationId,
            date: date,
            week: week,
            isFinished: false,
          },
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const updateConsultationMutation = async (id: string, data: any) => {
    try {
      const newConsultation = updateConsultation({
        variables: {
          id: id,
          data: data,
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const createVaccineMutation = async (data: any) => {
    try {
      const newVaccine = createVaccine({
        variables: {
          data: {
            ...data,
          },
        },
      }).then((res) => {
        return res;
      });
      return newVaccine;
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const deleteGestationMutation = async (id: any) => {
    try {
      const deletedGestation = deleteGestation({
        variables: {
          id: id,
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const deleteConsultationMutation = async (id: any) => {
    try {
      const deletedConsultation = deleteConsultation({
        variables: {
          id: id,
        },
      }).then((res) => {
        console.log(res);
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return {
    createGestationMutation,
    updateGestationMutation,
    createKidMutation,
    createVaccineCardMutation,
    createConsultationMutation,
    updateConsultationMutation,
    createVaccineMutation,
  };
};
