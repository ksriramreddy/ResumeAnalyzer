from fastapi import APIRouter , UploadFile , File , Form
from api.readpfd import read_pdf
from api.ratepdf import rate_pdf
import json
router = APIRouter()

@router.post('/uploadfile')
async def upload_file(role : str = Form(...) ,file : UploadFile = File(...)):
    print(file)
    if not file or not role:
        return {
            "error" : "File or Role is missing"
        }
    try:
        contents = await file.read()
        text = read_pdf(contents, file.filename)
        
        print(text)
        print(role)
        rating = rate_pdf(text , role)
        return json.loads(rating)
    except Exception as e:
        print(f"error >>: {str(e)}")
        return {
            "error>>" : f"{str(e)}"
        }