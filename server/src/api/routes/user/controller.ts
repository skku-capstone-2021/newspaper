import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import UsersService from "@/service/user";

export const handleCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, password } = req.body;

    const userServiceInstance = Container.get(UsersService);

    const ret = await userServiceInstance.createUser({
      id,
      password,
    } as any);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};

export const handleSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, password } = req.body;

    const userServiceInstance = Container.get(UsersService);

    const ret = await userServiceInstance.signin({
      id,
      password,
    } as any);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};

export const getKeyword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;

    const userServiceInstance = Container.get(UsersService);

    const ret = await userServiceInstance.getKeyword({
      id,
    } as any);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};

export const saveKeywords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { keywords, id } = req.body;

    const userServiceInstance = Container.get(UsersService);

    const ret = await userServiceInstance.saveKeywords({
      id,
      keywords,
    } as any);

    return res.json(ret);
  } catch (e) {
    return next(e);
  }
};
