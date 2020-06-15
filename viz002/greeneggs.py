"""
Sources:
viz tutorials
https://bl.ocks.org/d3noob/8375092
https://observablehq.com/@d3/hierarchical-edge-bundling?collection=@d3/d3-hierarchy

creating tree data:
https://anytree.readthedocs.io/en/2.8.0/intro.html

"""
import pandas as pd
from anytree import Node, RenderTree

print("jello 2 world")
file = pd.read_csv("./fulltext.csv")
# print(file.head())
mydict = {}

for i in range(0, 1):
    mydict[str(i)] = Node("udo", value=1)
    Node("marc", value=1, parent=mydict[str(i)]);
lian = Node("lian", value=1)

print(RenderTree(mydict["0"]))
mydict["0"].value = mydict["0"].value+1
print(mydict["0"].value)
print(RenderTree(mydict["0"]))
