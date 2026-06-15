const API_BASE_URL = 'https://golang-ecommerce-backend.vercel.app/api';

export async function getProducts({ page = 1, limit = 12, category, minPrice, maxPrice, search } = {}) {
    try {
        const queryParams = new URLSearchParams({ page, limit });
        if (category && category !== 'All') queryParams.append('category', category);
        if (minPrice !== undefined) queryParams.append('minPrice', minPrice);
        if (maxPrice !== undefined) queryParams.append('maxPrice', maxPrice);
        if (search) queryParams.append('search', search);

        const res = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return await res.json();
    } catch (e) {
        console.error("Error getProducts:", e);
        return { products: [], totalPages: 0, currentPage: 1, totalProducts: 0 };
    }
}

export async function getProduct(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        return await res.json();
    } catch (e) {
        console.error("Error getProduct:", e);
        return null;
    }
}

export async function getTrendingProducts(limit = 8) {
    try {
        const res = await fetch(`${API_BASE_URL}/products/trending?limit=${limit}`);
        if (!res.ok) throw new Error('Failed to fetch trending products');
        return await res.json();
    } catch (e) {
        console.error("Error getTrendingProducts:", e);
        return [];
    }
}

export async function createCart(cartId, productId, qty) {
    try {
        const res = await fetch(`${API_BASE_URL}/carts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartId, productId, qty })
        });
        if (!res.ok) throw new Error('Failed to create cart');
        return await res.json();
    } catch (e) {
        console.error("Error createCart:", e);
        return null;
    }
}

export async function getCarts() {
    try {
        const res = await fetch(`${API_BASE_URL}/carts`);
        if (!res.ok) throw new Error('Failed to fetch carts');
        return await res.json();
    } catch (e) {
        console.error("Error getCarts:", e);
        return [];
    }
}

export async function createProduct(data) {
    try {
        const res = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create product');
        return await res.json();
    } catch (e) {
        console.error("Error createProduct:", e);
        return { success: false, error: e.message };
    }
}

export async function updateProduct(id, data) {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update product');
        return await res.json();
    } catch (e) {
        console.error("Error updateProduct:", e);
        return { success: false, error: e.message };
    }
}

export async function deleteProduct(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete product');
        return await res.json();
    } catch (e) {
        console.error("Error deleteProduct:", e);
        return { success: false, error: e.message };
    }
}

export async function getOrders({ page = 1, limit = 10 } = {}) {
    try {
        const queryParams = new URLSearchParams({ page, limit });
        const res = await fetch(`${API_BASE_URL}/orders?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        return await res.json();
    } catch (e) {
        console.error("Error getOrders:", e);
        return { orders: [], totalPages: 0, currentPage: 1, totalOrders: 0 };
    }
}

export async function updateOrder(id, data) {
    try {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to update order');
        return await res.json();
    } catch (e) {
        console.error("Error updateOrder:", e);
        return { success: false, error: e.message };
    }
}

export async function getOrder(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/orders/${id}`);
        if (!res.ok) throw new Error('Failed to fetch order');
        return await res.json();
    } catch (e) {
        console.error("Error getOrder:", e);
        return null;
    }
}

export async function cancelOrder(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/orders/${id}/cancel`, {
            method: 'POST'
        });
        if (!res.ok) throw new Error('Failed to cancel order');
        return await res.json();
    } catch (e) {
        console.error("Error cancelOrder:", e);
        return { success: false, error: e.message };
    }
}

export async function getReviews({ status, page = 1, limit = 10 } = {}) {
    try {
        const queryParams = new URLSearchParams({ page, limit });
        if (status) queryParams.append('status', status);
        const res = await fetch(`${API_BASE_URL}/reviews?${queryParams.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        return await res.json();
    } catch (e) {
        console.error("Error getReviews:", e);
        return { reviews: [], totalPages: 0, currentPage: 1, totalReviews: 0 };
    }
}

export async function createReview(data) {
    try {
        const res = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create review');
        return await res.json();
    } catch (e) {
        console.error("Error createReview:", e);
        return { success: false, error: e.message };
    }
}

export async function updateReviewStatus(id, status) {
    try {
        const res = await fetch(`${API_BASE_URL}/reviews/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Failed to update review status');
        return await res.json();
    } catch (e) {
        console.error("Error updateReviewStatus:", e);
        return { success: false, error: e.message };
    }
}

export async function createOrder(data) {
    try {
        const res = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create order');
        return await res.json();
    } catch (e) {
        console.error("Error createOrder:", e);
        return { success: false, error: e.message };
    }
}
