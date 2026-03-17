def get_user(user_id):
    query = "SELECT * FROM users WHERE id = ?"
    result = db.execute(query, (user_id,))
    return result