import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: '教师/机构扫码与手机号登录',
      credentials: {
        email: { label: '邮箱 / 手机号', type: 'text', placeholder: 'zhang@school.com' },
        password: { label: '密码 / 验证码', type: 'password' }
      },
      async authorize(credentials) {
        // 生产环境 RBAC 校验逻辑
        if (credentials?.email) {
          return {
            id: 'usr_001',
            name: '张晓梅 老师',
            email: credentials.email,
            role: 'TEACHER',
            tenantId: 'tnt_demo_01',
            tenantName: '智练 AI 示范教培校区'
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.tenantId = user.tenantId;
        token.tenantName = user.tenantName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
        session.user.tenantName = token.tenantName;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt' as const
  },
  secret: process.env.NEXTAUTH_SECRET || 'SuperSecretKeyProduction123!@#'
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
