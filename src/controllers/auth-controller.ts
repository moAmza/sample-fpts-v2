import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { Body, Post, Request, Route } from 'tsoa';
import { authDto } from './auth-dto';
import express from 'express';
import { BodyTypeOf, handleRes } from '../utils/handle-res';
import { ReqTasks } from '../utils/task-from-req';

@Route('/')
class AuthController {
  constructor(private authService: Service<'auth'>) {}

  @Post('/')
  register(
    @Request() req: express.Request,
    @Body() body: BodyTypeOf<typeof authDto.input.register>,
  ) {
    return pipe(
      ReqTasks(req)(authDto.input.register)<InRegisterUser>(),
      TE.chainW(this.authService.register),
      TE.map(authDto.output.status(true)),
      handleRes(req.res),
    );
  }
}

export const initAuthController = (s: Service<'auth'>) => new AuthController(s);