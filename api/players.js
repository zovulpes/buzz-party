const API_URL = "http://localhost:3001/players";

export const playersAPI = {
    getAll: async () => {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch players");
        return res.json();
    },

    update: async (id, updates) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates)
        });
        if (!res.ok) throw new Error("Failed to update player");
        return res.json();
    }
};