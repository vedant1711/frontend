const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function fetchAPI(endpoint, options = {}) {
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn(`API fetch failed for ${endpoint}:`, error.message);
        return null;
    }
}

export async function getListings(params = '') {
    return await fetchAPI(`/listings/${params ? '?' + params : ''}`);
}

export async function getListing(id) {
    return await fetchAPI(`/listings/${id}/`);
}

export async function getFeaturedListings() {
    return await fetchAPI('/listings/featured/');
}

export async function getCategories() {
    return await fetchAPI('/listings/categories/');
}

export async function getUsers(params = '') {
    return await fetchAPI(`/users/${params ? '?' + params : ''}`);
}

export async function getUser(id) {
    return await fetchAPI(`/users/${id}/`);
}

export async function getReviews(params = '') {
    return await fetchAPI(`/reviews/${params ? '?' + params : ''}`);
}

export async function getTransactions(params = '') {
    return await fetchAPI(`/transactions/${params ? '?' + params : ''}`);
}

export async function getTrustQR(id) {
    return await fetchAPI(`/trust-qr/${id}/`);
}

export async function getAIPrice(data) {
    return await fetchAPI('/ai-price/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getUhaulOptions(data) {
    return await fetchAPI('/uhaul/', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function getSubscriptions() {
    return await fetchAPI('/subscriptions/');
}
