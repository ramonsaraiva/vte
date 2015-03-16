#!/usr/bin/env python

import requests
import json

from pprint import pprint

s = requests.Session()
base_url = 'http://127.0.0.1:3000'
db_url = base_url + '/db'
ids = [2, 8, 13, 15, 22, 30, 88]

def get_modules():
	return s.get(base_url + '/modules').json()

def list(m):
	url = '{}/{}'.format(db_url, m)
	r = s.get(url)
	return r

def get(m, id):
	url = '{}/{}/{}'.format(db_url, m, id)
	r = s.get(url)
	return r

def create(m, v):
	url = '{}/{}'.format(db_url, m)
	r = s.post(url, data = v)
	return r

def patch(m, v, id):
	url = '{}/{}/{}'.format(db_url, m, id)
	r = s.patch(url, data = v)
	return r

def delete(m, id):
	url = '{}/{}/{}'.format(db_url, m, id)
	r = s.delete(url)
	return r

#modules = get_modules()
#for i in modules:
#	print i, modules[i]
modules = \
[
	'pessoas',
	'condominios',
	'unidades',
	'moradores'
]

for m in range(0, len(modules)):
	p = 'data/{}.json'.format(modules[m])
	f = file(p)
	data = json.load(f)
	f.close()

	for r in data:
		create(modules[m], r)

#r = get('moradores', 1);
#pprint(r.json());

"""
for i in ids:
	delete('pessoas', i)

for i in ids:
	r = get('pessoas', i)
	v = r.json()
	print v
	v['nome'] = 'igualop'
	v.pop('email', None)
	patch('pessoas', v, i)
	r = get('pessoas', i)
	print r.json()
"""

#for i in ids:
#	r = get('moradores', i)
#	delete('moradores', i)
#	print r.json()

#print '*** POPULATE ***\n'
#for i in data:
#	v = create(i)
#	#print 'status: {}\n'.format(v.status_code)
#print '*** ***'

#print '*** GET LIST ***\n'
#p = list()
#pprint(p.json())
#print '*** ***'

#print '*** GET 2 ***\n'
#p = get('pessoas', 2)
#pprint(p.json())
#
#print '*** GET 50 ***\n'
#p = get('pessoas', 50)
#pprint(p.json())
#
#print '*** GET 88 ***\n'
#p = get('pessoas', 88)
#pprint(p.json())

#print '*** DELETE 2 ***\n'
#r = delete(2)
#print 'status: {}'.format(r.status_code)
#print '*** ***'

#print '*** GET NEW LIST ***.\n'
#p = list()
#pprint(p.json())
#print '*** ***'
