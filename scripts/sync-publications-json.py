#!/usr/bin/env python3

import csv
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / 'src' / 'data' / 'Papers.csv'
JSON_PATH = ROOT / 'src' / 'data' / 'papers.json'


def main():
    with CSV_PATH.open(newline='', encoding='utf-8') as csv_file:
        rows = list(csv.DictReader(csv_file))

    JSON_PATH.write_text(
        json.dumps(rows, ensure_ascii=True, separators=(',', ':')),
        encoding='utf-8',
    )

    print(f'Synced {len(rows)} publications to {JSON_PATH}')


if __name__ == '__main__':
    main()
