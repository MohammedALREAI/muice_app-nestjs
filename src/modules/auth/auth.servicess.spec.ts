import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from './auth.service';
import { JwtStrategy } from './stratigies/jwt-strategy';
import { GoogleStrategy } from './stratigies/google.strategy';
import { FacebookStrategy } from './stratigies/facebook.strategy';



beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [AuthService, JwtStrategy, GoogleStrategy, FacebookStrategy],

  }).compile()


})
describe("load module auth service  and test him", () => {
  let authService: AuthService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService]
    }).compile()
    authService = module.get<AuthService>(AuthService)

  })

  // make new test case
  it("find one item", async () => {
const item=await AuthService.find

  })


})

