```javascript
async function fetchOrders() {
    return await db.query("SELECT * FROM orders");
}

async function fetchUsersByIds(userIds) {
    return await db.query("SELECT * FROM users WHERE id IN ($1)", [userIds]);
}

async function fetchOrdersWithUsers(orderIds) {
    try {
        const orders = await fetchOrders();
        const userIds = orders.map(order => order.userId);
        const users = await fetchUsersByIds(userIds);
        const userMap = Object.fromEntries(users.map(user => [user.id, user]));
        for (const order of orders) {
            order.user = userMap[order.userId];
        }
        return orders;
    } catch (error) {
        console.error("Error fetching orders with users:", error);
        throw new Error("Failed to fetch orders with users");
    }
}

app.post("/transfer", async (req, res) => {
    try {
        const { amount, toAccount } = req.body;
        if (!amount || !toAccount || isNaN(amount)) {
            return res.status(400).json({ success: false, message: "Invalid input" });
        }
        await db.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2", [amount, req.user.id]);
        await db.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2", [amount, toAccount]);
        res.json({ success: true });
    } catch (error) {
        console.error("Error processing transfer:", error);
        res.status(500).json({ success: false, message: "Transfer failed" });
    }
});
```