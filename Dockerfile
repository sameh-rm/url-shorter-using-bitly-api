FROM python:3.7-alpine
LABEL author="Sameh Ramadan"

COPY ./requirements.txt /app/requirements.txt
WORKDIR /app

# Environment variables
ENV SECRET_KEY=YOUR_SECRET_KEY
ENV MONGO_URI=YOUR_MONGO_URI
ENV MONGO_TEST_URI=YOUR_MONGO_TEST_URI
# DOMAIN variable is added as a prefix tot the shortened link id
ENV DOMAIN=YOUR_DOMAIN
ENV ACCESS_TOKEN=YOUR_ACCESS_TOKEN

RUN python3 -m pip install -r requirements.txt
COPY . /app/


EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["manage.py","run"]