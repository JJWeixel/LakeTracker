/* eslint-disable no-unused-expressions */
import axios from 'axios'

const useHttp = () => {

    const apiUri = 'https://api.tidesandcurrents.noaa.gov/api/prod';

    const getOne = async <T>(relativeUri: string): Promise<T> => {
        const response = await axios.get<T>(`${apiUri}/${relativeUri}`, {

        })
        return response.data as T
    }

    const getMany = async <T>(relativeUri: string): Promise<T[]> => {

        const response = await axios.get<T[]>(`${apiUri}/${relativeUri}`, {

        })
        return response.data
    }

    const post = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.post<T>(`${apiUri}/${relativeUri}`, rq, {

        })
        return response.data as T;
    }

    const patch = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.patch<T>(`${apiUri}/${relativeUri}`, rq, {
            
        })
        return response.data;
    }

    const put = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.put<T>(`${apiUri}/${relativeUri}`, rq, {
            
        })
        return response.data;
    }
    const putAnonymous = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.put<T>(`${apiUri}/${relativeUri}`, rq, {})
        return response.data;
    }

    const deleteOne = async <T>(relativeUri: string): Promise<T> => {
        const response = await axios.delete<T>(`${apiUri}/${relativeUri}`, {
            
        })
        return response.data;
    }
    return { getOne, getMany, post, patch, put, deleteOne, putAnonymous }
}

export default useHttp
