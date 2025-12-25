import asyncio
from typing import Awaitable, Callable, TypeVar

T = TypeVar("T")


async def run_with_timeout(function: Callable[[], Awaitable[T]], timeout: float) -> T:
    result = await asyncio.wait_for(
        function(),
        timeout=timeout,
    )
    return result
