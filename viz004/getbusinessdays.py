import json

with open("./data/legislativesessions.json") as f:
    states = json.load(f)
    for s in states:
        print(s,": ",states[s]["2019"]["businessdays"])
    f.close()