import { Policy, Statement } from "./custom-types";

export function genPolicy(effect, resource) {
  const policy: Policy = {};
  policy.Version = "2012-10-17";
  policy.Statement = [];
  const stmt: Statement = {};
  stmt.Action = "execute-api:Invoke";
  stmt.Effect = effect;
  stmt.Resource = resource;
  policy.Statement.push(stmt);
  return policy;
}

export function getAuthResponse(
  principalId: string,
  policyDocument: Policy,
  context: { simpleAuth: boolean }
) {
  return {
    principalId,
    policyDocument,
    context
  };
}

export function checkIfExistingUser(userId: string) {
  const fakeUsers: Array<string> = ["1234567890"];
  return fakeUsers.indexOf(userId) > -1;
}
