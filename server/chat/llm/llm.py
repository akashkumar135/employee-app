from langchain.agents import create_agent
from langchain_litellm import ChatLiteLLM

from config import settings


def get_llm(model="openai/gpt-4o-mini"):
    return ChatLiteLLM(
        api_key=settings.litellm_api_key,
        api_base=settings.litellm_api_base,
        model=model,
        streaming=True,
    )


def get_chat_agent(llm: ChatLiteLLM, system_prompt: str = "You are a basic chat bot"):
    return create_agent(llm, system_prompt=system_prompt)
