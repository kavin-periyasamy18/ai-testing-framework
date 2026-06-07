import axios from 'axios';

export class OllamaClient {
  constructor(
    private baseUrl: string = 'http://localhost:11434',
    private model: string = 'llama3:latest'
  ) {}

  async generate(prompt: string): Promise<string> {
    const response = await axios.post(`${this.baseUrl}/api/generate`, {
      model: this.model,
      prompt,
      stream: false
    });

    return response.data?.response?.trim() || '';
  }
}