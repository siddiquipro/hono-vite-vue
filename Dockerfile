FROM node:lts-alpine AS base


FROM base AS builder

RUN apk add --no-cache gcompat
WORKDIR /app

COPY package*json ./
RUN npm ci  

COPY . . 
RUN npm run build  
RUN npm prune --production


FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/build /app/build
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 8080

CMD ["node", "/app/build/index.js"]