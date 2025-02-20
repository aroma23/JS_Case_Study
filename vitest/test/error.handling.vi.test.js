import { describe, it, expect } from 'vitest';

describe('Basic Error Handling with Vitest', () => {
  it('should throw an error', () => {
    const throwError = () => {
      throw new Error('Something went wrong');
    };
    
    expect(throwError).toThrow('Something went wrong');  // Assert the error message
  });

  it('should throw a specific error instance', () => {
    const throwError = () => {
      throw new TypeError('This is a type error');
    };
    
    expect(throwError).toThrow(TypeError);  // Assert that it's a TypeError
  });
});

describe('Asynchronous Error Handling with Vitest', () => {
    it('should reject with an error', async () => {
      const asyncErrorFunction = async () => {
        throw new Error('Async error occurred');
      };
      
      await expect(asyncErrorFunction()).rejects.toThrow('Async error occurred');
    });
  
    it('should reject with a specific error', async () => {
      const asyncErrorFunction = async () => {
        throw new TypeError('This is a type error');
      };
  
      await expect(asyncErrorFunction()).rejects.toThrow(TypeError);
    });
  });

  describe('Manual Error Handling with try...catch in Vitest', () => {
    it('should manually catch and assert an error', async () => {
      const asyncFunctionThatFails = async () => {
        throw new Error('This is an error!');
      };
  
      try {
        await asyncFunctionThatFails();
      } catch (error) {
        expect(error.message).toBe('This is an error!');  // Manually assert the error message
      }
    });
  });