
from fastapi import FastAPI, UploadFile, File

from fastapi.responses import JSONResponse

from PIL import Image

import numpy as np

from sklearn.cluster import KMeans



app = FastAPI()



@app.post("/extract")

async def extract_colors(file: UploadFile = File(...)):

    image = Image.open(file.file).convert("RGB")

    image = image.resize((128, 128))  # Resize for speed

    data = np.array(image).reshape((-1, 3))



    kmeans = KMeans(n_clusters=8, random_state=42).fit(data)

    colors = kmeans.cluster_centers_.astype(int)



    palette = []

    for r, g, b in colors:

        hex_code = "#{:02x}{:02x}{:02x}".format(r, g, b)

        palette.append({

            "hex": hex_code,

            "rgb": "rgb({0},{1},{2})".format(r, g, b),

            "hsla": "hsla({0}, 100%, 50%, 1)".format(int(r/255*360)),

            "name": "Color Name TBD"

        })



    return JSONResponse(content={"palette": palette})

