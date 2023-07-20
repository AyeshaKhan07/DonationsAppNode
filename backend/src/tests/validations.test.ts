import * as dotenv from 'dotenv'
dotenv.config()

import { CreateUserDto } from '../modules/auth/dto';
import { ValidationTestSuiteInterface } from '../interfaces';
import { getValidationErrors } from '../middlewares/validate-request';
import userValidationTestSuit from '../test-suites/user-validation-test-suite';
import assignMembersTestSuit from '../test-suites/assign-members-test-suite';
import { AssignTeamMembersDto } from '../modules/fundraisers/dto';

describe('User Validations', () => {
  userValidationTestSuit.map((test: ValidationTestSuiteInterface, index) => {
    describe(test.describe, () => {
      it(test.it, async () => {

        const errors = await getValidationErrors(test.data, CreateUserDto);
        test.toHaveProperties.forEach(property => {

          if (property.value) expect(errors).toHaveProperty(property.key, property.value);
          else expect(errors).toHaveProperty(property.key);

        });

      })
    })
  })
})

describe('Assign Members Validations', () => {
  assignMembersTestSuit.map((test: ValidationTestSuiteInterface, index) => {
    describe(test.describe, () => {
      it(test.it, async () => {

        const errors = await getValidationErrors(test.data, AssignTeamMembersDto);
        test.toHaveProperties.forEach(property => {

          if (property.value) expect(errors).toHaveProperty(property.key, property.value);
          else expect(errors).toHaveProperty(property.key);

        });

      })
    })
  })
})
