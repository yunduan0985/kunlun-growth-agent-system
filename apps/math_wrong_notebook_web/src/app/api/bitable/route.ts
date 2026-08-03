import { NextResponse } from 'next/server';

// 飞书开放平台相关凭证 (需配置在 .env.local 中)
const FEISHU_APP_ID = process.env.FEISHU_APP_ID || '';
const FEISHU_APP_SECRET = process.env.FEISHU_APP_SECRET || '';
const BITABLE_APP_TOKEN = process.env.BITABLE_APP_TOKEN || '';
const BITABLE_TABLE_ID = process.env.BITABLE_TABLE_ID || '';

/**
 * 模拟的飞书多维表格结构化记录（当未填入 AppSecret 时提供备用方案）
 */
const MOCK_BITABLE_RECORDS = [
  { id: 'rec01', fields: { 学生姓名: '王梓涵', 班级: '初三数学 A 班', 薄弱知识点: 'y = ax^2 + bx + c', 错题数量: 14, 订正率: '85%' } },
  { id: 'rec02', fields: { 学生姓名: '李明轩', 班级: '初三数学 A 班', 薄弱知识点: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}', 错题数量: 9, 订正率: '100%' } },
  { id: 'rec03', fields: { 学生姓名: '张乐怡', 班级: '初三数学 A 班', 薄弱知识点: 'PA \\cdot PB = PC \\cdot PD', 错题数量: 18, 订正率: '61%' } },
  { id: 'rec04', fields: { 学生姓名: '陈思宇', 班级: '初三数学 B 班', 薄弱知识点: '\\frac{AB}{DE} = \\frac{BC}{EF}', 错题数量: 7, 订正率: '92%' } },
];

/**
 * 获取飞书 tenant_access_token
 */
async function getTenantAccessToken() {
  if (!FEISHU_APP_ID || !FEISHU_APP_SECRET) {
    return null;
  }
  
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET,
    }),
  });
  
  const data = await response.json();
  if (data.code !== 0) {
    throw new Error(`获取飞书 Token 失败: ${data.msg}`);
  }
  return data.tenant_access_token;
}

/**
 * GET: 获取 Bitable 中的班级与学生错题记录
 */
export async function GET() {
  try {
    const token = await getTenantAccessToken();
    
    if (!token) {
      // 开启防中断 Mode：返回格式化的多维表格模拟数据
      return NextResponse.json({ 
        success: true, 
        mode: 'mock',
        message: '已加载多维表格协同结构数据 (尚未配置 FEISHU_APP_SECRET 凭证)',
        data: { items: MOCK_BITABLE_RECORDS, total: MOCK_BITABLE_RECORDS.length } 
      });
    }
    
    // 连通真实 Bitable 记录
    const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json({ success: true, mode: 'live', data: data.data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * POST: 向 Bitable 写入新采集的错题数据
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await getTenantAccessToken();
    
    if (!token) {
      // Mock 添加成功
      const newRec = { id: `rec${Date.now()}`, fields: body.fields };
      MOCK_BITABLE_RECORDS.unshift(newRec);
      return NextResponse.json({ 
        success: true, 
        mode: 'mock',
        message: '数据已成功写入多维表格缓存结构！',
        data: newRec 
      });
    }
    
    // 写入真实 Bitable 记录
    const response = await fetch(`https://open.feishu.cn/open-apis/bitable/v1/apps/${BITABLE_APP_TOKEN}/tables/${BITABLE_TABLE_ID}/records`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: body.fields
      })
    });
    
    const data = await response.json();
    if (data.code !== 0) {
      throw new Error(`写入 Bitable 失败: ${data.msg}`);
    }
    
    return NextResponse.json({ success: true, mode: 'live', data: data.data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
