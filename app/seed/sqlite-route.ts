// Temporary SQLite version for testing
import bcrypt from 'bcrypt';
import { invoices, customers, revenue, users } from '../lib/placeholder-data';

// Simple in-memory storage for testing
let database = {
  users: [] as any[],
  customers: [] as any[],
  invoices: [] as any[],
  revenue: [] as any[]
};

export async function GET() {
  try {
    console.log('Starting database seeding with in-memory storage...');
    
    // Seed users
    console.log('Seeding users...');
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      database.users.push({
        ...user,
        password: hashedPassword
      });
    }
    
    // Seed customers
    console.log('Seeding customers...');
    database.customers = [...customers];
    
    // Seed invoices
    console.log('Seeding invoices...');
    database.invoices = [...invoices];
    
    // Seed revenue
    console.log('Seeding revenue...');
    database.revenue = [...revenue];

    console.log('Database seeded successfully!');
    console.log('Seeded data:', {
      users: database.users.length,
      customers: database.customers.length,
      invoices: database.invoices.length,
      revenue: database.revenue.length
    });

    return Response.json({ 
      message: 'Database seeded successfully (in-memory)',
      data: {
        users: database.users.length,
        customers: database.customers.length,
        invoices: database.invoices.length,
        revenue: database.revenue.length
      }
    });
  } catch (error) {
    console.error('Seeding error:', error);
    
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return Response.json(
      { 
        error: 'Failed to seed database',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}