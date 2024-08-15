import { Express } from "express-serve-static-core";
import publicRoutes from "./public";
import authRoutes from "./api/auth-route";

export default class Routes {
  public static configure(app: Express): void {
    app.use("/", publicRoutes);
    app.use("/auth", authRoutes);
  }
}
