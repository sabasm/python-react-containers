from functools import wraps
import logging
import time
from flask import request, current_app, g
from typing import Callable
import json
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)


def log_request_middleware() -> Callable:
    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def decorated_function(*args, **kwargs):
            g.start_time = time.time()
            response = f(*args, **kwargs)
            duration = time.time() - g.start_time

            log_data = {
                "method": request.method,
                "path": request.path,
                "status": {"code": response.status_code, "text": response.status},
                "duration_ms": round(duration * 1000, 2),
                "size": len(response.get_data()),
                "client": {
                    "ip": request.remote_addr,
                    "agent": request.headers.get("User-Agent"),
                },
            }

            if current_app.debug:
                log_data.update(
                    {"headers": dict(request.headers), "params": dict(request.args)}
                )

            logger.info(json.dumps(log_data, indent=2))
            return response

        return decorated_function

    return decorator
