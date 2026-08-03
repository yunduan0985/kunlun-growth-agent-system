import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('开始初始化本地数据库种子数据...');

  const tenant = await prisma.tenant.create({
    data: {
      name: '智练 AI 示范教培校区',
    },
  });

  const teacher = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      name: '张晓梅 老师',
      email: 'zhang@school.com',
      role: 'TEACHER',
    },
  });

  const cls = await prisma.class.create({
    data: {
      tenantId: tenant.id,
      name: '初三数学 A 班',
      teacherId: teacher.id,
    },
  });

  const student = await prisma.student.create({
    data: {
      classId: cls.id,
      name: '张乐怡',
    },
  });

  await prisma.question.create({
    data: {
      studentId: student.id,
      content: '求解方程：2x^2 + 5x - 12 = 0 的实数根。',
      difficulty: 'HARD',
    },
  });

  console.log('🎉 本地数据库种子数据填充完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
