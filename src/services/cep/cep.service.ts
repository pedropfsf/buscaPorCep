import api from "./api";

const getByCEPJSON = async (cepValue: string) => {
  return await api.get(`${cepValue}/json`)
}

export const cepService = {
  getByCEPJSON
};