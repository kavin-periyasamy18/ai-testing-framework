import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { OllamaClient } from '../models/ollama.client.js';
import { AccuracyEvaluator } from '../evaluators/accuracy.evaluator.js';

type TestCase = {
  id: string;
  prompt: string;
  expectedKeywords: string[];
};

test('Factual AI prompt validation', async () => {
  const filePath = path.join(process.cwd(), 'prompts', 'factual.prompts.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const testCases: TestCase[] = JSON.parse(rawData);

  const client = new OllamaClient();

  for (const tc of testCases) {
    const response = await client.generate(tc.prompt);

    console.log(`\nTest Case: ${tc.id}`);
    console.log(`Prompt: ${tc.prompt}`);
    console.log(`Response: ${response}`);

    const result = AccuracyEvaluator.evaluate( response, tc.expectedKeywords)

    console.log(`Result: ${result ? 'PASS' : 'FAIL'}`)
    
    expect(result).toBeTruthy();
  }
});