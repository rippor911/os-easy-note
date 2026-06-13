import re, zlib

with open("os.2025-期末考试.pdf", 'rb') as f:
    data = f.read()

# Find font objects and ToUnicode CMap
text = data.decode('latin-1', errors='ignore')

# Look for CMap / ToUnicode entries
cmap_refs = re.findall(r'/ToUnicode (\d+ \d+ R)', text)
print(f"ToUnicode refs: {cmap_refs}")

# Look for the CMap stream objects
# Find all objects and their content
objs = list(re.finditer(r'(\d+ \d+ obj.*?endobj)', text, flags=re.DOTALL))
print(f"Total objects: {len(objs)}")

# Find ToUnicode CMaps
for m in objs:
    obj_content = m.group(1)
    if 'CMap' in obj_content or 'bfchar' in obj_content or 'bfrange' in obj_content:
        # Extract stream
        stream_match = re.search(r'stream\r?\n(.*?)endstream', obj_content, flags=re.DOTALL)
        if stream_match:
            sd = stream_match.group(1).strip()
            try:
                decoded = zlib.decompress(sd.encode('latin-1'))
                print(f"\nCMap:\n{decoded.decode('latin-1', errors='ignore')[:2000]}")
            except:
                print(f"\nCMap (raw):\n{stream_match.group(1)[:500]}")

# Also find the font descriptors and their CMap
for m in objs:
    obj_content = m.group(1)
    if '/FontDescriptor' in obj_content or '/CIDSystemInfo' in obj_content:
        print(f"\nFont object:\n{obj_content[:500]}")