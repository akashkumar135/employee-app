def chunk_text(text: str, chunk_size: int = 300, overlap: int = 50) -> list[str]:

    if len(text) <= chunk_size:
        return [text]

    chunk_text = []

    left_ptr = 0
    right_ptr = 0
    chunk_count = 0

    text_size = len(text)

    while right_ptr < text_size:
        if len(chunk_text) <= chunk_count:
            chunk_text.append("")

        chunk_text[chunk_count] += text[right_ptr]

        right_ptr += 1

        if (right_ptr >= text_size) or (right_ptr - left_ptr) >= chunk_size:
            left_ptr += chunk_size - overlap
            right_ptr = left_ptr
            chunk_count += 1

    return chunk_text


def chunk_all_documents(
    documents: dict[str, str],
    chunk_size: int = 300,
    overlap: int = 50,
) -> list[dict[str, str]]:

    document_chunks = []

    for filename, content in documents.items():
        chunks = chunk_text(content["text"], chunk_size, overlap)

        index = 0
        for chunk in chunks:
            document_chunks.append(
                {
                    "text": chunk,
                    "source": filename,
                    "metadata": content["metadata"],
                    "chunk_id": f"{filename}.txt_chunk_{index}",
                }
            )
            index += 1
    return document_chunks
