import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Login from '../pages/Login';
import * as AuthContext from '../services/AuthContext';

import {vi} from 'vitest';

global.jest = vi;


jest.mock('../services/AuthContext', () => ({
    UserAuth: () => ({
      login: jest.fn(),
    }),
  }));
  jest.mock("../services/AuthContext");

  
describe('Login', () => {


});