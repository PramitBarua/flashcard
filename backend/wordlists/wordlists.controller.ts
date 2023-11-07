import * as fs from "fs";
import path from "path";
import { validationResult } from "express-validator";
import { Request, Response } from "express";


class WordlistsController {
  public async getWordlist(req: Request, res: Response):Promise<Response> {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({error: error.array()})
    }

    const module = req.body.module.replace('.', '_')
    const chapterName = req.body.chapterName.replace(' ', '_')
    const fileNamePart = `${module}_${chapterName}`

    const dirPath = path.join(process.cwd(), 'assets/wordlists/')

    try {
      const files = await fs.promises.readdir(dirPath);
      const targetFile = files.find(file => file.includes(fileNamePart))
      if (!targetFile) {
        throw new Error('no file found')
      }
      const data = await fs.promises.readFile(path.join(dirPath, targetFile), 'utf8')
      return res.status(200).json(JSON.parse(data))
      
    } catch(err) {
      console.log(err)
      return res.status(500).json({error: 'internal server error'})
    }
  }
}

export const wordlistsController = new WordlistsController();