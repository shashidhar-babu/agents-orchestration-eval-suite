def find_duplicates(items):
    seen = set()
    duplicates = set()
    for item in items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    return list(duplicates)

def process_files():
    try:
        for i in range(1000):
            with open(f"file_{i}.txt", "w") as f:
                f.write("data")
    except IOError as e:
        print(f"An error occurred: {e}")