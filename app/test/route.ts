export async function GET() {
  return Response.json({ 
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    env: {
      hasPostgresUrl: !!process.env.POSTGRES_URL,
      postgresUrlValue: process.env.POSTGRES_URL ? 'Set (hidden)' : 'Not set'
    }
  });
}