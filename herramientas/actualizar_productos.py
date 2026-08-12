from pathlib import Path
import pandas as pd
import json

#=======================================
# RUTAS
#=======================================

BASE_DIR=Path(__file__).resolve().parent.parent

excel=BASE_DIR/"productos.xlsx"
salida=BASE_DIR/"data"/"productos.json"

print("=======================================")
print("Carpeta del proyecto:",BASE_DIR)
print("Excel buscado:",excel)
print("=======================================")

#=======================================
# COMPROBAR EXCEL
#=======================================

if not excel.exists():

    print("ERROR: No se encontró productos.xlsx")
    print("Debe estar en:",excel)

    raise SystemExit

#=======================================
# LEER EXCEL
#=======================================

df=pd.read_excel(excel)

# Limpiar espacios de los encabezados
df.columns=df.columns.astype(str).str.strip().str.lower()

print("Columnas detectadas:")
print(df.columns.tolist())

#=======================================
# COMPROBAR COLUMNAS
#=======================================

columnas_requeridas=[
    "id",
    "producto",
    "categoria",
    "precio",
    "destacado"
]

faltantes=[
    columna
    for columna in columnas_requeridas
    if columna not in df.columns
]

if faltantes:

    print()
    print("ERROR: faltan estas columnas:")
    print(faltantes)

    print()
    print("Columnas encontradas:")
    print(df.columns.tolist())

    raise SystemExit

#=======================================
# CREAR PRODUCTOS
#=======================================

productos=[]

columnas_requeridas=[
    "id",
    "producto",
    "categoria",
    "precio",
    "destacado",
    "descripcion"
]

faltantes=[
    columna
    for columna in columnas_requeridas
    if columna not in df.columns
]

if faltantes:

    print("ERROR: faltan columnas en productos.xlsx:")
    print(faltantes)

    raise SystemExit

for _,fila in df.iterrows():

    producto={
        "id":int(fila["id"]),
        "nombre":str(fila["producto"]).strip(),
        "categoria":str(fila["categoria"]).strip(),
        "precio":float(fila["precio"]),
        "imagen":f"{int(fila['id'])}.webp",
        "destacado":str(fila["destacado"]).strip().upper()=="SI",
        "descripcion":str(fila["descripcion"]).strip()
    }

    productos.append(producto)

#=======================================
# GUARDAR JSON
#=======================================

salida.parent.mkdir(
    parents=True,
    exist_ok=True
)

with open(
    salida,
    "w",
    encoding="utf8"
) as archivo:

    json.dump(
        productos,
        archivo,
        indent=4,
        ensure_ascii=False
    )

#=======================================
# RESULTADO
#=======================================

print()
print("=======================================")
print("Productos procesados:",len(productos))
print("JSON generado correctamente.")
print("Ubicación:",salida)
print("=======================================")