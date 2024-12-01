import gzip
import shutil

with gzip.open('colors.csv.gz', 'rb') as f_in:
    with open('colors.csv', 'wb') as f_out:
        shutil.copyfileobj(f_in, f_out)