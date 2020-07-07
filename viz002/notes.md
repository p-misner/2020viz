# Notes for this visualizaiton

## d3.separation()

This function specifies how far apart various nodes are in the graph. Two nodes are passed to the seperation function and this funciton checks if the nodes are siblings or children of each other. If the nodes are siblings, the separation is 1 (idk what unit) and if one node is a child of another, separation is larger at 2. 

## d3.sort()

This function takes in two nodes (siblings it looks like) and sort them by alphabetizing them so that the higher alphabetical word shows up first in the node grou.