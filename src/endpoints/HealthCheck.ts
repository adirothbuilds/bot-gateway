import { OpenAPIRoute } from "chanfana";
import { HealthCheckResponseSchema } from "../core/types";

export class HealthCheck extends OpenAPIRoute {
  schema = {
    tags: ["System"],
    summary: "Health check",
    responses: {
      "200": {
        description: "Service is healthy",
        content: {
          "application/json": {
            schema: HealthCheckResponseSchema
          },
        },
      },
    },
  };

  async handle() {
    return {
      status: "OK",
      uptime: Date.now(),
    };
  }
}
