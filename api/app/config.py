from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    OPENAI_API_KEY: str
    LOW_COST_LLM_MODEL: str
    HIGH_COST_LLM_MODEL: str


settings = Settings() # type: ignore[call-arg]
