import requests
import json
params = {"id", "school.name","2013.student.size"}
degnum = ["2","3"]

response = requests.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?school.degrees_awarded.predominant=3&page=20&fields=id,school.name,school.zip,2015.student.size,2015.student.demographics.race_ethnicity.white,2015.student.demographics.race_ethnicity.black&api_key=BCsekrDtBQ7EFoKrEfECqA2JbxZSpVJ9Rx5bBice")

data = response.json()
# print(data)
print(data["metadata"])
# json.dump(data, open('../data/schoolnames.json', 'a'), sort_keys=True, indent=4, separators=(',', ': '))