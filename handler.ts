import {
  APIGatewayEvent,
  CustomAuthorizerEvent,
  Callback,
  Context,
  Handler
} from "aws-lambda";
import * as jwtDecode from "jwt-decode";

/** Utils */
import {
  checkIfExistingUser,
  genPolicy,
  getAuthResponse
} from "./utils/helpers";

export const hello: Handler = (
  event: APIGatewayEvent,
  context: Context,
  cb: Callback
) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event
    })
  };

  cb(null, response);
};

export const authorizeUser: Handler = (
  event: CustomAuthorizerEvent,
  context: Context,
  cb: Callback
) => {
  try {
    const split = event.authorizationToken.split(" ");
    const token = split[1].trim();
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.sub) {
      if (checkIfExistingUser(decodedToken.sub)) {
        const policy = genPolicy("allow", event.methodArn);
        const principalId = "djhdajhdjha";
        const context = {
          simpleAuth: true
        };
        const response = getAuthResponse(principalId, policy, context);

        cb(null, response);
      } else {
        const policy = genPolicy("deny", event.methodArn);
        const principalId = "djhdajhdjha";
        const context = {
          simpleAuth: true
        };
        const response = getAuthResponse(principalId, policy, context);

        cb(null, response);
      }
    } else {
      cb(new Error("Unauthorized: Invalid token"));
    }
  } catch (err) {
    cb(err.message);
  }
};
