import { Prisma } from 'generated/prisma';

export type UserAdminList = Prisma.UsersGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    first_access: true;
    active: true;
    cellphone: true;
    company_roles: {
      omit: {
        company_id: true;
        role_id: true;
        user_id: true;
      };
      include: {
        company: true;
        role: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type User = Prisma.UsersGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    first_access: true;
    active: true;
    cellphone: true;
  };
}>;
