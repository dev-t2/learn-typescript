const Controller = (module: string) => (constructor: Function) => {
  console.log(`${module} controller`);
};

@Controller('users')
class UsersContoller {
  constructor() {}
}
