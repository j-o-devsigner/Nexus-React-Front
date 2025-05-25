#!/bin/sh
echo "window.env = {" > /usr/share/nginx/html/env.js
echo "  REACT_APP_ROUTE_USERS: '${REACT_APP_ROUTE_USERS}'," >> /usr/share/nginx/html/env.js
echo "  REACT_APP_ROUTE_QUOTES: '${REACT_APP_ROUTE_QUOTES}'," >> /usr/share/nginx/html/env.js
echo "  REACT_APP_ROUTE_PRODUCTS: '${REACT_APP_ROUTE_PRODUCTS}'," >> /usr/share/nginx/html/env.js
echo "  REACT_APP_ROUTE_CUSTOMERS: '${REACT_APP_ROUTE_CUSTOMERS}'," >> /usr/share/nginx/html/env.js
echo "  REACT_APP_ROUTE_LOGIN: '${REACT_APP_ROUTE_LOGIN}'" >> /usr/share/nginx/html/env.js
echo "};" >> /usr/share/nginx/html/env.js
exec nginx -g 'daemon off;'
