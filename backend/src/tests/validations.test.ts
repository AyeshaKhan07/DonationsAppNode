import * as dotenv from 'dotenv'
dotenv.config()

import { CreateUserDto } from '../modules/auth/dto';
import { ValidationTestSuiteInterface } from '../interfaces';
import { endConnection, establishConnection } from '../database';
import { getValidationErrors } from '../middlewares/validate-request';
import userValidationTestSuit from '../test-suites/user-validation-test-suite';

describe('User Validations', () => {
  userValidationTestSuit.map((test: ValidationTestSuiteInterface, index) => {
    describe(test.describe, () => {
      it(test.it, async () => {
        /**
         * Establishing connection on executing first testcase
         */
        if (!index) await establishConnection();

        const errors = await getValidationErrors(test.data, CreateUserDto);
        test.toHaveProperties.forEach(property => {

          if (property.value) expect(errors).toHaveProperty(property.key, property.value);
          else expect(errors).toHaveProperty(property.key);

        });

        /**
         * Closing connection on executing last testcase
         */
        if (index == (userValidationTestSuit.length - 1)) await endConnection();
      })
    })
  })
})
