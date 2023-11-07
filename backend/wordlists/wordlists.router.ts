import {  Router } from "express";
import createWordlistValidator from "./wordlists.validator";
import { wordlistsController } from "./wordlists.controller";

const wordlistRouter: Router = Router()

wordlistRouter.post(
  '/wordlists', 
  createWordlistValidator,
  wordlistsController.getWordlist
)

export default wordlistRouter;