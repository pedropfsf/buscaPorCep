// Core
import api from "./api";

// Utils
import insertQuery from "../../utils/insertQuery";

export const getByLatLon = async (valueCep: string) => {
  return await api.get(
    "?" +
    insertQuery("postalcode", valueCep) + "&" +
    insertQuery("format", "json")
  )
}

export const mapService = { getByLatLon };