class PlanDietGuardrailException(Exception):
    """Exception raised for invalid input triggered by the input guardrail"""

    def __init__(self, message: str = ""):
        self.message = message
        super().__init__(self.message)
