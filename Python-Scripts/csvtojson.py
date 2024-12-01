import csv
import json

# Open the CSV and create a JSON file
with open("filtered_sets.csv", newline="") as csvfile:
    reader = csv.DictReader(csvfile)
    
    data = []
    for row in reader:
        # Convert specific fields to integers if needed
        row["set_num"] = int(row["set_num"])
        row["year"] = int(row["year"])
        row["num_parts"] = int(row["num_parts"])
        data.append(row)

    with open("sets.json", "w") as jsonfile:
        json.dump(data, jsonfile, indent=4)
