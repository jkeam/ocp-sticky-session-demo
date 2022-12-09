FROM registry.access.redhat.com/ubi9/nodejs-18-minimal@sha256:0ae55fbc6d39f6df4337984cdf3357946e7bcc7d9059e6b337207146b7cc281c

WORKDIR /app

USER root
COPY package*.json .
RUN npm install --production

COPY src .

EXPOSE 4000
USER nobody
ENTRYPOINT ["npm", "start"]
