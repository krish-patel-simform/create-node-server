/**
 * @param {import('fastify').FastifyInstance} app
 */
export async function registerRoutes(app) {
  app.get('/health', async (_request, _reply) => {
    return {
      success: true,
      message: 'Server is healthy',
    };
  });
}
