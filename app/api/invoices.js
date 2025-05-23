import client from "./client";

const endpoint = "/invoices";

const getInvoices = (params) => client.get(endpoint, params);
const getInvoice = (params) => client.get(endpoint + '/' + params.id, params);
const exportInvoice = (params) => client.get(endpoint + '/' + params.id + '/print?export=' + params.export, params);

export const addInvoice = (invoice, onUploadProgress) => {
    const data = new FormData();
    data.append("date", invoice.date);
    data.append("customer_id", invoice.purchaser.id);
    data.append("customer_notes", invoice.notes);

    invoice.products.forEach((product, index) =>
        data.append("products", {
            id: product.id,
            quantity: product.quantity,
        })
    );

    return client.post(endpoint, data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
};

export default {
    addInvoice,
    getInvoice,
    getInvoices,
    exportInvoice,
};
