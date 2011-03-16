import os
import sys

sys.path.append('/srv/www/frontInRio/application')

os.environ['PYTHON_EGG_CACHE'] = '/srv/www/frontInRio/.python-egg'
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
