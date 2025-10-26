export interface Newsletter {
  id: string
  title: string
  content: string
  date?: string
}

// Static newsletter data - in production, this would come from a database or API
const staticNewsletters: Newsletter[] = [
  {
    id: "bitcoin-market-analysis",
    title: "Bitcoin Market Analysis",
    content: `# Bitcoin Market Analysis

## Executive Summary
Bitcoin continues to show strong momentum in the current market cycle. This report analyzes key technical indicators and market sentiment.

## Market Overview
- Current Price: $45,000 - $50,000 range
- Market Cap: $900B+
- Trading Volume: Increasing

## Technical Analysis
Bitcoin has broken through several resistance levels, indicating bullish sentiment. The 200-day moving average remains a key support level.

### Key Levels
- Resistance: $52,000
- Support: $42,000
- Moving Average (200-day): $41,500

## Market Sentiment
Institutional adoption continues to grow, with major corporations adding Bitcoin to their treasuries. This long-term trend supports price appreciation.

## Conclusion
The technical setup remains favorable for continued upside movement. Traders should watch for consolidation patterns around key resistance levels.`,
  },
  {
    id: "ethereum-defi-report",
    title: "Ethereum DeFi Report",
    content: `# Ethereum DeFi Report

## Overview
Ethereum's DeFi ecosystem continues to expand with new protocols and increased total value locked (TVL).

## Current DeFi Metrics
- Total Value Locked: $50B+
- Number of Active Protocols: 500+
- Daily Active Users: 2M+

## Major DeFi Platforms
1. **Uniswap** - Leading DEX with $3B+ TVL
2. **Aave** - Largest lending protocol
3. **Curve** - Stablecoin exchange specialist
4. **Lido** - Liquid staking leader

## Opportunities
- Yield farming opportunities in emerging protocols
- Cross-chain DeFi expansion
- Layer 2 scaling solutions

## Risks
- Smart contract vulnerabilities
- Regulatory uncertainty
- Market volatility

## Recommendations
Diversify across multiple protocols and maintain proper risk management strategies.`,
  },
  {
    id: "crypto-regulations-update",
    title: "Crypto Regulations Update",
    content: `# Crypto Regulations Update

## Global Regulatory Landscape
Governments worldwide are developing frameworks for cryptocurrency regulation.

## Key Developments
- **United States**: SEC continues enforcement actions
- **European Union**: MiCA regulation implementation
- **Asia**: Mixed approaches across different countries

## Impact on Markets
Regulatory clarity generally supports long-term adoption and institutional participation.

## Compliance Considerations
- KYC/AML requirements
- Tax reporting obligations
- Custody standards

## Future Outlook
Expect continued regulatory evolution as governments balance innovation with consumer protection.`,
  },
]

export function getAllNewsletters(): Newsletter[] {
  return staticNewsletters.sort((a, b) => b.id.localeCompare(a.id))
}

export function getNewsletterById(id: string): Newsletter | null {
  return staticNewsletters.find((n) => n.id === id) || null
}

export function getLatestNewsletters(count = 3): Newsletter[] {
  return getAllNewsletters().slice(0, count)
}
