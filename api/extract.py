# api/extract.py
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
from quantized import Quantized

app = FastAPI()

# You may not need CORS in production on Vercel if your frontend and backend are on the same domain.
# For local testing, keep it.
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

@app.post("/extract")
async def extract_colors(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        
        # Use quantized for efficient color palette generation
        # It's a much smaller library than scikit-learn
        quantizer = Quantized(image)
        colors = quantizer.quantize(n_colors=8)
        
        palette = []
        for r, g, b in colors:
            hex_code = "#{:02x}{:02x}{:02x}".format(r, g, b)
            palette.append({
                "hex": hex_code,
                "rgb": f"rgb({r},{g},{b})",
                "name": "" # Placeholder for a color name
            })
            
        return JSONResponse(content={"palette": palette})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
