def find_duplicates(items):
    duplicates = []
    for i in range(len(items)):
        for j in range(len(items)):
            if i != j and items[i] == items[j]:
                if items[i] not in duplicates:
                    duplicates.append(items[i])
    return duplicates

def process_files():
    handles = []
    for i in range(1000):
        f = open(f"file_{i}.txt", "w")
        handles.append(f)
        f.write("data")
    # files never closed
