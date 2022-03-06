import client from "./client";

const endpoint = "/orders";

const getOrders = (params) => client.get(endpoint, params);

export const addOrder = (order, onUploadProgress) => {
    const data = new FormData();
    data.append("date", order.date);
    data.append("customer_id", order.purchaser.id);
    data.append("customer_notes", order.notes);

    order.products.forEach((product, index) =>
        data.append("products", {
            id: product.id,
            quantity: product.quantity,
        })
    );

    if (order.location)
        data.append("location", JSON.stringify(order.location));

    return client.post(endpoint, data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
};

export default {
    addOrder,
    getOrders,
};
