FROM python:3.9-alpine

WORKDIR /usr/src/app
# install node
RUN apk add --no-cache nodejs
# install yarn
RUN npm install --global yarn
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
# collect the static files
RUN python ./whichepisode_web/manage.py collectstatic

EXPOSE ${PORT} 8000

ENV API_KEY=${API_KEY}
ENV SECRET_KEY=${SECRET_KEY}

CMD ["python", "./whichepisode_web/manage.py", "runserver", "--nostatic"]