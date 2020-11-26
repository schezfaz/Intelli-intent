import os

folder_location = './../'
for currentpath, folders, files in os.walk(folder_location):
    for file in files:
        print(os.path.join(currentpath, file))