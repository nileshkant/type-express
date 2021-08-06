import { ValidationChain, param } from 'express-validator';
export const validationRules = (route: string) => {
  let output: ValidationChain[];
  switch (route) {
    case 'one': // route name refers to action name from routes
      output = [param('id', 'Invalid id').isString()];
      break;
    default:
      output = [];
  }
  return output;
};
