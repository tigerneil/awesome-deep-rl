"""Rebuild the browser catalog from the repository's Markdown sources."""
import json
import re
from pathlib import Path
root = Path(__file__).resolve().parents[1]
readme = (root / 'README.md').read_text()
category = 'Overview'
mapping = {}
external = []
for line in readme.splitlines():
    if line.startswith('## '):
        category = line[3:].strip()
    if not line.startswith('* '):
        continue
    links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', line)
    for title, url in links:
        if url.endswith('.md'):
            mapping[url] = (category, title)
    if links and not any(url.endswith('.md') for _, url in links):
        title, url = links[0]
        if title.lower() in ('arxiv', 'paper', 'repo'):
            title = line[2:line.index('[')].strip() or title
        if url.startswith(('https://', 'http://')):
            external.append(dict(id='external-'+str(len(external)), title=title, category=category, description=re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', line[2:]), url=url, file='', body=''))
items=[]
for path in sorted(root.glob('*.md')):
    body=path.read_text()
    cat,title=mapping.get(path.name, ('Frontier guide' if path.stem=='2026' else 'Research notes', path.stem))
    if path.stem=='README': cat,title='Overview','The complete Deep RL collection'
    plain=re.sub(r'!?\[([^\]]*)\]\([^)]+\)',r'\1',body)
    lines=[re.sub(r'^[#>*\s-]+','',s).strip() for s in plain.splitlines() if s.strip() and not s.startswith('!')]
    description=' '.join(lines[1:])[:230] or 'Explore the original research note and its linked resources.'
    items.append(dict(id=path.stem,title=title,category=cat,description=description,file=path.name,url=path.name,body=body))
(root/'assets'/'catalog.js').write_text('window.RL_CATALOG = '+json.dumps(items+external,ensure_ascii=False)+';\n')
print(f'Indexed {len(items)} local documents and {len(external)} external resources.')
