import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';
import { Example, Get, Path, Query, Request, Route } from 'tsoa';
import express from 'express';
import {
  handleRes,
  ParamsTypeOf,
  QueryTypeOf,
  RightExampleType,
} from '../utils/handle-res';
import { ReqTasks } from '../utils/task-from-req';
import { userDto } from './user-dto';
import { inspect } from '../utils/inspect';

@Route('/user')
class UserController {
  constructor(private userService: Service<'user'>) {}

  @Get('/')
  @Example<RightExampleType<typeof UserController.prototype.getAll>>({
    count: 1,
    values: [
      {
        id: '63bea0fa1bc80f6d62334fb4',
        username: 'username',
        email: 'email@email.email',
      },
    ],
  })
  getAll(
    @Request() req: express.Request,
    @Query() num: QueryTypeOf<typeof userDto.input.getAll>['num'],
    @Query() page: QueryTypeOf<typeof userDto.input.getAll>['page'],
    @Query() search: QueryTypeOf<typeof userDto.input.getAll>['search'],
  ) {
    return pipe(
      ReqTasks(req)(userDto.input.getAll)<InGetAllUsers>(),
      TE.map(inspect('user')),
      TE.chainW(this.userService.getAllUsers),
      handleRes(req.res),
    );
  }

  @Get('/:userId')
  @Example<RightExampleType<typeof UserController.prototype.getById>>({
    user: {
      id: '63bea0fa1bc80f6d62334fb4',
      username: 'username',
      email: 'email@email.email',
      firstname: 'firstname',
      lastname: 'lastname',
      birthday: new Date(),
      country: 'Iran',
    },
  })
  getById(
    @Request() req: express.Request,
    @Path() userId: ParamsTypeOf<typeof userDto.input.getOne>['userId'],
  ) {
    return pipe(
      ReqTasks(req)(userDto.input.getOne)<InGetOneUser>(),
      TE.map(inspect('user')),
      TE.chainW(this.userService.getOneUser),
      TE.map(userDto.output.label('user')),
      handleRes(req.res),
    );
  }
}

export const initUserController = (s: Service<'user'>) => new UserController(s);
