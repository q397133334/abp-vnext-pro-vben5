FROM node:20-slim AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_OPTIONS=--max-old-space-size=8192
ENV TZ=Asia/Shanghai

RUN corepack enable

WORKDIR /vben5

# copy package.json and pnpm-lock.yaml to workspace
COPY . /vben5

RUN pnpm install --frozen-lockfile
# 如果你的项目中使用了 antd，需要执行下面的命令
RUN pnpm build:antd

# 如果你的项目中使用了 element-ui，需要执行下面的命令
#RUN pnpm build:ele

# 如果你的项目中使用了 naive，需要执行下面的命令
#RUN pnpm build:naive

RUN echo "Builder Success 🎉"

FROM nginx:stable-alpine AS production

RUN echo "types { application/javascript js mjs; }" > /etc/nginx/conf.d/mjs.conf

# 如果你的项目中使用了 antd，需要执行下面的命令
COPY --from=builder /vben5/apps/web-antd/dist /usr/share/nginx/html

# 如果你的项目中使用了 element-ui，需要执行下面的命令
#COPY --from=builder /vben5/apps/web-ele/dist /usr/share/nginx/html

# 如果你的项目中使用了 naive，需要执行下面的命令
#COPY --from=builder /vben5/apps/web-naive/dist /usr/share/nginx/html

COPY --from=builder /vben5/_nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

# start nginx
CMD ["nginx", "-g", "daemon off;"]
