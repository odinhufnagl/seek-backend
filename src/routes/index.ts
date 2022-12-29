import usersRoutes from "./users";
import authRoutes from "./auth";
import mapsRoutes from "./maps";
import jobsRoutes from "./jobs";
import tagsRoutes from "./tags";
import eTypesRoutes from "./employmentTypes";
import userJobRatingsRoutes from "./userJobRatings";
import predictedUserJobRatingsRoutes from "./predictedUserJobRatings";
import { Router } from "express";

const mainRouter = Router();

mainRouter.use("/users", usersRoutes);
mainRouter.use("/jobs", jobsRoutes);
mainRouter.use("/auth", authRoutes);
mainRouter.use("/maps", mapsRoutes);
mainRouter.use("/tags", tagsRoutes);
mainRouter.use("/employmentTypes", eTypesRoutes);
mainRouter.use("/userJobRatings", userJobRatingsRoutes);
mainRouter.use("/predictedUserJobRatings", predictedUserJobRatingsRoutes);

export default mainRouter;
