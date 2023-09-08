FROM node:alpine as BUILD_IMAGE
WORKDIR /app
COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile
COPY . .

# build
RUN yarn build

# remove dev dependencies
FROM node:alpine
WORKDIR /app
ENV NODE_ENV production

# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/.env ./.env
COPY --from=BUILD_IMAGE /app/craco.config.js  ./craco.config.js

EXPOSE 3000
CMD ["yarn", "start"]