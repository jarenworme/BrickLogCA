import csv

##########################################################
#
# this file transforms the themes csv file into an array to be used 
theme_array = [[0, 'spacer']]

with open('themes.csv', newline='') as csvfile:
    reader = csv.reader(csvfile)

    i = 0

    for row in reader:
        if i == 0:
            i = 1
            continue
        while(i < int(row[0])):
            theme_array.append([i, "no value"])
            i = i + 1

        assert(i == int(row[0]))

        # check for parent id
        if(row[2] != ''):
            if(int(row[2]) > i - 1): # references later theme
                if(int(row[2]) == 608):
                    theme_array.append([i, "Disney"])
                elif(int(row[2]) == 598):
                    theme_array.append([i, "Promotional"])
                elif(int(row[2]) == 754):
                    theme_array.append([i, "Duplo"])
                else:
                    print(int(row[2]))
                i = i + 1
                continue
            parent = theme_array[int(row[2])][1]
            theme_array.append([i, parent])
        else: # must not be a subset (no parent set)
            theme_array.append([i, row[1]])
        i = i + 1

# Create and write to a new Python file
with open("themes.py", "w") as file:
    file.write("THEMES = ")  # Write the variable name
    file.write(f"{theme_array}")       # Write the array as a Python list    

    
    



