FROM nginx:1.27-alpine

LABEL maintainer="RGN Systems"
LABEL description="Quinta do Caçador Residence - Site Institucional"

# Substitui a configuração padrão do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados e organizados no padrão W3C
COPY dist/ /usr/share/nginx/html/

# Verificação de integridade do container
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
