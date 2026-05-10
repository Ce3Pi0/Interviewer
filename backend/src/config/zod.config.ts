import { z as zod } from "zod";
import { createErrorMap } from "zod-validation-error";

zod.config({
  customError: createErrorMap(),
});

export default zod;
