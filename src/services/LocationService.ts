import axios from "axios"
import { API_BASE_URL } from "~/utils/API"
import { handleError } from "~/utils/handleError"



export const getAllLocations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}location`)
        console.log(response.data)
        return response.data
    } catch (error) {
        handleError(error); 
        throw error; 
    }
}