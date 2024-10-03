FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app
    
COPY docker/.env.docker .env



FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store   
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS final
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist


FROM nginx:alpine AS prod
COPY --from=final /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]