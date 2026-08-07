from pathlib import Path
import pandas as pd
import json

#---------------------------------------
# Configuración
#---------------------------------------

excel=Path("../productos.xlsx")

salida=Path("../data/productos.json")

#---------------------------------------
# Leer Excel
#---------------------------------------

df=pd.read_excel(excel)

productos=[]

for _,fila in df.iterrows():

    productos.append({

        "id":int(fila["id"]),

        "categoria":fila["categoria"],

        "nombre":fila["nombre"],

        "precio":float(fila["precio"]),

        "imagen":f"{fila['id']}.webp"
    })

#---------------------------------------
# Guardar JSON
#---------------------------------------

with open(salida,"w",encoding="utf8") as archivo:
    json.dump(productos,archivo,indent=4,ensure_ascii=False)

print("JSON generado correctamente.")