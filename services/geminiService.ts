
import { GoogleGenAI, Type } from "@google/genai";
import type { Customer, StockItem, Transaction, BusinessInsight } from '../types';

const getBusinessInsights = async (
  customers: Customer[],
  stock: StockItem[],
  transactions: Transaction[]
): Promise<BusinessInsight[]> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    // Return mock insights if API key is not available
    return [
      { title: "Demo Insight: Customer Engagement", suggestion: "Consider a loyalty program for customers with zero debt to encourage prompt payments." },
      { title: "Demo Insight: Stock Optimization", suggestion: "Analyze sales data to identify slow-moving stock and consider a promotional sale." },
      { title: "Demo Insight: Expense Reduction", suggestion: "Review monthly expenses to find areas where costs can be cut without impacting service quality." },
    ];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const totalDebt = customers.reduce((sum, c) => sum + c.debt, 0);
  const bestSellingItems = stock.sort((a,b) => b.quantity - a.quantity).slice(0, 3).map(item => item.name);
  const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);

  const prompt = `
    Analyze the following data for a small retail shop in Uganda and provide 3 actionable business insights.
    
    Data:
    - Total customer debt: ${totalDebt} UGX
    - Top 3 selling items: ${bestSellingItems.join(', ')}
    - Total income this month: ${totalIncome} UGX
    - Total expenses this month: ${totalExpense} UGX
    
    Based on this data, generate insights to improve profitability, reduce debt, and optimize stock.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const resultText = response.text.trim();
    const resultJson = JSON.parse(resultText);
    return resultJson.insights || [];
  } catch (error) {
    console.error("Error fetching insights from Gemini API:", error);
    throw new Error("Failed to generate AI insights.");
  }
};

export { getBusinessInsights };
