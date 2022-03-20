import client from "./client";

const endpoint = "/sales";

const getSales = (params) => client.get(endpoint, params);

export const addSale = (sale, onUploadProgress) => {
    const data = new FormData();
    data.append("date", sale.date);
    data.append("customer_id", sale.purchaser.id);
    data.append("customer_notes", sale.notes);

    sale.products.forEach((product, index) =>
        data.append("products", {
            id: product.id,
            quantity: product.quantity,
        })
    );

    if (sale.location)
        data.append("location", JSON.stringify(sale.location));

    return client.post(endpoint, data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
};

export default {
    addSale,
    getSales,
};
