import { Request, Response } from "express";
import { controller } from "./decorators/controller";
import { get } from "./decorators/routes";

@controller("/auth")
export class LoginController {
  @get("/login")
  getLoginPage(req: Request, res: Response) {
    res.send(`
        <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
        `);
  }
}
