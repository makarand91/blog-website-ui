import { NextResponse } from 'next/server'
import { fetchBrands } from '@/lib/strapi'

export async function GET() {
  try {
    const data = await fetchBrands()

    return NextResponse.json({
      success: true,
      data: data,
      firstArticle: data.data?.[0]?.articles?.[0] || null,
      thumbnail: data.data?.[0]?.articles?.[0]?.thumbnail || null,
    }, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, {
      status: 500,
    })
  }
}
