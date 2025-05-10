import express from "express";

import authRoute from "./auth.route.js";
import jobRoutes from "./job.route.js";
import clientRoutes from "./client.route.js";
import materialRoutes from "./material.route.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/jobs",
    route: jobRoutes,
  },
  {
    path: "/clients",
    route: clientRoutes,
  },
  {
    path: "/materials",
    route: materialRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
