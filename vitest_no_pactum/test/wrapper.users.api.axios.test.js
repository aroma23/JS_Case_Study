import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readUsers} from "../api/Users";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file for standalone tests
dotenv.config();

// Configure axios for the local server
const api = axios.create({
    baseURL: process.env.API_BASE_URL || "http://localhost:8000",
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    },
  });

describe('API Test with vitest', () => {
    beforeAll(() => {
    })

    it("axios - fetches users successfully", async () => {
      const response = await readUsers(api);
    //   const payload = generateCreateUserPayload();
    //   console.log(payload);
      expect(response.status).toBe(400);
      expect(Array.isArray(response.data)).toBe(true);
      // Add more specific assertions based on your API's response structure
    });

    afterAll(() => {
        // TODO - any teardown needed for this test suite
    })
})
