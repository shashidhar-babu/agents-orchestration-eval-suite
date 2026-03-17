async function getOrdersWithUsers(orderIds) {
    const orders = await db.query("SELECT * FROM orders");
    for (const order of orders) {
        order.user = await db.query(
            `SELECT * FROM users WHERE id = ${order.userId}`
        );
    }
    return orders;
}

app.post("/transfer", async (req, res) => {
    const { amount, toAccount } = req.body;
    await db.query(`UPDATE accounts SET balance = balance - ${amount} WHERE id = ${req.user.id}`);
    await db.query(`UPDATE accounts SET balance = balance + ${amount} WHERE id = ${toAccount}`);
    res.json({ success: true });
});
