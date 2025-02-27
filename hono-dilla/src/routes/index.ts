//import hono
import { Hono } from "hono";

//import controller
import {
  createPost,
  deletePost,
  getPostById,
  getPost,
  updatePost,
} from "../controller/PostController";

import { basicAuth } from "hono/basic-auth";
import { bearerAuth } from "hono/bearer-auth";

import { db } from "../db/index.js";
import { apiKeyAuth } from "../middleware/auth";

import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { loginUser } from "../controller/authController";

export const postRouter = new Hono<{ Variables: JwtVariables }>();

const SECRET_KEY: any = process.env.KEY;

postRouter.post("/login", loginUser);

postRouter.get("/", async (c) => {
  const auth = await db.query.auth.findFirst();

  if (auth) {
    return c.json({
      statusCode: 200,
      message: "Authorized",
      key: auth.key,
    });
  }
});

postRouter.use("/data/*", jwt({ secret: SECRET_KEY }));

postRouter.use("/data/*", apiKeyAuth);
//routes posts index
postRouter.get("/data", (c) => getPost(c));

//routes posts create
postRouter.post("/data", (c) => createPost(c));

//routes posts detail
postRouter.get("/data/:id", (c) => getPostById(c));

//route post update
postRouter.put("/data/:id", (c) => updatePost(c));

//route post delete
postRouter.delete("/data/:id", (c) => deletePost(c));

// //basic auth
// postRouter.use(
//   "/basic/*",
//   basicAuth({
//     username: "adilla",
//     password: "adilla123",
//   })
// );

// postRouter.get("/basic/page", (c) => {
//   return c.text("You are authorized");
// });

// postRouter.delete("/basic/delete/page", (c) => {
//   return c.text("Page deleted");
// });

// //basic bearer
// const token = "adillacoba";
// postRouter.use("/bearer/*", bearerAuth({ token }));

// postRouter.get("/bearer/page", (c) => {
//   return c.json({ message: "Read post!" });
// });

// postRouter.post("bearer/create/page", (c) => {
//   return c.json({ message: "Created post!" }, 201);
// });

//jwt
// postRouter.use(
//   "/jwt/*",
//   jwt({
//     secret: "it-is-very-secret",
//   })
// );

// postRouter.get("/jwt/page", (c) => {
//   const payload = c.get("jwtPayload");
//   return c.json(payload); // eg: { "sub": "1234567890", "name": "dilla", "iat": 1516239022 }
// });
