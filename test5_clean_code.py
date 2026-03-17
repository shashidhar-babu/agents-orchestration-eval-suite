```python
import hashlib
import secrets
from typing import Optional
from functools import lru_cache

def generate_hash(password: str, salt: str) -> str:
    return hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 100000).hex()

def hash_user_password(password: str) -> str:
    if not password:
        raise ValueError("Password cannot be empty")
    salt = secrets.token_hex(16)
    hashed_password = generate_hash(password, salt)
    return f"{salt}:{hashed_password}"

def verify_user_password(password: str, stored_hash: str) -> bool:
    if not password or not stored_hash:
        raise ValueError("Password and stored hash cannot be empty")
    salt, expected = stored_hash.split(":", 1)
    actual = generate_hash(password, salt)
    return secrets.compare_digest(actual, expected)

def validate_user_id(user_id: int) -> None:
    if not isinstance(user_id, int) or user_id <= 0:
        raise ValueError("Invalid user_id")

@lru_cache(maxsize=128)
def get_user(db, user_id: int) -> Optional[dict]:
    validate_user_id(user_id)
    try:
        return db.execute("SELECT id, name, email FROM users WHERE id = ?", (user_id,)).fetchone()
    except Exception as e:
        # Log the exception or handle it appropriately
        return None
```