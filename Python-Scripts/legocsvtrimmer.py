import csv
from themes import THEMES

# python script to remove all 'unnecessary' sets to decrease the csv size and alter the set attributes to the form needed

# Open the original file for reading
with open('sets.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)
    
    # Open a new file for writing
    with open('filtered_sets.csv', mode='w', newline='') as outfile:
        writer = csv.writer(outfile)
        i = 0
        # counter = 0

        for row in reader:
            # counter = counter + 1
            # print(counter)
            if i == 0:                                      # ignore checks for the first row (labels) and write it as is
                writer.writerow(row)
                i = 1
                continue
            # parameters to ignore writing:
            if (not row[0].endswith('-1') or                # a different version of an existing set
                len(row[0]) > 8 or                          # a set code longer than 6
                len(row[0]) < 5 or                          # a set code less than 3
                int(row[4]) < 10 or                         # a piece count less than 10
                '.' in row[0] or                            # weird decimals in set nums
                any(char.isalpha() for char in row[0])):    # set code with letters
                continue
            # these rows pass the check and are written to the 
            else:
                row[0] = row[0][:-2]                        # Remove the last two characters of the set code (should be '-1')
                theme_lookup = THEMES[int(row[3])][1]       # change the theme_id to a string theme of only parent themes
                row[3] = theme_lookup
                writer.writerow(row)                        # Write the updated row to the new file
        
        print("csv trimmed successfully")
