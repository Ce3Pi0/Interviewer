import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware.js";
import {
  getAllProblemsService,
  getCountProblemsService,
  getProblemByIdService,
  createProblemService,
} from "../services/problem.service.js";
import { HTTP_OK } from "../lib/httpError.js";
import {
  problemIdParamsSchema,
  createProblemSchema,
} from "../validators/problem.validator.js";

export const getCountProblemsController = asyncHandler(
  async (_: Request, res: Response) => {
    const count = await getCountProblemsService();
    return res.status(HTTP_OK.code).json({ count });
  },
);

export const getAllProblemsController = asyncHandler(
  async (_: Request, res: Response) => {
    const problems = await getAllProblemsService();
    return res.status(HTTP_OK.code).json({ problems });
  },
);

export const createProblemController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user!;

    const data = createProblemSchema.parse(req.body);
    const problem = await createProblemService(user, data);
    return res.status(HTTP_OK.code).json({ problem });
  },
);

export const getProblemByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = problemIdParamsSchema.parse(req.params);

    const problem = await getProblemByIdService(id);

    return res.status(HTTP_OK.code).json({ problem });
  },
);
