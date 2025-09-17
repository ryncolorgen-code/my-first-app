# api/extract.py
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image

app = FastAPI()

origins = [
    "https://my-first-app-eosin.vercel.app/", # Your Vercel frontend URL
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract")
async def extract_colors(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        
        # Resize and quantize the image to get a limited color palette
        quantized_image = image.quantize(colors=8, method=Image.Quantize.MEDIANCUT)
        
        # Get the palette from the quantized image
        palette_list = quantized_image.getpalette()[:8 * 3]
        
        palette = []
        for i in range(0, len(palette_list), 3):
            r, g, b = palette_list[i], palette_list[i+1], palette_list[i+2]
            
            hex_code = f"#{r:02x}{g:02x}{b:02x}"
            palette.append({
                "hex": hex_code,
                "rgb": f"rgb({r},{g},{b})",
                "name": ""
            })
            
        return JSONResponse(content={"palette": palette})
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
