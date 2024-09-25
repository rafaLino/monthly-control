FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG MODE
ARG VITE_DOMAIN
ARG VITE_CLIENT_ID
ARG VITE_API_SECRET
ARG VITE_API_URL
ARG VITE_PARAMS_API_URL

ENV MODE=${MODE}
ENV VITE_DOMAIN=${VITE_DOMAIN}
ENV VITE_CLIENT_ID=${VITE_CLIENT_ID}
ENV VITE_API_SECRET=${VITE_API_SECRET}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_PARAMS_API_URL=${VITE_PARAMS_API_URL}


COPY . /app
WORKDIR /app
COPY . .
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base AS final
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist


FROM nginx:alpine AS prod
COPY --from=final /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]