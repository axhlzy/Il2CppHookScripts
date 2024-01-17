#!/usr/bin/env python3

# 1. convert empty objects to non-empty objects, because empty objects are not valid
# 2. convert imports to .js imports, because frida can't find them otherwise

import re
import sys
import json

data = sys.stdin.read()

hdr, data = data.split('\n', 1)
if hdr != '📦':
    raise ValueError("No package header in input")

parts = data.split("✄")

data_idx = -1
index = []
for line in parts[0].split('\n'):
    if line == '':
        continue
    if line.startswith('↻'):
        index.append({'literal': line})
    else:
        size, pathname = line.split(' ', 2)
        data_idx += 1
        index.append({'size': int(size), 'name': pathname, 'data_idx': data_idx})

datas = [part.strip() for part in parts[1:]]

# Patch includes, add "js" suffix to names
pattern = re.compile(r'(import|from)\s*(["\'])\.[^\'"]+\2')
def add_js_suffix(match):
    if not match.group(0).endswith('.js' + match.group(2)):
        return match.group(0)[:-1] + '.js' + match.group(2)
    return match.group(0)
datas = [pattern.sub(add_js_suffix, data) for data in datas]

# Convert empty objects to non-empty objects and fix new lengths
for entry in index:
    size = entry.get('size')
    if size is not None:
        if len(datas[entry['data_idx']]) == 0:
            datas[entry['data_idx']] += ' '
        entry['size'] = len(datas[entry['data_idx']].encode())

# Write to stdout
sys.stdout.write(hdr + '\n')
for entry in index:
    if 'literal' in entry:
        sys.stdout.write(entry['literal'] + '\n')
    else:
        sys.stdout.write(f"{entry['size']} {entry['name']}\n")
for data in datas:
    sys.stdout.write('✄\n')
    sys.stdout.write(data + '\n')

