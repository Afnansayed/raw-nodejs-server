import { routes } from './RoutesHandler';

function dynamicRouteHandler(method: string, url: string) {
  const methodsMap = routes.get(method);
  if (!methodsMap) return null;

  for (const [routePath, handler] of methodsMap.entries()) {
    const routesPaths = routePath.split('/');
    const urlPaths = url.split('/');

    if (routesPaths.length !== urlPaths.length) continue;
    const params: any = {};
    let isMatch = true;

    for (let i = 0; i < routesPaths.length; i++) {
      if (routesPaths[i]?.startsWith(':')) {
        params[routesPaths[i]?.substring(1)!] = urlPaths[i];
      } else if (routesPaths[i] !== urlPaths[i]) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      return { handler, params };
    }
  }
  return null;
}

export default dynamicRouteHandler;
