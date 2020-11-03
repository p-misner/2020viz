import string
import pandas as pd
import json

file = pd.read_csv("../data/fulltext.csv", header=None)
file.columns = ["Sentence"]
d = {}
for line in file.Sentence:
    line = line.replace('-',' ')
    line = line.translate(str.maketrans('', '', string.punctuation)).strip()
    words = line.split()
    for w in words:
        if w.lower() in d:
            d[w.lower()] +=1
        else:
            d[w.lower()] = 1

ordered_d = {}
ordered = []
for key, value in sorted(d.items(), key=lambda item: item[1]):
    ordered.append({'Word': key, 'Value': value})
    # ordered[key] = value;
    # print("%s: %s" % (key, value))
ordered_d=ordered
print(ordered_d)

with open('../data/wordcount.json', 'w') as outfile:
    json.dump(ordered_d, outfile)