import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { Body, Example, Post, Request, Route } from 'tsoa';
import { authDto } from './auth-dto';
import express from 'express';
import { BodyTypeOf, handleRes, RightExampleType } from '../utils/handle-res';
import { ReqTasks } from '../utils/task-from-req';

@Route('/auth')
class AuthController {
  constructor(private authService: Service<'auth'>) {}

  @Post('/signup')
  @Example<RightExampleType<typeof AuthController.prototype.signup>>({
    username: 'username',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@email.email',
    createdAt: new Date(),
  })
  signup(
    @Request() req: express.Request,
    @Body() body: BodyTypeOf<typeof authDto.input.register>,
  ) {
    return pipe(
      ReqTasks(req)(authDto.input.register)<InRegisterUser>(),
      TE.chainW(this.authService.preRegister),
      handleRes(req.res),
    );
  }

  @Post('/login')
  @Example<RightExampleType<typeof AuthController.prototype.login>>({
    jwt: 'true',
  })
  login(
    @Request() req: express.Request,
    @Body() body: BodyTypeOf<typeof authDto.input.login>,
  ) {
    return pipe(
      ReqTasks(req)(authDto.input.login)<InLoginUser>(),
      TE.chainW(this.authService.login),
      TE.map(authDto.output.label('jwt')),
      handleRes(req.res),
    );
  }

  @Post('/confirmation')
  @Example<RightExampleType<typeof AuthController.prototype.confirmation>>({
    id: '63c25f4114226535d99056dd',
    username: 'username',
    email: 'email@email.email',
    birthday: new Date(),
    country: 'Iran',
    firstname: 'firstname',
    lastname: 'lastname',
  })
  confirmation(
    @Request() req: express.Request,
    @Body() body: BodyTypeOf<typeof authDto.input.confirm>,
  ) {
    return pipe(
      ReqTasks(req)(authDto.input.confirm)<InConfirmRegister>(),
      TE.chainW(this.authService.confirmAndRegister),
      handleRes(req.res),
    );
  }
}

export const initAuthController = (s: Service<'auth'>) => new AuthController(s);
