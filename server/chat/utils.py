from io import BytesIO

from docx import Document
from pypdf import PdfReader


def read_file(content: bytes, ext="txt"):

    match ext:
        case "txt":
            return content.decode("utf-8")
        case "pdf":
            reader = PdfReader(BytesIO(content))

            result = ""
            for page in reader.pages:
                result += page.extract_text() or ""

            return result
        case "docx":
            doc = Document(BytesIO(content))

            return "\n".join(paragraph.text for paragraph in doc.paragraphs)
