export class AccuracyEvaluator {
  static evaluate( response: string, expectedKeywords: string[]): boolean {
    return expectedKeywords.every(keyword =>
      response.toLowerCase().includes(keyword.toLowerCase())
    );
  }
}