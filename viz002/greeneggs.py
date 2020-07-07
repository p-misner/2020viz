"""
Sources:
viz tutorials
https://bl.ocks.org/d3noob/8375092
https://observablehq.com/@d3/hierarchical-edge-bundling?collection=@d3/d3-hierarchy

creating tree data:
https://anytree.readthedocs.io/en/2.8.0/intro.html

"""
import pandas as pd
import re
from anytree import Node, RenderTree
import anytree.search
from anytree.exporter import JsonExporter
import json

file = pd.read_csv("./fulltext.csv", header=None)
file.columns = ["Sentence"]
d = {}

for i in range(3, file.size - 1):
    if re.search('[.!?]$', file["Sentence"][i].strip()) is None:
        file["Sentence"][i] = file["Sentence"][i] + ' ' + file["Sentence"][i+1]
        file["Sentence"][i + 1] = "Nothing."

for i in range(3,file.size - 1 ):
    if len(re.findall('[.!?]', file["Sentence"][i]))>1:
        file["Sentence"][i] = re.split('! |\? |\.', file["Sentence"][i])


file = file[~file.Sentence.str.contains("Nothing.", na=False)]
file = file.explode("Sentence")

file.replace("", float("NaN"), inplace=True)
file.replace(" ", float("NaN"), inplace=True)
file.replace(r'[!?.,]', "", regex=True, inplace=True)

file.dropna(subset=["Sentence"], inplace=True)
file = file.reset_index()

new = {}
prev = ""
new["0Start"] = Node("Green Eggs and Ham", value=1)
length = ()

for i, line in enumerate(file["Sentence"], start=0):
    line = line.split()
    for j, word in enumerate(line, start=0):
        # print(str(j))
        if j == 0:
            length = anytree.search.findall(new["0Start"], filter_=lambda node: node.name in word)
            if len(length) == 0:
                new[str(j) + word] = Node(word, value=1, parent=new["0Start"])
            elif len(length) > 0:
                try:
                    new[str(j) + word].value = new[str(j) + word].value + 1
                except KeyError:
                    new[str(j) + word] = Node(word, value=1, parent=new["0Start"])
        else:
            length = anytree.search.findall(new[str(j-1) + prev], filter_=lambda node: node.name in word)
            if len(length) == 0:
                new[str(j) + word] = Node(word, value=1, parent=new[str(j-1) + prev])
            elif len(length) > 0:
                try:
                    new[str(j) + word].value = new[str(j) + word].value + 1
                except KeyError:
                    new[str(j) + word] = Node(word, value=1, parent=new[str(j-1) + prev])
        prev = word

# print(RenderTree(new["0Start"]))

exporter = JsonExporter(indent=2, sort_keys=True)
print(exporter.export(new["0Start"]))

with open('greeneggs.json', "w") as outfile:
    outfile.write(exporter.export(new["0Start"]))

