from PyPDF2 import PdfReader
from io import BytesIO

def read_pdf(file_bytes: bytes, filename: str):
    file_type = filename.split('.')[-1].lower()
    texts = []
    if file_type == 'pdf':
        reader = PdfReader(BytesIO(file_bytes))
        for page in reader.pages:
            texts.append(page.extract_text())
        return texts
    elif file_type == 'txt':
        texts.append(file_bytes.decode('utf-8'))
        return texts
    else:
        raise ValueError(f"Unsupported file type {file_type}")
