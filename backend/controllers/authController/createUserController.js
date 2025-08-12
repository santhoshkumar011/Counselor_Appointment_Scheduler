import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const CreateUser = async (req, res) => {
  const { username, email, password, mobile, vehicle_number } = req.body;
  console.log('Received:', { username, email, password, mobile, vehicle_number });


  try {
   const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {username },
          { email  },
          { mobile },
          { vehicle_number }
        ]
      }
    });

    if (existingUser) {
      console.log('User already exists:', existingUser);
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        mobile,
        vehicle_number,
      },
    });

    console.log('User created successfully:', user);
    return res.status(200).send({ message: 'User created successfully' });
  } catch (err) {
    console.error('User not created:', err);
    return res.status(500).send({ error: 'User not created' });
  }
};
