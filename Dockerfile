# syntax=docker/dockerfile:1
FROM python:3.9-alpine

# Variables that python is going to need
ARG API_KEY
ARG SECRET_KEY
ENV API_KEY=${API_KEY}
ENV SECRET_KEY=${SECRET_KEY}
WORKDIR /usr/src/app
# install node and yarn
RUN apk add --update nodejs npm && npm install --global yarn
# copy all our files
COPY . . 

#-----FRONTEND-----

# get into the frontend
WORKDIR /usr/src/app/frontend
# download packages and move into the backend
RUN yarn install && yarn relocate

#-----BACKEND-----

WORKDIR /usr/src/app/Backend
# Install libraries needed
RUN python -m pip install -r requirements.txt
# collect the static files, make our database migrations, and run them
# we'll just use the debug argument here because all we need to do is collect the static files
# debug shouldn't be set when we start running
RUN DJANGO_DEBUG=1 python ./whichepisode_web/manage.py collectstatic && DJANGO_DEBUG=1 python ./whichepisode_web/manage.py makemigrations && DJANGO_DEBUG=1 python ./whichepisode_web/manage.py migrate
EXPOSE 8000


CMD python ./whichepisode_web/manage.py runserver --nostatic 0.0.0.0:$PORT
