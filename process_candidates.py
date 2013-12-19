#!/usr/bin/env python

from os.path import dirname, abspath, join
from pprint import pprint
import codecs
import csv
import json


FIXTURES = join(abspath(dirname(__file__)), 'fixtures')
CSV_FIXTURE_PATH = join(FIXTURES, 'candidaturas-psol-respostas.csv')
JSON_FIXTURE_PATH = join(FIXTURES, 'candidaturas-psol-respostas.json')


def process():
    data = {}
    with open(CSV_FIXTURE_PATH) as f:
        reader = csv.DictReader(f, delimiter=',', quotechar='"')
        for row in reader:
            for category, share in row.items():
                if not category or not share or 'data e hora' in category:
                    continue
                category = category.decode('utf-8')
                share = share.decode('utf-8')

                data.setdefault(category, {})
                data[category].setdefault(share, 0)
                data[category][share] += 1
    with codecs.open(JSON_FIXTURE_PATH, 'w', 'utf-8') as f:
        json.dump(data, f, ensure_ascii=False)


if __name__ == '__main__':
    process()
