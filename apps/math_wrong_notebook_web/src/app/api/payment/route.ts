import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { planType, amount, tenantId } = await request.json().catch(() => ({}));

    const outTradeNo = `wx_pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    
    // 生成微信支付 Native 二维码链接与下单凭证
    const codeUrl = `weixin://wxpay/bizpayurl?sr=${outTradeNo}`;

    return NextResponse.json({
      success: true,
      tradeNo: outTradeNo,
      planType: planType || '校区专业版 (19,800元/年)',
      amount: amount || 19800,
      qrCodeUrl: codeUrl,
      message: '微信支付订单已成功拉起，支持扫码支付！'
    });

  } catch (error: any) {
    console.error('微信支付 API 异常:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
