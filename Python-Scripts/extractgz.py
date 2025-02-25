import gzip
import shutil

with gzip.open('themes.csv.gz', 'rb') as f_in:
    with open('themes.csv', 'wb') as f_out:
        shutil.copyfileobj(f_in, f_out)