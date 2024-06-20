#!/bin/bash

# Activate virtualenv
# python3.12 -m venv .venv
# source .venv/bin/activate

# Run gunicorn
gunicorn backserver.wsgi:application --bind 0.0.0.0:8000
