import hashlib
import secrets
from typing import Optional

def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100000)
    return f"{salt}:{hashed.hex()}"

def verify_password(password: str, stored_hash: str) -> bool:
    salt, expected = stored_hash.split(":", 1)
    actual = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100000)
    return secrets.compare_digest(actual.hex(), expected)

def get_user(db, user_id: int) -> Optional[dict]:
    if not isinstance(user_id, int) or user_id <= 0:
        raise ValueError("Invalid user_id")
    return db.execute("SELECT id, name, email FROM users WHERE id = ?", (user_id,)).fetchone()
