/* eslint-disable no-unused-expressions */
import axios from 'axios'

const useHttp = () => {

    const getOne = async <T>(relativeUri: string): Promise<T> => {
        const response = await axios.get<T>(`${relativeUri}`, {

        })
        return response.data as T
    }

    const getMany = async <T>(relativeUri: string): Promise<T[]> => {

        const response = await axios.get<T[]>(`${relativeUri}`, {

        })
        return response.data
    }

    const post = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.post<T>(`${relativeUri}`, rq, {

        })
        return response.data as T;
    }

    const patch = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.patch<T>(`${relativeUri}`, rq, {
            
        })
        return response.data;
    }

    const put = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.put<T>(`${relativeUri}`, rq, {
            
        })
        return response.data;
    }
    const putAnonymous = async <T, S>(rq: S, relativeUri: string): Promise<T> => {
        const response = await axios.put<T>(`${relativeUri}`, rq, {})
        return response.data;
    }

    const deleteOne = async <T>(relativeUri: string): Promise<T> => {
        const response = await axios.delete<T>(`${relativeUri}`, {
            
        })
        return response.data;
    }

    const getRaw = async (relativeUri: string): Promise<string> => {
        const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(relativeUri)}`);
        const text = await response.text();
        return text;
      };
      
    return { getOne, getMany, post, patch, put, deleteOne, putAnonymous, getRaw }
}

export default useHttp
