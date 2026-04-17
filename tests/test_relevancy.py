from models.gemini_model import GeminiModel
from test_data.test_cases import TEST_CASES

from deepeval.metrics import AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase

model = GeminiModel()

def test_relevancy():
    for case in TEST_CASES:
        output = model.generate(case["input"])

        test_case = LLMTestCase(
            input=case["input"],
            actual_output=output,
            expected_output=case["expected"]
        )

        metric = AnswerRelevancyMetric()
        metric.measure(test_case)

        print("\nInput:", case["input"])
        print("Output:", output)
        print("Score:", metric.score)
        print("Reason:", metric.reason)

        assert metric.score > 0.5