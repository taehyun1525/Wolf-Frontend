import { BASE_URL } from "./Common";
import axiosInstance from "./axiosConfig";

export function getFaqByCategory(category, page = 0, size = 10, sort = "asc") {
    return axiosInstance.get(`${BASE_URL}/faqs/${category}`, {
        params: {
            page,
            size,
            sort,
        },
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching FAQ data: ", error);
            throw error;
        });
}