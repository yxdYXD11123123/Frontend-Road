import "reflect-metadata";
import { Router } from "express";

export const router = Router();

export function controller(routePrefix: string) {
  return function (constructor: Function) {
    for (const key in constructor.prototype) {
      const path = Reflect.getMetadata("path", constructor.prototype, key);
      const handler = constructor.prototype[key];
      if (path) {
        router.get(`${routePrefix}${path}`, handler);
      }
    }
  };
}
