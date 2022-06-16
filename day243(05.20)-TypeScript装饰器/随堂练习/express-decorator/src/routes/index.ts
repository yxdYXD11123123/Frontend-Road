import { Router } from "express";

export const router = Router();

router.get("/login", (req, res) => {
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
});
