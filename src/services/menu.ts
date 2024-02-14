import axios, { AxiosResponse } from "axios";
import IDataList from "../models/IDataList";

const getDataFromServer = () => {

    return axios.get<IDataList[]>("http://localhost:3001/items")
        .then(res => res.data);
};

const pushDataIntoServer = (newItem: Omit<IDataList, "id">) => {

    return axios.post<IDataList>(

        "http://localhost:3001/items",

        newItem,

        {

            headers: {

                "Content-Type": "application/json",
            }
        }
    )
        .then(res => res.data);
};

export { getDataFromServer, pushDataIntoServer };