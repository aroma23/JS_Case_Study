import { describe, it, expect, vi } from 'vitest';
import axios from 'axios'; // Import axios

describe('Mocking REST API calls with fetch', () => {
    it('should mock a fetch API call', async () => {
        // Mock the global fetch function
        vi.spyOn(global, 'fetch').mockResolvedValue({
            json: vi.fn().mockResolvedValue({ data: 'mocked data' }), // Mocked response body
            ok: true,  // Mock a successful response
        });

        // Simulate calling your function that uses fetch
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();

        // Assert the mocked response
        expect(data.data).toBe('mocked data');
        expect(fetch).toHaveBeenCalledWith('https://api.example.com/data');  // Check if the URL was requested
    });
});

describe('Mocking REST API calls with axios', () => {
    // Mock axios module
    vi.mock('axios');
    it('should mock a GET request using axios', async () => {
        // Mock the axios.get method to return a resolved promise with mock data
        axios.get.mockResolvedValue({ data: { message: 'mocked API response' } });

        // Simulate calling the function that uses axios
        const response = await axios.get('https://api.example.com/data');

        // Assert the mocked response
        expect(response.data.message).toBe('mocked API response');
        expect(axios.get).toHaveBeenCalledWith('https://api.example.com/data');  // Verify the URL
    });
});


describe('Mocking POST requests', () => {
    vi.mock('axios');
    it('should mock a POST request using axios', async () => {
      // Mock axios.post to return a mock response
      axios.post.mockResolvedValue({ data: { success: true, message: 'Data saved!' } });
  
      // Simulate calling the POST request
      const response = await axios.post('https://api.example.com/save', { name: 'John Doe' });
  
      // Assert the mocked response
      expect(response.data.success).toBe(true);
      expect(response.data.message).toBe('Data saved!');
      expect(axios.post).toHaveBeenCalledWith('https://api.example.com/save', { name: 'John Doe' });
    });
  });