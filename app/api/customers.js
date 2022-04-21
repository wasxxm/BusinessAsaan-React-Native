import client from "./client";

const endpoint = "/customers";

const getCustomers = (params) => client.get(endpoint + '/list', params);
const getCustomer = (params) => client.get(endpoint + '/' + params.id, params);
const exportCustomer = (params) => client.get(endpoint + '/' + params.id + '/print?export=' + params.export, params);

export const addCustomer = (customer, onUploadProgress) => {
    const data = new FormData();
    data.append("name", customer.name);
    data.append("business_name", customer.business.name);

    return client.post(endpoint, data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
};

export default {
    addCustomer,
    getCustomer,
    getCustomers,
    exportCustomer,
};
